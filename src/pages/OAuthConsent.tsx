import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Cloud, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

type Details = { client?: { name?: string; client_name?: string }; redirect_uri?: string; redirect_url?: string; redirect_to?: string; scope?: string; scopes?: string[] };
type OAuthResult = { data: Details | null; error: { message: string } | null };
type OAuthClient = {
  getAuthorizationDetails: (id: string) => Promise<OAuthResult>;
  approveAuthorization: (id: string) => Promise<OAuthResult>;
  denyAuthorization: (id: string) => Promise<OAuthResult>;
};
const oauth = (supabase.auth as typeof supabase.auth & { oauth: OAuthClient }).oauth;

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const id = params.get("authorization_id") ?? "";
  const { user, loading, signOut } = useAuth();
  const [details, setDetails] = useState<Details | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [retry, setRetry] = useState(0);
  const returnPath = window.location.pathname + window.location.search + window.location.hash;
  const loginPath = "/login?next=" + encodeURIComponent(returnPath);

  useEffect(() => {
    let active = true;
    setDetails(null);
    setError("");
    if (!id) { setError("This connection request is missing or invalid. Start the connection again from your assistant."); return; }
    if (loading) return;
    if (!user) { window.location.replace(loginPath); return; }
    (async () => {
      try {
        const result = await oauth.getAuthorizationDetails(id);
        if (!active) return;
        if (result.error) throw new Error(result.error.message);
        const target = result.data?.redirect_url ?? result.data?.redirect_to;
        if (target && !result.data?.client) { window.location.assign(target); return; }
        if (!result.data?.client) throw new Error("This request has expired. Start the connection again from your assistant.");
        setDetails(result.data);
      } catch (failure) {
        if (active) setError(failure instanceof Error ? failure.message : "Could not load this connection request.");
      }
    })();
    return () => { active = false; };
  }, [id, user?.id, loading, loginPath, retry]);

  async function decide(approve: boolean) {
    if (busy || !details || !user) return;
    setBusy(true);
    setError("");
    try {
      const result = await (approve ? oauth.approveAuthorization(id) : oauth.denyAuthorization(id));
      if (result.error) throw new Error(result.error.message);
      const target = result.data?.redirect_url ?? result.data?.redirect_to;
      if (!target) throw new Error("The connection could not finish. Please try again.");
      window.location.assign(target);
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "The connection could not finish. Please try again.");
      setBusy(false);
    }
  }

  const clientName = details?.client?.name ?? details?.client?.client_name ?? "your assistant";
  const scopes = details?.scopes ?? details?.scope?.split(/\s+/).filter(Boolean) ?? [];
  return <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-5 py-12">
    <section className="w-full max-w-md space-y-6">
      <Link to="/" className="flex items-center gap-2 font-semibold"><Cloud className="h-7 w-7" />Cloudly</Link>
      <ShieldCheck className="h-9 w-9 text-primary" />
      <h1 className="text-2xl font-semibold break-words">{details ? `Connect ${clientName} to 222244433` : "Connect your assistant"}</h1>
      {user && <div className="flex flex-wrap items-center justify-between gap-2"><span className="text-sm text-muted-foreground break-all">{user.email}</span><Button variant="ghost" size="sm" disabled={busy} onClick={async () => { await signOut(); window.location.assign(loginPath); }}>Switch account</Button></div>}
      {error && <div role="alert" className="border border-destructive/30 rounded-lg p-4 text-sm text-destructive">{error}</div>}
      {!details && !error && <p role="status" className="flex gap-2 items-center text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />Loading connection request…</p>}
      {details && <>
        <p className="text-sm text-muted-foreground">This lets {clientName} use this app as you.</p>
        {details.redirect_uri && <p className="text-sm break-all"><span className="text-muted-foreground">Return address: </span>{details.redirect_uri}</p>}
        <ul className="space-y-3 border-y border-border py-5 text-sm">
          <li>Read your file names, types, sizes, and starred status</li><li>Read your folder names and hierarchy</li>
          {scopes.map(scope => <li key={scope}>{scope === "openid" ? "Confirm your identity" : scope === "email" ? "Share your email address" : scope === "profile" ? "Share your basic profile" : `Additional permission requested: ${scope}`}</li>)}
        </ul>
        <p className="text-sm text-muted-foreground">File contents, share links, and changes to files are not included. Your account permissions still apply.</p>
        <div className="flex flex-wrap gap-3"><Button disabled={busy} onClick={() => decide(true)}>{busy && <Loader2 className="h-4 w-4 animate-spin" />}Approve connection</Button><Button variant="outline" disabled={busy} onClick={() => decide(false)}>Cancel connection</Button></div>
      </>}
      {error && !details && <Button variant="outline" onClick={() => setRetry(value => value + 1)}>Try again</Button>}
    </section>
  </main>;
}
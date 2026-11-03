import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import OAuthConsent from "./OAuthConsent";

const mocks = vi.hoisted(() => ({ details: vi.fn(), approve: vi.fn(), deny: vi.fn() }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { auth: { oauth: { getAuthorizationDetails: mocks.details, approveAuthorization: mocks.approve, denyAuthorization: mocks.deny } } } }));
vi.mock("@/contexts/AuthContext", () => ({ useAuth: () => ({ user: { id: "test-user", email: "test@example.invalid" }, loading: false, signOut: vi.fn() }) }));
function mount(search = "?authorization_id=request-id") {
  return render(<MemoryRouter initialEntries={["/.lovable/oauth/consent" + search]}><OAuthConsent /></MemoryRouter>);
}
beforeEach(() => {
  vi.clearAllMocks();
  mocks.details.mockResolvedValue({ data: { client: { name: "Test assistant" }, scopes: ["openid", "email"] }, error: null });
});
afterEach(cleanup);
describe("OAuth consent decisions", () => {
  it("does not call the provider without an authorization ID", async () => {
    mount("");
    await screen.findByRole("alert");
    expect(mocks.details).not.toHaveBeenCalled();
  });
  it("shows expired request errors", async () => {
    mocks.details.mockResolvedValue({ data: null, error: { message: "Expired request" } });
    mount();
    await screen.findByRole("alert");
    expect(screen.queryByRole("button", { name: "Approve connection" })).toBeNull();
  });
  it("keeps the request recoverable after provider failure", async () => {
    mocks.details.mockRejectedValueOnce(new Error("Provider unavailable"));
    mount();
    fireEvent.click(await screen.findByRole("button", { name: "Try again" }));
    await screen.findByRole("button", { name: "Approve connection" });
    expect(mocks.details).toHaveBeenCalledTimes(2);
  });
  it("submits approval for the exact authorization ID and reports failure", async () => {
    mocks.approve.mockResolvedValue({ data: null, error: { message: "Approval failed" } });
    mount();
    fireEvent.click(await screen.findByRole("button", { name: "Approve connection" }));
    await waitFor(() => expect(mocks.approve).toHaveBeenCalledWith("request-id"));
    await screen.findByRole("alert");
    expect(mocks.deny).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Approve connection" })).not.toBeDisabled();
  });
  it("submits denial for the exact authorization ID and reports failure", async () => {
    mocks.deny.mockResolvedValue({ data: null, error: { message: "Cancellation failed" } });
    mount();
    fireEvent.click(await screen.findByRole("button", { name: "Cancel connection" }));
    await waitFor(() => expect(mocks.deny).toHaveBeenCalledWith("request-id"));
    await screen.findByRole("alert");
    expect(mocks.approve).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Cancel connection" })).not.toBeDisabled();
  });
});
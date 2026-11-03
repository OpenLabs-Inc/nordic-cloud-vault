import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_files",
  title: "List your files",
  description: "List metadata for your non-deleted files, optionally in one folder or starred only; no file contents or share links.",
  inputSchema: {
    folder_id: z.string().uuid().nullable().optional().describe("Folder ID; null means root, omitted means all your folders."),
    starred_only: z.boolean().optional().describe("Return only starred files when true."),
    limit: z.number().int().min(1).max(100).default(50).describe("Maximum number of files, from 1 to 100."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ folder_id, starred_only, limit }, ctx) => {
    const db = await supabaseForUser(ctx);
    let query = db.from("files").select("id,name,folder_id,mime_type,size_bytes,is_starred,created_at,updated_at").eq("user_id", ctx.getUserId()).is("deleted_at", null).order("created_at", { ascending: false }).order("id").limit(limit);
    if (folder_id === null) query = query.is("folder_id", null);
    else if (folder_id !== undefined) query = query.eq("folder_id", folder_id);
    if (starred_only) query = query.eq("is_starred", true);
    const { data, error } = await query;
    if (error) throw new ToolError("Could not load your files.");
    const files = (data ?? []).map(f => ({ id: f.id, name: f.name, folder_id: f.folder_id, mime_type: f.mime_type, size_bytes: f.size_bytes, is_starred: f.is_starred, created_at: f.created_at, updated_at: f.updated_at }));
    return { content: [{ type: "text", text: JSON.stringify(files) }], structuredContent: { files } };
  },
});
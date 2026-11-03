import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_folders",
  title: "List your folders",
  description: "List your folder names and IDs to browse your file hierarchy.",
  inputSchema: {
    parent_folder_id: z.string().uuid().nullable().optional().describe("Parent folder ID; null for root, omitted for all folders."),
    limit: z.number().int().min(1).max(100).default(50).describe("Maximum number of folders, from 1 to 100."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ parent_folder_id, limit }, ctx) => {
    const db = await supabaseForUser(ctx);
    let query = db.from("folders").select("id,name,parent_folder_id,created_at,updated_at").eq("user_id", ctx.getUserId()).order("name").order("id").limit(limit);
    if (parent_folder_id === null) query = query.is("parent_folder_id", null);
    else if (parent_folder_id !== undefined) query = query.eq("parent_folder_id", parent_folder_id);
    const { data, error } = await query;
    if (error) throw new ToolError("Could not load your folders.");
    const folders = (data ?? []).map(f => ({ id: f.id, name: f.name, parent_folder_id: f.parent_folder_id, created_at: f.created_at, updated_at: f.updated_at }));
    return { content: [{ type: "text", text: JSON.stringify(folders) }], structuredContent: { folders } };
  },
});
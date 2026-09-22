import { createMcpHandler } from "agents/mcp/server";
import { createServer } from "./mcp/createServer";

const mcpHandler = createMcpHandler(createServer);

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/mcp") {
      return mcpHandler.fetch(request);
    }

    return new Response(
      "Google Sheets MCP Server - use POST /mcp",
      { status: 200 },
    );
  },
};
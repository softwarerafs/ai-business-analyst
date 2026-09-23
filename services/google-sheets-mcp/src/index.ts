import { createMcpHandler } from "agents/mcp/server";
import { createServer } from "./mcp/createServer";
import { GoogleSheetsService } from "./services/GoogleSheetsService";
import type { Env } from "./env";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/mcp") {
      const sheetService = new GoogleSheetsService(
        env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        env.GOOGLE_PRIVATE_KEY,
      );
      const mcpHandler = createMcpHandler(
        () => createServer(sheetService),
      );
      return mcpHandler.fetch(request);
    }
    
    return new Response(
      "Google Sheets MCP Server - use POST /mcp",
      { status: 200 },
    );
  },
};

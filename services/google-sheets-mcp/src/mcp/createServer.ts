import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

export function createServer() {
  const server = new McpServer({
    name: "google-sheets-mcp",
    version: "0.1.0",
  });

  server.registerTool(
    "hello",
    {
      description: "Returns a greeting message.",
      inputSchema: {
        name: z.string().optional(),
      },
    },
    async ({ name }) => ({
      content: [
        {
          type: "text",
          text: `Hello, ${name ?? "World"}!`,
        },
      ],
    }),
  );

  return server;
}
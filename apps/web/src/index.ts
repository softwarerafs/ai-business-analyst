import type { Env } from "./env";
import { McpSheetsClient } from "./mcp/McpSheetsClient";
import { SheetsMcpService } from "./mcp/SheetsMcpService";
import { GeminiProvider } from "./llm/GeminiProvider";

export default {
	async fetch(
		request: Request,
		env: Env,
	): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname === "/api/mcp/tools") {
			const mcp = new McpSheetsClient(
				env.MCP_SERVER_URL,
			);

			try {
				await mcp.connect();
				const tools = await mcp.listTools();

				console.log(JSON.stringify({
					event: "mcp_tools_listed",
					protocolEra: mcp.getProtocolEra(),
				}));

				return Response.json({
					protocolEra: mcp.getProtocolEra(),
					tools: tools.tools.map((tool) => ({
						name: tool.name,
						description: tool.description,
					})),
				});
			} finally {
				await mcp.close();
			}
		}

		if (url.pathname === "/api/sheet") {
			const spreadsheetId =
				url.searchParams.get("spreadsheetId");
			const range =
				url.searchParams.get("range");

			if (!spreadsheetId || !range) {
				return Response.json(
					{
						error:
							"spreadsheetId and range are required",
					},
					{ status: 400 },
				);
			}

			const mcp = new McpSheetsClient(
				env.MCP_SERVER_URL,
			);

			try {
				await mcp.connect();
				const sheets = new SheetsMcpService(mcp);
				const data =
					await sheets.getSheetData(
						spreadsheetId,
						range,
					);

				console.log(JSON.stringify({
					event: "mcp_tool_requested",
					tool: "get_sheet_data",
				}));

				return Response.json(data);
			} finally {
				await mcp.close();
			}
		}


		if (url.pathname === "/askquestion") {
			const question =
				url.searchParams.get("question");

			if (!question) {
				return Response.json(
					{
						error:
							"question is required",
					},
					{ status: 400 },
				);
			}

			const gemini_provider = new GeminiProvider(
				env.GEMINI_API_KEY,
			);

			try {
				const answer = await gemini_provider.ask(question);

				console.log(JSON.stringify(answer));

				return Response.json(answer);
			} finally {
				
			}
		}


		return new Response(
			"AI Business Analyst Web",
		);
	},
};

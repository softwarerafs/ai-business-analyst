import type { McpServer } from "@modelcontextprotocol/server";
import type { SheetService } from "../services/SheetService";

import {
    getSheetDataInputSchema,
    getSheetDataOutputSchema,
} from "../schemas/getSheetData";

export function registerGetSheetData(
    server: McpServer,
    sheetService: SheetService,
) {
    server.registerTool(
        "get_sheet_data",
        {
            description: "Reads values from a Google Sheets range.",
            inputSchema: getSheetDataInputSchema,
            outputSchema: getSheetDataOutputSchema,
            annotations: {
                readOnlyHint: true,
                destructiveHint: false,
                idempotentHint: true,
                openWorldHint: true,
            },
        },
        async ({ spreadsheetId, range }) => {
            try {
                const result = await sheetService.getData(spreadsheetId, range);
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(result),
                        },
                        ],
                            structuredContent: result,
                };
            } catch (error) {
                const message =
                error instanceof Error ? error.message : "Unknown error";
                    return {
                        content: [{ type: "text", text: message }],
                        isError: true,
                    };
            }
        },
    );
}

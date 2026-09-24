import type { McpServer } from "@modelcontextprotocol/server";
import type { SheetService } from "../services/SheetService";
import { getSheetDataHandler } from "./getSheetDataHandler";

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
        async ({ spreadsheetId, range }) => 
            getSheetDataHandler(
                sheetService,
                spreadsheetId,
                range,
            ),
    );
}

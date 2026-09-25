import { McpSheetsClient } from "../mcp/McpSheetsClient";

import {
    sheetDataSchema,
    type SheetData,
} from "../schemas/sheetData";

export class SheetsMcpService {
    constructor(
        private readonly mcp: McpSheetsClient,
    ) { }
    async getSheetData(
        spreadsheetId: string,
        range: string,
    ): Promise<SheetData> {
        const result = await this.mcp.callTool(
            "get_sheet_data",
            {
                spreadsheetId,
                range,
            },
        );

        if (result.isError) {
            throw new Error(
                "MCP get_sheet_data returned an error",
            );
        }

        const parsed =
            sheetDataSchema.safeParse(
                result.structuredContent,
            );

        if (!parsed.success) {
            throw new Error(
                "Invalid get_sheet_data response",
            );
        }

        return parsed.data;
    }
}

import type { SheetService } from "../services/SheetService";
import { logEvent } from "../utils/logger";

export async function getSheetDataHandler(
    sheetService: SheetService,
    spreadsheetId: string,
    range: string,
) {
    const startedAt = Date.now();

    try {
        const result = await sheetService.getData(
            spreadsheetId,
            range,
        );

        logEvent({
            event: "mcp_tool_call",
            tool: "get_sheet_data",
            durationMs: Date.now() - startedAt,
            success: true,
        });


        return {
            content: [
                {
                    type: "text" as const,
                    text: JSON.stringify(result),
                },
            ],
            structuredContent: result,
        };
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "Unknown error";
                
        return {
            content: [
                {
                    type: "text" as const,
                    text: message,
                },
            ],
            isError: true,
        };
    }
}
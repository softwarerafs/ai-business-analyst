import {
    describe,
    expect,
    it,
    vi,
} from "vitest";
import {
    SheetsMcpService,
} from "../../src/mcp/SheetsMcpService";

describe("SheetsMcpService", () => {

    it("calls get_sheet_data with the expected arguments",
        async () => {
            const callTool = vi.fn().mockResolvedValue({
                structuredContent: {
                    range: "Sheet1!A1:B2",
                    values: [
                        ["Customer", "Revenue"],
                        ["Company A", "5000"],
                    ],
                },
            });
            const mcp = {
                callTool,
            } as any;
            const service =
                new SheetsMcpService(mcp);
            const result = await service.getSheetData(
                "sheet-123",
                "Sheet1!A1:B2",
            );
            expect(callTool).toHaveBeenCalledWith(
                "get_sheet_data",
                {
                    spreadsheetId: "sheet-123",
                    range: "Sheet1!A1:B2",
                },
            );
            expect(result.range)
                .toBe("Sheet1!A1:B2");
        });

    it("rejects an invalid MCP response",
        async () => {
            const mcp = {
                callTool: vi.fn().mockResolvedValue({
                    structuredContent: {
                        range: "Sheet1!A1:B2",
                        values: [["Company A", 5000]],
                    },
                }),
            } as any;
            const service =
                new SheetsMcpService(mcp);
            await expect(
                service.getSheetData(
                    "sheet-123",
                    "Sheet1!A1:B2",
                ),
            ).rejects.toThrow(
                "Invalid get_sheet_data response",
            );
        });

    it("propagates an MCP tool error",
        async () => {
            const mcp = {
                callTool: vi.fn().mockResolvedValue({
                    isError: true,
                    content: [],
                }),
            } as any;
            const service =
                new SheetsMcpService(mcp);
            await expect(
                service.getSheetData(
                    "sheet-123",
                    "Sheet1!A1:B2",
                ),
            ).rejects.toThrow(
                "MCP get_sheet_data returned an error",
            );
        });
});

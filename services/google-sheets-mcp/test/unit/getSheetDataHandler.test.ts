import { describe, expect, it } from "vitest";
import { getSheetDataHandler } from "../../src/mcp/getSheetDataHandler";
import { MockSheetService } from "../../src/services/MockSheetService";

import type {
    SheetData,
    SheetService,
} from "../../src/services/SheetService";


class FailingSheetService implements SheetService {
    async getData(): Promise<SheetData> {
        throw new Error("Google Sheets unavailable");
    }
}

describe("getSheetDataHandler", () => {
    it("returns structured content", async () => {
        const result = await getSheetDataHandler(
            new MockSheetService(),
            "test-sheet",
            "Sheet1!A1:C3",
        );
        expect(result).not.toHaveProperty("isError");
        expect(result.structuredContent?.range)
            .toBe("Sheet1!A1:C3");
        expect(result.structuredContent?.values.length)
            .toBeGreaterThan(0);
    });

    it("returns an MCP tool error when service fails", async () => {
        const result = await getSheetDataHandler(
            new FailingSheetService(),
            "test-sheet",
            "Sheet1!A1:C3",
        );
        expect(result.isError).toBe(true);
        expect(result.content[0]?.text)
            .toContain("Google Sheets unavailable");
    });
});

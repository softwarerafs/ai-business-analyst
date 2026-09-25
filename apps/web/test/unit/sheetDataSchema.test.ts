import {
    describe,
    expect,
    it,
} from "vitest";

import {
    sheetDataSchema,
} from "../../src/schemas/sheetData";

describe("sheetDataSchema", () => {
    it("accepts a valid MCP sheet response", () => {
        const result =
            sheetDataSchema.safeParse({
                range: "Sheet1!A1:B2",
                values: [
                    ["Customer", "Revenue"],
                    ["Company A", "5000"],
                ],
            });
            
        expect(result.success).toBe(true);
    });

    it("rejects an invalid values structure", () => {
        const result =
            sheetDataSchema.safeParse({
                range: "Sheet1!A1:B2",
                values: [
                    ["Company A", 5000],
                ],
            });

        expect(result.success).toBe(false);
    });
});
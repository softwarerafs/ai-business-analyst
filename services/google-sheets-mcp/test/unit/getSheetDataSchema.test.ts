import { describe, expect, it } from "vitest";
import {
    getSheetDataInputSchema,
    getSheetDataOutputSchema,
} from "../../src/schemas/getSheetData";


describe("get_sheet_data schemas", () => {
    it("accepts valid input", () => {
        const result = getSheetDataInputSchema.safeParse({
            spreadsheetId: "abc123",
            range: "Sheet1!A1:C10",
        });
        expect(result.success).toBe(true);
    });

    it("rejects an empty spreadsheetId", () => {
        const result = getSheetDataInputSchema.safeParse({
            spreadsheetId: "",
            range: "Sheet1!A1:C10",
        });
        expect(result.success).toBe(false);
    });

    it("rejects an empty range", () => {
        const result = getSheetDataInputSchema.safeParse({
            spreadsheetId: "abc123",
            range: "",
        });
        expect(result.success).toBe(false);
    });
    
    it("accepts the portable output contract", () => {
        const result = getSheetDataOutputSchema.safeParse({
            range: "Sheet1!A1:B2",
            values: [
                ["Customer", "Revenue"],
                ["Company A", "5000"],
            ],
        });
        expect(result.success).toBe(true);
    });
});

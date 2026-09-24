import {
    describe,
    expect,
    it,
} from "vitest";

import {
    MockSheetService,
} from "../../src/services/MockSheetService";

describe("MockSheetService", () => {

    it("returns predictable sheet data", async () => {

        const service =
            new MockSheetService();

        const result =
            await service.getData(
                "test-sheet",
                "Sheet1!A1:C3",
            );

        expect(result.range)
            .toBe("Sheet1!A1:C3");

        expect(result.values).toEqual([
            ["Date", "Customer", "Revenue"],
            ["2026-09-01", "Company A", "5000"],
            ["2026-09-02", "Company B", "3200"],
        ]);
    });

});
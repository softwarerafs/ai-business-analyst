import type { SheetData, SheetService } from "./SheetService";

export class MockSheetService implements SheetService {
    async getData(
        _spreadsheetId: string,
        range: string,
    ): Promise<SheetData> {
        return {
            range,
            values: [
                ["Date", "Customer", "Revenue"],
                ["2026-09-01", "Company A", "5000"],
                ["2026-09-02", "Company B", "3200"],
            ],
        };
    }
}

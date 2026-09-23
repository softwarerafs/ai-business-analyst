export interface SheetData {
    range: string;
    values: string[][];
}

export interface SheetService {
    getData(
        spreadsheetId: string,
        range: string,
    ): Promise<SheetData>;
}
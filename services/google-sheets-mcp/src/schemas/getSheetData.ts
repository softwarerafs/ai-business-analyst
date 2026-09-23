import * as z from "zod/v4";

export const getSheetDataInputSchema = z.object({
    spreadsheetId: z.string().min(1),
    range: z.string().min(1),
});

export const getSheetDataOutputSchema = z.object({
    range: z.string(),
    values: z.array(z.array(z.string())),
});
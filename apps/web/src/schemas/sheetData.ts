import * as z from "zod/v4";

export const sheetDataSchema = z.object({
    range: z.string(),
    values: z.array(
        z.array(z.string()),
    ),
});

export type SheetData =
    z.infer<typeof sheetDataSchema>;
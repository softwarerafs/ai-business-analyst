import { McpServer } from "@modelcontextprotocol/server";
import type { SheetService } from "../services/SheetService";
import { registerGetSheetData } from "./registerGetSheetData";


export function createServer(sheetService: SheetService) {
    const server = new McpServer({
        name: "google-sheets-mcp",
        version: "0.2.0",
    });

    registerGetSheetData(server, sheetService);

    return server;
}
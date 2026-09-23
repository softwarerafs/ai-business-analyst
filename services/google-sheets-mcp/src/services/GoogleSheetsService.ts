import { SignJWT, importPKCS8 } from "jose";
import type {
  SheetData,
  SheetService,
} from "./SheetService";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets.readonly";

export class GoogleSheetsService implements SheetService {
    constructor(
        private readonly clientEmail: string,
        private readonly privateKey: string,
    ) { }



    private async getAccessToken(): Promise<string> {
        const now = Math.floor(Date.now() / 1000);
        const normalizedKey = this.privateKey.replace(/\\n/g, "\n");
        const key = await importPKCS8(normalizedKey, "RS256");
        const assertion = await new SignJWT({
            scope: SHEETS_SCOPE,
        })
            .setProtectedHeader({ alg: "RS256", typ: "JWT" })
            .setIssuer(this.clientEmail)
            .setSubject(this.clientEmail)
            .setAudience(TOKEN_URL)
            .setIssuedAt(now)
            .setExpirationTime(now + 3600)
            .sign(key);

        const body = new URLSearchParams({
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion,
        });

        const response = await fetch(TOKEN_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body,
        });

        if (!response.ok) {
            throw new Error(
                `Google OAuth failed: ${response.status} ${await response.text()}`,
            );
        }

        const data = (await response.json()) as {
            access_token?: string;
        };

        if (!data.access_token) {
            throw new Error("Google OAuth response did not contain access_token");
        }

        return data.access_token;
    }



    async getData(
        spreadsheetId: string,
        range: string,
    ): Promise<SheetData> {
        const token = await this.getAccessToken();
        const url =
            `https://sheets.googleapis.com/v4/spreadsheets/` +
            `${encodeURIComponent(spreadsheetId)}/values/` +
            `${encodeURIComponent(range)}`;
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(
                `Google Sheets API failed: ${response.status} ${await response.text()}`,
            );
        }

        const data = (await response.json()) as {
            range?: string;
            values?: string[][];
        };

        return {
            range: data.range ?? range,
            values: data.values ?? [],
        };
    }
}

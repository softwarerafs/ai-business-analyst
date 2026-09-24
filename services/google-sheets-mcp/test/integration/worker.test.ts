import { describe, expect, it } from "vitest";
import worker from "../../src/index";

describe("Worker", () => {
    it("responds on the root route", async () => {
        const request =
            new Request("http://example.com/");
        // Use test env/context supplied by your
        // Cloudflare test configuration when required.
        const response = await worker.fetch(
            request,
            {} as never,
        );
        expect(response.status).toBe(200);
        expect(await response.text()).toContain(
            "Google Sheets MCP Server",
        );
    });
});
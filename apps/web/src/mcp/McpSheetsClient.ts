import {
    Client,
    StreamableHTTPClientTransport,
} from "@modelcontextprotocol/client";

export class McpSheetsClient {
    private client: Client | null = null;
    private transport:
        StreamableHTTPClientTransport | null = null;


    constructor(
        private readonly serverUrl: string,
    ) { }
    async connect(): Promise<void> {
        if (this.client) {
            return;
        }

        const client = new Client(
            {
                name: "ai-business-analyst-web",
                version: "0.1.0",
            },
            {
                versionNegotiation: {
                    mode: "auto",
                },
            },
        );

        const transport =
            new StreamableHTTPClientTransport(
                new URL(this.serverUrl),
            );

        await client.connect(transport);
        this.client = client;
        this.transport = transport;
    }


    private getClient(): Client {
        if (!this.client) {
            throw new Error(
                "MCP client is not connected",
            );
        }

        return this.client;
    }


    async listTools() {
        return this.getClient().listTools();
    }


    async callTool(
        name: string,
        args: Record<string, unknown>,
    ) {
        return this.getClient().callTool({
            name,
            arguments: args,
        });
    }


    getProtocolEra() {
        return this.getClient().getProtocolEra();
    }


    async close(): Promise<void> {
        if (this.transport) {
            await this.transport.terminateSession();
        }

        if (this.client) {
            await this.client.close();
        }

        this.transport = null;
        this.client = null;
    }
}

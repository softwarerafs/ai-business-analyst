# AGENTS.md

## Project Overview

AI Business Analyst is a portfolio project that demonstrates
AI Integration Engineering using MCP, LLM tool calling,
Google Sheets, automation, and Cloudflare Workers.

## Architecture

The project is organized as a monorepo:

- `apps/web` — AI Business Analyst interface and MCP client
- `services/google-sheets-mcp` — MCP server running on Cloudflare Workers
- `docs` — architecture diagrams and technical documentation

## Tech Stack

- TypeScript
- Model Context Protocol (MCP)
- Cloudflare Workers
- Google Sheets API
- Gemini / OpenAI
- Zod
- GitHub Actions

Future integrations may include:

- n8n
- Make
- Zapier
- RAG
- LangGraph

## Development Guidelines

- Use TypeScript.
- Prefer small, modular functions.
- Keep MCP tools separated from external API services.
- Validate tool inputs with schemas.
- Use structured responses whenever possible.
- Do not expose secrets or API keys.
- Keep LLM provider logic separate from MCP server logic.
- Add tests for new MCP tools and integrations.
- Handle external API failures explicitly.

## MCP Architecture

MCP tools should follow this structure:

MCP Tool
→ Service Layer
→ External API

Example:

get_sheet_data
→ GoogleSheetsService
→ Google Sheets API

MCP tools should not contain Google API implementation details.

## Security

Never commit:

- API keys
- OAuth tokens
- service account credentials
- MCP authentication tokens
- `.env` files containing secrets

Use Cloudflare secrets for production credentials.

## Testing

Before completing changes:

1. Run TypeScript type checking.
2. Run automated tests.
3. Verify MCP tool schemas.
4. Test error handling.
5. Ensure no secrets are committed.

## Git Guidelines

Use clear conventional commits when possible:

- `feat:` new functionality
- `fix:` bug fixes
- `test:` tests
- `docs:` documentation
- `refactor:` internal improvements
- `chore:` tooling/configuration

Keep commits small and focused.

## Documentation

When adding an important feature:

- update README.md
- document configuration changes
- add examples when useful
- update architecture diagrams if the architecture changes

## Project Goal

Prioritize features that demonstrate practical skills in:

- AI Integration Engineering
- MCP
- API integrations
- automation
- authentication and authorization
- reliability
- observability
- testing
- CI/CD

Avoid unnecessary complexity that does not contribute to these goals.
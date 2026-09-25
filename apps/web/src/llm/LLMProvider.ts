export interface BusinessAnalysisRequest {
    question: string;
    spreadsheetId: string;
    range: string;
}
export interface LLMProvider {
    analyze(
        request: BusinessAnalysisRequest,
    ): Promise<string>;
}
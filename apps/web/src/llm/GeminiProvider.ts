import { GoogleGenAI } from "@google/genai";

export class GeminiProvider {
    private readonly ai: GoogleGenAI;

    constructor(apiKey: string) {
        this.ai = new GoogleGenAI({
            apiKey,
        });
    }
    
    async ask(question: string): Promise<string> {
        const interaction =
            await this.ai.interactions.create({
                model: "gemini-3.8-flash",
                input: question,
            });
        return interaction.output_text ?? "";
    }
}
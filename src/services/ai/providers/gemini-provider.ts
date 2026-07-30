import type { AIProvider } from "@/services/ai/gateway";

export const createGeminiProvider = (response = "Mock Gemini response"): AIProvider => ({ generate: async () => response });

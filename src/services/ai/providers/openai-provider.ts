import type { AIProvider } from "@/services/ai/gateway";

export const createOpenAIProvider = (response = "Mock OpenAI response"): AIProvider => ({ generate: async () => response });

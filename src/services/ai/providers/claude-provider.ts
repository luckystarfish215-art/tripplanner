import type { AIProvider } from "@/services/ai/gateway";

export const createClaudeProvider = (response = "Mock Claude response"): AIProvider => ({ generate: async () => response });

import { createInMemoryCache, type AICache } from "@/services/ai/cache";

export interface AIProvider {
  generate(systemPrompt: string, userPrompt: string): Promise<string>;
}

export type AIGatewayOptions = { cache?: AICache; fallbackProviders?: AIProvider[]; maxRetries?: number; primaryProvider: AIProvider; timeoutMs?: number };
export type AIGateway = { generate: (systemPrompt: string, userPrompt: string) => Promise<string> };

const defaultTimeoutMs = 10_000;
const cacheKey = (systemPrompt: string, userPrompt: string): string => `${systemPrompt}\u0000${userPrompt}`;
const withTimeout = async <Value>(operation: Promise<Value>, timeoutMs: number): Promise<Value> => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => { timeoutId = setTimeout(() => reject(new Error("AI provider timed out.")), timeoutMs); });
  try { return await Promise.race([operation, timeout]); } finally { if (timeoutId) clearTimeout(timeoutId); }
};
const generateWithRetry = async (provider: AIProvider, systemPrompt: string, userPrompt: string, retries: number, timeoutMs: number): Promise<string> => {
  let error: unknown;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try { const response = await withTimeout(provider.generate(systemPrompt, userPrompt), timeoutMs); if (response.trim()) return response; throw new Error("AI provider returned an empty response."); } catch (caught) { error = caught; }
  }
  throw error;
};

export const createAIGateway = ({ primaryProvider, fallbackProviders = [], cache = createInMemoryCache(), maxRetries = 0, timeoutMs = defaultTimeoutMs }: AIGatewayOptions): AIGateway => ({
  generate: async (systemPrompt, userPrompt) => {
    const key = cacheKey(systemPrompt, userPrompt);
    const cached = cache.get(key);
    if (cached) return cached;
    let error: unknown;
    for (const provider of [primaryProvider, ...fallbackProviders]) {
      try { const response = await generateWithRetry(provider, systemPrompt, userPrompt, Math.max(0, maxRetries), timeoutMs); cache.set(key, response); return response; } catch (caught) { error = caught; }
    }
    throw error instanceof Error ? error : new Error("No AI provider produced a response.");
  },
});

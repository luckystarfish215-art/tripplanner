import assert from "node:assert/strict";
import test from "node:test";
import { createAIGateway, createInMemoryCache } from "../src/services/ai";
import type { AIProvider } from "../src/services/ai";

test("caches successful provider responses", async () => {
  let calls = 0;
  const provider: AIProvider = { generate: async () => { calls += 1; return "primary"; } };
  const gateway = createAIGateway({ primaryProvider: provider, cache: createInMemoryCache() });
  assert.equal(await gateway.generate("system", "user"), "primary");
  assert.equal(await gateway.generate("system", "user"), "primary");
  assert.equal(calls, 1);
});

test("uses a fallback provider after failure", async () => {
  const failed: AIProvider = { generate: async () => Promise.reject(new Error("unavailable")) };
  const fallback: AIProvider = { generate: async () => "fallback" };
  const gateway = createAIGateway({ primaryProvider: failed, fallbackProviders: [fallback] });
  assert.equal(await gateway.generate("system", "user"), "fallback");
});

test("retries a provider before falling back", async () => {
  let calls = 0;
  const provider: AIProvider = { generate: async () => { calls += 1; return calls === 2 ? "recovered" : Promise.reject(new Error("retry")); } };
  const gateway = createAIGateway({ primaryProvider: provider, maxRetries: 1 });
  assert.equal(await gateway.generate("system", "user"), "recovered");
  assert.equal(calls, 2);
});

test("falls back after a timed-out provider", async () => {
  const delayed: AIProvider = { generate: async () => new Promise((resolve) => setTimeout(() => resolve("late"), 20)) };
  const fallback: AIProvider = { generate: async () => "timely" };
  const gateway = createAIGateway({ primaryProvider: delayed, fallbackProviders: [fallback], timeoutMs: 1 });
  assert.equal(await gateway.generate("system", "user"), "timely");
});

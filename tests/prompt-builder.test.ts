import assert from "node:assert/strict";
import test from "node:test";
import { buildPrompt } from "../src/services/prompt-builder";
import type { PromptInput } from "../src/types/prompt";

const input: PromptInput = {
  destination: { cityId: "kyoto", countryCode: "JP" }, tripDates: { startDate: "2026-04-10", endDate: "2026-04-13" }, experiences: ["culture", "food"], travelStyleId: "slow", companionId: "couple", budgetId: "daily-250", constraints: [{ id: "food", type: "foodPreferences", value: ["kaiseki"] }], recommendations: { attractions: [{ id: "fushimi", cityId: "kyoto", city: "Kyoto", name: "Fushimi Inari", experienceCategories: ["culture"], tags: ["culture"], score: 90, popularity: 90, priceLevel: 1 }], restaurants: [], hotels: [], dailyPlan: [], confidenceScore: 82 },
};

test("builds stable, contextual prompt output", () => {
  const prompt = buildPrompt(input);
  assert.match(prompt.systemPrompt, /TripsGen/);
  assert.match(prompt.userPrompt, /Kyoto, Japan/);
  assert.match(prompt.userPrompt, /Fushimi Inari/);
  assert.equal(prompt.metadata.recommendationCount, 1);
});

test("sorts constraints for deterministic prompt output", () => {
  const prompt = buildPrompt({ ...input, constraints: [{ id: "z", type: "avoid", value: ["Crowds"] }, { id: "a", type: "mustVisit", value: ["Fushimi Inari"] }] });
  assert.ok(prompt.userPrompt.indexOf("mustVisit") < prompt.userPrompt.indexOf("avoid"));
});

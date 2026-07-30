import assert from "node:assert/strict";
import test from "node:test";
import { createRecommendation } from "../src/engines/recommendation-engine";
import type { RecommendationInput } from "../src/types/recommendation";

const input: RecommendationInput = { destination: { cityId: "kyoto", countryCode: "JP" }, dateRange: { startDate: "2026-04-10", endDate: "2026-04-13" }, experiences: ["culture", "food"], travelStyleId: "slow", companionId: "couple", budgetId: "daily-250", preferences: { foodPreferences: ["kaiseki"], wakeUpTime: "08:00" }, constraints: [{ id: "food", type: "foodPreferences", value: ["kaiseki"] }] };

test("creates a deterministic recommendation with a daily plan", () => {
  const recommendation = createRecommendation(input);
  assert.equal(recommendation.attractions[0]?.name, "Fushimi Inari");
  assert.equal(recommendation.dailyPlan.length, 3);
  assert.ok(recommendation.confidenceScore >= 0 && recommendation.confidenceScore <= 100);
});

test("excludes avoided recommendations", () => {
  const recommendation = createRecommendation({ ...input, preferences: { avoid: ["Fushimi Inari"] } });
  assert.equal(recommendation.attractions.length, 0);
});

test("recommends expanded experience categories", () => {
  const recommendation = createRecommendation({ ...input, destination: { cityId: "tokyo", countryCode: "JP" }, experiences: ["anime"], travelStyleId: "adventure", companionId: "friends" });
  assert.equal(recommendation.attractions[0]?.name, "Akihabara");
});

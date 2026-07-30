import assert from "node:assert/strict";
import test from "node:test";
import { calculateRecommendationScore, createRecommendation, rankRecommendations } from "../src/engines/recommendation-engine";
import type { Attraction, RecommendationInput } from "../src/types/recommendation";

const baseInput: RecommendationInput = { destination: { cityId: "kyoto", countryCode: "JP" }, dateRange: { startDate: "2026-04-10", endDate: "2026-04-13" }, experiences: ["culture", "photography"], travelStyleId: "slow", companionId: "solo", budgetId: "daily-250", preferences: {}, constraints: [] };
const highMatch: Attraction = { id: "high", cityId: "kyoto", city: "Kyoto", name: "High match", experienceCategories: ["culture"], tags: ["culture", "slow"], score: 0, popularity: 90, priceLevel: 1 };
const lowMatch: Attraction = { id: "low", cityId: "kyoto", city: "Kyoto", name: "Low match", experienceCategories: ["nature"], tags: ["nature"], score: 0, popularity: 80, priceLevel: 4 };

test("ranks better matching items first", () => {
  const ranked = rankRecommendations([lowMatch, highMatch], baseInput, 250);
  assert.equal(ranked[0].id, highMatch.id);
  assert.ok(calculateRecommendationScore(highMatch, baseInput.experiences, 250, baseInput.travelStyleId) > calculateRecommendationScore(lowMatch, baseInput.experiences, 250, baseInput.travelStyleId));
});

test("does not repeat a place in a daily plan", () => {
  const recommendation = createRecommendation(baseInput);
  const items = recommendation.dailyPlan.flatMap((plan) => plan.items);
  assert.equal(new Set(items).size, items.length);
});

test("distributes available attractions across trip days", () => {
  const recommendation = createRecommendation({ ...baseInput, companionId: "friends" });
  const attractionNames = new Set(recommendation.attractions.map((item) => item.name));
  const dayAttractions = recommendation.dailyPlan.map((plan) => plan.items.filter((item) => attractionNames.has(item)));
  assert.deepEqual(dayAttractions.map((items) => items.length), [2, 1, 1]);
});

test("filters recommendations above the selected budget", () => {
  const recommendation = createRecommendation({ ...baseInput, budgetId: "daily-50" });
  assert.ok([...recommendation.attractions, ...recommendation.restaurants, ...recommendation.hotels].every((item) => item.priceLevel <= 1));
});

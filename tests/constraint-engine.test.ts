import assert from "node:assert/strict";
import test from "node:test";
import { mergeConstraint, rankConstraint, scoreConstraint, validateConstraint } from "../src/engines/constraint-engine";
import type { Constraint } from "../src/types/constraint";

const mustVisit: Constraint = { id: "must-visit", type: "mustVisit", value: ["Fushimi Inari"] };
const dailyBudget: Constraint = { id: "daily-budget", type: "dailyBudget", value: 250 };

test("validates supported constraint values", () => {
  assert.equal(validateConstraint(mustVisit).isValid, true);
  assert.equal(validateConstraint({ id: "wake", type: "wakeUpTime", value: "27:00" }).isValid, false);
});

test("scores itinerary and budget constraints", () => {
  assert.equal(scoreConstraint(mustVisit, { itineraryItems: ["Fushimi Inari"] }).score, 100);
  assert.equal(scoreConstraint(dailyBudget, { dailyBudget: 500 }).score, 50);
});

test("merges matching list constraints without duplicates", () => {
  const merged = mergeConstraint(mustVisit, { ...mustVisit, value: ["Fushimi Inari", "Nishiki Market"] });
  assert.deepEqual(merged.value, ["Fushimi Inari", "Nishiki Market"]);
});

test("ranks the strongest match first", () => {
  const ranked = rankConstraint([dailyBudget, mustVisit], { dailyBudget: 500, itineraryItems: ["Fushimi Inari"] });
  assert.equal(ranked[0].constraint.id, mustVisit.id);
});

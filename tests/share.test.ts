import assert from "node:assert/strict";
import test from "node:test";
import { decodeTrip, deserializeTrip, encodeTrip, generateShareId, serializeTrip } from "../src/lib/share";
import type { Trip } from "../src/types/trip";

const trip: Trip = { id: "kyoto-spring", destination: { cityId: "kyoto", countryCode: "JP" }, startDate: "2026-04-10", endDate: "2026-04-13", experienceCategories: ["culture", "food"], travelStyleId: "slow", companionId: "couple", budgetId: "daily-250" };

test("generates URL-safe share ids", () => {
  assert.match(generateShareId(), /^[A-Za-z0-9_-]+$/);
});

test("serializes and deserializes a trip", () => {
  assert.deepEqual(deserializeTrip(serializeTrip(trip)), trip);
});

test("encodes and decodes a portable trip", async () => {
  assert.deepEqual(await decodeTrip(await encodeTrip(trip)), trip);
});

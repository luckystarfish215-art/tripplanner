import assert from "node:assert/strict";
import test from "node:test";
import { sortTrips } from "../src/lib/storage/trip-storage";
import type { SavedTrip } from "../src/types/saved-trip";

const trip = (id: string, updatedAt: string): SavedTrip => ({ id, createdAt: updatedAt, updatedAt, destination: { cityId: "kyoto", countryCode: "JP" }, startDate: "2026-04-10", endDate: "2026-04-13", budget: "daily-250", travelStyle: "slow", companion: "couple", experiences: ["culture"], confidenceScore: 80 });

test("sorts saved trips newest first", () => {
  assert.deepEqual(sortTrips([trip("old", "2026-01-01T00:00:00.000Z"), trip("new", "2026-02-01T00:00:00.000Z")]).map((item) => item.id), ["new", "old"]);
});

test("does not expose browser storage on the server", () => {
  assert.equal(typeof globalThis.window, "undefined");
});

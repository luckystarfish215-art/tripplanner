import assert from "node:assert/strict";
import test from "node:test";
import { getPdfFileName, getTripPdfSections } from "../src/lib/pdf/export-trip-pdf";
import type { GeneratedTrip } from "../src/app/trip/actions";

const trip: GeneratedTrip = { cityName: "Kyoto", countryName: "Japan", dates: { startDate: "2026-04-10", endDate: "2026-04-13" }, travelStyle: "Slow & local", shareId: "abc123", shareTrip: { id: "abc123", destination: { cityId: "kyoto", countryCode: "JP" }, startDate: "2026-04-10", endDate: "2026-04-13", experienceCategories: ["culture"], travelStyleId: "slow", companionId: "couple", budgetId: "daily-250" }, recommendation: { confidenceScore: 88, attractions: [{ id: "fushimi", cityId: "kyoto", city: "Kyoto", name: "Fushimi Inari", experienceCategories: ["culture"], tags: ["culture"], popularity: 90, priceLevel: 1, score: 90 }], restaurants: [], hotels: [], dailyPlan: [{ day: 1, date: "2026-04-10", travelStyle: "slow", items: ["Fushimi Inari"] }] } };

test("creates a stable PDF filename", () => {
  assert.equal(getPdfFileName(trip), "tripsgen-abc123.pdf");
});

test("includes every printable itinerary section", () => {
  assert.deepEqual(getTripPdfSections(trip).map((section) => section.title), ["Attractions", "Restaurants", "Hotels", "Daily timeline"]);
});

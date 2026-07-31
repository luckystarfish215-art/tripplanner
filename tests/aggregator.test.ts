import assert from "node:assert/strict";
import test from "node:test";
import { aggregateAnalytics } from "../src/lib/analytics/aggregator";
import type { AnalyticsEvent } from "../src/types/event";

const event = (name: AnalyticsEvent["name"]): AnalyticsEvent => ({ id: name, name, anonymousId: "anonymous", occurredAt: "2026-01-01T00:00:00.000Z", properties: {} });

test("aggregates event totals by name", () => {
  const summary = aggregateAnalytics([event("trip_generated"), event("trip_generated"), event("pdf_exported")]);
  assert.equal(summary.generatedTrips, 2);
  assert.equal(summary.exportedPdfs, 1);
  assert.equal(summary.totalEvents, 3);
});

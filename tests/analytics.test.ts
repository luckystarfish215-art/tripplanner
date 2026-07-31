import assert from "node:assert/strict";
import test from "node:test";
import { createAnalytics } from "../src/lib/analytics/analytics";
import type { AnalyticsEvent } from "../src/types/event";

test("tracks typed events through an injected repository", () => {
  const events: AnalyticsEvent[] = [];
  const analytics = createAnalytics({ load: () => events, save: (event) => events.push(event), clear: () => { events.splice(0); } }, () => "anonymous");
  assert.equal(analytics.track("trip_generated", { destination: "kyoto" })?.name, "trip_generated");
  assert.equal(events.length, 1);
});

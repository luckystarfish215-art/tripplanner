import { analyticsEventNames } from "@/lib/analytics/constants";
import type { AnalyticsSummary } from "@/types/analytics";
import type { AnalyticsEvent } from "@/types/event";

export const aggregateAnalytics = (events: AnalyticsEvent[]): AnalyticsSummary => {
  const eventCounts = Object.fromEntries(analyticsEventNames.map((name) => [name, 0])) as AnalyticsSummary["eventCounts"];
  events.forEach((event) => { eventCounts[event.name] += 1; });
  return { eventCounts, totalEvents: events.length, generatedTrips: eventCounts.trip_generated, savedTrips: eventCounts.trip_saved, sharedTrips: eventCounts.trip_shared, exportedPdfs: eventCounts.pdf_exported };
};

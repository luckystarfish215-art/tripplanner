import type { AnalyticsEvent, AnalyticsEventName } from "@/types/event";

export type AnalyticsSummary = { eventCounts: Record<AnalyticsEventName, number>; generatedTrips: number; sharedTrips: number; exportedPdfs: number; savedTrips: number; totalEvents: number };
export type AnalyticsRepository = { load: () => AnalyticsEvent[]; save: (event: AnalyticsEvent) => void; clear: () => void };

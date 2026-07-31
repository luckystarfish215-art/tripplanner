export type AnalyticsEventName = "pdf_exported" | "trip_generated" | "trip_shared" | "trip_saved";
export type AnalyticsEvent = { id: string; name: AnalyticsEventName; occurredAt: string; properties: Record<string, string | number | boolean>; anonymousId: string };

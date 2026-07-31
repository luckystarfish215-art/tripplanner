import { analytics } from "@/lib/analytics/analytics";

export const trackTripGenerated = (destination: string): void => { analytics.track("trip_generated", { destination }); };
export const trackTripSaved = (destination: string): void => { analytics.track("trip_saved", { destination }); };
export const trackTripShared = (): void => { analytics.track("trip_shared"); };
export const trackPdfExported = (): void => { analytics.track("pdf_exported"); };

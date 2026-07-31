import { getAnonymousId } from "@/lib/analytics/anonymous-id";
import { localAnalyticsStorage } from "@/lib/analytics/storage";
import type { AnalyticsRepository } from "@/types/analytics";
import type { AnalyticsEvent, AnalyticsEventName } from "@/types/event";

export const createAnalytics = (repository: AnalyticsRepository = localAnalyticsStorage, anonymousIdSource: () => string | undefined = getAnonymousId) => ({
  track: (name: AnalyticsEventName, properties: AnalyticsEvent["properties"] = {}): AnalyticsEvent | undefined => {
    const anonymousId = anonymousIdSource();
    if (!anonymousId) return undefined;
    const event = { id: crypto.randomUUID(), name, properties, anonymousId, occurredAt: new Date().toISOString() };
    repository.save(event);
    return event;
  },
});

export const analytics = createAnalytics();

import { analyticsStorageKey } from "@/lib/analytics/constants";
import type { AnalyticsRepository } from "@/types/analytics";
import type { AnalyticsEvent } from "@/types/event";

const getStorage = (): Storage | undefined => typeof window === "undefined" ? undefined : window.localStorage;
const parseEvents = (value: string | null): AnalyticsEvent[] => { try { const events = JSON.parse(value ?? "[]") as AnalyticsEvent[]; return Array.isArray(events) ? events : []; } catch { return []; } };

export const loadAnalyticsEvents = (): AnalyticsEvent[] => parseEvents(getStorage()?.getItem(analyticsStorageKey) ?? null);
export const saveAnalyticsEvent = (event: AnalyticsEvent): void => { const storage = getStorage(); if (storage) storage.setItem(analyticsStorageKey, JSON.stringify([...loadAnalyticsEvents(), event])); };
export const clearAnalyticsEvents = (): void => getStorage()?.removeItem(analyticsStorageKey);
export const localAnalyticsStorage: AnalyticsRepository = { load: loadAnalyticsEvents, save: saveAnalyticsEvent, clear: clearAnalyticsEvents };

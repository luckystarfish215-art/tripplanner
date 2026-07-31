import { anonymousIdStorageKey } from "@/lib/analytics/constants";

const getStorage = (): Storage | undefined => typeof window === "undefined" ? undefined : window.localStorage;

export const getAnonymousId = (): string | undefined => {
  const storage = getStorage();
  if (!storage) return undefined;
  const existing = storage.getItem(anonymousIdStorageKey);
  if (existing) return existing;
  const id = crypto.randomUUID();
  storage.setItem(anonymousIdStorageKey, id);
  return id;
};

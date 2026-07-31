import type { SaveTripInput, SavedTrip, TripStorageRepository } from "@/types/saved-trip";

const storageKey = "tripsgen:saved-trips";
const getStorage = (): Storage | undefined => typeof window === "undefined" ? undefined : window.localStorage;
const parseTrips = (value: string | null): SavedTrip[] => { try { const trips = JSON.parse(value ?? "[]") as SavedTrip[]; return Array.isArray(trips) ? trips : []; } catch { return []; } };
const writeTrips = (trips: SavedTrip[]): void => { getStorage()?.setItem(storageKey, JSON.stringify(trips)); };

export const sortTrips = (trips: SavedTrip[]): SavedTrip[] => [...trips].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
export const loadTrips = (): SavedTrip[] => sortTrips(parseTrips(getStorage()?.getItem(storageKey) ?? null));
export const loadTrip = (id: string): SavedTrip | undefined => loadTrips().find((trip) => trip.id === id);
export const saveTrip = (trip: SaveTripInput): SavedTrip | undefined => {
  const now = new Date().toISOString();
  const existing = loadTrip(trip.id);
  const saved: SavedTrip = { ...trip, createdAt: existing?.createdAt ?? now, updatedAt: now };
  writeTrips(sortTrips([saved, ...loadTrips().filter((item) => item.id !== trip.id)]));
  return getStorage() ? saved : undefined;
};
export const deleteTrip = (id: string): void => writeTrips(loadTrips().filter((trip) => trip.id !== id));
export const clearTrips = (): void => getStorage()?.removeItem(storageKey);

export const localTripStorage: TripStorageRepository = { saveTrip: async (trip) => { const saved = saveTrip(trip); if (!saved) throw new Error("Local storage is unavailable."); return saved; }, loadTrip: async (id) => loadTrip(id), loadTrips: async () => loadTrips(), deleteTrip: async (id) => deleteTrip(id), clearTrips: async () => clearTrips() };

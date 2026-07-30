import type { Trip } from "@/types/trip";

export type ShareRepository = { load: (id: string) => Promise<Trip | undefined>; save: (id: string, trip: Trip) => Promise<void> };
export type ShareRecord = { id: string; trip: Trip; version: number };
export type ShareResult = { id: string; url: string };

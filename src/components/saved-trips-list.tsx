"use client";

import { useEffect, useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { SavedTripCard } from "@/components/saved-trip-card";
import { cities } from "@/data/cities";
import { clearTrips, deleteTrip, loadTrips } from "@/lib/storage/trip-storage";
import type { SavedTrip } from "@/types/saved-trip";

const loadingCards = ["first", "second", "third"];

export function SavedTripsList() {
  const [trips, setTrips] = useState<SavedTrip[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const timeout = window.setTimeout(() => { setTrips(loadTrips()); setLoaded(true); }, 0); return () => window.clearTimeout(timeout); }, []);
  const removeTrip = (id: string): void => { deleteTrip(id); setTrips(loadTrips()); };
  const removeAll = (): void => { clearTrips(); setTrips([]); };
  if (!loaded) return <div aria-busy="true" aria-live="polite" className="grid gap-4"><span className="sr-only">Loading saved trips</span>{loadingCards.map((card) => <div className="h-52 animate-pulse rounded-2xl border border-white/10 bg-white/[.04]" key={card} />)}</div>;
  if (!trips.length) return <EmptyState actionHref="/trip" actionLabel="Plan a trip" description="Saved trips will appear here after you create an itinerary." title="No saved trips yet." />;
  return <div><div className="mb-4 flex items-center justify-between gap-4"><p className="text-sm text-white/55">{trips.length} saved trips</p><button className="min-h-11 rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10" onClick={removeAll} type="button">Clear all</button></div><div className="grid gap-4">{trips.map((trip) => <SavedTripCard destinationName={cities.find((city) => city.id === trip.destination.cityId)?.name ?? trip.destination.cityId} key={trip.id} onDelete={removeTrip} trip={trip} />)}</div></div>;
}

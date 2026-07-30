"use client";

import { useEffect, useState } from "react";
import { loadSharedTrip } from "@/lib/share";
import type { Trip } from "@/types/trip";

export function SharedTripView({ shareId }: { shareId: string }) {
  const [trip, setTrip] = useState<Trip>();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { loadSharedTrip(shareId).then((value) => { setTrip(value); setLoaded(true); }); }, [shareId]);
  if (!loaded) return <p className="text-sm text-white/55">Loading shared trip…</p>;
  if (!trip) return <p className="rounded-2xl border border-white/10 bg-white/[.04] p-5 text-sm text-white/60">This shared trip is unavailable in this browser.</p>;
  return <section className="rounded-3xl border border-white/10 bg-white/[.05] p-6"><p className="text-xs font-bold uppercase tracking-[.16em] text-pink-200">Shared TripsGen plan</p><h1 className="mt-3 text-3xl font-medium text-white">{trip.destination.cityId}</h1><p className="mt-2 text-sm text-white/60">{trip.startDate} — {trip.endDate}</p><dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2"><div><dt className="text-white/45">Travel style</dt><dd className="mt-1 text-white">{trip.travelStyleId}</dd></div><div><dt className="text-white/45">Companion</dt><dd className="mt-1 text-white">{trip.companionId}</dd></div><div><dt className="text-white/45">Budget</dt><dd className="mt-1 text-white">{trip.budgetId}</dd></div><div><dt className="text-white/45">Experiences</dt><dd className="mt-1 text-white">{trip.experienceCategories.join(", ")}</dd></div></dl></section>;
}

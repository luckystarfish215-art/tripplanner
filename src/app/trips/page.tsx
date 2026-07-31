import { SavedTripsList } from "@/components/saved-trips-list";

export default function TripsPage() {
  return <main className="min-h-screen px-4 py-8 sm:px-6 sm:py-12"><div className="mx-auto max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-pink-200">TripsGen library</p><h1 className="mt-3 text-4xl font-medium tracking-tight text-white sm:text-5xl">Saved trips</h1><p className="mt-3 max-w-lg text-sm leading-6 text-white/55">Your locally saved plans, ready whenever you want to revisit them.</p><div className="mt-8"><SavedTripsList /></div></div></main>;
}

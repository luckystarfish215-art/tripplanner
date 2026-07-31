"use client";

import { useEffect, useState } from "react";
import { aggregateAnalytics } from "@/lib/analytics/aggregator";
import { loadAnalyticsEvents } from "@/lib/analytics/storage";
import type { AnalyticsSummary } from "@/types/analytics";

export default function AnalyticsPage() {
  const [summary, setSummary] = useState<AnalyticsSummary>();
  useEffect(() => { const timeout = window.setTimeout(() => setSummary(aggregateAnalytics(loadAnalyticsEvents())), 0); return () => window.clearTimeout(timeout); }, []);
  if (!summary) return <main aria-busy="true" className="min-h-screen px-4 py-8 sm:px-6"><div className="mx-auto h-52 max-w-3xl animate-pulse rounded-3xl bg-white/5" /></main>;
  return <main className="min-h-screen px-4 py-8 sm:px-6"><div className="mx-auto max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.16em] text-pink-200">TripsGen insights</p><h1 className="mt-3 text-4xl font-medium tracking-tight text-white">Analytics</h1><div className="mt-8 grid gap-4 sm:grid-cols-2"><Metric label="Trips generated" value={summary.generatedTrips} /><Metric label="Trips saved" value={summary.savedTrips} /><Metric label="Trips shared" value={summary.sharedTrips} /><Metric label="PDF exports" value={summary.exportedPdfs} /></div></div></main>;
}

function Metric({ label, value }: { label: string; value: number }) { return <section className="rounded-2xl border border-white/10 bg-white/[.045] p-5"><p className="text-sm text-white/55">{label}</p><p className="mt-3 text-4xl font-medium tracking-tight text-white">{value}</p></section>; }

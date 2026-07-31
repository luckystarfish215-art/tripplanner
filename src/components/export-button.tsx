"use client";

import { useState } from "react";
import { exportTripPdf } from "@/lib/pdf/export-trip-pdf";
import type { GeneratedTrip } from "@/app/trip/actions";

type ExportButtonProps = { labels: { error: string; exporting: string; ready: string; success: string }; trip: GeneratedTrip };

export function ExportButton({ labels, trip }: ExportButtonProps) {
  const [message, setMessage] = useState<string>();
  const [isError, setIsError] = useState(false);
  const [exporting, setExporting] = useState(false);
  const exportPdf = async (): Promise<void> => { setExporting(true); setMessage(undefined); try { await exportTripPdf(trip); setIsError(false); setMessage(labels.success); } catch { setIsError(true); setMessage(labels.error); } finally { setExporting(false); } };
  return <div><button aria-busy={exporting} className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[.06] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto" disabled={exporting} onClick={exportPdf} type="button"><span aria-hidden="true">↓</span>{exporting ? labels.exporting : labels.ready}</button>{message ? <p aria-live="polite" className={`mt-2 text-sm ${isError ? "text-red-200" : "text-emerald-200"}`} role={isError ? "alert" : "status"}>{message}</p> : null}</div>;
}

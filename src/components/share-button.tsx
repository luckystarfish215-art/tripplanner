"use client";

import { useState } from "react";
import { buildShareUrl, saveTripLocally } from "@/lib/share";
import type { Trip } from "@/types/trip";

type ShareButtonProps = { labels: { copied: string; error: string; share: string }; shareId: string; trip: Trip };

export function ShareButton({ labels, shareId, trip }: ShareButtonProps) {
  const [message, setMessage] = useState<string>();
  const [isError, setIsError] = useState(false);
  const shareTrip = async (): Promise<void> => {
    const url = buildShareUrl(window.location.origin, shareId);
    saveTripLocally(shareId, trip);
    try {
      if (!navigator.clipboard) throw new Error("Clipboard is unavailable.");
      await navigator.clipboard.writeText(url);
      setIsError(false);
      setMessage(labels.copied);
    } catch {
      setIsError(true);
      setMessage(labels.error);
    }
  };
  return <div className="relative"><button className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[.06] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto" onClick={shareTrip} type="button"><span aria-hidden="true">↗</span>{labels.share}</button>{message ? <p aria-live="polite" className={`mt-2 text-sm ${isError ? "text-red-200" : "text-emerald-200"}`} role={isError ? "alert" : "status"}>{message}</p> : null}</div>;
}

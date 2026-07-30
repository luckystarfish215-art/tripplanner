"use client";

import { useFormStatus } from "react-dom";

export function LoadingScreen({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return pending ? <div aria-live="polite" className="mt-4 flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70"><span className="size-2 animate-pulse rounded-full bg-pink-300" />{label}</div> : null;
}

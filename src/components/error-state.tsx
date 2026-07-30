"use client";

import { useEffect } from "react";

type ErrorStateProps = { error: Error & { digest?: string }; retry: () => void };

export function ErrorState({ error, retry }: ErrorStateProps) {
  useEffect(() => { console.error(error); }, [error]);
  return <main className="flex min-h-screen items-center px-4 py-8 sm:px-6"><section aria-labelledby="error-state-title" className="mx-auto w-full max-w-md rounded-3xl border border-red-200/15 bg-red-400/[.07] p-6 text-center shadow-2xl shadow-black/20 sm:p-8"><span aria-hidden="true" className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-red-300/15 text-2xl text-red-100">!</span><h1 className="mt-5 text-2xl font-medium tracking-tight text-white" id="error-state-title">We couldn’t load this trip.</h1><p className="mt-3 text-sm leading-6 text-white/60">Please retry. If this keeps happening, return to your trip planner and try again later.</p>{error.digest ? <p className="mt-3 text-xs text-white/35">Reference: {error.digest}</p> : null}<button className="mt-6 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-red-100" onClick={retry} type="button">Try again</button></section></main>;
}

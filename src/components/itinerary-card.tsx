import type { DailyPlan } from "@/types/recommendation";

export function ItineraryCard({ plans, title }: { plans: DailyPlan[]; title: string }) {
  return <section className="rounded-2xl border border-white/10 bg-black/20 p-5"><h2 className="text-lg font-medium text-white">{title}</h2><ol className="mt-4 space-y-3">{plans.map((plan) => <li className="flex gap-3" key={plan.day}><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-pink-200">{plan.day}</span><div><p className="text-sm text-white/55">{plan.date}</p><p className="mt-1 text-sm text-white">{plan.items.join(" · ")}</p></div></li>)}</ol></section>;
}

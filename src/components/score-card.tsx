export function ScoreCard({ label, score }: { label: string; score: number }) {
  return <section className="rounded-2xl border border-pink-200/20 bg-gradient-to-br from-pink-400/20 to-orange-300/10 p-5"><p className="text-xs font-bold uppercase tracking-[.16em] text-pink-200">{label}</p><div className="mt-3 flex items-end gap-2"><strong className="text-5xl font-medium tracking-tighter text-white">{score}</strong><span className="mb-1 text-sm text-white/50">/ 100</span></div></section>;
}

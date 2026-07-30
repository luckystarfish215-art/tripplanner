type EmptyStateProps = { actionHref?: string; actionLabel?: string; description: string; title: string };

export function EmptyState({ actionHref, actionLabel, description, title }: EmptyStateProps) {
  return <section aria-labelledby="empty-state-title" className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/[.045] p-6 text-center shadow-2xl shadow-black/20 sm:p-8"><span aria-hidden="true" className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-pink-400/15 text-2xl text-pink-200">✦</span><h1 className="mt-5 text-2xl font-medium tracking-tight text-white" id="empty-state-title">{title}</h1><p className="mt-3 text-sm leading-6 text-white/60">{description}</p>{actionHref && actionLabel ? <a className="mt-6 inline-flex rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-pink-100" href={actionHref}>{actionLabel}</a> : null}</section>;
}

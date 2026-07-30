import { EmptyState } from "@/components/empty-state";

export default function NotFound() {
  return <main className="flex min-h-screen items-center px-4 py-8 sm:px-6"><EmptyState actionHref="/trip" actionLabel="Plan a trip" description="The page you’re looking for has moved, expired, or was never part of this itinerary." title="This destination isn’t here." /></main>;
}

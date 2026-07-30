import { SharedTripView } from "@/components/shared-trip-view";

export default async function SharedTripPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <main className="min-h-screen px-4 py-12 sm:px-6"><div className="mx-auto max-w-2xl"><SharedTripView shareId={id} /></div></main>;
}

import type { GeneratedTrip } from "@/app/trip/actions";

type TripCardProps = { labels: { attractions: string; hotels: string; restaurants: string }; trip: GeneratedTrip };
const itemList = (items: { id: string; name: string }[]): React.ReactNode => <ul className="mt-3 space-y-2 text-sm text-white/65">{items.map((item) => <li key={item.id}>{item.name}</li>)}</ul>;

export function TripCard({ labels, trip }: TripCardProps) {
  return <section className="rounded-2xl border border-white/10 bg-white/[.045] p-5"><p className="text-xs font-bold uppercase tracking-[.16em] text-pink-200">{trip.travelStyle}</p><h1 className="mt-2 text-3xl font-medium tracking-tight text-white">{trip.cityName}, {trip.countryName}</h1><p className="mt-1 text-sm text-white/50">{trip.dates.startDate} — {trip.dates.endDate}</p><div className="mt-6 grid gap-5 sm:grid-cols-3"><div><h2 className="text-sm font-medium text-white">{labels.attractions}</h2>{itemList(trip.recommendation.attractions)}</div><div><h2 className="text-sm font-medium text-white">{labels.restaurants}</h2>{itemList(trip.recommendation.restaurants)}</div><div><h2 className="text-sm font-medium text-white">{labels.hotels}</h2>{itemList(trip.recommendation.hotels)}</div></div></section>;
}

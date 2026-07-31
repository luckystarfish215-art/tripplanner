import { budgets } from "@/data/budgets";
import { cities } from "@/data/cities";
import { companions } from "@/data/companions";
import { experiences } from "@/data/experiences";
import { travelStyles } from "@/data/travel-styles";
import { tripFlowContent } from "@/data/trip-flow";
import { PlannerForm } from "@/components/planner-form";

export default function TripPage() {
  return <main className="min-h-screen px-4 py-6 sm:px-6 sm:py-10"><div className="mx-auto max-w-3xl"><p className="text-center text-xs font-bold uppercase tracking-[.2em] text-pink-200">TripsGen · mock trip studio</p><h1 className="mx-auto mt-4 max-w-xl text-center text-4xl font-medium tracking-tight text-white sm:text-5xl">Make a trip worth remembering.</h1><p className="mx-auto mt-4 max-w-md text-center text-sm leading-6 text-white/55">Choose the shape of your journey and receive a considered, fully local mock itinerary.</p></div><div className="mt-8" id="trip-planner"><PlannerForm budgets={budgets} cities={cities} companions={companions} content={tripFlowContent} experiences={experiences} travelStyles={travelStyles} /></div></main>;
}

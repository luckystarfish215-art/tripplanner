import { SiteHeader } from "@/components/site-header";
import { TripHero } from "@/components/trip-hero";
import { TripPlanner } from "@/components/trip-planner";
import { tripContent } from "@/data/trip-options";

export default function Home() { return <main className="page-shell"><SiteHeader brand={tripContent.brand} navigation={tripContent.navigation} /><TripHero {...tripContent.hero} /><div className="ambient-orb ambient-orb-one" /><div className="ambient-orb ambient-orb-two" /><div id="planner"><TripPlanner content={tripContent} /></div></main>; }

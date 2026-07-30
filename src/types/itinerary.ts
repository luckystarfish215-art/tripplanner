import type { Destination } from "@/types/destination";
import type { ExperienceCategory } from "@/types/experience";

export type ItineraryItem = { day: number; description: string; experience: ExperienceCategory; id: string; title: string };
export type Itinerary = { destination: Destination; items: ItineraryItem[]; totalDays: number };

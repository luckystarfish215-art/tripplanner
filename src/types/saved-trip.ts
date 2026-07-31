import type { BudgetId } from "@/types/budget";
import type { CompanionId } from "@/types/companion";
import type { Destination } from "@/types/destination";
import type { ExperienceCategory } from "@/types/experience";
import type { TravelStyleId } from "@/types/travel-style";

export type SavedTrip = { budget: BudgetId; companion: CompanionId; confidenceScore: number; createdAt: string; destination: Destination; endDate: string; experiences: ExperienceCategory[]; id: string; startDate: string; travelStyle: TravelStyleId; updatedAt: string };
export type SaveTripInput = Omit<SavedTrip, "createdAt" | "updatedAt">;
export type TripStorageRepository = { clearTrips: () => Promise<void>; deleteTrip: (id: string) => Promise<void>; loadTrip: (id: string) => Promise<SavedTrip | undefined>; loadTrips: () => Promise<SavedTrip[]>; saveTrip: (trip: SaveTripInput) => Promise<SavedTrip> };

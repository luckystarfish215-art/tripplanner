import type { BudgetId } from "@/types/budget";
import type { CompanionId } from "@/types/companion";
import type { Constraint } from "@/types/constraint";
import type { Destination } from "@/types/destination";
import type { ExperienceCategory } from "@/types/experience";
import type { Hotel } from "@/types/hotel";
import type { TripPreferences } from "@/types/preference";
import type { Restaurant } from "@/types/restaurant";
import type { TravelStyleId } from "@/types/travel-style";

export type DateRange = { endDate: string; startDate: string };
export type Attraction = { city: string; cityId: string; experienceCategories: ExperienceCategory[]; id: string; name: string; popularity: number; priceLevel: number; score: number; tags: string[] };
export type DailyPlan = { date: string; day: number; items: string[]; travelStyle: TravelStyleId };
export type RecommendationInput = { budgetId: BudgetId; companionId: CompanionId; constraints: Constraint[]; dateRange: DateRange; destination: Destination; experiences: ExperienceCategory[]; preferences: Partial<TripPreferences>; travelStyleId: TravelStyleId };
export type Recommendation = { attractions: Attraction[]; confidenceScore: number; dailyPlan: DailyPlan[]; hotels: Hotel[]; restaurants: Restaurant[] };

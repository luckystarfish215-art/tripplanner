import type { ExperienceCategory } from "@/types/experience";

export type Restaurant = { city: string; cityId: string; cuisines: string[]; experienceCategories: ExperienceCategory[]; id: string; name: string; popularity: number; priceLevel: number; score: number; tags: string[] };

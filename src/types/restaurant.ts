import type { ExperienceCategory } from "@/types/experience";

export type Restaurant = { cityId: string; cuisines: string[]; experienceCategories: ExperienceCategory[]; id: string; name: string; priceLevel: number };

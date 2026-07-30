export type Season = "spring" | "summer" | "autumn" | "winter";

export type Coordinates = { latitude: number; longitude: number };
export type Country = { code: string; id: string; name: string; region: string };
export type Region = { id: string; name: string };
import type { ExperienceCategory } from "@/types/experience";

export type City = {
  averageDailyBudget: number;
  coordinates: Coordinates;
  country: string;
  countryCode: string;
  experiences: ExperienceCategory[];
  foodCategories: string[];
  id: string;
  idealSeasons: Season[];
  name: string;
  photographyScore: number;
  seasons: Season[];
  tags: string[];
  transportationScore: number;
};
export type Destination = { cityId: string; countryCode: string };

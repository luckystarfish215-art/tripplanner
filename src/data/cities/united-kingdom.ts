import type { City } from "@/types/destination";

export const unitedKingdomCities: City[] = [
  { id: "london", name: "London", country: "United Kingdom", countryCode: "GB", coordinates: { latitude: 51.5072, longitude: -0.1276 }, tags: ["museums", "theatre", "neighbourhoods"], seasons: ["spring", "summer"], idealSeasons: ["spring", "summer"], experiences: ["culture", "food", "nightlife", "shopping", "photography"], foodCategories: ["modern british", "international", "afternoon tea"], averageDailyBudget: 350, transportationScore: 96, photographyScore: 90 },
  { id: "edinburgh", name: "Edinburgh", country: "United Kingdom", countryCode: "GB", coordinates: { latitude: 55.9533, longitude: -3.1883 }, tags: ["history", "literature", "landscapes"], seasons: ["summer", "autumn"], idealSeasons: ["summer", "autumn"], experiences: ["culture", "nature", "food", "hiking", "photography"], foodCategories: ["scottish", "seafood", "whisky"], averageDailyBudget: 250, transportationScore: 80, photographyScore: 97 },
];

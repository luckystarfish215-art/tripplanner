import type { City } from "@/types/destination";

export const southKoreaCities: City[] = [
  { id: "seoul", name: "Seoul", country: "South Korea", countryCode: "KR", coordinates: { latitude: 37.5665, longitude: 126.978 }, tags: ["design", "palaces", "cafes"], seasons: ["spring", "autumn"], idealSeasons: ["spring", "autumn"], experiences: ["food", "culture", "nightlife", "shopping", "photography"], foodCategories: ["korean barbecue", "noodles", "market food"], averageDailyBudget: 210, transportationScore: 97, photographyScore: 91 },
  { id: "busan", name: "Busan", country: "South Korea", countryCode: "KR", coordinates: { latitude: 35.1796, longitude: 129.0756 }, tags: ["coast", "markets", "mountains"], seasons: ["spring", "summer"], idealSeasons: ["spring", "summer"], experiences: ["nature", "food", "wellness", "hiking", "photography"], foodCategories: ["seafood", "milmyeon", "market food"], averageDailyBudget: 180, transportationScore: 84, photographyScore: 93 },
];

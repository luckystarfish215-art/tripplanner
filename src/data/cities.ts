import type { City } from "@/types/destination";

export const cities: City[] = [
  { id: "tokyo", name: "Tokyo", countryCode: "JP", coordinates: { latitude: 35.6762, longitude: 139.6503 }, idealSeasons: ["spring", "autumn"] },
  { id: "osaka", name: "Osaka", countryCode: "JP", coordinates: { latitude: 34.6937, longitude: 135.5023 }, idealSeasons: ["spring", "autumn"] },
  { id: "kyoto", name: "Kyoto", countryCode: "JP", coordinates: { latitude: 35.0116, longitude: 135.7681 }, idealSeasons: ["spring", "autumn"] },
  { id: "seoul", name: "Seoul", countryCode: "KR", coordinates: { latitude: 37.5665, longitude: 126.978 }, idealSeasons: ["spring", "autumn"] },
  { id: "busan", name: "Busan", countryCode: "KR", coordinates: { latitude: 35.1796, longitude: 129.0756 }, idealSeasons: ["spring", "summer"] },
  { id: "london", name: "London", countryCode: "GB", coordinates: { latitude: 51.5072, longitude: -0.1276 }, idealSeasons: ["spring", "summer"] },
  { id: "edinburgh", name: "Edinburgh", countryCode: "GB", coordinates: { latitude: 55.9533, longitude: -3.1883 }, idealSeasons: ["summer", "autumn"] },
];

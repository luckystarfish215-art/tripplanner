export type Season = "spring" | "summer" | "autumn" | "winter";

export type Coordinates = { latitude: number; longitude: number };
export type Country = { code: string; id: string; name: string; region: string };
export type City = { countryCode: string; coordinates: Coordinates; id: string; idealSeasons: Season[]; name: string };
export type Destination = { cityId: string; countryCode: string };

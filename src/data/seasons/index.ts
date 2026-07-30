import type { Season } from "@/types/destination";

export type SeasonProfile = { description: string; id: Season; label: string };

export const seasons: SeasonProfile[] = [
  { id: "spring", label: "Spring", description: "Milder weather and seasonal colour" },
  { id: "summer", label: "Summer", description: "Longer days and outdoor energy" },
  { id: "autumn", label: "Autumn", description: "Cooler air and changing landscapes" },
  { id: "winter", label: "Winter", description: "Quiet streets and festive atmosphere" },
];

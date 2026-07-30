export type FoodPreference = string;

export type TripPreferences = {
  avoid: string[];
  dailyBudget: number;
  foodPreferences: FoodPreference[];
  lockedItems: string[];
  maximumDistance: number;
  mustVisit: string[];
  niceToHave: string[];
  wakeUpTime: string;
};

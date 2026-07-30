export type IconName = "arrow" | "calendar" | "chevron" | "compass" | "globe" | "minus" | "plus" | "sparkle" | "users";

export type Choice = { description: string; icon: IconName; id: string; label: string };
export type Traveller = { description: string; id: string; label: string };

export type TripContent = {
  brand: string;
  budget: { choices: Choice[]; eyebrow: string; title: string };
  dates: { departure: string; eyebrow: string; return: string; title: string };
  destination: { eyebrow: string; helper: string; placeholder: string; title: string };
  experiences: { choices: Choice[]; eyebrow: string; title: string };
  generate: string;
  hero: { eyebrow: string; subtitle: string; title: string };
  navigation: string[];
  style: { choices: Choice[]; eyebrow: string; title: string };
  travellers: { eyebrow: string; peopleLabel: string; title: string; types: Traveller[] };
};

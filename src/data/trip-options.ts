import type { TripContent } from "@/types/trip";

export const tripContent: TripContent = {
  brand: "TripsGen", navigation: ["How it works", "Inspiration"],
  hero: { eyebrow: "Your next favourite story", title: "Travel, made remarkably personal.", subtitle: "Tell us what you’re looking for. We’ll turn it into a journey that feels entirely your own." },
  destination: { eyebrow: "01 — Destination", title: "Where would you like to go?", placeholder: "Search a city, country, or region", helper: "Anywhere in the world" },
  dates: { eyebrow: "02 — Travel dates", title: "When should we save the dates?", departure: "May 14, 2026", return: "May 21, 2026" },
  experiences: { eyebrow: "03 — Experiences", title: "What makes a good day away?", choices: [
    { id: "food", label: "Food & wine", description: "Taste your way around", icon: "sparkle" }, { id: "culture", label: "Art & culture", description: "See the essential", icon: "globe" }, { id: "nature", label: "Nature", description: "Find open horizons", icon: "compass" },
  ] },
  style: { eyebrow: "04 — Travel style", title: "How do you like to move?", choices: [
    { id: "slow", label: "Slow & local", description: "Room to wander", icon: "compass" }, { id: "balanced", label: "A little of everything", description: "A considered rhythm", icon: "sparkle" }, { id: "spontaneous", label: "Spontaneous", description: "Follow the feeling", icon: "arrow" },
  ] },
  travellers: { eyebrow: "05 — Travellers", title: "Who is coming along?", peopleLabel: "travellers", types: [{ id: "adults", label: "Adults", description: "Ages 13 or above" }, { id: "children", label: "Children", description: "Ages 2–12" }] },
  budget: { eyebrow: "06 — Budget", title: "What feels comfortable?", choices: [
    { id: "easy", label: "Easygoing", description: "Thoughtful value", icon: "sparkle" }, { id: "considered", label: "Considered", description: "Special stays & meals", icon: "globe" }, { id: "exceptional", label: "Exceptional", description: "The remarkable option", icon: "sparkle" },
  ] },
  generate: "Create my trip",
};

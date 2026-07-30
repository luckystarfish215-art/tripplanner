"use server";

import { budgets } from "@/data/budgets";
import { cities } from "@/data/cities";
import { companions } from "@/data/companions";
import { experiences } from "@/data/experiences";
import { travelStyles } from "@/data/travel-styles";
import { createRecommendation } from "@/engines/recommendation-engine";
import { buildPrompt } from "@/services/prompt-builder";
import { createAIGateway, createOpenAIProvider } from "@/services/ai";
import type { Recommendation } from "@/types/recommendation";

export type GeneratedTrip = { cityName: string; countryName: string; dates: { endDate: string; startDate: string }; recommendation: Recommendation; travelStyle: string };
export type TripGenerationState = { error?: string; trip?: GeneratedTrip };

const invalidState = (error: string): TripGenerationState => ({ error });
const selectedValues = (formData: FormData, name: string): string[] => formData.getAll(name).filter((value): value is string => typeof value === "string");

export async function generateTrip(_previousState: TripGenerationState, formData: FormData): Promise<TripGenerationState> {
  const city = cities.find((item) => item.id === formData.get("destination"));
  const travelStyle = travelStyles.find((item) => item.id === formData.get("travelStyle"));
  const companion = companions.find((item) => item.id === formData.get("companion"));
  const budget = budgets.find((item) => item.id === formData.get("budget"));
  const startDate = String(formData.get("startDate") ?? "");
  const endDate = String(formData.get("endDate") ?? "");
  const selectedExperienceIds = selectedValues(formData, "experiences");
  const selectedExperiences = experiences.filter((item) => selectedExperienceIds.includes(item.id)).map((item) => item.category);
  if (!city || !travelStyle || !companion || !budget || !startDate || !endDate) return invalidState("Please complete every trip detail.");
  const recommendation = createRecommendation({ destination: { cityId: city.id, countryCode: city.countryCode }, dateRange: { startDate, endDate }, experiences: selectedExperiences, travelStyleId: travelStyle.id, companionId: companion.id, budgetId: budget.id, preferences: {}, constraints: [] });
  const prompt = buildPrompt({ destination: { cityId: city.id, countryCode: city.countryCode }, tripDates: { startDate, endDate }, experiences: selectedExperiences, travelStyleId: travelStyle.id, companionId: companion.id, budgetId: budget.id, constraints: [], recommendations: recommendation });
  await createAIGateway({ primaryProvider: createOpenAIProvider("TripsGen mock response") }).generate(prompt.systemPrompt, prompt.userPrompt);
  return { trip: { cityName: city.name, countryName: city.country, dates: { startDate, endDate }, recommendation, travelStyle: travelStyle.label } };
}

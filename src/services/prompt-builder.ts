import { getBudgetById } from "@/engines/budget-engine";
import { resolveDestination } from "@/engines/destination-engine";
import { getExperienceById } from "@/engines/experience-engine";
import type { Constraint } from "@/types/constraint";
import type { Prompt, PromptInput } from "@/types/prompt";

const promptVersion = "tripsgen-v1";
const systemTemplate = [
  "You are TripsGen, a precise trip-planning assistant.",
  "Use the supplied trip brief and recommendations as the source of truth.",
  "Respect every constraint. Do not invent bookings, prices, opening hours, or external facts.",
  "Return a practical, well-structured itinerary with clear daily sequencing.",
].join("\n");

const line = (label: string, value: string): string => `- ${label}: ${value}`;
const list = (values: string[]): string => values.length ? values.join(", ") : "None";
const constraintValue = (constraint: Constraint): string => Array.isArray(constraint.value) ? list(constraint.value) : String(constraint.value);
const constraintLines = (constraints: Constraint[]): string[] => constraints.slice().sort((left, right) => left.id.localeCompare(right.id)).map((constraint) => line(constraint.type, constraintValue(constraint)));

export const buildPrompt = (input: PromptInput): Prompt => {
  const city = resolveDestination(input.destination);
  const budget = getBudgetById(input.budgetId);
  const experienceLabels = input.experiences.map((experience) => getExperienceById(experience)?.label ?? experience);
  const recommendedItems = [...input.recommendations.attractions, ...input.recommendations.restaurants, ...input.recommendations.hotels].map((item) => item.name);
  const tripBrief = [
    "Trip brief",
    line("Destination", city ? `${city.name}, ${city.country}` : input.destination.cityId),
    line("Dates", `${input.tripDates.startDate} to ${input.tripDates.endDate}`),
    line("Experiences", list(experienceLabels)),
    line("Travel style", input.travelStyleId),
    line("Companion", input.companionId),
    line("Budget", budget?.label ?? input.budgetId),
  ];
  const recommendations = ["Recommended starting points", ...recommendedItems.map((item) => line("Item", item)), line("Confidence score", String(input.recommendations.confidenceScore))];
  const constraints = ["Constraints", ...constraintLines(input.constraints)];
  return {
    systemPrompt: systemTemplate,
    userPrompt: [...tripBrief, "", ...constraints, "", ...recommendations].join("\n"),
    metadata: { version: promptVersion, destinationId: input.destination.cityId, experienceCount: input.experiences.length, constraintCount: input.constraints.length, recommendationCount: recommendedItems.length },
  };
};

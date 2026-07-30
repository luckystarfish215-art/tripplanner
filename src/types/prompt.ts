import type { BudgetId } from "@/types/budget";
import type { CompanionId } from "@/types/companion";
import type { Constraint } from "@/types/constraint";
import type { Destination } from "@/types/destination";
import type { ExperienceCategory } from "@/types/experience";
import type { Recommendation } from "@/types/recommendation";
import type { TravelStyleId } from "@/types/travel-style";

export type PromptInput = {
  budgetId: BudgetId;
  companionId: CompanionId;
  constraints: Constraint[];
  destination: Destination;
  experiences: ExperienceCategory[];
  recommendations: Recommendation;
  travelStyleId: TravelStyleId;
  tripDates: { endDate: string; startDate: string };
};

export type PromptMetadata = {
  constraintCount: number;
  destinationId: string;
  experienceCount: number;
  recommendationCount: number;
  version: string;
};

export type Prompt = { metadata: PromptMetadata; systemPrompt: string; userPrompt: string };

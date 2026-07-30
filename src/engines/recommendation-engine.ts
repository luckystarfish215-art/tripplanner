import { attractions, hotels, restaurants } from "@/data/recommendations";
import { getBudgetById, getBudgetFit } from "@/engines/budget-engine";
import { getSeason, getTripNights, isValidDateRange } from "@/engines/date-engine";
import { resolveDestination } from "@/engines/destination-engine";
import { getExperienceCoverage } from "@/engines/experience-engine";
import { rankConstraint } from "@/engines/constraint-engine";
import { calculateTravelQualityScore, getSeasonScore } from "@/engines/score-engine";
import type { CompanionId } from "@/types/companion";
import type { Hotel } from "@/types/hotel";
import type { Attraction, DailyPlan, Recommendation, RecommendationInput } from "@/types/recommendation";
import type { Restaurant } from "@/types/restaurant";
import type { TravelStyleId } from "@/types/travel-style";

type RankableItem = Attraction | Restaurant | Hotel;
const millisecondsPerDay = 86_400_000;
const attractionLimitByCompanion: Record<CompanionId, number> = { solo: 2, couple: 3, family: 4, friends: 4 };
const toDate = (value: string): Date => new Date(`${value}T00:00:00.000Z`);
const addDays = (date: string, days: number): string => new Date(toDate(date).valueOf() + days * millisecondsPerDay).toISOString().slice(0, 10);
const average = (scores: number[]): number => scores.length ? Math.round(scores.reduce((total, score) => total + score, 0) / scores.length) : 100;
const budgetLevel = (dailyAmount: number): number => Math.min(5, Math.max(1, Math.ceil(dailyAmount / 100)));
const matchScore = (matched: number, total: number): number => total === 0 ? 100 : Math.round((matched / total) * 100);
const itemMatches = (item: Attraction | Restaurant, experiences: RecommendationInput["experiences"]): boolean => experiences.length === 0 || item.experienceCategories.some((category) => experiences.includes(category));
const travelStyleScore = (tags: string[], travelStyleId: TravelStyleId): number => tags.includes(travelStyleId) ? 100 : 50;
const budgetScore = (priceLevel: number, selectedBudget: number): number => priceLevel <= selectedBudget ? 100 : Math.max(0, 100 - (priceLevel - selectedBudget) * 35);

export const calculateRecommendationScore = (item: RankableItem, experiences: RecommendationInput["experiences"], dailyAmount: number, travelStyleId: TravelStyleId): number => {
  const tagMatch = matchScore(item.tags.filter((tag) => experiences.includes(tag as RecommendationInput["experiences"][number])).length, experiences.length);
  return Math.round(item.popularity * 0.4 + tagMatch * 0.3 + budgetScore(item.priceLevel, budgetLevel(dailyAmount)) * 0.2 + travelStyleScore(item.tags, travelStyleId) * 0.1);
};

export const rankRecommendations = <Item extends RankableItem>(items: Item[], input: Pick<RecommendationInput, "experiences" | "travelStyleId">, dailyAmount: number): Item[] => items.map((item) => ({ ...item, score: calculateRecommendationScore(item, input.experiences, dailyAmount, input.travelStyleId) } as Item)).sort((left, right) => right.score - left.score || left.id.localeCompare(right.id));

const distributeAttractions = (items: Attraction[], days: number): string[][] => {
  const base = Math.floor(items.length / days);
  const remainder = items.length % days;
  let cursor = 0;
  return Array.from({ length: days }, (_, index) => { const count = base + (index < remainder ? 1 : 0); const day = items.slice(cursor, cursor + count).map((item) => item.name); cursor += count; return day; });
};

const createDailyPlan = (input: RecommendationInput, selectedAttractions: Attraction[], selectedRestaurants: Restaurant[]): DailyPlan[] => {
  const days = getTripNights(input.dateRange.startDate, input.dateRange.endDate);
  const attractionDays = distributeAttractions(selectedAttractions, days);
  return attractionDays.map((items, index) => ({ day: index + 1, date: addDays(input.dateRange.startDate, index), travelStyle: input.travelStyleId, items: selectedRestaurants[index] ? [...items, selectedRestaurants[index].name] : items }));
};

export const createRecommendation = (input: RecommendationInput): Recommendation => {
  const city = resolveDestination(input.destination);
  if (!city || !isValidDateRange(input.dateRange.startDate, input.dateRange.endDate)) return { attractions: [], restaurants: [], hotels: [], dailyPlan: [], confidenceScore: 0 };
  const budget = getBudgetById(input.budgetId);
  if (!budget) return { attractions: [], restaurants: [], hotels: [], dailyPlan: [], confidenceScore: 0 };
  const avoided = [...(input.preferences.avoid ?? []), ...input.constraints.filter((constraint) => constraint.type === "avoid").flatMap((constraint) => constraint.value)];
  const nights = getTripNights(input.dateRange.startDate, input.dateRange.endDate);
  const usable = <Item extends RankableItem>(items: Item[]): Item[] => items.filter((item) => item.cityId === city.id && item.priceLevel <= budgetLevel(budget.dailyAmount) && !avoided.includes(item.name));
  const selectedAttractions = rankRecommendations(usable(attractions).filter((item) => itemMatches(item, input.experiences)), input, budget.dailyAmount).slice(0, nights * attractionLimitByCompanion[input.companionId]);
  const selectedRestaurants = rankRecommendations(usable(restaurants).filter((item) => itemMatches(item, input.experiences)), input, budget.dailyAmount).slice(0, nights);
  const selectedHotels = rankRecommendations(usable(hotels), input, budget.dailyAmount).slice(0, 1);
  const itineraryItems = [...selectedAttractions, ...selectedRestaurants, ...selectedHotels].map((item) => item.name);
  const constraintScore = average(rankConstraint(input.constraints, { itineraryItems, foodCategories: city.foodCategories, dailyBudget: city.averageDailyBudget, dailyDistance: 10, wakeUpTime: input.preferences.wakeUpTime }).map((result) => result.score));
  const tqs = calculateTravelQualityScore({ destinationScore: Math.round((city.transportationScore + city.photographyScore) / 2), experienceScore: getExperienceCoverage(input.experiences, city.experiences), budgetScore: getBudgetFit(budget.dailyAmount, city.averageDailyBudget), distanceScore: 100, seasonScore: getSeasonScore(city.idealSeasons.includes(getSeason(input.dateRange.startDate) ?? "winter")) });
  return { attractions: selectedAttractions, restaurants: selectedRestaurants, hotels: selectedHotels, dailyPlan: createDailyPlan(input, selectedAttractions, selectedRestaurants), confidenceScore: Math.round(tqs.score * 0.8 + constraintScore * 0.2) };
};

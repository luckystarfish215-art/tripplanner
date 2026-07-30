export const tqsWeights = { destinationScore: 0.25, experienceScore: 0.25, budgetScore: 0.2, distanceScore: 0.15, seasonScore: 0.15 } as const;

export type TqsInput = { budgetScore: number; destinationScore: number; distanceScore: number; experienceScore: number; seasonScore: number };
export type TravelQualityScore = TqsInput & { score: number };

const clamp = (value: number): number => Math.min(100, Math.max(0, value));
const weighted = (input: TqsInput): number => input.destinationScore * tqsWeights.destinationScore + input.experienceScore * tqsWeights.experienceScore + input.budgetScore * tqsWeights.budgetScore + input.distanceScore * tqsWeights.distanceScore + input.seasonScore * tqsWeights.seasonScore;

export const calculateTravelQualityScore = (input: TqsInput): TravelQualityScore => { const scores = { destinationScore: clamp(input.destinationScore), experienceScore: clamp(input.experienceScore), budgetScore: clamp(input.budgetScore), distanceScore: clamp(input.distanceScore), seasonScore: clamp(input.seasonScore) }; return { ...scores, score: Math.round(weighted(scores)) }; };
export const getDistanceScore = (kilometres: number): number => clamp(100 - (Math.max(0, kilometres) / 12_000) * 100);
export const getSeasonScore = (isIdealSeason: boolean): number => isIdealSeason ? 100 : 55;

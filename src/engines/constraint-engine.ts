import type { Constraint, ConstraintCandidate, ConstraintScore, ConstraintValidation, ListConstraint, NumericConstraint } from "@/types/constraint";

const validTimePattern = /^([01]\d|2[0-3]):[0-5]\d$/;
const clamp = (value: number): number => Math.min(100, Math.max(0, value));
const unique = (values: string[]): string[] => [...new Set(values)];
const matchingScore = (required: string[], available: string[]): number => required.length === 0 ? 100 : Math.round((required.filter((item) => available.includes(item)).length / required.length) * 100);
const isListConstraint = (constraint: Constraint): constraint is ListConstraint => Array.isArray(constraint.value);
const isNumericConstraint = (constraint: Constraint): constraint is NumericConstraint => typeof constraint.value === "number";

export const validateConstraint = (constraint: Constraint): ConstraintValidation => {
  if (!constraint.id.trim()) return { isValid: false, reason: "A constraint needs an id." };
  if (isListConstraint(constraint)) return constraint.value.every((value) => value.trim()) ? { isValid: true } : { isValid: false, reason: "Constraint items cannot be empty." };
  if (isNumericConstraint(constraint)) return Number.isFinite(constraint.value) && constraint.value >= 0 ? { isValid: true } : { isValid: false, reason: "Numeric constraints must be zero or greater." };
  return validTimePattern.test(constraint.value) ? { isValid: true } : { isValid: false, reason: "Wake-up time must use HH:MM." };
};

const scoreListConstraint = (constraint: ListConstraint, candidate: ConstraintCandidate): number => {
  const itinerary = candidate.itineraryItems ?? [];
  const foods = candidate.foodCategories ?? [];
  if (constraint.type === "avoid") return itinerary.some((item) => constraint.value.includes(item)) ? 0 : 100;
  if (constraint.type === "foodPreferences") return matchingScore(constraint.value, foods);
  return matchingScore(constraint.value, itinerary);
};

const scoreNumericConstraint = (constraint: NumericConstraint, candidate: ConstraintCandidate): number => {
  const actual = constraint.type === "maximumDistance" ? candidate.dailyDistance : candidate.dailyBudget;
  if (actual === undefined) return 0;
  return actual <= constraint.value ? 100 : clamp((constraint.value / actual) * 100);
};

export const scoreConstraint = (constraint: Constraint, candidate: ConstraintCandidate): ConstraintScore => {
  if (!validateConstraint(constraint).isValid) return { constraint, score: 0 };
  if (isListConstraint(constraint)) return { constraint, score: scoreListConstraint(constraint, candidate) };
  if (isNumericConstraint(constraint)) return { constraint, score: scoreNumericConstraint(constraint, candidate) };
  return { constraint, score: candidate.wakeUpTime === constraint.value ? 100 : 0 };
};

export const mergeConstraint = (current: Constraint, incoming: Constraint): Constraint => {
  if (current.type !== incoming.type) throw new Error("Constraints must share a type to merge.");
  if (isListConstraint(current) && isListConstraint(incoming)) return { ...current, value: unique([...current.value, ...incoming.value]) };
  if (isNumericConstraint(current) && isNumericConstraint(incoming)) return { ...current, value: Math.min(current.value, incoming.value) };
  return incoming;
};

export const rankConstraint = (constraints: Constraint[], candidate: ConstraintCandidate): ConstraintScore[] => constraints.map((constraint) => scoreConstraint(constraint, candidate)).sort((left, right) => right.score - left.score);

export type ListConstraintType = "mustVisit" | "avoid" | "lockedItems" | "niceToHave" | "foodPreferences";
export type NumericConstraintType = "maximumDistance" | "dailyBudget";
export type TimeConstraintType = "wakeUpTime";
export type ConstraintType = ListConstraintType | NumericConstraintType | TimeConstraintType;

type ConstraintBase = { id: string; type: ConstraintType };
export type ListConstraint = ConstraintBase & { type: ListConstraintType; value: string[] };
export type NumericConstraint = ConstraintBase & { type: NumericConstraintType; value: number };
export type TimeConstraint = ConstraintBase & { type: TimeConstraintType; value: string };
export type Constraint = ListConstraint | NumericConstraint | TimeConstraint;

export type ConstraintCandidate = {
  dailyBudget?: number;
  dailyDistance?: number;
  foodCategories?: string[];
  itineraryItems?: string[];
  wakeUpTime?: string;
};

export type ConstraintValidation = { isValid: boolean; reason?: string };
export type ConstraintScore = { constraint: Constraint; score: number };

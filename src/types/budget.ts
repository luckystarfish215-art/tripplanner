export type BudgetId = "easy" | "considered" | "exceptional";
export type Budget = { dailyAmount: number; description: string; id: BudgetId; label: string };
export type BudgetAllocation = { activities: number; food: number; stay: number; total: number };

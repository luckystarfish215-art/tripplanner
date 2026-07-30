export type BudgetId = "daily-50" | "daily-100" | "daily-150" | "daily-250" | "daily-500";
export type Budget = { dailyAmount: number; description: string; id: BudgetId; label: string };
export type BudgetAllocation = { activities: number; food: number; stay: number; total: number };

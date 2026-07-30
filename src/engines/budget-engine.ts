import { budgets } from "@/data/budgets";
import type { Budget, BudgetAllocation } from "@/types/budget";

const allocation = { stay: 0.5, food: 0.3, activities: 0.2 };

export const getBudgetById = (id: string): Budget | undefined => budgets.find((budget) => budget.id === id);
export const createBudgetAllocation = (dailyAmount: number, nights: number): BudgetAllocation => { const total = Math.max(0, dailyAmount) * Math.max(0, nights); return { total, stay: Math.round(total * allocation.stay), food: Math.round(total * allocation.food), activities: Math.round(total * allocation.activities) }; };
export const getBudgetFit = (availableDailyAmount: number, requiredDailyAmount: number): number => requiredDailyAmount <= 0 ? 100 : Math.min(100, Math.round((Math.max(0, availableDailyAmount) / requiredDailyAmount) * 100));

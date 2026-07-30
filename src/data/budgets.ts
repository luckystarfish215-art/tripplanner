import type { Budget } from "@/types/budget";

export const budgets: Budget[] = [
  { id: "daily-50", label: "£50/day", description: "Essential and economical", dailyAmount: 50 },
  { id: "daily-100", label: "£100/day", description: "Comfortable everyday choices", dailyAmount: 100 },
  { id: "daily-150", label: "£150/day", description: "A little more room to explore", dailyAmount: 150 },
  { id: "daily-250", label: "£250/day", description: "Special stays and meals", dailyAmount: 250 },
  { id: "daily-500", label: "£500/day", description: "A remarkable experience", dailyAmount: 500 },
];

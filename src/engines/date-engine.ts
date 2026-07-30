import type { Season } from "@/types/destination";

const millisecondsPerDay = 86_400_000;
const seasonByMonth: Record<number, Season> = { 0: "winter", 1: "winter", 2: "spring", 3: "spring", 4: "spring", 5: "summer", 6: "summer", 7: "summer", 8: "autumn", 9: "autumn", 10: "autumn", 11: "winter" };
const toDate = (value: string): Date => new Date(`${value}T00:00:00.000Z`);

export const isValidDateRange = (startDate: string, endDate: string): boolean => !Number.isNaN(toDate(startDate).valueOf()) && toDate(endDate) > toDate(startDate);
export const getTripNights = (startDate: string, endDate: string): number => isValidDateRange(startDate, endDate) ? Math.round((toDate(endDate).valueOf() - toDate(startDate).valueOf()) / millisecondsPerDay) : 0;
export const getSeason = (date: string): Season | undefined => { const value = toDate(date); return Number.isNaN(value.valueOf()) ? undefined : seasonByMonth[value.getUTCMonth()]; };

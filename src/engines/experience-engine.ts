import { experiences } from "@/data/experiences";
import type { Experience, ExperienceCategory } from "@/types/experience";

export const getExperienceById = (id: string): Experience | undefined => experiences.find((experience) => experience.id === id);
export const getExperiencesByCategory = (categories: ExperienceCategory[]): Experience[] => experiences.filter((experience) => categories.includes(experience.category));
export const getExperienceCoverage = (selected: ExperienceCategory[], available: ExperienceCategory[]): number => selected.length === 0 ? 100 : Math.round((selected.filter((category) => available.includes(category)).length / selected.length) * 100);

import { cities } from "@/data/cities";
import { countries } from "@/data/countries";
import type { City, Country, Destination } from "@/types/destination";

const normalize = (value: string) => value.trim().toLocaleLowerCase();

export const getCountryByCode = (code: string): Country | undefined => countries.find((country) => country.code === code);
export const getCityById = (id: string): City | undefined => cities.find((city) => city.id === id);
export const getCitiesForCountry = (countryCode: string): City[] => cities.filter((city) => city.countryCode === countryCode);
export const searchDestinations = (query: string): City[] => { const value = normalize(query); return cities.filter((city) => normalize(city.name).includes(value)); };
export const resolveDestination = (destination: Destination): City | undefined => {
  const city = getCityById(destination.cityId);
  return city?.countryCode === destination.countryCode ? city : undefined;
};

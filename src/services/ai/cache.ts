export type AICache = { clear: () => void; get: (key: string) => string | undefined; set: (key: string, value: string) => void };

export const createInMemoryCache = (): AICache => {
  const values = new Map<string, string>();
  return { get: (key) => values.get(key), set: (key, value) => values.set(key, value), clear: () => values.clear() };
};

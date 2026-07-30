import type { ShareRecord, ShareRepository, ShareResult } from "@/types/share";
import type { Trip } from "@/types/trip";

const encoding = new TextEncoder();
const decoding = new TextDecoder();
const shareVersion = 1;
const localStoragePrefix = "tripsgen:share:";
const compressedPrefix = "gz.";
const plainPrefix = "raw.";

const toBase64Url = (value: Uint8Array): string => btoa(Array.from(value, (byte) => String.fromCharCode(byte)).join(" ").replaceAll(" ", "")).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
const fromBase64Url = (value: string): Uint8Array => { const padded = value.replaceAll("-", "+").replaceAll("_", "/").padEnd(Math.ceil(value.length / 4) * 4, "="); return Uint8Array.from(atob(padded), (character) => character.charCodeAt(0)); };
const streamToBytes = async (stream: ReadableStream<Uint8Array>): Promise<Uint8Array> => new Uint8Array(await new Response(stream).arrayBuffer());
const bytesToBlob = (bytes: Uint8Array): Blob => { const copy = new Uint8Array(bytes.byteLength); copy.set(bytes); return new Blob([copy.buffer]); };
const supportsCompression = (): boolean => typeof CompressionStream !== "undefined" && typeof DecompressionStream !== "undefined";
const getLocalStorage = (): Storage | undefined => typeof window === "undefined" ? undefined : window.localStorage;

export const generateShareId = (): string => {
  const bytes = new Uint8Array(9);
  crypto.getRandomValues(bytes);
  return toBase64Url(bytes);
};

export const serializeTrip = (trip: Trip): string => JSON.stringify({ version: shareVersion, trip } satisfies Omit<ShareRecord, "id">);
export const deserializeTrip = (value: string): Trip | undefined => { try { const parsed = JSON.parse(value) as Omit<ShareRecord, "id">; return parsed.version === shareVersion && parsed.trip?.id ? parsed.trip : undefined; } catch { return undefined; } };

export const encodeTrip = async (trip: Trip): Promise<string> => {
  const bytes = encoding.encode(serializeTrip(trip));
  if (!supportsCompression()) return `${plainPrefix}${toBase64Url(bytes)}`;
  const compressed = await streamToBytes(bytesToBlob(bytes).stream().pipeThrough(new CompressionStream("gzip")));
  return `${compressedPrefix}${toBase64Url(compressed)}`;
};

export const decodeTrip = async (value: string): Promise<Trip | undefined> => {
  const [prefix, content] = value.split(".", 2);
  if (!content || (prefix !== "gz" && prefix !== "raw")) return undefined;
  try {
    const bytes = fromBase64Url(content);
    const decoded = prefix === "gz" && supportsCompression() ? await streamToBytes(bytesToBlob(bytes).stream().pipeThrough(new DecompressionStream("gzip"))) : bytes;
    return deserializeTrip(decoding.decode(decoded));
  } catch { return undefined; }
};

export const saveTripLocally = (id: string, trip: Trip): boolean => { const storage = getLocalStorage(); if (!storage) return false; storage.setItem(`${localStoragePrefix}${id}`, serializeTrip(trip)); return true; };
export const loadTripLocally = (id: string): Trip | undefined => { const stored = getLocalStorage()?.getItem(`${localStoragePrefix}${id}`); return stored ? deserializeTrip(stored) : undefined; };

export const createShare = async (trip: Trip, repository?: ShareRepository): Promise<ShareResult> => {
  const id = generateShareId();
  if (repository) await repository.save(id, trip); else saveTripLocally(id, trip);
  return { id, url: `/trip/${id}` };
};

export const loadSharedTrip = async (id: string, repository?: ShareRepository): Promise<Trip | undefined> => repository ? repository.load(id) : loadTripLocally(id) ?? decodeTrip(id);

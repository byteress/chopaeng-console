import type { IslandData } from '../types/island';
import type { FlightLogEntry } from '../types/flightLog';
import { mockIslands } from '../mock/islands';
import { mockFlightLogs } from '../mock/flightLogs';

// In-memory store
let islands: IslandData[] = [...mockIslands];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getIslands = async (): Promise<IslandData[]> => {
  await delay(500);
  return [...islands];
};

export const createIsland = async (island: IslandData): Promise<IslandData> => {
  await delay(800);
  islands = [...islands, island];
  return island;
};

export const updateIsland = async (updated: IslandData): Promise<IslandData> => {
  await delay(800);
  islands = islands.map(i => i.id === updated.id ? updated : i);
  return updated;
};

export const deleteIsland = async (id: string): Promise<void> => {
  await delay(500);
  islands = islands.filter(i => i.id !== id);
};

export const getFlightLogs = async (): Promise<FlightLogEntry[]> => {
  await delay(500);
  return [...mockFlightLogs];
};

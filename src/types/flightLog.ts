export interface FlightLogEntry {
  id: string;
  travelerIGN: string;
  originIsland: string;
  destination: string;
  detectedAt: string;
  rejoinAttempts?: number;
  status: 'AUTHORIZED' | 'WARNED';
  actionBy: string;
  target: string;
  resolvedAt: string;
  reason?: string;
}

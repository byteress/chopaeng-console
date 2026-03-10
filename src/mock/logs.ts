export interface LogEntry {
  id: string;
  timestamp: string;
  event: string;
  islandId: string;
  playerId: string;
}

export const mockLogs: LogEntry[] = [
  { id: 'LOG-001', timestamp: '2024-06-15 08:02:11', event: 'Visitor arrived', islandId: 'ISL-001', playerId: 'PLR-042' },
  { id: 'LOG-002', timestamp: '2024-06-15 08:15:33', event: 'Dodo code used', islandId: 'ISL-003', playerId: 'PLR-017' },
  { id: 'LOG-003', timestamp: '2024-06-15 08:30:05', event: 'Item dropped', islandId: 'ISL-007', playerId: 'PLR-091' },
  { id: 'LOG-004', timestamp: '2024-06-15 08:44:22', event: 'Island offline', islandId: 'ISL-002', playerId: 'PLR-005' },
  { id: 'LOG-005', timestamp: '2024-06-15 09:01:17', event: 'Bot connected', islandId: 'ISL-004', playerId: 'PLR-BOT1' },
  { id: 'LOG-006', timestamp: '2024-06-15 09:11:48', event: 'Switch temp warning', islandId: 'ISL-004', playerId: 'PLR-BOT1' },
  { id: 'LOG-007', timestamp: '2024-06-15 09:22:03', event: 'Visitor arrived', islandId: 'ISL-005', playerId: 'PLR-033' },
  { id: 'LOG-008', timestamp: '2024-06-15 09:38:55', event: 'Dodo code expired', islandId: 'ISL-001', playerId: 'PLR-042' },
  { id: 'LOG-009', timestamp: '2024-06-15 09:55:14', event: 'Item dropped', islandId: 'ISL-012', playerId: 'PLR-078' },
  { id: 'LOG-010', timestamp: '2024-06-15 10:03:29', event: 'Visitor kicked', islandId: 'ISL-004', playerId: 'PLR-055' },
  { id: 'LOG-011', timestamp: '2024-06-15 10:15:00', event: 'Bot disconnected', islandId: 'ISL-004', playerId: 'PLR-BOT1' },
  { id: 'LOG-012', timestamp: '2024-06-15 10:28:41', event: 'Island online', islandId: 'ISL-002', playerId: 'PLR-005' },
  { id: 'LOG-013', timestamp: '2024-06-15 10:42:09', event: 'Visitor arrived', islandId: 'ISL-010', playerId: 'PLR-019' },
  { id: 'LOG-014', timestamp: '2024-06-15 10:55:37', event: 'Turnip price updated', islandId: 'ISL-004', playerId: 'PLR-BOT1' },
  { id: 'LOG-015', timestamp: '2024-06-15 11:07:22', event: 'Error: invalid dodo code', islandId: 'ISL-003', playerId: 'PLR-102' },
  { id: 'LOG-016', timestamp: '2024-06-15 11:20:14', event: 'Visitor arrived', islandId: 'ISL-017', playerId: 'PLR-066' },
  { id: 'LOG-017', timestamp: '2024-06-15 11:33:50', event: 'Item dropped', islandId: 'ISL-017', playerId: 'PLR-066' },
  { id: 'LOG-018', timestamp: '2024-06-15 11:45:03', event: 'Island offline', islandId: 'ISL-010', playerId: 'PLR-019' },
  { id: 'LOG-019', timestamp: '2024-06-15 12:00:00', event: 'Bot connected', islandId: 'ISL-015', playerId: 'PLR-BOT2' },
  { id: 'LOG-020', timestamp: '2024-06-15 12:11:28', event: 'Dodo code used', islandId: 'ISL-018', playerId: 'PLR-027' },
  { id: 'LOG-021', timestamp: '2024-06-15 12:24:56', event: 'Visitor arrived', islandId: 'ISL-013', playerId: 'PLR-088' },
  { id: 'LOG-022', timestamp: '2024-06-15 12:38:17', event: 'Switch temp warning', islandId: 'ISL-015', playerId: 'PLR-BOT2' },
  { id: 'LOG-023', timestamp: '2024-06-15 12:51:44', event: 'Item dropped', islandId: 'ISL-008', playerId: 'PLR-034' },
  { id: 'LOG-024', timestamp: '2024-06-15 13:05:02', event: 'Error: connection timeout', islandId: 'ISL-011', playerId: 'PLR-071' },
  { id: 'LOG-025', timestamp: '2024-06-15 13:18:39', event: 'Visitor arrived', islandId: 'ISL-006', playerId: 'PLR-049' },
  { id: 'LOG-026', timestamp: '2024-06-15 13:30:11', event: 'Island online', islandId: 'ISL-011', playerId: 'PLR-071' },
  { id: 'LOG-027', timestamp: '2024-06-15 13:43:28', event: 'Dodo code used', islandId: 'ISL-016', playerId: 'PLR-014' },
  { id: 'LOG-028', timestamp: '2024-06-15 13:57:05', event: 'Visitor kicked', islandId: 'ISL-016', playerId: 'PLR-099' },
  { id: 'LOG-029', timestamp: '2024-06-15 14:10:33', event: 'Bot disconnected', islandId: 'ISL-015', playerId: 'PLR-BOT2' },
  { id: 'LOG-030', timestamp: '2024-06-15 14:23:50', event: 'Item dropped', islandId: 'ISL-009', playerId: 'PLR-023' },
  { id: 'LOG-031', timestamp: '2024-06-15 14:36:14', event: 'Visitor arrived', islandId: 'ISL-014', playerId: 'PLR-057' },
  { id: 'LOG-032', timestamp: '2024-06-15 14:48:40', event: 'Turnip price updated', islandId: 'ISL-004', playerId: 'PLR-BOT1' },
  { id: 'LOG-033', timestamp: '2024-06-15 15:01:07', event: 'Error: island full', islandId: 'ISL-001', playerId: 'PLR-113' },
  { id: 'LOG-034', timestamp: '2024-06-15 15:14:25', event: 'Dodo code expired', islandId: 'ISL-018', playerId: 'PLR-027' },
  { id: 'LOG-035', timestamp: '2024-06-15 15:27:53', event: 'Visitor arrived', islandId: 'ISL-003', playerId: 'PLR-080' },
];

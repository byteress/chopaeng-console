import type { Warning } from '../types/warning';

// Guild ID used across all Chopaeng Camp warnings
const GUILD_ID = '1010000000000000000';

// Moderator IDs
const MOD_HUSKY      = '1100000000000000001';
const MOD_FER        = '1100000000000000002';
const MOD_ELLA       = '1100000000000000003';
const MOD_CHIE       = '1100000000000000004';
const MOD_MOCHILEAF  = '1100000000000000005';
const MOD_JADE       = '1100000000000000006';

const SUB2 = 'Breaking Sub Rule #2. We have removed your island access for now. Please read the 🍄┋sub-rules again to gain access.';

export const mockWarnings: Warning[] = [
  // FLT-001 — Celina warned by Husky | Sakura
  { user_id: '1281641434939658343', guild_id: GUILD_ID, reason: SUB2, mod_id: MOD_HUSKY, timestamp: 1741391460 },
  // FLT-003 — Mimmi warned by Fer | Mochin
  { user_id: '213807576104566784', guild_id: GUILD_ID, reason: SUB2, mod_id: MOD_FER, timestamp: 1741393860 },
  // FLT-005 — Konan warned by Fer | Mochin
  { user_id: '383128540188508160', guild_id: GUILD_ID, reason: SUB2, mod_id: MOD_FER, timestamp: 1741394700 },
  // FLT-008 — Basil warned by Fer | Mochin
  { user_id: '407120435017285632', guild_id: GUILD_ID, reason: SUB2, mod_id: MOD_FER, timestamp: 1741401720 },
  // FLT-011 — gbs warned by Ella | Valedale
  { user_id: '242424081427726336', guild_id: GUILD_ID, reason: SUB2, mod_id: MOD_ELLA, timestamp: 1741409460 },
  // FLT-012 — Alvaro warned by Chie | Yasumizu
  { user_id: '617863773234921472', guild_id: GUILD_ID, reason: SUB2, mod_id: MOD_CHIE, timestamp: 1741410060 },
  // FLT-014 — lorianis warned by Chie | Yasumizu
  { user_id: '628034589625024513', guild_id: GUILD_ID, reason: SUB2, mod_id: MOD_CHIE, timestamp: 1741411140 },
  // FLT-015 — gbs (second warning) warned by Chie | Yasumizu
  { user_id: '242424081427726336', guild_id: GUILD_ID, reason: SUB2, mod_id: MOD_CHIE, timestamp: 1741411200 },
  // FLT-017 — Hanako warned by Mochileaf | Tinkerland
  { user_id: '1478140319831822407', guild_id: GUILD_ID, reason: SUB2, mod_id: MOD_MOCHILEAF, timestamp: 1741417980 },
  // FLT-018 — Foxy Brown warned by Jade | Driftwood / Ink falls
  { user_id: '976646974587674664', guild_id: GUILD_ID, reason: SUB2, mod_id: MOD_JADE, timestamp: 1741421460 },
  // FLT-021 — Wing warned by Husky | Sakura
  { user_id: '382266230188277762', guild_id: GUILD_ID, reason: SUB2, mod_id: MOD_HUSKY, timestamp: 1741445460 },
  // FLT-022 — Mimmi warned by Fer | Mochin
  { user_id: '236047227976548352', guild_id: GUILD_ID, reason: SUB2, mod_id: MOD_FER, timestamp: 1741456740 },
  // FLT-025 — Cris warned by Fer | Mochin
  { user_id: '1248964537173151834', guild_id: GUILD_ID, reason: SUB2, mod_id: MOD_FER, timestamp: 1741479600 },
  // FLT-027 — Mary warned by Fer | Mochin (re-join attempt)
  { user_id: '1438843376282636419', guild_id: GUILD_ID, reason: SUB2, mod_id: MOD_FER, timestamp: 1741492980 },
  // FLT-029 — Halo warned by Chie | Yasumizu (sub rule #1)
  {
    user_id: '1157091366992617563', guild_id: GUILD_ID,
    reason: 'Breaking Sub Top Rule or Sub Rule #1. We have removed your island access for now.',
    mod_id: MOD_CHIE, timestamp: 1741492320,
  },
  // FLT-032 — Mary (second warning) warned by Mochileaf | Tinkerland
  { user_id: '1438843376282636419', guild_id: GUILD_ID, reason: SUB2, mod_id: MOD_MOCHILEAF, timestamp: 1741607940 },
];

/** Display names for known moderator IDs */
export const modNames: Record<string, string> = {
  [MOD_HUSKY]:     'Husky | Sakura',
  [MOD_FER]:       'Fer | Mochin',
  [MOD_ELLA]:      'Ella | Valedale',
  [MOD_CHIE]:      'Chie | Yasumizu',
  [MOD_MOCHILEAF]: 'Mochileaf | Tinkerland',
  [MOD_JADE]:      'Jade | Driftwood / Ink falls',
};

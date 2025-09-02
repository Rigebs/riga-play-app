export const SYMBOLS: string[] = [
  "🍒",
  "🍋",
  "⭐",
  "🍇",
  "🍉",
  "🔔",
  "🍀",
  "7️⃣",
];

export const PAYTABLE: Record<string, { three?: number; two?: number }> = {
  "7️⃣": { three: 50, two: 5 },
  "🍀": { three: 30, two: 4 },
  "🔔": { three: 20, two: 3 },
  "⭐": { three: 16, two: 2 },
  "🍉": { three: 12, two: 2 },
  "🍇": { three: 10, two: 1 },
  "🍋": { three: 8 },
  "🍒": { three: 6 },
};

export const INITIAL_CREDITS = 100;
export const MIN_BET = 1;
export const MAX_BET = 10;
export const REEL_COUNT = 3;

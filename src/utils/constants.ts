export const INITIAL_CREDITS = 10;
export const MIN_BET = 1;
export const MAX_BET = 3;

export const SYMBOLS = [
  "🍒",
  "🍒",
  "🍒",
  "🍒", // 40%
  "🍉",
  "🍉",
  "🍉", // 30%
  "⭐",
  "⭐", // 20%
  "🔔", // 5%
  "💎", // 5%
];

export const PAYTABLE: Record<string, { two?: number; three: number }> = {
  "🍒": { two: 0, three: 7 }, // antes 4
  "🍉": { two: 0, three: 9 }, // antes 5
  "⭐": { two: 2, three: 12 }, // antes 1 y 7
  "🔔": { two: 2, three: 17 }, // antes 1 y 10
  "💎": { two: 4, three: 20 },
};

export const REEL_COUNT = 3;

// premios de tienda
export const REWARDS = [
  { name: "1 kg arroz", cost: 200 },
  { name: "Aceite 1L", cost: 400 },
  { name: "Gaseosa 2L", cost: 800 },
];

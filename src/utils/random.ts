import { SYMBOLS } from "./constants";

export const pickSymbol = () =>
  SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

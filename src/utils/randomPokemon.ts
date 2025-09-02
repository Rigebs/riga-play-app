import { POKEMON_SYMBOLS } from "./pokemonSymbols";

export function pickPokemon(): string {
  const idx = Math.floor(Math.random() * POKEMON_SYMBOLS.length);
  return POKEMON_SYMBOLS[idx];
}

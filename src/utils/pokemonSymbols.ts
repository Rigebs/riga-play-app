export const POKEMON_SYMBOLS: string[] = [
  "/pikachu.png",
  "/bulbasaur.png",
  "/charmander.png",
  "/squirtle.png",
  "/jigglypuff.png",
];

// Payout en créditos cuando hay 4 iguales (además del ticket)
export const POKEMON_PAYTABLE: Record<string, { four?: number }> = {
  "/pikachu.png": { four: 6 },
  "/bulbasaur.png": { four: 6 },
  "/charmander.png": { four: 8 },
  "/squirtle.png": { four: 8 },
  "/togepi.png": { four: 10 },
  "/jigglypuff.png": { four: 5 },
  "/psyduck.png": { four: 5 },
  "/meowth.png": { four: 4 },
};

export const INITIAL_CREDITS = 0; // inicia en 0 para forzar recarga
export const REEL_COUNT = 4; // cuadrado 2x2

// Mapeo Pokémon → premio físico
export const POKEMON_PRIZE_MAP: Record<
  string,
  { name: string; display: string }
> = {
  "/pikachu.png": { name: "Galleta Sublime", display: "🍫 Galleta Sublime" },
  "/bulbasaur.png": { name: "Galleta Sublime", display: "🍫 Galleta Sublime" },
  "/charmander.png": { name: "Gaseosa 500ml", display: "🥤 Gaseosa 500ml" },
  "/squirtle.png": { name: "Gaseosa 500ml", display: "🥤 Gaseosa 500ml" },
  "/togepi.png": { name: "Arroz 1kg", display: "🍚 Arroz 1kg" },
  "/jigglypuff.png": { name: "Chupetín", display: "🍭 Chupetín" },
  "/psyduck.png": { name: "Caramelo", display: "🍬 Caramelo" },
  "/meowth.png": { name: "S/ 1 de descuento", display: "💸 S/ 1 de descuento" },
};

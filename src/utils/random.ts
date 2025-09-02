export function pickSymbol(): string {
  const weighted = [
    ...Array(6).fill("🍒"),
    ...Array(5).fill("🍋"),
    ...Array(4).fill("🍇"),
    ...Array(4).fill("🍉"),
    ...Array(3).fill("⭐"),
    ...Array(2).fill("🔔"),
    ...Array(2).fill("🍀"),
    ...Array(1).fill("7️⃣"),
  ];
  const idx = Math.floor(Math.random() * weighted.length);
  return weighted[idx];
}

import { useState } from "react";
import {
  INITIAL_CREDITS,
  MAX_BET,
  MIN_BET,
  PAYTABLE,
  REEL_COUNT,
  SYMBOLS,
} from "../utils/constants";
import { pickSymbol } from "../utils/random";
import Reel from "../components/Reel";
import Pill from "../components/Pill";
import BigButton from "../components/BigButton";

type HistoryItem = {
  reels: string[];
  result: string;
};

export default function SlotClassicPage() {
  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [bet, setBet] = useState(1);
  const [reels, setReels] = useState<string[]>(
    Array.from({ length: REEL_COUNT }, () => pickSymbol())
  );
  const [targets, setTargets] = useState<string[]>(Array(REEL_COUNT).fill(""));
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState("Listo para jugar 🎰");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const canSpin = credits >= bet && !spinning;

  const computeWin = (arr: string[]) => {
    const [a, b, c] = arr;
    if (a === b && b === c) {
      const pay = (PAYTABLE[a]?.three || 0) * bet;
      return { amount: pay, label: `3 de ${a}` };
    }
    if (a === b || a === c) {
      const pay = (PAYTABLE[a]?.two || 0) * bet;
      if (pay) return { amount: pay, label: `Par de ${a}` };
    }
    if (b === c) {
      const pay = (PAYTABLE[b]?.two || 0) * bet;
      if (pay) return { amount: pay, label: `Par de ${b}` };
    }
    return { amount: 0, label: "Sin premio" };
  };

  const spin = async () => {
    if (!canSpin) return;
    setMessage("Girando… ✨");
    setCredits((c) => c - bet);
    setSpinning(true);

    const outcome = Array.from({ length: REEL_COUNT }, () => pickSymbol());
    setTargets(outcome);

    const stopDelays = [700, 1100, 1500];
    await Promise.all(
      stopDelays.map(
        (d, i) =>
          new Promise<void>((resolve) => {
            setTimeout(() => {
              setReels((prev) => {
                const x = [...prev];
                x[i] = outcome[i];
                return x;
              });
              resolve();
            }, d);
          })
      )
    );

    const res = computeWin(outcome);
    if (res.amount > 0) {
      setCredits((c) => c + res.amount);
      setMessage(`🎉 ${res.label}! +${res.amount} créditos`);
      setHistory((h) => [
        { reels: outcome, result: `+${res.amount}` },
        ...h.slice(0, 8),
      ]);
    } else {
      setMessage("Sigue intentando 😅");
      setHistory((h) => [{ reels: outcome, result: `0` }, ...h.slice(0, 8)]);
    }
    setSpinning(false);
  };

  const adjustBet = (delta: number) => {
    setBet((b) => Math.min(MAX_BET, Math.max(MIN_BET, b + delta)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 to-pink-600 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            🎰 Slot Machine
          </h1>
          <div className="flex items-center gap-2">
            <Pill>
              Créditos: <b>{credits}</b>
            </Pill>
            <Pill>
              Apuesta: <b>{bet}</b>
            </Pill>
          </div>
        </div>

        <div className="bg-zinc-900/70 border border-zinc-800 rounded-3xl shadow-2xl p-6">
          <div className="grid grid-cols-3 gap-4 place-items-center">
            {reels.map((sym, i) => (
              <Reel
                key={i}
                index={i}
                symbol={sym}
                spinning={spinning}
                stopKey={targets[i]}
              />
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => adjustBet(-1)}
                className="px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 active:scale-95"
                disabled={spinning}
              >
                −
              </button>
              <Pill className="min-w-[90px] text-center">
                Apuesta: <b>{bet}</b>
              </Pill>
              <button
                onClick={() => adjustBet(1)}
                className="px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 active:scale-95"
                disabled={spinning}
              >
                +
              </button>
            </div>

            <BigButton disabled={!canSpin} onClick={spin}>
              🎲 Jugar
            </BigButton>
          </div>

          <p className="mt-4 text-lg opacity-90">{message}</p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4">
            <h3 className="font-bold mb-3">
              Tabla de pagos (3 en línea / 2 iguales)
            </h3>
            <ul className="space-y-1">
              {SYMBOLS.map((s) => (
                <li
                  key={s}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-xl">{s}</span>
                  <span>
                    x3: <b>{PAYTABLE[s]?.three ?? 0}</b>
                    {PAYTABLE[s]?.two ? (
                      <>
                        <span className="opacity-70"> · </span>
                        x2: <b>{PAYTABLE[s]?.two}</b>
                      </>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4">
            <h3 className="font-bold mb-3">Historial</h3>
            <ul className="space-y-2 text-sm">
              {history.length === 0 && (
                <li className="opacity-70">Aún no hay jugadas.</li>
              )}
              {history.map((h, i) => (
                <li key={i} className="flex items-center justify-between">
                  <span className="text-xl">{h.reels.join("  ")}</span>
                  <span className="font-semibold">{h.result}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6 text-xs opacity-70 text-center">
          Hecho con React, Tailwind y framer-motion.
        </p>
      </div>
    </div>
  );
}

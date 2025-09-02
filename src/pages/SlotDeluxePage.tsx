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
import { Gamepad2, Play, Coins, History, Info, Settings } from "lucide-react";

type HistoryItem = {
  reels: string[];
  result: string;
};

export default function SlotDeluxePage() {
  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [bet, setBet] = useState(1);
  const [reels, setReels] = useState<string[]>(
    Array.from({ length: REEL_COUNT }, () => pickSymbol())
  );
  const [targets, setTargets] = useState<string[]>(Array(REEL_COUNT).fill(""));
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState("Listo para jugar");
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
    setMessage("Girando...");
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
      setMessage(`${res.label} +${res.amount} créditos`);
      setHistory((h) => [
        { reels: outcome, result: `+${res.amount}` },
        ...h.slice(0, 8),
      ]);
    } else {
      setMessage("Sin suerte, inténtalo de nuevo");
      setHistory((h) => [{ reels: outcome, result: `0` }, ...h.slice(0, 8)]);
    }
    setSpinning(false);
  };

  const adjustBet = (delta: number) => {
    setBet((b) => Math.min(MAX_BET, Math.max(MIN_BET, b + delta)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-700 text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-zinc-700">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-6 h-6" />
          <h1 className="text-xl font-bold tracking-wide">Slot Machine</h1>
        </div>
        <nav className="flex items-center gap-4 text-sm opacity-80">
          <button className="hover:opacity-100 flex items-center gap-1">
            <Info className="w-4 h-4" /> Info
          </button>
          <button className="hover:opacity-100 flex items-center gap-1">
            <Settings className="w-4 h-4" /> Ajustes
          </button>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-4xl grid md:grid-cols-3 gap-6">
          {/* Panel principal */}
          <div className="md:col-span-2 bg-zinc-900/70 border border-zinc-800 rounded-3xl shadow-2xl p-6">
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
                <Play className="w-5 h-5 mr-2 inline" /> Jugar
              </BigButton>
            </div>

            <p className="mt-4 text-lg opacity-90 text-center">{message}</p>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Coins className="w-4 h-4" /> Estadísticas
              </h3>
              <ul className="text-sm space-y-1">
                <li>
                  Créditos: <b>{credits}</b>
                </li>
                <li>
                  Apuesta actual: <b>{bet}</b>
                </li>
                <li>
                  Partidas jugadas: <b>{history.length}</b>
                </li>
              </ul>
            </div>

            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <History className="w-4 h-4" /> Historial
              </h3>
              <ul className="space-y-2 text-sm max-h-40 overflow-y-auto">
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
        </div>

        {/* Paytable */}
        <div className="mt-8 bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 w-full max-w-4xl">
          <h3 className="font-bold mb-3">Tabla de pagos</h3>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            {SYMBOLS.map((s) => (
              <li
                key={s}
                className="flex items-center justify-between bg-black/30 rounded-lg px-3 py-2"
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
      </main>

      <footer className="py-4 text-xs opacity-70 text-center border-t border-zinc-700">
        Hecho con React, Tailwind, framer-motion y lucide-react
      </footer>
    </div>
  );
}

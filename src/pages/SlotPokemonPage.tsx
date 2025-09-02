import { useEffect, useMemo, useState } from "react";
import { Loader2, PartyPopper, XCircle, Wallet, Ticket } from "lucide-react";
import ReelPokemon from "../components/ReelPokemon";
import BigButton from "../components/BigButton";
import Pill from "../components/Pill";
import CreditStore from "../components/CreditStore";
import PrizeTicket from "../components/PrizeTicket";
import {
  POKEMON_PAYTABLE,
  INITIAL_CREDITS,
  REEL_COUNT,
  POKEMON_PRIZE_MAP,
} from "../utils/pokemonSymbols";
import { pickPokemon } from "../utils/randomPokemon";
import {
  genTicketId,
  loadCredits,
  loadTickets,
  saveCredits,
  saveTickets,
  type PrizeTicket as TicketType,
} from "../utils/persistence";

export default function SlotPokemonPage() {
  // Persistencia
  const [credits, setCredits] = useState<number>(
    () => loadCredits() || INITIAL_CREDITS
  );
  const [tickets, setTickets] = useState<TicketType[]>(() => loadTickets());

  useEffect(() => {
    saveCredits(credits);
  }, [credits]);
  useEffect(() => {
    saveTickets(tickets);
  }, [tickets]);

  // Juego
  const [targets, setTargets] = useState<string[]>(() =>
    Array.from({ length: REEL_COUNT }, () => pickPokemon())
  );
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState<React.ReactNode>(
    <>Listo para jugar</>
  );

  const [storeOpen, setStoreOpen] = useState(false);

  const canPlay = credits > 0 && !spinning;

  const spin = () => {
    if (!canPlay) return;
    setCredits((c) => c - 1);
    setMessage(
      <>
        <Loader2 className="inline w-5 h-5 animate-spin text-blue-500 mr-1" />{" "}
        Girando PokéSlots…
      </>
    );
    setSpinning(true);

    const outcome = Array.from({ length: REEL_COUNT }, () => pickPokemon());
    setTargets(outcome);
  };

  const handleFinishAll = () => {
    const outcome = targets;

    // Conteo de símbolos
    const counts: Record<string, number> = {};
    for (const sym of outcome) counts[sym] = (counts[sym] || 0) + 1;

    const sortedCounts = Object.values(counts).sort((a, b) => b - a);

    if (sortedCounts[0] === 4) {
      // 🎉 Premio mayor: 4 iguales
      const sym = outcome[0];
      const prizeCredits = POKEMON_PAYTABLE[sym]?.four || 0;
      if (prizeCredits) setCredits((c) => c + prizeCredits);

      const prizeInfo = POKEMON_PRIZE_MAP[sym];
      const newTicket: TicketType = {
        id: genTicketId(),
        prizeName: prizeInfo?.name ?? "Premio sorpresa",
        createdAt: Date.now(),
        redeemed: false,
      };
      setTickets((t) => [newTicket, ...t]);

      setMessage(
        <>
          <PartyPopper className="inline w-5 h-5 text-yellow-500 mr-1" />
          ¡Premio mayor! {prizeInfo?.display}{" "}
          {prizeCredits ? `(+${prizeCredits} créditos)` : ""}
        </>
      );
    } else if (sortedCounts[0] === 3) {
      // 🍪 3 iguales → Ticket de galleta
      const newTicket: TicketType = {
        id: genTicketId(),
        prizeName: "Galleta",
        createdAt: Date.now(),
        redeemed: false,
      };
      setTickets((t) => [newTicket, ...t]);

      setMessage(
        <>
          <PartyPopper className="inline w-5 h-5 text-green-500 mr-1" />
          ¡Tres iguales! 🍪 Ganaste una galleta
        </>
      );
    } else if (sortedCounts[0] === 2 && sortedCounts[1] === 2) {
      // 🎟 2 pares → +2 créditos
      setCredits((c) => c + 2);
      setMessage(
        <>
          <PartyPopper className="inline w-5 h-5 text-blue-500 mr-1" />
          ¡Dos pares! +2 créditos
        </>
      );
    } else {
      setMessage(
        <>
          <XCircle className="inline w-5 h-5 text-red-500 mr-1" /> Sin premio
        </>
      );
    }

    setSpinning(false);
  };

  const pendingTickets = useMemo(
    () => tickets.filter((t) => !t.redeemed),
    [tickets]
  );

  const onRedeem = (id: string) => {
    setTickets((ts) =>
      ts.map((t) => (t.id === id ? { ...t, redeemed: true } : t))
    );
  };

  const onAddCredits = (amount: number) => {
    setCredits((c) => c + amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-yellow-400 flex items-center justify-center p-6">
      <div className="bg-white/90 rounded-3xl shadow-2xl p-6 w-full max-w-3xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-extrabold">PokéSlots</h1>
          <div className="flex items-center gap-2">
            <Pill>Créditos: {credits}</Pill>
            <BigButton
              onClick={() => setStoreOpen(true)}
              className="!bg-white border-zinc-300 hover:bg-zinc-50"
            >
              <Wallet className="w-4 h-4 mr-1" /> Recargar
            </BigButton>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 place-items-center mb-4">
          {targets.map((sym, i) => (
            <ReelPokemon
              key={i}
              target={sym}
              spinning={spinning}
              onFinish={i === targets.length - 1 ? handleFinishAll : () => {}}
              delay={i * 250}
            />
          ))}
        </div>

        <div className="flex justify-between items-center mb-3">
          <BigButton disabled={!canPlay} onClick={spin}>
            Jugar
          </BigButton>
          <div className="text-sm text-zinc-700">4 iguales = premio físico</div>
        </div>

        <p className="text-center font-semibold mb-6">{message}</p>

        {pendingTickets.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
            <div className="font-bold flex items-center gap-2 mb-2">
              <Ticket className="w-4 h-4" /> Tickets generados
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {pendingTickets.length === 0 && (
                <div className="text-sm text-zinc-500">
                  No hay tickets pendientes de entrega.
                </div>
              )}
              {pendingTickets.map((t) => (
                <PrizeTicket key={t.id} ticket={t} onRedeem={onRedeem} />
              ))}
            </div>
          </div>
        )}
      </div>

      <CreditStore
        open={storeOpen}
        onClose={() => setStoreOpen(false)}
        onAddCredits={onAddCredits}
      />
    </div>
  );
}

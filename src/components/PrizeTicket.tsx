import { Printer, CheckCircle2 } from "lucide-react";
import type { PrizeTicket } from "../utils/persistence";

type Props = {
  ticket: PrizeTicket;
  onRedeem: (id: string) => void;
};

export default function PrizeTicket({ ticket, onRedeem }: Props) {
  const date = new Date(ticket.createdAt);
  return (
    <div className="border rounded-2xl p-4 bg-white">
      <div className="text-sm text-zinc-500">Código</div>
      <div className="text-2xl font-extrabold tracking-widest">{ticket.id}</div>
      <div className="mt-2">
        Premio: <span className="font-semibold">{ticket.prizeName}</span>
      </div>
      <div className="text-xs text-zinc-500">
        Emitido: {date.toLocaleString()}
      </div>
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => window.print()}
          className="px-3 py-2 rounded-xl border hover:bg-zinc-50 flex items-center gap-1"
        >
          <Printer className="w-4 h-4" /> Imprimir
        </button>
        {!ticket.redeemed && (
          <button
            onClick={() => onRedeem(ticket.id)}
            className="px-3 py-2 rounded-xl border hover:bg-green-50 text-green-700 flex items-center gap-1"
          >
            <CheckCircle2 className="w-4 h-4" /> Marcar entregado
          </button>
        )}
      </div>
    </div>
  );
}

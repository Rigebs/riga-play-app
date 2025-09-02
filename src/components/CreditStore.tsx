import { X, Wallet, BadgeCheck } from "lucide-react";
import BigButton from "./BigButton";

type Pack = { id: string; label: string; credits: number; price: number };

const PACKS: Pack[] = [
  { id: "p2", label: "S/ 2 → 5 créditos", credits: 5, price: 2 },
  { id: "p5", label: "S/ 5 → 15 créditos", credits: 15, price: 5 },
  { id: "p10", label: "S/ 10 → 35 créditos", credits: 35, price: 10 },
];

type Props = {
  open: boolean;
  onClose: () => void;
  onAddCredits: (amount: number) => void;
};

export default function CreditStore({ open, onClose, onAddCredits }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold flex items-center gap-2">
            <Wallet className="w-5 h-5" /> Recargar créditos
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {PACKS.map((p) => (
            <button
              key={p.id}
              onClick={() => onAddCredits(p.credits)}
              className="w-full text-left border rounded-2xl p-4 hover:bg-yellow-50 transition"
            >
              <div className="font-bold">{p.label}</div>
              <div className="text-xs text-zinc-500">
                Yapea/Plin por {`S/ ${p.price}`} y luego toca para acreditar
              </div>
            </button>
          ))}
        </div>

        <div className="mt-5 text-xs text-zinc-500 flex items-center gap-1">
          <BadgeCheck className="w-4 h-4" />
          Presenta tu voucher de Yape/Plin al encargado. Créditos no
          reembolsables.
        </div>

        <div className="mt-4 flex justify-end">
          <BigButton onClick={onClose}>Listo</BigButton>
        </div>
      </div>
    </div>
  );
}

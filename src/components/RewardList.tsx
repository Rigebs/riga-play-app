import { REWARDS } from "../utils/constants";
import { Gift } from "lucide-react";

type RewardListProps = {
  credits: number;
  onClaim: (cost: number, name: string) => void;
  claimed: Record<string, number>;
};

export default function RewardList({
  credits,
  onClaim,
  claimed,
}: RewardListProps) {
  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4">
      <h3 className="font-bold mb-3 flex items-center gap-2">
        <Gift className="w-4 h-4" /> Premios disponibles
      </h3>
      <ul className="space-y-2 text-sm">
        {REWARDS.map((r) => {
          const alreadyClaimed = claimed[r.name] || 0;
          const disabled = credits < r.cost || alreadyClaimed >= 1;

          return (
            <li
              key={r.name}
              className="flex items-center justify-between bg-black/30 rounded-lg px-3 py-2"
            >
              <span>
                {r.name}{" "}
                {alreadyClaimed > 0 && (
                  <span className="text-xs opacity-70">(canjeado)</span>
                )}
              </span>
              <button
                disabled={disabled}
                onClick={() => onClaim(r.cost, r.name)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  disabled
                    ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                    : "bg-green-500 text-black hover:bg-green-400"
                }`}
              >
                {r.cost} créditos
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

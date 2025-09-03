import { History } from "lucide-react";

type HistoryItem = { reels: string[]; result: string };

type HistoryListProps = {
  history: HistoryItem[];
};

export default function HistoryList({ history }: HistoryListProps) {
  return (
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
  );
}

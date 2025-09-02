import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pickPokemon } from "../utils/randomPokemon";
import { HelpCircle } from "lucide-react";

type ReelProps = {
  target: string;
  spinning: boolean;
  onFinish: () => void; // callback cuando termina
  delay: number;
};

export default function ReelPokemon({
  target,
  spinning,
  onFinish,
  delay,
}: ReelProps) {
  const [current, setCurrent] = useState<string>(target);

  useEffect(() => {
    if (!spinning) return;

    // Comenzar a girar tras el delay para efecto cascada
    const startTimer = window.setTimeout(() => {
      const interval = window.setInterval(() => {
        setCurrent(pickPokemon());
      }, 70);

      // Detener tras 900ms desde el inicio + delay individual
      const stopTimer = window.setTimeout(() => {
        clearInterval(interval);
        setCurrent(target);
        onFinish();
      }, 900);

      return () => {
        clearInterval(interval);
        clearTimeout(stopTimer);
      };
    }, delay);

    return () => clearTimeout(startTimer);
  }, [spinning, target, delay, onFinish]);

  return (
    <div className="w-28 h-28 bg-yellow-100 rounded-2xl flex items-center justify-center shadow-inner">
      <AnimatePresence mode="popLayout" initial={false}>
        {current ? (
          <motion.img
            key={current}
            src={current}
            alt="poke"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="w-20 h-20 object-contain"
          />
        ) : (
          <HelpCircle className="w-12 h-12 text-gray-400" />
        )}
      </AnimatePresence>
    </div>
  );
}

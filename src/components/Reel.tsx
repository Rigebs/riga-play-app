import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pickSymbol } from "../utils/random";

type ReelProps = {
  symbol: string;
  spinning: boolean;
  stopKey: string;
  index: number;
};

export default function Reel({ symbol, spinning, stopKey, index }: ReelProps) {
  const [current, setCurrent] = useState<string>(symbol);
  const timerRef = useRef<number>(0);

  useEffect(() => {
    if (!spinning) return;

    let tick = 90;
    let t = 0;

    const loop = () => {
      setCurrent(pickSymbol());
      t += tick;
      if (t < 750 && tick > 45) tick -= 5;
      timerRef.current = window.setTimeout(loop, tick) as unknown as number;
    };

    loop();
    return () => window.clearTimeout(timerRef.current);
  }, [spinning, index]);

  useEffect(() => {
    if (!spinning && stopKey) {
      let i = 0;
      const stepper = () => {
        i++;
        if (i < 4) {
          setCurrent(pickSymbol());
          window.setTimeout(stepper);
        } else {
          setCurrent(stopKey);
        }
      };
      stepper();
    }
  }, [spinning, stopKey]);

  return (
    <div className="w-24 h-24 rounded-2xl bg-zinc-900/90 flex items-center justify-center shadow-inner select-none">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={current}
          initial={{ rotateX: 0, opacity: 0, scale: 0.9 }}
          animate={{ rotateX: 360, opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-5xl leading-none"
        >
          {current}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

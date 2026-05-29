import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  delay?: number;
  decimals?: number;
}

export const useCountUp = ({
  end,
  duration = 1400,
  delay = 0,
  decimals = 0,
}: UseCountUpOptions) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(parseFloat((eased * end).toFixed(decimals)));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setCount(end);
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isInView, end, duration, delay, decimals]);

  return { count, ref };
};

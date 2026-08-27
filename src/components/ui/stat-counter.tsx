"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

export function StatCounter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  label,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.3,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div ref={ref}>
      <div className="font-mono text-3xl font-semibold tabular-nums text-accent-hover">
        {prefix}
        {display.toFixed(decimals)}
        {suffix}
      </div>
      <div className="mt-1 font-mono text-[11.5px] tracking-[0.1em] text-muted">{label}</div>
    </div>
  );
}

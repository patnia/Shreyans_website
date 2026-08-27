"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type DockItem = { label: string; href: string; icon: ReactNode };

function DockIcon({ item, mouseX }: { item: DockItem; mouseX: ReturnType<typeof useMotionValue<number>> }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return 0;
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-140, 0, 140], [46, 74, 46]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 160, damping: 14 });

  return (
    <a
      ref={ref}
      href={item.href}
      target="_blank"
      rel="noopener"
      aria-label={item.label}
      className="group relative flex flex-col items-center"
    >
      <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md bg-dark px-2.5 py-1 font-mono text-[10.5px] tracking-wide text-white opacity-0 transition-opacity group-hover:opacity-100">
        {item.label}
      </span>
      <motion.div
        style={{ width, height: width }}
        className="flex items-center justify-center rounded-2xl border border-line bg-panel text-accent-hover shadow-sm"
      >
        {item.icon}
      </motion.div>
    </a>
  );
}

export function Dock({ items }: { items: DockItem[] }) {
  const mouseX = useMotionValue(Infinity);
  return (
    <div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex items-end gap-4 rounded-2xl border border-line bg-panel px-6 py-5"
    >
      {items.map((item) => (
        <DockIcon key={item.label} item={item} mouseX={mouseX} />
      ))}
    </div>
  );
}

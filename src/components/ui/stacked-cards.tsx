"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";

type StackCard = { id: string; node: ReactNode };

const CARD_WIDTH = 220;
const SPREAD_GAP = 236;

export function StackedCards({ cards }: { cards: StackCard[] }) {
  const [hovering, setHovering] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const spread = hovering || expanded;
  const n = cards.length;

  return (
    <div
      className={`relative mx-auto h-[320px] w-full max-w-3xl ${expanded ? "" : "cursor-pointer"}`}
      style={{ perspective: 1000 }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => setExpanded(true)}
    >
      {cards.map((card, i) => {
        const offsetFromCenter = i - (n - 1) / 2;
        const spreadX = offsetFromCenter * SPREAD_GAP;
        return (
          <motion.div
            key={card.id}
            className="absolute top-1/2 left-1/2 overflow-hidden rounded-2xl border border-line bg-panel shadow-sm"
            style={{ width: CARD_WIDTH, zIndex: spread ? 10 + i : n - i }}
            animate={
              spread
                ? { x: `calc(-50% + ${spreadX}px)`, y: "-50%", scale: 1, rotate: 0 }
                : {
                    x: "-50%",
                    y: `calc(-50% + ${i * 16}px)`,
                    scale: 1 - i * 0.05,
                    rotate: i === 0 ? 0 : (i % 2 === 0 ? -2.5 : 2.5) * i,
                  }
            }
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            {card.node}
          </motion.div>
        );
      })}
    </div>
  );
}

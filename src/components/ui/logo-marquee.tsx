"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function LogoMarquee({
  logos,
  speed = 32,
}: {
  logos: { src: string; alt: string }[];
  speed?: number;
}) {
  const doubled = [...logos, ...logos];
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const maxDist = 130;
    let frame: number;

    function tick() {
      const container = containerRef.current;
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;

        for (const img of itemRefs.current) {
          if (!img) continue;
          const rect = img.getBoundingClientRect();
          const itemCenter = rect.left + rect.width / 2;
          const dist = Math.abs(itemCenter - centerX);
          const closeness = Math.max(0, 1 - dist / maxDist);
          img.style.filter = `grayscale(${(1 - closeness) * 100}%)`;
          img.style.opacity = `${0.7 + closeness * 0.3}`;
        }
      }
      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [doubled.length]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
    >
      <div
        className="flex w-max animate-marquee hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((l, i) => (
          <figure
            key={`${l.src}-${i}`}
            className="flex w-[190px] flex-none items-center justify-center border-r border-line px-6 py-4"
          >
            <Image
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              src={l.src}
              alt={l.alt}
              width={140}
              height={46}
              className="h-11 w-auto object-contain grayscale opacity-75 transition-[filter,opacity] duration-150"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PlaceholderImage } from "@/components/ui/placeholder-image";

type Step = { num: string; title: string; desc: string; image?: string };

export function ProcessSteps({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = refs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [steps.length]);

  return (
    <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
      <div>
        {steps.map((s, i) => (
          <div
            key={s.num}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={`border-l-2 py-7 pl-7 transition-colors first:pt-0 ${
              i === active ? "border-accent" : "border-line"
            }`}
          >
            <div
              className={`mb-2 font-mono text-[11px] font-bold tracking-[0.14em] transition-colors ${
                i === active ? "text-accent-hover" : "text-muted"
              }`}
            >
              {s.num}
            </div>
            <h3 className="font-heading mb-2 text-lg font-bold text-ink">{s.title}</h3>
            <p className="text-sm text-body">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="relative sticky top-28 aspect-[4/3] h-fit overflow-hidden rounded-2xl border border-line">
        {steps.map((s, i) => (
          <div
            key={s.num}
            className={`absolute inset-0 transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`}
          >
            {s.image ? (
              <Image src={s.image} alt={s.title} fill priority={i === 0} className="object-cover" />
            ) : (
              <PlaceholderImage label={s.title} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

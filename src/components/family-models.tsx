"use client";

import { useCallback, useState } from "react";
import { PartModel } from "@/components/ui/part-model";
import type { Part } from "@/data/specializations";

// V formation, in the order the parts are listed: the lead part sits at the
// point, the other two on the upper arms. `size` keeps their real proportions.
const SLOTS = [
  { box: "left-[26%] top-[40%] h-[52%] w-[48%]", size: 0.68, label: "5RO" },
  { box: "left-[5%] top-[9%] h-[42%] w-[40%]", size: 0.64, label: "O2", orientation: "0deg 90deg 0deg" },
  { box: "left-[56%] top-[9%] h-[42%] w-[40%]", size: 0.61, label: "210E", orientation: "0deg 90deg 0deg" },
];

export function FamilyModels({
  parts,
  running,
  cycleMs,
  onProgress,
  onCycle,
}: {
  parts: Part[];
  running: boolean;
  cycleMs: number;
  onProgress: (progress: number) => void;
  onCycle: () => void;
}) {
  // The turns start together once every model is in, so they stay in step.
  const [loaded, setLoaded] = useState<string[]>([]);
  const markLoaded = useCallback(
    (slug: string) => setLoaded((current) => (current.includes(slug) ? current : [...current, slug])),
    [],
  );
  const shown = parts.slice(0, SLOTS.length);
  const allLoaded = loaded.length === shown.length;

  return (
    <div className="relative h-full w-full">
      {shown.map((part, i) => (
        <figure key={part.slug} className={`absolute ${SLOTS[i].box}`}>
          <PartModel
            src={part.model}
            alt={`3D model of ${part.name}`}
            className="relative h-full w-full"
            size={SLOTS[i].size}
            orientation={SLOTS[i].orientation}
            motion="spin"
            cycleMs={cycleMs}
            running={running && allLoaded}
            onLoaded={() => markLoaded(part.slug)}
            onProgress={i === 0 ? onProgress : undefined}
            onCycle={i === 0 ? onCycle : undefined}
          />
          <figcaption className="absolute inset-x-0 bottom-[4%] text-center font-mono text-[11px] tracking-[0.14em] text-white/65">
            {SLOTS[i].label}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

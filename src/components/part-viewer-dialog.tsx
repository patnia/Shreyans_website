"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { PartModel } from "@/components/ui/part-model";
import { ColourNote } from "@/components/ui/colour-note";
import type { Highlight, Part } from "@/data/specializations";

export function PartViewerDialog({
  specialization,
  onClose,
}: {
  specialization: { category: string; highlight: Highlight; parts: Part[]; tabsByName?: boolean };
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const part = specialization.parts[idx];

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="theme-dark fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={part.name}
        className="relative grid max-h-full w-full max-w-5xl overflow-y-auto rounded-2xl border border-line bg-panel md:grid-cols-[1.1fr_0.9fr]"
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-line bg-panel text-ink transition-colors hover:border-accent"
        >
          <X size={18} />
        </button>

        <div
          className="relative min-h-[300px] md:min-h-[480px]"
          style={{ background: "radial-gradient(circle at 50% 42%, #263647, #0b1118 75%)" }}
        >
          <PartModel key={part.slug} src={part.model} alt={part.name} interactive className="absolute inset-0" />
          <div className="pointer-events-none absolute inset-x-4 bottom-3 space-y-1.5">
            <ColourNote highlight={part.highlight ?? specialization.highlight} />
            <span className="block font-mono text-[11px] tracking-[0.1em] text-white/45">
              DRAG TO ROTATE · SCROLL TO ZOOM
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-6 md:p-8">
          <div className="font-mono text-[11px] font-bold tracking-[0.16em] text-muted">
            {specialization.category.toUpperCase()} · NO. {part.number}
          </div>
          <h3 className="font-heading pr-10 text-2xl font-bold text-ink">{part.name}</h3>

          {specialization.parts.length > 1 && (
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Variants">
              {specialization.parts.map((p, i) => (
                <button
                  key={p.slug}
                  role="tab"
                  aria-selected={i === idx}
                  onClick={() => setIdx(i)}
                  className={`rounded-full border px-3 py-1 font-mono text-[11px] transition-colors ${
                    i === idx
                      ? "border-accent bg-accent text-accent-ink"
                      : "border-line text-body hover:border-accent"
                  }`}
                >
                  {specialization.tabsByName ? p.name : p.number}
                </button>
              ))}
            </div>
          )}

          <div className="space-y-3 text-sm text-body">
            {part.description.map((d) => (
              <p key={d}>{d}</p>
            ))}
          </div>

          <dl className="grid grid-cols-2 gap-2">
            {part.specs.map((s) => (
              <div key={s.label} className="rounded-lg border border-line px-3 py-2">
                <dt className="font-mono text-[10px] tracking-[0.12em] text-muted">{s.label.toUpperCase()}</dt>
                <dd className="mt-0.5 text-sm text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-auto flex flex-wrap gap-3 pt-2">
            <Link
              href="/contact/"
              className="inline-flex items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-accent-ink transition-colors hover:bg-accent-hover"
            >
              Request a quote for this part
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { PartModel } from "@/components/ui/part-model";
import { FamilyModels } from "@/components/family-models";
import { ColourNote } from "@/components/ui/colour-note";
import { PartViewerDialog } from "@/components/part-viewer-dialog";
import { specializations } from "@/data/specializations";

// One full turn per slide; assemblies get longer to pull apart and rejoin.
const SPIN_MS = 6000;
const EXPLODE_MS = 7500;
const pad = (n: number) => String(n).padStart(2, "0");

export function HeroSlideshow() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const n = specializations.length;
  const slide = specializations[i];
  const part = slide.parts[0];

  const go = useCallback((d: number) => setI((c) => (c + d + n) % n), [n]);
  const closeDialog = useCallback(() => setOpen(false), []);
  const onProgress = (p: number) => {
    if (bar.current) bar.current.style.width = `${p * 100}%`;
  };
  // A slide only advances once the model has finished its whole cycle.
  const onCycle = () => {
    if (playing) go(1);
  };

  useEffect(() => {
    if (bar.current) bar.current.style.width = "0%";
  }, [i]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);

  useEffect(() => {
    const upcoming = specializations[(i + 1) % n];
    const next = upcoming.explode?.model ?? upcoming.parts[0].model;
    const id = window.setTimeout(() => {
      fetch(next).catch(() => {});
    }, 1500);
    return () => window.clearTimeout(id);
  }, [i, n]);

  return (
    <>
      <section
        className="theme-dark relative isolate overflow-hidden bg-bg"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 80% at 72% 46%, #263647 0%, #0e151d 72%)",
        }}
        aria-roledescription="carousel"
        aria-label="Featured specialised parts"
      >
        <div className={`absolute inset-x-0 top-0 h-[54%] md:inset-y-0 md:h-full ${["installation-lever", "rod-end-bearing"].includes(slide.id) ? "md:left-[34%]" : "md:left-[24%]"}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              className="h-full w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {slide.showFamily ? (
                <FamilyModels
                  parts={slide.parts}
                  running={!open}
                  cycleMs={SPIN_MS}
                  onProgress={onProgress}
                  onCycle={onCycle}
                />
              ) : (
                <PartModel
                  src={slide.explode?.model ?? part.model}
                  alt={`3D model of ${part.name}`}
                  className="relative h-full w-full"
                  size={slide.heroSize}
                  explode={slide.explode}
                  motion={slide.explode ? "explode" : "spin"}
                  cycleMs={slide.explode ? EXPLODE_MS : SPIN_MS}
                  running={!open}
                  onProgress={onProgress}
                  onCycle={onCycle}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-[50%] bg-gradient-to-r from-dark from-30% via-dark/60 to-transparent md:block"
          aria-hidden="true"
        />

        <div className="pointer-events-none relative mx-auto h-[calc(100svh-80px)] min-h-[620px] max-h-[820px] max-w-6xl">
          <ColourNote
            highlight={slide.highlight}
            className="absolute bottom-[68px] left-6 right-6 z-10 md:bottom-[64px] md:left-auto md:justify-end"
          />

          <div className="pointer-events-auto relative z-10 flex h-full w-fit flex-col justify-end px-6 pb-32 md:max-w-[48%] md:pb-20">
            <div className="mb-auto hidden pt-8 font-mono text-[11px] tracking-[0.16em] text-muted md:block">
              PRECISION MACHINED COMPONENTS · SINCE 1989
            </div>
            <h1 className="sr-only">Precision parts, built to your drawing.</h1>

            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                aria-live={playing ? "off" : "polite"}
              >
                <div className="mb-3 font-mono text-[11px] tracking-[0.16em] text-accent">
                  {slide.category.toUpperCase()}
                </div>
                <h2 className="font-heading text-3xl font-bold leading-[1.05] text-ink sm:text-4xl md:text-[3.35rem]">
                  {slide.headline}
                </h2>
                <p className="mt-3 max-w-[44ch] text-sm text-body sm:text-base">{slide.line}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => setOpen(true)}
                    className="inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-ink transition-colors hover:bg-accent-hover"
                  >
                    View part
                  </button>
                  <Link
                    href="/products/"
                    className="inline-flex items-center rounded-full border border-ink/40 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                  >
                    Full product catalog
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="pointer-events-auto absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between gap-4 md:bottom-24 md:left-auto md:right-6">
            <span className="font-mono text-xs tabular-nums text-body">
              {pad(i + 1)} / {pad(n)}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                className="grid h-9 w-9 place-items-center rounded-full border border-line bg-panel/60 text-ink transition-colors hover:border-accent"
              >
                {playing ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <button
                onClick={() => go(-1)}
                aria-label="Previous slide"
                className="grid h-9 w-9 place-items-center rounded-full border border-line bg-panel/60 text-ink transition-colors hover:border-accent"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next slide"
                className="grid h-9 w-9 place-items-center rounded-full border border-line bg-panel/60 text-ink transition-colors hover:border-accent"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 h-[3px] bg-white/10">
          <div ref={bar} className={`h-full bg-accent ${playing ? "" : "invisible"}`} style={{ width: "0%" }} />
        </div>
      </section>

      {open && <PartViewerDialog specialization={slide} onClose={closeDialog} />}
    </>
  );
}

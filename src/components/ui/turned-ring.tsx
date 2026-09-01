/** Precision & Prestige signature motif — concentric rings like the face of a
 * CNC-turned part, rendered in the market's accent color. */
export function TurnedRing() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-[8%] top-1/2 h-[70vw] max-h-[560px] w-[70vw] max-w-[560px] -translate-y-1/2 rounded-full opacity-40"
      style={{
        backgroundImage:
          "repeating-radial-gradient(circle at center, color-mix(in srgb, var(--color-accent) 55%, transparent) 0px, color-mix(in srgb, var(--color-accent) 55%, transparent) 1.5px, transparent 1.5px, transparent 14px)",
        WebkitMaskImage: "radial-gradient(circle at center, black 60%, transparent 100%)",
        maskImage: "radial-gradient(circle at center, black 60%, transparent 100%)",
      }}
    />
  );
}

/** Precision & Prestige signature motif — concentric rings like the face of a
 * CNC-turned part, rendered in the market's accent color. */
export function TurnedRing() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-0 h-[180px] w-[180px] translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 md:h-[320px] md:w-[320px]"
      style={{
        backgroundImage:
          "repeating-radial-gradient(circle at center, color-mix(in srgb, var(--color-accent) 55%, transparent) 0px, color-mix(in srgb, var(--color-accent) 55%, transparent) 1.5px, transparent 1.5px, transparent 14px)",
        WebkitMaskImage: "radial-gradient(circle closest-side, black 55%, transparent 100%)",
        maskImage: "radial-gradient(circle closest-side, black 55%, transparent 100%)",
      }}
    />
  );
}

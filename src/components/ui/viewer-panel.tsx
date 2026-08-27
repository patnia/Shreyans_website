import { MovingBorderButton } from "@/components/ui/moving-border";

export function ViewerPanel() {
  return (
    <div className="overflow-hidden rounded-2xl border border-dark-line bg-dark text-white">
      <div className="grid md:grid-cols-2">
        <div className="p-8 md:p-11">
          <div className="mb-3 font-mono text-xs tracking-[0.14em] text-accent">SEE A REAL PART, LIVE</div>
          <h2 className="font-heading mb-3 text-2xl font-bold text-white">
            Every part page can carry its own interactive 3D model.
          </h2>
          <p className="mb-6 max-w-md text-sm text-white/60">
            We already build spin-and-inspect 3D viewers straight from CAD for our part catalogue, so an overseas
            buyer can rotate, present and check a component before a sample ever ships.
          </p>
          <div className="mb-7 flex flex-wrap gap-2">
            {["316 STAINLESS", "SINGLE-START WORM", "Ø WITHIN 2µm"].map((t) => (
              <span key={t} className="rounded-full border border-accent/40 px-3 py-1 font-mono text-[11px] text-accent">
                {t}
              </span>
            ))}
          </div>
          <MovingBorderButton href="/viewer/71246000.html" target="_blank" borderRadius="0.75rem" duration={2600}>
            Open full viewer →
          </MovingBorderButton>
        </div>
        <div className="relative min-h-[320px] bg-black/20">
          <video
            src="/videos/gear-loop.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-full min-h-[320px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

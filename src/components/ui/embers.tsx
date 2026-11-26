// Deterministic pseudo-random (no Math.random) so server/client markup matches.
function pseudo(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

const COUNT = 30;
const r2 = (n: number) => Math.round(n * 100) / 100;
const EMBERS = Array.from({ length: COUNT }, (_, i) => ({
  left: r2(Math.min(98, (i / COUNT) * 100 + pseudo(i, 1) * 3)),
  delay: r2(pseudo(i, 2) * 2.2),
  duration: r2(4.7 + pseudo(i, 3) * 0.6),
  size: r2(3 + pseudo(i, 4) * 3),
}));

export function Embers({ count = EMBERS.length }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {EMBERS.slice(0, count).map((e, i) => (
        <span
          key={i}
          className="animate-ember-rise absolute bottom-[-5%] rounded-full"
          style={{
            left: `${e.left}%`,
            width: e.size,
            height: e.size,
            background: "radial-gradient(circle, #ffd8a8, var(--color-accent) 60%, transparent 100%)",
            animationDelay: `${e.delay}s`,
            animationDuration: `${e.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

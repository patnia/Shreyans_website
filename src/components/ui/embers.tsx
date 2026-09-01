const POSITIONS = [10, 22, 34, 48, 60, 72, 84, 92];

export function Embers({ count = 8 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {POSITIONS.slice(0, count).map((left, i) => (
        <span
          key={left}
          className="animate-ember-rise absolute bottom-[-5%] h-1 w-1 rounded-full"
          style={{
            left: `${left}%`,
            background: "radial-gradient(circle, #ffd8a8, var(--color-accent) 60%, transparent 100%)",
            animationDelay: `${i * 1.3}s`,
            animationDuration: `${7 + (i % 3)}s`,
          }}
        />
      ))}
    </div>
  );
}

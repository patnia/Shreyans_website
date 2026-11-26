export function ColourNote({
  highlight,
  className = "",
}: {
  highlight: { color: string; text: string };
  className?: string;
}) {
  return (
    <p className={`flex items-center gap-1.5 font-mono text-[10px] leading-snug text-white/40 ${className}`}>
      <span
        className="h-1.5 w-1.5 flex-none rounded-full opacity-70"
        style={{ background: highlight.color }}
        aria-hidden="true"
      />
      <span>{highlight.text}</span>
    </p>
  );
}

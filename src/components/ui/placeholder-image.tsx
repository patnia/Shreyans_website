import { ImageIcon } from "lucide-react";

export function PlaceholderImage({ label, className = "" }: { label?: string; className?: string }) {
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-[repeating-linear-gradient(135deg,var(--color-line)_0px,var(--color-line)_1px,transparent_1px,transparent_12px)] bg-panel ${className}`}
    >
      <ImageIcon size={28} strokeWidth={1.5} className="text-muted" />
      {label && <span className="font-mono text-[10.5px] tracking-[0.08em] text-muted">{label}</span>}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  children,
  decoration,
}: {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  children?: React.ReactNode;
  decoration?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-dark to-dark-2 text-ink">
      {decoration}
      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mb-3 font-mono text-xs tracking-[0.16em] text-accent">{eyebrow}</div>
        <h1 className="font-heading max-w-[26ch] text-3xl font-bold text-ink md:text-4xl">{title}</h1>
        {children && <p className="mt-4 max-w-[62ch] text-body">{children}</p>}
      </div>
    </section>
  );
}

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
    <section className="relative overflow-hidden border-b border-line bg-panel">
      {decoration}
      <div className="relative mx-auto grid max-w-6xl gap-6 px-6 pt-14 pb-10 md:grid-cols-[1.15fr_0.85fr] md:items-end md:gap-14 md:pt-20 md:pb-12">
        <div>
          <div className="mb-4 font-mono text-xs tracking-[0.16em] text-accent">{eyebrow}</div>
          <h1 className="font-heading max-w-[18ch] text-4xl font-extrabold leading-[1.08] text-ink md:text-5xl">
            {title}
          </h1>
        </div>
        {children && <p className="max-w-[52ch] text-base text-body md:pb-1.5">{children}</p>}
      </div>
    </section>
  );
}

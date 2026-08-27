export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-gradient-to-br from-dark to-dark-2 text-[#EAF3E8]">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mb-3 font-mono text-xs tracking-[0.16em] text-[#8FD787]">{eyebrow}</div>
        <h1 className="font-heading max-w-[26ch] text-3xl font-bold text-white md:text-4xl">{title}</h1>
        {children && <p className="mt-4 max-w-[62ch] text-white/70">{children}</p>}
      </div>
    </section>
  );
}

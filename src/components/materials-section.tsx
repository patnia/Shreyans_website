type Material = { name: string; note: string; swatch: string };
type Family = { name: string; materials: Material[] };

// Each swatch is a sheen in the material's natural tone.
const sheen = (dark: string, mid: string, light: string) =>
  `linear-gradient(135deg, ${dark} 0%, ${mid} 35%, ${light} 50%, ${mid} 65%, ${dark} 100%)`;

const families: Family[] = [
  {
    name: "Copper alloys",
    materials: [
      { name: "Brass", note: "Free cutting; fittings, inserts and terminals", swatch: sheen("#8a6a1f", "#c9a24a", "#f3dc93") },
      { name: "Copper", note: "High electrical and thermal conductivity", swatch: sheen("#7a3b1d", "#c26b3f", "#eeac83") },
      { name: "Beryllium-copper", note: "High strength with good conductivity, for contacts and springs", swatch: sheen("#8c5a2a", "#cd9455", "#f1c98f") },
      { name: "Nickel silver", note: "Corrosion resistant with a silvery finish", swatch: sheen("#77756a", "#b9b6a6", "#ebe8da") },
      { name: "Gunmetal (phosphor bronze)", note: "Wear resistant, for bushes and bearing parts", swatch: sheen("#5c3d22", "#9c6f43", "#d2a979") },
    ],
  },
  {
    name: "Steels",
    materials: [
      { name: "Stainless steel", note: "Including SS 303, 304, 316 and 430 (SUS430)", swatch: sheen("#555b62", "#9aa1a9", "#e3e7eb") },
      { name: "Alloy steel", note: "Grades include 12L14, for high-volume turning", swatch: sheen("#33363a", "#6a6f75", "#b0b5ba") },
    ],
  },
  {
    name: "Aluminium",
    materials: [
      { name: "Aluminium", note: "Including AL 6351-T6, machined and anodised", swatch: sheen("#8d9399", "#c3c8cd", "#f4f6f8") },
    ],
  },
  {
    name: "Nickel alloys",
    materials: [
      { name: "Inconel", note: "Nickel-chromium alloy for high-temperature service", swatch: sheen("#4c4a45", "#8d887c", "#cfc9ba") },
      { name: "Monel", note: "Nickel-copper alloy for corrosive service", swatch: sheen("#5e5a53", "#a29b8e", "#dcd5c6") },
    ],
  },
  {
    name: "Engineering polymers",
    materials: [
      { name: "PEEK", note: "High-performance polymer, resists heat and chemicals", swatch: sheen("#6e5a3e", "#a98f68", "#cdb690") },
      { name: "Teflon (PTFE)", note: "Very low friction and chemically inert", swatch: sheen("#c9c9c4", "#e8e8e3", "#ffffff") },
    ],
  },
];

export function MaterialsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-3 font-mono text-xs font-bold tracking-[0.16em] text-muted">MATERIALS WE MACHINE</div>
      <h2 className="font-heading mb-10 max-w-[30ch] text-3xl font-bold text-ink">
        From free-cutting brass to nickel alloys and PEEK.
      </h2>
      <div>
        {families.map((family) => (
          <div key={family.name} className="grid gap-4 border-t border-line py-6 md:grid-cols-[220px_1fr] md:gap-8">
            <h3 className="font-heading text-xl font-bold text-ink">{family.name}</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {family.materials.map((m) => (
                <li key={m.name} className="flex items-center gap-4 rounded-xl border border-line bg-panel p-3">
                  <span
                    className="h-14 w-14 flex-none rounded-full shadow-inner ring-1 ring-black/10"
                    style={{ background: m.swatch }}
                    aria-hidden="true"
                  />
                  <span className="min-w-0">
                    <span className="block font-semibold text-ink">{m.name}</span>
                    <span className="block text-sm text-body">{m.note}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

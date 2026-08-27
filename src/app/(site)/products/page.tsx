import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { MovingBorderButton } from "@/components/ui/moving-border";

const sectors = ["Automotive", "Agriculture", "Construction", "Tools & Accessories", "Oil & Gas", "Telecom & Switchgear"];

const products = [
  { img: "shafts.jpg", name: "Dowells, Pins & Shafts", desc: "Ground, polished, passivated, electroplated and super-finished.", meta: "Stainless steel, brass · Ø within 2µm · below Ra 0.5" },
  { img: "automotive.jpg", name: "Automotive Parts", desc: "Child parts for solenoid valves, EGR, central locking, dashboard and sensors.", meta: "Brass, SS 303/430/316, aluminium, polymer, alloy steel" },
  { img: "farm.jpg", name: "Farm Accessories", desc: "Eye bolts, hinge pins, forged & cold-forged pins, Cat 1/2/3 balls, bushes, sleeves.", meta: "Forged & machined" },
  { img: "hydraulic.jpg", name: "Hydraulic Fittings", desc: "Straight and bend fittings in metric, NPT and BSPT threads.", meta: "Alloy steel, stainless steel" },
  { img: "boss-sensors.jpg", name: "Boss Sensors", desc: "Bar turning, investment casting, milling and pre-curved forms.", meta: "Stainless steel 303/304/430" },
  { img: "profile.jpg", name: "Profile Machining", desc: "Profile-machined components to drawing.", meta: "Brass, aluminium" },
  { img: "castings.jpg", name: "Investment Castings", desc: "Up to 800×800×550 mm, 15 g to 100 kg per piece.", meta: "Ra 3.0–6.0 · ISO 8062 / DIN 1680 II · alloy, duplex & PH stainless, nickel alloys" },
  { img: "oil-gas.jpg", name: "Oil & Gas Parts", desc: "Valves, seats, flanges, gates, stems, bonnets, bearing caps, retainers.", meta: "Steel 4130, SS 316/410, 17-4 PH · nitriding, lapping, TC coating" },
  { img: "telecom.jpg", name: "Telecom & Switchgear", desc: "Grub screws, inserts and terminals for surge arrestors and DC blocks.", meta: "Brass, beryllium copper, nickel silver" },
];

export default function ProductsPage() {
  return (
    <>
      <PageHeader eyebrow="PRODUCT PROFILE" title="What we make.">
        Turned, forged, cast and finished precision parts, each produced to customer drawing and inspected against
        defined check sheets.
      </PageHeader>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-3 font-mono text-xs font-bold tracking-[0.16em] text-muted">SECTORS WE SERVE</div>
        <div className="mb-10 flex flex-wrap gap-2">
          {sectors.map((s) => (
            <span key={s} className="rounded-md border border-line bg-panel px-3 py-1.5 text-[13px] text-ink">{s}</span>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div key={p.name} className="overflow-hidden rounded-2xl border border-line bg-panel transition-transform hover:-translate-y-1">
              <div className="aspect-[4/3] overflow-hidden bg-dark">
                <Image src={`/images/products/${p.img}`} alt={p.name} width={400} height={300} className="h-full w-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="mb-1.5 text-[17px] font-bold text-ink">{p.name}</h3>
                <p className="mb-3 text-sm text-body">{p.desc}</p>
                <div className="border-t border-line pt-2.5 text-xs text-muted">{p.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-panel">
        <div className="mx-auto max-w-2xl px-6 py-16 text-center">
          <h2 className="font-heading mb-3 text-2xl font-bold text-ink">Don&apos;t see your part?</h2>
          <p className="mb-7 text-body">If it&apos;s turned, milled, forged or cast, we likely make it. Send the drawing.</p>
          <MovingBorderButton href="/contact/" borderRadius="0.75rem">
            Request a quote
          </MovingBorderButton>
        </div>
      </section>
    </>
  );
}

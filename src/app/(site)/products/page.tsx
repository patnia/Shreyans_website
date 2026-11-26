import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { MarketText } from "@/components/market-text";
import { SpecializationGrid } from "@/components/specialization-grid";
import { Car, HardHat, RadioTower, Tractor, Wrench } from "lucide-react";

const sectors = [
  { name: "Automotive", Icon: Car },
  { name: "Agriculture", Icon: Tractor },
  { name: "Construction", Icon: HardHat },
  { name: "Tools & Accessories", Icon: Wrench },
  { name: "Telecom & Switchgear", Icon: RadioTower },
];

const products = [
  { img: "shafts.jpg", name: "Dowells, Pins & Shafts", desc: "Ground, polished, passivated, electroplated and super-finished.", meta: "Stainless steel, brass · Ø within 2µm · below Ra 0.5" },
  { img: "automotive.jpg", name: "Automotive Parts", desc: "Child parts for solenoid valves, EGR, central locking, dashboard and sensors.", meta: "Brass, SS 303/430/316, aluminium, polymer, alloy steel" },
  { img: "farm.jpg", name: "Farm Accessories", desc: "Eye bolts, hinge pins, forged & cold-forged pins, Cat 1/2/3 balls, bushes, sleeves.", meta: "Forged & machined" },
  { img: "hydraulic.jpg", name: "Hydraulic Fittings", desc: "Straight and bend fittings in metric, NPT and BSPT threads.", meta: "Alloy steel, stainless steel" },
  { img: "boss-sensors.jpg", name: "Boss Sensors", desc: "Bar turning, investment casting, milling and pre-curved forms.", meta: "Stainless steel 303/304/430" },
  { img: "profile.jpg", name: "Profile Machining", desc: "Profile-machined components to drawing.", meta: "Brass, aluminium" },
  { img: "castings.jpg", name: "Investment Castings", desc: "Up to 800×800×550 mm, 15 g to 100 kg per piece.", meta: "Ra 3.0–6.0 · ISO 8062 / DIN 1680 II · alloy, duplex & PH stainless, nickel alloys" },
  { img: "telecom.jpg", name: "Telecom & Switchgear", desc: "Grub screws, inserts and terminals for surge arrestors and DC blocks.", meta: "Brass, beryllium copper, nickel silver" },
];

// Rebuilt from the original product PDFs on a common white 4:3 frame.
const thumbs = new Set(["shafts.jpg", "automotive.jpg", "farm.jpg", "profile.jpg", "castings.jpg"]);

export default function ProductsPage() {
  return (
    <>
      <PageHeader eyebrow="PRODUCT PROFILE" title={<MarketText dom="What we deliver." intl="What we make." />}>
        <MarketText
          dom="Turned, forged, cast and finished precision parts. We manufacture select families in-house and source the rest through our audited partner network — one point of contact, full QCD ownership either way."
          intl="Turned, forged, cast and finished precision parts, machined in-house to your drawing and inspected against defined check sheets."
        />
      </PageHeader>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 className="font-heading text-3xl font-bold text-ink">Specialisations</h2>
        <p className="mb-8 mt-2 max-w-[60ch] text-body">Open any part to turn it in 3D and read its specification.</p>
        <SpecializationGrid />
      </section>

      <section id="families" className="scroll-mt-20 border-y border-line bg-panel">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <h2 className="font-heading mb-8 text-3xl font-bold text-ink">Other parts</h2>
          <div className="grid gap-x-12 md:grid-cols-2">
            {products.map((p) => (
              <article key={p.name} className="grid items-start gap-4 border-t border-line py-6 sm:grid-cols-[220px_1fr] sm:gap-5">
                <div className="aspect-[4/3] overflow-hidden rounded-xl border border-line bg-white">
                  <Image src={thumbs.has(p.img) ? `/images/products/thumbs/${p.img}` : `/images/products/${p.img}`} alt={p.name} width={800} height={600} className="h-full w-full object-contain" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading text-lg font-bold text-ink">{p.name}</h3>
                  <p className="mt-1 text-sm text-body">{p.desc}</p>
                  <p className="mt-2 text-xs text-muted">{p.meta}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-heading mb-8 text-3xl font-bold text-ink">Sectors we serve</h2>
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
          {sectors.map(({ name, Icon }) => (
            <li key={name} className="flex flex-col items-center gap-3 bg-panel px-3 py-8 text-center max-sm:last:col-span-2">
              <Icon size={30} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
              <span className="text-sm font-semibold text-ink">{name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-line bg-panel">
        <div className="mx-auto max-w-2xl px-6 py-16 text-center">
          <h2 className="font-heading mb-3 text-2xl font-bold text-ink">Don&apos;t see your part?</h2>
          <p className="mb-7 text-body">
            <MarketText
              dom="If it's turned, milled, forged or cast, we can manufacture or source it. Send the drawing and target volumes."
              intl="If it's turned, milled, forged or cast, we likely make it. Send the drawing."
            />
          </p>
          <MovingBorderButton href="/contact/" borderRadius="0.75rem">
            Request a quote
          </MovingBorderButton>
        </div>
      </section>
    </>
  );
}

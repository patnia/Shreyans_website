import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { StackedCards } from "@/components/ui/stacked-cards";
import { MovingBorderButton } from "@/components/ui/moving-border";

const checklist = [
  "Run by people trained in the OEM work environment",
  "Diameter accuracy within 2 microns",
  "Surface finish below Ra 0.5",
  "Standard or customer check sheets per part",
  "In-process inspection during production",
  "Final inspection before every dispatch",
  "Factory, process & product audits for export (QCD managed)",
];

const badges = [
  { ring: "★", title: "IATF 16949:2016", sub: "Certified quality management system" },
  { ring: "Z", title: "ZED Certified", sub: "Zero Defect, Zero Effect manufacturing" },
  { ring: "M", title: "Maruti Green Zone", sub: "Recognised supplier performance" },
];

const castingStandards = ["ISO 8062", "DIN 1680 Class II", "IS 11160 Class-II", "VDG P690", "ISO 276B"];

const certCards = [
  { id: "iatf", img: "/images/certs/iatf-16949.png", title: "IATF 16949:2016", sub: "Automotive quality management" },
  { id: "zed", img: "/images/certs/zed.png", title: "ZED Certified", sub: "Zero Defect · Zero Effect" },
  { id: "mgz", img: "/images/certs/maruti-green-zone.png", title: "Maruti Green Zone", sub: "Supplier performance recognition" },
];

export default function QualityPage() {
  return (
    <>
      <PageHeader eyebrow="QUALITY & CERTIFICATIONS" title="Certified, documented, inspected.">
        Quality isn&apos;t a claim. It&apos;s a paper trail. Every order runs against a defined check sheet, with
        in-process and final inspection before dispatch.
      </PageHeader>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-3 font-mono text-xs font-bold tracking-[0.16em] text-muted">CERTIFICATIONS</div>
        <h2 className="font-heading mb-10 text-3xl font-bold text-ink">Independently verified.</h2>
        <StackedCards
          cards={certCards.map((c) => ({
            id: c.id,
            node: (
              <div className="flex h-full flex-col p-5">
                <div className="mb-4 flex-1 overflow-hidden rounded-lg border border-line">
                  <Image src={c.img} alt={c.title} width={280} height={200} className="h-full w-full object-cover" />
                </div>
                <div className="font-bold text-ink">{c.title}</div>
                <div className="text-sm text-muted">{c.sub}</div>
              </div>
            ),
          }))}
        />
        <p className="mx-auto mt-6 max-w-sm text-center text-xs text-muted">Hover to preview, click to view all three certifications</p>
      </section>

      <section className="border-y border-line bg-panel">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2">
          <div>
            <div className="mb-3 font-mono text-xs font-bold tracking-[0.16em] text-muted">HOW WE HOLD QUALITY</div>
            <h2 className="font-heading mb-6 text-3xl font-bold text-ink">Measured, not assumed.</h2>
            <ul>
              {checklist.map((c) => (
                <li key={c} className="flex items-center gap-3 border-b border-line py-3 text-[15px]">
                  <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent text-[10px] text-accent-ink">✓</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-4 flex flex-col gap-3">
              {badges.map((b) => (
                <div key={b.title} className="flex items-center gap-4 rounded-xl border border-line bg-bg p-4">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full border-2 border-accent font-bold text-accent-hover">
                    {b.ring}
                  </span>
                  <div>
                    <div className="font-semibold text-ink">{b.title}</div>
                    <div className="text-sm text-muted">{b.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-3 font-mono text-xs font-bold tracking-[0.16em] text-muted">CASTING STANDARDS</div>
            <div className="flex flex-wrap gap-2">
              {castingStandards.map((s) => (
                <span key={s} className="rounded-md border border-line bg-bg px-3 py-1.5 text-[13px] text-ink">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-16 text-center">
        <h2 className="font-heading mb-3 text-2xl font-bold text-ink">Quality questions before you commit?</h2>
        <p className="mb-7 text-body">We&apos;re happy to walk you through our inspection process.</p>
        <MovingBorderButton href="/contact/" borderRadius="0.75rem">
          Talk to us
        </MovingBorderButton>
      </section>
    </>
  );
}

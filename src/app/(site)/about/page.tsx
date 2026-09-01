import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { MarketText } from "@/components/market-text";

const milestones = [
  { yr: "1989", text: "Shreyans Group founded by Mr. Shreyans Patni; precision turned parts and sub-assemblies for Indian OEMs, from Faridabad, Haryana." },
  { yr: "1990s–2000s", text: "Capacity expands across CNC turning, sliding-head automats and machining centres; metrology lab built out." },
  { yr: "Certified", text: "IATF 16949:2016 quality management and ZED certification; recognised as a Maruti Green Zone Supplier." },
  { yr: "Export", text: "Shreyans AgriCon Products (SAP) launched for the export segment: a single-source S.P.A. model now serving the USA, Canada and Indonesia." },
];

const team = [
  { name: "Mr. Shreyans Patni", role: "FOUNDER & PROMOTER", img: "/images/team/founder.jpg", desc: "Founded Shreyans Group in 1989; technical expert in precision manufacturing." },
  { name: "Suparsh Patni", role: "DIRECTOR", img: "/images/team/placeholder.png", desc: "Leads operations and customer relationships." },
  { name: "Amit Singla", role: "SALES & SOURCING", img: "/images/team/placeholder.png", desc: "Export enquiries and sourcing coordination." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow={<MarketText dom="ABOUT SHREYANS AUTO & COMPONENTS" intl="ABOUT SHREYANS AGRICON PRODUCTS" />}
        title="Three decades in precision engineering."
      >
        <MarketText
          dom="For over thirty years, Shreyans Auto & Components (SAC) has been a reliable source of high-precision machined parts and complex sub-assemblies for India's major industrial and automotive clients, and, through Shreyans Agricon Products (SAP), a single-source export partner to the world."
          intl="For over thirty years, Shreyans Group has manufactured high-precision machined parts and complex sub-assemblies for India's major OEMs. Shreyans AgriCon Products (SAP) brings that same discipline to you as a single-source export partner."
        />
      </PageHeader>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-3 font-mono text-xs font-bold tracking-[0.16em] text-muted">MILESTONES</div>
          <h2 className="font-heading mb-10 text-3xl font-bold text-ink">How we grew.</h2>
          <div className="relative">
            <div className="absolute left-2 right-2 top-2 hidden h-px bg-line md:block" />
            <div className="grid gap-8 md:grid-cols-4">
              {milestones.map((m) => (
                <div key={m.yr}>
                  <span className="relative z-10 mb-4 block h-4 w-4 rounded-full border-4 border-bg bg-accent md:border-[color:var(--color-panel)]" />
                  <div className="font-mono text-lg font-bold text-ink">{m.yr}</div>
                  <p className="mt-1 text-sm text-body">{m.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div>
          <div className="mb-3 font-mono text-xs font-bold tracking-[0.16em] text-muted">OUR STORY</div>
          <h2 className="font-heading mb-4 max-w-[24ch] text-3xl font-bold text-ink">
            From a Faridabad workshop to a 100% OEM supplier.
          </h2>
          <p className="max-w-[60ch] text-body">
            <MarketText
              dom="Established in 1989, Shreyans Auto built its name supplying quality precision turned parts and sub-assemblies to India's OEMs, run by a team trained in the OEM work environment with a well-equipped inspection system. Today the same capability serves automotive, agriculture, construction, tools & accessories, oil & gas, telecom and switchgear customers across the country."
              intl="Established in 1989, Shreyans Group built its name manufacturing quality precision turned parts and sub-assemblies for India's OEMs. Shreyans AgriCon Products (SAP) extends that capability to export customers on a single-source S.P.A. model: we manufacture select families in-house and source the rest through our audited partner network, so you get one point of contact and full QCD ownership."
            />
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-line">
          <Image src="/images/shopfloor.jpg" alt="Shop floor" width={640} height={480} className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-line md:order-first order-last">
          <Image src="/images/team/founder.jpg" alt="Mr. Shreyans Patni" width={640} height={480} className="h-full w-full object-cover" />
        </div>
        <div>
          <div className="mb-3 font-mono text-xs font-bold tracking-[0.16em] text-muted">FOUNDER</div>
          <h2 className="font-heading mb-4 text-3xl font-bold text-ink">Mr. Shreyans Patni (right)</h2>
          <p className="max-w-[60ch] text-body">
            A technical expert in the manufacture of precision components. Before founding Shreyans Group in 1989, he
            spent 22 years at Jayna Times, among India&apos;s first makers of wrist watches and clocks, and at
            Birla VXL Ltd., manufacturing sophisticated time and mechanical equipment for defence. That
            precision-instrument background still defines how SAC works.
          </p>
          <p className="mt-3 text-sm text-muted">Pictured receiving recognition from the Maruti Centre for Excellence (MACE).</p>
        </div>
      </section>

      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-3 font-mono text-xs font-bold tracking-[0.16em] text-muted">LEADERSHIP & TEAM</div>
          <h2 className="font-heading mb-10 text-3xl font-bold text-ink">The people behind the parts.</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {team.map((t) => (
              <div key={t.name} className="overflow-hidden rounded-2xl border border-line bg-bg">
                <div className="aspect-square overflow-hidden bg-accent-light">
                  <Image src={t.img} alt={t.name} width={400} height={400} className="h-full w-full object-cover" />
                </div>
                <div className="p-5">
                  <div className="font-semibold text-ink">{t.name}</div>
                  <div className="mb-2 font-mono text-[11px] font-bold tracking-[0.06em] text-muted">{t.role}</div>
                  <p className="text-sm text-body">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-16 text-center">
        <h2 className="font-heading mb-3 text-2xl font-bold text-ink">Work with a partner that&apos;s been precise since 1989.</h2>
        <p className="mb-7 text-body">Tell us about your part and volumes.</p>
        <MovingBorderButton href="/contact/" borderRadius="0.75rem">
          Contact us
        </MovingBorderButton>
      </section>
    </>
  );
}

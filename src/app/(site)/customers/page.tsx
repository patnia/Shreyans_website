import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { LogoMarquee } from "@/components/ui/logo-marquee";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { MarketText, MarketOnly } from "@/components/market-text";

const customers = [
  { slug: "bhartia", name: "Bhartia Industries" },
  { slug: "clean-mobility", name: "Clean Mobility Technologies" },
  { slug: "dorset", name: "Dorset" },
  { slug: "forvia", name: "Forvia" },
  { slug: "futaba", name: "Futaba Industrial" },
  { slug: "gates", name: "Gates" },
  { slug: "hella", name: "Hella" },
  { slug: "hero-motors", name: "Hero Motors" },
  { slug: "motherson", name: "Motherson" },
  { slug: "omega-seiki", name: "Omega Seiki" },
  { slug: "padmini-vna", name: "Padmini VNA Mechatronics" },
  { slug: "pricol", name: "Pricol" },
  { slug: "quadsun-solar", name: "Quadsun Solar Solutions" },
  { slug: "quality-needles", name: "Quality Needles" },
  { slug: "uniparts", name: "Uniparts Group" },
];

const logos = customers.map((c) => ({ src: `/images/customers/${c.slug}.png`, alt: c.name }));

export default function CustomersPage() {
  return (
    <>
      <PageHeader
        eyebrow={<MarketText dom="KEY CUSTOMERS · 100% OEM SUPPLIES" intl="PROVEN AT SCALE" />}
        title={<MarketText dom="Trusted by India's OEMs." intl="The same standard trusted by India's biggest OEMs." />}
      >
        <MarketText
          dom="We supply directly to original equipment manufacturers across automotive, agriculture, construction and energy."
          intl="Before we source or manufacture for you, this is the quality bar we already hold in daily production for India's largest industrial and automotive OEMs — the same process discipline we bring to your export program."
        />
      </PageHeader>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <LogoMarquee logos={logos} speed={40} />
        <p className="mt-6 text-center text-xs text-muted">
          <MarketOnly show="international">Our established domestic OEM customer base, shown here as proof of scale and quality standard.</MarketOnly>
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
          {customers.map((c) => (
            <figure key={c.slug} className="flex flex-col items-center gap-2 rounded-xl border border-line bg-panel p-4">
              <Image src={`/images/customers/${c.slug}.png`} alt={c.name} width={120} height={50} className="h-11 w-full object-contain" />
              <figcaption className="text-center text-xs text-muted">{c.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <MarketOnly show="international">
        <section className="border-y border-line bg-panel">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-3 font-mono text-xs font-bold tracking-[0.16em] text-muted">EXPORT MARKETS</div>
            <h2 className="font-heading mb-6 text-3xl font-bold text-ink">Serving customers across three continents.</h2>
            <div className="flex flex-wrap gap-2">
              {["USA", "Canada", "Indonesia"].map((c) => (
                <span key={c} className="rounded-md border border-line bg-bg px-3 py-1.5 text-[13px] text-ink">{c}</span>
              ))}
            </div>
          </div>
        </section>
      </MarketOnly>

      <section className="mx-auto max-w-2xl px-6 py-16 text-center">
        <h2 className="font-heading mb-3 text-2xl font-bold text-ink">Join our OEM customers.</h2>
        <p className="mb-7 text-body">Let&apos;s talk about your components.</p>
        <MovingBorderButton href="/contact/" borderRadius="0.75rem">
          Contact us
        </MovingBorderButton>
      </section>
    </>
  );
}

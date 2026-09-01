import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { MarketText, MarketPill } from "@/components/market-text";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { ProcessSteps } from "@/components/ui/process-steps";
import { StatCounter } from "@/components/ui/stat-counter";
import { ThreeDCarousel } from "@/components/ui/3d-carousel";
import { LogoMarquee } from "@/components/ui/logo-marquee";

const featuredParts = [
  { src: "/images/products/shafts.jpg", alt: "Dowells, Pins & Shafts" },
  { src: "/images/products/automotive.jpg", alt: "Automotive Parts" },
  { src: "/images/products/farm.jpg", alt: "Farm Accessories" },
  { src: "/images/products/hydraulic.jpg", alt: "Hydraulic Fittings" },
  { src: "/images/products/boss-sensors.jpg", alt: "Boss Sensors" },
  { src: "/images/products/profile.jpg", alt: "Profile Machining" },
  { src: "/images/products/castings.jpg", alt: "Investment Castings" },
  { src: "/images/products/oil-gas.jpg", alt: "Oil & Gas Parts" },
  { src: "/images/products/telecom.jpg", alt: "Telecom & Switchgear" },
];

const customerLogos = [
  "pricol", "hero-motors", "futaba", "uniparts", "forvia", "motherson", "padmini-vna", "bhartia",
].map((name) => ({ src: `/images/customers/${name}.png`, alt: name }));

export default function Home() {
  return (
    <>
      <section className="bg-bg">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div>
            <div className="mb-4">
              <MarketPill />
            </div>
            <div className="mb-4 font-mono text-xs tracking-[0.16em] text-muted">
              PRECISION MACHINED COMPONENTS · SINCE 1989
            </div>
            <h1 className="font-heading mb-5 max-w-[16ch] text-4xl font-bold text-ink md:text-5xl">
              Precision parts, built to <em className="not-italic text-accent-hover">your drawing.</em>
            </h1>
            <p className="mb-7 max-w-[42ch] text-body">
              <MarketText
                dom="Shreyans Auto & Components supplies turned parts, castings and sub-assemblies to India's leading OEMs, IATF 16949:2016 and ZED certified, from our plant in Faridabad."
                intl="We machine to your spec, source from our partner network and audit quality on your behalf, managing global QCD so India runs like an extension of your plant. Exporting to the USA, Canada and Indonesia."
              />
            </p>
            <div className="mb-7 flex flex-wrap gap-3">
              <MovingBorderButton href="/contact/" borderRadius="0.75rem">
                <MarketText dom="Request a quote" intl="Start sourcing" />
              </MovingBorderButton>
              <Link
                href="/capabilities/"
                className="inline-flex items-center rounded-xl border border-line px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:bg-panel"
              >
                View capabilities
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {["EST. 1989", "IATF 16949:2016", "ZED CERTIFIED", "MARUTI GREEN ZONE"].map((c) => (
                <span key={c} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-line">
            <Image src="/images/hero-montage.png" alt="Precision machined components" width={640} height={480} className="h-full w-full object-cover" priority />
            <span className="absolute bottom-3 left-3 rounded-md bg-dark/85 px-3 py-1.5 font-mono text-[11px] text-white">
              PRECISION TURNED PARTS · Ø WITHIN 2µm
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-3 font-mono text-xs font-bold tracking-[0.16em] text-muted">SOURCE · PRODUCE · AUDIT</div>
        <p className="mb-10 max-w-[64ch] text-body">
          Most domestic customers come to us to manufacture a part to print. For export customers, we run the full S.P.A. model: a single-source shop with end-to-end QCD.
        </p>
        <ProcessSteps
          steps={[
            { num: "01 / PRODUCE", title: "We machine the part", desc: "CNC turning, sliding-head automats, milling, grinding and assembly across brass, stainless, aluminium and specialty alloys.", image: "/images/company/produce.jpg" },
            { num: "02 / SOURCE", title: "We find the supplier", desc: "We procure forgings and castings from our partner network and machine them to your requirement: one channel for the whole part.", image: "/images/company/source.jpg" },
            { num: "03 / AUDIT", title: "We check the quality", desc: "Factory, process and product audits, with in-process and final inspection against your check sheets before dispatch.", image: "/images/company/audit.jpg" },
          ]}
        />
      </section>

      <section className="border-y border-line bg-panel">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
          <div>
            <div className="mb-3 font-mono text-xs font-bold tracking-[0.16em] text-muted">CAPABILITIES</div>
            <h2 className="font-heading mb-4 max-w-[20ch] text-3xl font-bold text-ink">Over 50 machines, one precision standard.</h2>
            <p className="mb-8 max-w-[60ch] text-body">
              CNC turning, 5-axis sliding-head automats, machining centres and a full in-house metrology lab, holding diameter accuracy within 2 microns and surface finish below Ra 0.5.
            </p>
            <div className="mb-8 flex gap-10">
              <StatCounter value={2} suffix="µm" label="DIA ACCURACY" />
              <StatCounter value={0.5} decimals={1} prefix="Ra " label="SURFACE FINISH" />
              <StatCounter value={50} suffix="+" label="MACHINES" />
            </div>
            <Link href="/capabilities/" className="inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-white hover:bg-accent-hover">
              See the machine list
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line">
            <Image src="/images/company/capability.jpg" alt="CNC machining floor" width={640} height={480} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-3 font-mono text-xs font-bold tracking-[0.16em] text-muted">PRODUCT PROFILE</div>
          <h2 className="font-heading mb-8 max-w-[24ch] text-3xl font-bold text-ink">Precision parts across nine product families.</h2>
          <ThreeDCarousel items={featuredParts} />
          <p className="mt-4 text-center text-xs text-muted">Spins on its own. Drag to rotate, click a part to inspect it.</p>
          <div className="mt-8 text-center">
            <Link href="/products/" className="inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-white hover:bg-accent-hover">
              View all products
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-3 font-mono text-xs font-bold tracking-[0.16em] text-muted">TRUSTED BY OEMs · 100% OEM SUPPLIES</div>
        <h2 className="font-heading mb-8 max-w-[32ch] text-3xl font-bold text-ink">
          Supplying the names that build India, and exporting worldwide.
        </h2>
        <LogoMarquee logos={customerLogos} />
        <div className="mt-8 text-center">
          <Link href="/customers/" className="inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-white hover:bg-accent-hover">
            See all customers
          </Link>
        </div>
      </section>

      <section className="border-t border-line bg-panel">
        <div className="mx-auto max-w-2xl px-6 py-16 text-center">
          <h2 className="font-heading mb-3 text-2xl font-bold text-ink">Send us your part.</h2>
          <p className="mb-7 text-body">
            <MarketText
              dom="Domestic enquiries answered within 2 business days."
              intl="Share your drawing and target volumes for an export sourcing plan."
            />
          </p>
          <MovingBorderButton href="/contact/" borderRadius="0.75rem">
            Request a quote
          </MovingBorderButton>
        </div>
      </section>

      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <a
          href="mailto:suparsh@shreyansagricon.com"
          className="flex items-center gap-2 rounded-full bg-dark px-5 py-3.5 font-mono text-xs tracking-wide text-white shadow-lg transition-colors hover:bg-dark-2"
        >
          <Mail size={15} />
          Request a quote
          <Phone size={15} />
        </a>
      </div>
    </>
  );
}

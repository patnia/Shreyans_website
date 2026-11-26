import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { StatCounter } from "@/components/ui/stat-counter";
import { LogoMarquee } from "@/components/ui/logo-marquee";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { IntroAnimation } from "@/components/intro-animation";

const customerLogos = [
  "pricol", "hero-motors", "futaba", "uniparts", "forvia", "motherson", "padmini-vna", "bhartia",
].map((name) => ({ src: `/images/customers/${name}.png`, alt: name }));

export default function Home() {
  return (
    <>
      <IntroAnimation />
      <HeroSlideshow />

      <section className="border-b border-line bg-panel">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-[1fr_auto] md:items-center md:py-20">
          <div>
            <p className="font-heading max-w-[34ch] text-2xl font-bold leading-snug text-ink md:text-3xl">
              Precision machined components for domestic and international buyers, manufactured in Faridabad, India
              and exported to the USA, Canada, UK and Indonesia.
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {["EST. 1989", "IATF 16949:2016", "ZED CERTIFIED", "MARUTI GREEN ZONE"].map((c) => (
                <span key={c} className="rounded-full border border-line px-4 py-2 font-mono text-xs text-body">
                  {c}
                </span>
              ))}
            </div>
          </div>
          <Link
            href="/products/"
            className="inline-flex items-center justify-center rounded-xl bg-accent px-7 py-4 text-base font-bold text-accent-ink transition-colors hover:bg-accent-hover"
          >
            View product families
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-3 font-mono text-xs font-bold tracking-[0.16em] text-muted">TRUSTED BY OEMs · 100% OEM SUPPLIES</div>
        <h2 className="font-heading mb-8 max-w-[32ch] text-3xl font-bold text-ink">
          Supplying the names that build India, and exporting worldwide.
        </h2>
        <LogoMarquee logos={customerLogos} />
        <div className="mt-8 text-center">
          <Link href="/customers/" className="inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-accent-ink hover:bg-accent-hover">
            See all customers
          </Link>
        </div>
      </section>

      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <div className="mb-3 font-mono text-xs font-bold tracking-[0.16em] text-muted">CAPABILITIES</div>
          <h2 className="font-heading mb-4 text-3xl font-bold text-ink">Over 50 machines, one precision standard.</h2>
          <p className="mx-auto mb-8 max-w-[60ch] text-body">
            CNC turning, 5-axis sliding-head automats, vertical machining centres and a full in-house quality standard room — VMM, surface roughness tester and contour tracer among the equipment on the floor — holding diameter accuracy within 2 microns and surface finish below Ra 0.5.
          </p>
          <div className="mb-8 flex justify-center gap-10">
            <StatCounter value={2} suffix="µm" label="DIA ACCURACY" />
            <StatCounter value={0.5} decimals={1} prefix="Ra " label="SURFACE FINISH" />
            <StatCounter value={50} suffix="+" label="MACHINES" />
          </div>
          <Link href="/capabilities/" className="inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-accent-ink hover:bg-accent-hover">
            See the machine list
          </Link>
        </div>
      </section>

      <section className="border-t border-line bg-panel">
        <div className="mx-auto max-w-2xl px-6 py-16 text-center">
          <h2 className="font-heading mb-3 text-2xl font-bold text-ink">Send us your part.</h2>
          <p className="mb-7 text-body">Share your drawing and target volumes for an export sourcing plan.</p>
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

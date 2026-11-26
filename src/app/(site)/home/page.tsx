import Image from "next/image";
import Link from "next/link";
import { StatCounter } from "@/components/ui/stat-counter";
import { LogoMarquee } from "@/components/ui/logo-marquee";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { IntroAnimation } from "@/components/intro-animation";

const customerLogos = [
  "pricol", "hero-motors", "futaba", "uniparts", "forvia", "motherson", "padmini-vna", "bhartia",
].map((name) => ({ src: `/images/customers/${name}.png`, alt: name }));

const floor = [
  { name: "CNC turning centres", note: "Chuck diameters to Ø200 mm", img: "/images/capabilities/machines/cnc-turning-center.jpg" },
  { name: "Sliding-head automats", note: "Small, complex parts at volume", img: "/images/capabilities/machines/sliding-head-automats.jpg" },
  { name: "Vertical machining centres", note: "700×550 mm table", img: "/images/capabilities/machines/vmc.jpg" },
  { name: "Quality standard room", note: "VMM, contour and roughness testing", img: "/images/capabilities/inspection/contour-tracer.jpg" },
];

export default function Home() {
  return (
    <>
      <IntroAnimation />
      <HeroSlideshow />

      <section className="bg-panel">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1fr_auto] md:items-end md:py-28">
          <div>
            <p className="font-heading max-w-[24ch] text-3xl font-bold leading-[1.2] text-ink md:text-[2.75rem]">
              Precision machined components for domestic and international buyers, manufactured in Faridabad, India
              and exported to the USA, Canada, UK and Indonesia.
            </p>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs tracking-[0.1em] text-muted">
              {["EST. 1989", "IATF 16949:2016", "ZED CERTIFIED", "MARUTI GREEN ZONE"].map((c) => (
                <li key={c} className="border-l-2 border-accent pl-3">
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <Link
            href="/products/#families"
            className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-base font-bold text-accent-ink transition-colors hover:bg-accent-hover"
          >
            View product families
          </Link>
        </div>
      </section>

      <section className="border-y border-line">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-6 py-14 md:grid-cols-4 md:divide-x md:divide-line [&>div]:md:px-8 [&>div:first-child]:md:pl-0">
          <StatCounter value={2} suffix="µm" label="DIAMETER ACCURACY" />
          <StatCounter value={0.5} decimals={1} prefix="Ra " label="SURFACE FINISH" />
          <StatCounter value={50} suffix="+" label="MACHINES" />
          <StatCounter value={1989} label="SINCE" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-heading max-w-[22ch] text-3xl font-bold text-ink md:text-4xl">
            Over 50 machines, one precision standard.
          </h2>
          <Link href="/capabilities/" className="text-sm font-bold text-accent hover:text-accent-hover">
            See all capabilities →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
          {floor.map((m) => (
            <figure key={m.name}>
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-panel">
                <Image src={m.img} alt={m.name} width={480} height={600} className="h-full w-full object-contain p-3" />
              </div>
              <figcaption className="mt-4">
                <span className="block font-semibold text-ink">{m.name}</span>
                <span className="block text-sm text-muted">{m.note}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="font-heading mb-2 text-2xl font-bold text-ink">
            Supplying the names that build India, and exporting worldwide.
          </h2>
          <p className="mb-10 font-mono text-xs tracking-[0.14em] text-muted">TRUSTED BY OEMs · 100% OEM SUPPLIES</p>
          <LogoMarquee logos={customerLogos} />
          <Link href="/customers/" className="mt-8 inline-block text-sm font-bold text-accent hover:text-accent-hover">
            See all customers →
          </Link>
        </div>
      </section>

      <section className="theme-dark bg-panel">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 py-20 md:flex-row md:items-center">
          <div>
            <h2 className="font-heading text-3xl font-extrabold text-ink md:text-5xl">Send us your part.</h2>
            <p className="mt-3 text-body">Share your drawing and target volumes for an export sourcing plan.</p>
          </div>
          <Link
            href="/contact/"
            className="inline-flex flex-none items-center rounded-full bg-accent px-8 py-4 text-base font-bold text-accent-ink transition-colors hover:bg-accent-hover"
          >
            Request a quote
          </Link>
        </div>
      </section>
    </>
  );
}

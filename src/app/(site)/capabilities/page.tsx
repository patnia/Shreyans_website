import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { StatCounter } from "@/components/ui/stat-counter";
import { MovingBorderButton } from "@/components/ui/moving-border";

const machines = [
  ["CNC turning · BFW", "chuck Ø200 mm · 2"],
  ["CNC 5-axis sliding head, live tooling · Ace", "Ø20 mm · 2"],
  ["CNC turning · Polygim", "chuck Ø50 mm · 2"],
  ["CNC turning · Global", "chuck Ø200 mm · 2"],
  ["CNC turning · Ace", "chuck Ø200 mm · 4"],
  ["CNC turning · Jyoti", "chuck Ø200 mm · 4"],
  ["Vertical machining centre · BFW / Ace", "700×550 mm · 6"],
  ["Sliding-head automats · Peterman / Bechelor", "16"],
  ["Traubs · Chera", "15"],
  ["Milling & centreless grinding · Aceira / HMT", "4"],
  ["Thread rolling, cutting, drilling · Herbert", "in-line"],
  ["Citizen F10 sliding-head CNC", "fine turning"],
];

const checklist = [
  "Bar & chucked CNC turning to Ø200 mm",
  "Sliding-head automats for small, complex parts",
  "Milling, centreless & cylindrical grinding",
  "Thread rolling, cutting and drilling",
  "In-process and final inspection before dispatch",
];

const materials = ["Brass", "Stainless steel", "12L14", "Aluminium", "Copper", "Teflon", "PEEK", "Nickel silver", "Inconel", "Monel"];
const metrology = ["VMM", "Contour tracer", "Surface roughness tester", "Air gauges", "Hardness tester", "Profile projector", "Digital micrometer / vernier", "Surface plate & height gauge"];

function Tag({ label }: { label: string }) {
  return <span className="rounded-md border border-line bg-panel px-3 py-1.5 text-[13px] text-ink">{label}</span>;
}

export default function CapabilitiesPage() {
  return (
    <>
      <PageHeader eyebrow="CAPABILITIES" title="Machining and inspection, under one roof.">
        Over 50 machines across CNC turning, 5-axis sliding-head automats, Traubs and machining centres, backed by a
        full in-house metrology lab.
      </PageHeader>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 flex flex-wrap gap-10">
          <StatCounter value={2} suffix="µm" label="DIAMETER ACCURACY" />
          <StatCounter value={0.5} decimals={1} prefix="Ra " label="SURFACE FINISH" />
          <StatCounter value={50} suffix="+" label="MACHINES" />
          <StatCounter value={1989} label="SINCE" />
        </div>
        <div className="mb-3 font-mono text-xs font-bold tracking-[0.16em] text-muted">CNC & TURNING</div>
        <div className="grid gap-x-10 md:grid-cols-2">
          {machines.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
              <span className="text-[15px] font-medium text-ink">{k}</span>
              <span className="whitespace-nowrap font-mono text-xs text-muted">{v}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-panel">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-line">
            <Image src="/images/process.png" alt="Precision machined parts" width={640} height={480} className="h-full w-full object-cover" />
          </div>
          <div>
            <div className="mb-3 font-mono text-xs font-bold tracking-[0.16em] text-muted">PROCESS</div>
            <h2 className="font-heading mb-4 max-w-[26ch] text-3xl font-bold text-ink">
              Turning, grinding, forging, finishing, and full inspection.
            </h2>
            <p className="mb-6 max-w-[60ch] text-body">
              We machine to print and procure forgings and castings from our partner network to machine in-house.
              Finishing includes grinding, polishing, passivating, electroplating and super-finishing, followed by
              documented inspection.
            </p>
            <ul>
              {checklist.map((c) => (
                <li key={c} className="flex items-center gap-3 border-b border-line py-3 text-[15px]">
                  <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent text-[10px] text-accent-ink">✓</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 grid gap-10 md:grid-cols-2">
          <div>
            <div className="mb-3 font-mono text-xs font-bold tracking-[0.16em] text-muted">MATERIALS WE MACHINE</div>
            <div className="flex flex-wrap gap-2">
              {materials.map((m) => <Tag key={m} label={m} />)}
            </div>
          </div>
          <div>
            <div className="mb-3 font-mono text-xs font-bold tracking-[0.16em] text-muted">METROLOGY & INSPECTION</div>
            <div className="flex flex-wrap gap-2">
              {metrology.map((m) => <Tag key={m} label={m} />)}
            </div>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <div className="overflow-hidden rounded-xl border border-line">
            <Image src="/images/company/quality-1.jpg" alt="Shop floor safety board" width={400} height={300} className="h-full w-full object-cover" />
          </div>
          <div className="overflow-hidden rounded-xl border border-line">
            <Image src="/images/company/quality-2.jpg" alt="4M change control board" width={400} height={300} className="h-full w-full object-cover" />
          </div>
          <div className="overflow-hidden rounded-xl border border-line">
            <Image src="/images/company/quality-3.jpg" alt="Red bin quality tracking board" width={400} height={300} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-panel">
        <div className="mx-auto max-w-2xl px-6 py-16 text-center">
          <h2 className="font-heading mb-3 text-2xl font-bold text-ink">Have a drawing ready?</h2>
          <p className="mb-7 text-body">We&apos;ll quote against your spec.</p>
          <MovingBorderButton href="/contact/" borderRadius="0.75rem">
            Request a quote
          </MovingBorderButton>
        </div>
      </section>
    </>
  );
}

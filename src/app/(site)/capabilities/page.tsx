import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { StatCounter } from "@/components/ui/stat-counter";
import { MovingBorderButton } from "@/components/ui/moving-border";

const mainMachines = [
  {
    name: "CNC Turning Centers",
    img: "/images/capabilities/machines/cnc-turning-center.jpg",
    desc: "BFW, Global, Ace, Jyoti and Polygim lathes turning chuck diameters up to Ø200 mm, bar and chucked work.",
  },
  {
    name: "CNC 5-Axis Sliding Head",
    img: "/images/capabilities/machines/cnc-5-axis-sliding-head.jpg",
    desc: "Ace 5-axis sliding-head automats with live tooling, turning bar stock to Ø20 mm for complex, multi-feature parts in one setup.",
  },
  {
    name: "Vertical Machining Centres",
    img: "/images/capabilities/machines/vmc.jpg",
    desc: "BFW and Ace VMCs on a 700×550 mm table for milled and multi-axis work.",
  },
];

// Listed without photos so the photo cards stay in one even row.
const otherTurning = [
  "Sliding-head automats: Peterman, Bechler, Citizen F10",
  "15 Chera Traub automats",
];

const smallerMachines = [
  { name: "Milling", img: "/images/capabilities/machines/milling.jpg" },
  { name: "Centerless Grinding", img: "/images/capabilities/machines/centerless-grinding.jpg" },
  { name: "Thread Rolling", img: "/images/capabilities/machines/thread-rolling.jpg" },
  { name: "Cutting & Drilling", img: "/images/capabilities/machines/cutting-drilling.jpg" },
];

const mainInspection = [
  {
    name: "VMM",
    img: "/images/capabilities/inspection/vmm.jpg",
    desc: "Non-contact vision measuring for 2D profile and dimensional checks.",
  },
  {
    name: "Contour Tracer",
    img: "/images/capabilities/inspection/contour-tracer.jpg",
    desc: "Surface profile and form measurement to micron accuracy.",
  },
  {
    name: "Surface Roughness Tester",
    img: "/images/capabilities/inspection/surface-roughness-tester.jpg",
    desc: "Checks every job's finish against Ra 0.5.",
  },
];

const checklist = [
  "Bar & chucked CNC turning to Ø200 mm",
  "Sliding-head automats for small, complex parts",
  "Milling, centreless & cylindrical grinding",
  "Thread rolling, cutting and drilling",
  "In-process and final inspection before dispatch",
];

const metrology = ["Air gauges", "Hardness tester", "Profile projector", "Digital micrometer / vernier", "Surface plate & height gauge"];

function Tag({ label }: { label: string }) {
  return <span className="rounded-md border border-line bg-panel px-3 py-1.5 text-[13px] text-ink">{label}</span>;
}

function MachineCard({ name, img, desc }: { name: string; img: string; desc: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-panel">
      <div className="aspect-[4/3] overflow-hidden bg-bg">
        <Image src={img} alt={name} width={400} height={300} className="h-full w-full object-cover" />
      </div>
      <div className="p-5">
        <div className="mb-1.5 font-semibold text-ink">{name}</div>
        <p className="text-sm text-body">{desc}</p>
      </div>
    </div>
  );
}

export default function CapabilitiesPage() {
  return (
    <>
      <PageHeader eyebrow="CAPABILITIES" title="Machining and inspection, under one roof.">
        CNC turning, 5-axis sliding-head automats, Traubs and vertical machining centres on one floor, backed by a
        full in-house quality standard room — VMM, contour tracer and surface roughness tester among the equipment
        that checks every part before it ships.
      </PageHeader>

      <section className="mx-auto max-w-6xl px-6 pt-10 pb-20">
        <div className="mb-12 flex flex-wrap gap-10">
          <StatCounter value={2} suffix="µm" label="DIAMETER ACCURACY" />
          <StatCounter value={0.5} decimals={1} prefix="Ra " label="SURFACE FINISH" />
          <StatCounter value={50} suffix="+" label="MACHINES" />
          <StatCounter value={1989} label="SINCE" />
        </div>
        <div className="mb-6 font-mono text-xs font-bold tracking-[0.16em] text-muted">CNC & TURNING</div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mainMachines.map((m) => (
            <MachineCard key={m.name} {...m} />
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {otherTurning.map((m) => <Tag key={m} label={m} />)}
        </div>

        <div className="mt-14 mb-6 font-mono text-xs font-bold tracking-[0.16em] text-muted">MILLING, GRINDING & FINISHING</div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {smallerMachines.map((m) => (
            <div key={m.name} className="overflow-hidden rounded-lg border border-line">
              <div className="aspect-square overflow-hidden bg-panel">
                <Image src={m.img} alt={m.name} width={240} height={240} className="h-full w-full object-cover" />
              </div>
              <div className="px-3 py-2.5 text-center text-sm font-medium text-ink">{m.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-6 font-mono text-xs font-bold tracking-[0.16em] text-muted">ON THE FLOOR</div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="aspect-[4/3] overflow-hidden rounded-xl border border-line">
              <Image src="/images/capabilities/floor-1.jpg" alt="Ace sliding-head automat on the shop floor" width={400} height={300} className="h-full w-full object-cover" />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-xl border border-line">
              <Image src="/images/capabilities/floor-2.jpg" alt="BFW vertical machining centres" width={400} height={300} className="h-full w-full object-cover" />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-xl border border-line">
              <Image src="/images/capabilities/floor-3.jpg" alt="Global CNC lathe" width={400} height={300} className="h-full w-full object-cover" />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-xl border border-line">
              <Image src="/images/capabilities/floor-4.jpg" alt="Operator running a vertical machining centre" width={400} height={300} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-end gap-12 px-6 py-12 md:grid-cols-2">
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
      </section>

      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="mb-3 font-mono text-xs font-bold tracking-[0.16em] text-muted">INSPECTION</div>
          <h2 className="font-heading mb-4 max-w-[26ch] text-3xl font-bold text-ink">
            Every part measured before it ships.
          </h2>
          <p className="mb-10 max-w-[60ch] text-body">
            A dedicated quality standard room backs every job, holding diameter accuracy within 2 microns and
            surface finish below Ra 0.5.
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            {mainInspection.map((eq) => (
              <MachineCard key={eq.name} {...eq} />
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-2">
            {metrology.map((m) => <Tag key={m} label={m} />)}
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

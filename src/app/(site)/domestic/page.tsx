"use client";

import { useEffect } from "react";
import { PageHeader } from "@/components/page-header";
import { StatCounter } from "@/components/ui/stat-counter";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { RfqForm } from "@/components/rfq-form";
import { TurnedRing } from "@/components/ui/turned-ring";
import { useMarket } from "@/components/market-provider";

const sectors = ["Automotive", "Agriculture", "Construction", "Tools & Accessories", "Oil & Gas", "Telecom & Switchgear"];

const checklist = [
  "Bar & chucked CNC turning to Ø200 mm",
  "Sliding-head automats for small, complex parts",
  "Milling, centreless & cylindrical grinding",
  "In-process and final inspection before dispatch",
];

export default function DomesticPage() {
  const { setMarket } = useMarket();

  useEffect(() => {
    setMarket("international");
    return () => setMarket("domestic");
  }, [setMarket]);

  return (
    <>
      <PageHeader
        eyebrow="DOMESTIC · SHREYANS AUTO & COMPONENTS"
        title="Precision parts for India's OEMs."
        decoration={<TurnedRing />}
      >
        Shreyans Auto &amp; Components (SAC) is the domestic engine behind Shreyans Agricon Products: the same
        Faridabad shop, machine list and quality system, supplying automotive, agriculture, construction and
        industrial OEMs directly across India since 1989.
      </PageHeader>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-3 font-mono text-xs font-bold tracking-[0.16em] text-muted">HOW IT WORKS</div>
        <p className="mb-10 max-w-[64ch] text-body">
          No sourcing model, no middle step: you send a drawing, we machine to print in-house and inspect against
          your check sheets before dispatch. IATF 16949:2016 and ZED certified, and a recognised Maruti Green
          Zone Supplier.
        </p>
        <div className="mb-10 flex flex-wrap gap-10">
          <StatCounter value={2} suffix="µm" label="DIAMETER ACCURACY" />
          <StatCounter value={0.5} decimals={1} prefix="Ra " label="SURFACE FINISH" />
          <StatCounter value={50} suffix="+" label="MACHINES" />
          <StatCounter value={1989} label="SINCE" />
        </div>
        <ul className="grid gap-x-10 gap-y-1 sm:grid-cols-2">
          {checklist.map((c) => (
            <li key={c} className="flex items-center gap-3 border-b border-line py-3 text-[15px]">
              <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent text-[10px] text-accent-ink">✓</span>
              {c}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-3 font-mono text-xs font-bold tracking-[0.16em] text-muted">SECTORS WE SERVE</div>
          <div className="flex flex-wrap gap-2">
            {sectors.map((s) => (
              <span key={s} className="rounded-md border border-line bg-bg px-3 py-1.5 text-[13px] text-ink">{s}</span>
            ))}
          </div>
          <p className="mt-6 max-w-[60ch] text-sm text-muted">
            Full capabilities, certifications and product range are the same across the site —{" "}
            <a href="/capabilities/" className="underline hover:text-accent-hover">see capabilities</a>,{" "}
            <a href="/quality/" className="underline hover:text-accent-hover">quality &amp; certifications</a>, or{" "}
            <a href="/products/" className="underline hover:text-accent-hover">the full product range</a>.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-16 text-center">
        <h2 className="font-heading mb-3 text-2xl font-bold text-ink">Have a drawing ready?</h2>
        <p className="mb-7 text-body">We&apos;ll quote against your spec.</p>
        <div className="mb-8 flex justify-center">
          <MovingBorderButton href="#rfq" borderRadius="0.75rem">
            Request a quote
          </MovingBorderButton>
        </div>
        <div id="rfq" className="text-left">
          <RfqForm />
        </div>
      </section>
    </>
  );
}

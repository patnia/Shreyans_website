"use client";

import { useEffect } from "react";
import { PageHeader } from "@/components/page-header";
import { ProcessSteps } from "@/components/ui/process-steps";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { RfqForm } from "@/components/rfq-form";
import { TurnedRing } from "@/components/ui/turned-ring";
import { useMarket } from "@/components/market-provider";

const markets = ["USA", "Canada", "Indonesia"];

export default function ExportPage() {
  const { setMarket } = useMarket();

  useEffect(() => {
    setMarket("international");
    return () => setMarket("domestic");
  }, [setMarket]);

  return (
    <>
      <PageHeader
        eyebrow="EXPORT · SHREYANS AGRICON PRODUCTS"
        title="Sourcing precision components from India."
        decoration={<TurnedRing />}
      >
        The same shop, certifications and machine list you&apos;ll find on the rest of this site — run for
        international buyers as a single-source S.P.A. partner: we source, produce and audit on your behalf.
      </PageHeader>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-3 font-mono text-xs font-bold tracking-[0.16em] text-muted">HOW IT WORKS</div>
        <p className="mb-10 max-w-[64ch] text-body">
          Export is a newer part of the business, currently serving the USA, Canada and Indonesia. But the shop
          behind it isn&apos;t new: Shreyans Auto &amp; Components has been machining precision parts for
          India&apos;s OEMs since 1989, IATF 16949:2016 and ZED certified.
        </p>
        <ProcessSteps
          steps={[
            { num: "01 / SOURCE", title: "We find the supplier", desc: "We procure forgings and castings from our partner network and machine them to your requirement: one channel for the whole part.", image: "/images/company/source.jpg" },
            { num: "02 / PRODUCE", title: "We machine the part", desc: "CNC turning, sliding-head automats, milling, grinding and assembly across brass, stainless, aluminium and specialty alloys.", image: "/images/company/produce.jpg" },
            { num: "03 / AUDIT", title: "We check the quality", desc: "Factory, process and product audits, with in-process and final inspection against your check sheets before dispatch.", image: "/images/company/audit.jpg" },
          ]}
        />
      </section>

      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-3 font-mono text-xs font-bold tracking-[0.16em] text-muted">CURRENTLY EXPORTING TO</div>
          <div className="flex flex-wrap gap-2">
            {markets.map((m) => (
              <span key={m} className="rounded-md border border-line bg-bg px-3 py-1.5 text-[13px] text-ink">{m}</span>
            ))}
          </div>
          <p className="mt-6 max-w-[60ch] text-sm text-muted">
            Capabilities, certifications and full product range are the same across the site —{" "}
            <a href="/capabilities/" className="underline hover:text-accent-hover">see capabilities</a>,{" "}
            <a href="/quality/" className="underline hover:text-accent-hover">quality &amp; certifications</a>, or{" "}
            <a href="/products/" className="underline hover:text-accent-hover">the full product range</a>.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-16 text-center">
        <h2 className="font-heading mb-3 text-2xl font-bold text-ink">Share your drawing and target volumes.</h2>
        <p className="mb-7 text-body">We&apos;ll come back with an export sourcing plan.</p>
        <div className="mb-8 flex justify-center">
          <MovingBorderButton href="#rfq" borderRadius="0.75rem">
            Start sourcing
          </MovingBorderButton>
        </div>
        <div id="rfq" className="text-left">
          <RfqForm />
        </div>
      </section>
    </>
  );
}

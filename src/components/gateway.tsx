"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useMarket } from "@/components/market-provider";

export function Gateway() {
  const router = useRouter();
  const { setMarket } = useMarket();
  const containerRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handle = () => setReduced(mq.matches);
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, []);

  // Keep the overscroll bounce background consistent with the gateway.
  useEffect(() => {
    const prev = document.body.style.background;
    document.body.style.background = "#F2EFE7";
    return () => {
      document.body.style.background = prev;
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const welcomeOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0]);
  const welcomeScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.94]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  const leftCurtainX = useTransform(scrollYProgress, [0.05, 0.28], ["0%", "-100%"]);
  const rightCurtainX = useTransform(scrollYProgress, [0.05, 0.28], ["0%", "100%"]);

  const labelOpacity = useTransform(scrollYProgress, [0.26, 0.34], [0, 1]);
  const labelY = useTransform(scrollYProgress, [0.26, 0.34], [14, 0]);

  const arrowHeight = useTransform(scrollYProgress, [0.34, 0.5], ["0%", "100%"]);
  const arrowHeadOpacity = useTransform(scrollYProgress, [0.46, 0.5], [0, 1]);

  const nameOpacity = useTransform(scrollYProgress, [0.5, 0.62], [0, 1]);
  const nameY = useTransform(scrollYProgress, [0.5, 0.62], [14, 0]);

  function goto(market: "domestic" | "international") {
    setMarket(market);
    router.push("/home/");
  }

  if (reduced) {
    return <GatewayStatic onPick={goto} />;
  }

  return (
    <>
    <div ref={containerRef} className="relative h-[170vh] bg-gateway">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-br from-gateway to-gateway-2">
        <button
          type="button"
          onClick={() => goto("domestic")}
          aria-label="Continue as Shreyans Auto and Components, for domestic enquiries"
          className="absolute inset-y-0 left-0 z-0 w-1/2 cursor-pointer text-left"
        >
          <Panel
            brand="sac"
            logoSrc="/images/logo-auto-icon.png"
            eyebrow="DOMESTIC · INDIA"
            entity="Shreyans Auto and Components"
            forText="for domestic enquiries"
            labelOpacity={labelOpacity}
            labelY={labelY}
            arrowHeight={arrowHeight}
            arrowHeadOpacity={arrowHeadOpacity}
            nameOpacity={nameOpacity}
            nameY={nameY}
          />
        </button>

        <button
          type="button"
          onClick={() => goto("international")}
          aria-label="Continue as Shreyans Agricon Products, for international enquiries"
          className="absolute inset-y-0 right-0 z-0 w-1/2 cursor-pointer text-left"
        >
          <Panel
            brand="sap"
            logoSrc="/images/logo-agricon-icon.png"
            eyebrow="INTERNATIONAL · EXPORT"
            entity="Shreyans Agricon Products"
            forText="for international enquiries"
            labelOpacity={labelOpacity}
            labelY={labelY}
            arrowHeight={arrowHeight}
            arrowHeadOpacity={arrowHeadOpacity}
            nameOpacity={nameOpacity}
            nameY={nameY}
          />
        </button>

        <motion.div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/2 bg-gradient-to-br from-gateway to-gateway-2"
          style={{ x: leftCurtainX }}
        />
        <motion.div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-1/2 bg-gradient-to-br from-gateway to-gateway-2"
          style={{ x: rightCurtainX }}
        />

        <motion.div
          style={{ opacity: welcomeOpacity, scale: welcomeScale }}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 px-6 text-center text-ink"
        >
          <div className="font-mono text-xs tracking-[0.16em] text-accent-hover">PRECISION MACHINED COMPONENTS · SINCE 1989</div>
          <h1 className="font-heading max-w-[16ch] text-4xl font-bold md:text-5xl">Welcome to Shreyans</h1>
          <motion.div style={{ opacity: hintOpacity }} className="mt-2 flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-muted">
            SCROLL TO CONTINUE
            <span className="animate-bounce">↓</span>
          </motion.div>
        </motion.div>
      </div>
    </div>

    <section className="flex flex-col items-center justify-center gap-4 bg-gateway px-6 py-20 text-center text-ink">
      <p className="font-mono text-xs tracking-[0.14em] text-muted">PREFER TO READ OFFLINE?</p>
      <a
        href="/documents/Shreyans-Brochure.pdf"
        download
        className="inline-flex items-center gap-2 rounded-lg border border-accent px-6 py-3 text-sm font-bold text-accent-hover transition-colors hover:bg-accent-light"
      >
        Download brochure
      </a>
    </section>
    </>
  );
}

type Brand = "sac" | "sap";

function Panel({
  brand,
  logoSrc,
  eyebrow,
  entity,
  forText,
  labelOpacity,
  labelY,
  arrowHeight,
  arrowHeadOpacity,
  nameOpacity,
  nameY,
}: {
  brand: Brand;
  logoSrc: string;
  eyebrow: string;
  entity: string;
  forText: string;
  labelOpacity: MotionValue<number>;
  labelY: MotionValue<number>;
  arrowHeight: MotionValue<string>;
  arrowHeadOpacity: MotionValue<number>;
  nameOpacity: MotionValue<number>;
  nameY: MotionValue<number>;
}) {
  const textClass = brand === "sac" ? "text-sac" : "text-sap";
  const bgClass = brand === "sac" ? "bg-sac" : "bg-sap";

  return (
    <div className="relative z-0 flex h-full flex-col items-center px-6 py-[10%] text-center text-ink">
      <motion.div style={{ opacity: labelOpacity, y: labelY }} className={`font-mono text-xs tracking-[0.16em] ${textClass}`}>
        {forText}
      </motion.div>

      <div className="relative flex flex-1 flex-col items-center justify-start pt-5">
        <motion.div
          className="w-px"
          style={{
            height: arrowHeight,
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(30,35,31,.35) 0, rgba(30,35,31,.35) 6px, transparent 6px, transparent 14px)",
          }}
        />
        <motion.span style={{ opacity: arrowHeadOpacity }} className={textClass}>
          ▾
        </motion.span>
      </div>

      <motion.div style={{ opacity: nameOpacity, y: nameY }} className="flex flex-col items-center pb-2">
        <div className="mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-ink/10">
          <Image src={logoSrc} alt="" width={160} height={160} priority className="h-20 w-20 object-contain" />
        </div>
        <div className={`mb-2 font-mono text-[11px] tracking-[0.14em] ${textClass}`}>{eyebrow}</div>
        <div className="font-heading max-w-[14ch] text-2xl font-bold md:text-3xl">{entity}</div>
        <div className={`mt-3 inline-block rounded-lg px-5 py-2.5 font-mono text-xs font-bold text-white ${bgClass}`}>Continue →</div>
      </motion.div>
    </div>
  );
}

function GatewayStatic({ onPick }: { onPick: (m: "domestic" | "international") => void }) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gateway to-gateway-2 text-ink">
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-16 text-center">
        <div className="font-mono text-xs tracking-[0.16em] text-accent-hover">PRECISION MACHINED COMPONENTS · SINCE 1989</div>
        <h1 className="font-heading max-w-[16ch] text-4xl font-bold md:text-5xl">Welcome to Shreyans</h1>
      </div>
      <div className="grid flex-1 grid-cols-1 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onPick("domestic")}
          className="relative flex min-h-[320px] flex-col items-center justify-end gap-3 bg-gradient-to-br from-gateway to-gateway-2 p-10 text-center"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-ink/10">
            <Image src="/images/logo-auto-icon.png" alt="" width={140} height={140} priority className="h-16 w-16 object-contain" />
          </div>
          <div>
            <div className="mb-2 font-mono text-[11px] tracking-[0.14em] text-sac">DOMESTIC · INDIA</div>
            <div className="font-heading text-2xl font-bold">Shreyans Auto and Components</div>
            <div className="mt-1 font-mono text-xs text-muted">for domestic enquiries</div>
            <div className="mt-4 inline-block rounded-lg bg-sac px-5 py-2.5 font-mono text-xs font-bold text-white">Continue →</div>
          </div>
        </button>
        <button
          type="button"
          onClick={() => onPick("international")}
          className="relative flex min-h-[320px] flex-col items-center justify-end gap-3 bg-gradient-to-br from-gateway to-gateway-2 p-10 text-center"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-ink/10">
            <Image src="/images/logo-agricon-icon.png" alt="" width={140} height={140} priority className="h-16 w-16 object-contain" />
          </div>
          <div>
            <div className="mb-2 font-mono text-[11px] tracking-[0.14em] text-sap">INTERNATIONAL · EXPORT</div>
            <div className="font-heading text-2xl font-bold">Shreyans Agricon Products</div>
            <div className="mt-1 font-mono text-xs text-muted">for international enquiries</div>
            <div className="mt-4 inline-block rounded-lg bg-sap px-5 py-2.5 font-mono text-xs font-bold text-white">Continue →</div>
          </div>
        </button>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <p className="font-mono text-xs tracking-[0.14em] text-muted">PREFER TO READ OFFLINE?</p>
        <a
          href="/documents/Shreyans-Brochure.pdf"
          download
          className="inline-flex items-center gap-2 rounded-lg border border-accent px-6 py-3 text-sm font-bold text-accent-hover transition-colors hover:bg-accent-light"
        >
          Download brochure
        </a>
      </div>
    </div>
  );
}

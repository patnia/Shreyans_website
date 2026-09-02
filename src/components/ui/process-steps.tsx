"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PlaceholderImage } from "@/components/ui/placeholder-image";

type Step = { num: string; title: string; desc: string; image?: string };

export function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {steps.map((s, i) => {
        const reversed = i % 2 === 1;
        return (
          <div key={s.num} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
            <motion.div
              className={reversed ? "md:order-2" : "md:order-1"}
              initial={{ opacity: 0, x: reversed ? 48 : -48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="mb-2 font-mono text-[11px] font-bold tracking-[0.14em] text-accent-hover">{s.num}</div>
              <h3 className="font-heading mb-3 text-2xl font-bold text-ink">{s.title}</h3>
              <p className="max-w-[48ch] text-body">{s.desc}</p>
            </motion.div>

            <motion.div
              className={`relative aspect-[4/3] overflow-hidden rounded-2xl border border-line ${reversed ? "md:order-1" : "md:order-2"}`}
              initial={{ opacity: 0, x: reversed ? -48 : 48, scale: 0.94 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
            >
              {s.image ? (
                <Image src={s.image} alt={s.title} fill className="object-cover" />
              ) : (
                <PlaceholderImage label={s.title} />
              )}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

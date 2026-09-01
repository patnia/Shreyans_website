"use client";

import type { ReactNode } from "react";
import { useMarket } from "@/components/market-provider";

export function MarketText({ dom, intl }: { dom: string; intl: string }) {
  const { market } = useMarket();
  return <>{market === "international" ? intl : dom}</>;
}

export function MarketOnly({ show, children }: { show: "domestic" | "international"; children: ReactNode }) {
  const { market } = useMarket();
  if (market !== show) return null;
  return <>{children}</>;
}

export function MarketPill() {
  const { market } = useMarket();
  const dom = market === "domestic";
  return (
    <span className="inline-block rounded-full border border-accent/40 bg-accent-light px-3 py-1.5 font-mono text-[11px] font-bold tracking-[0.12em] text-accent-hover">
      {dom ? "INDIAN DOMESTIC MARKET" : "OVERSEAS EXPORT MARKET"}
    </span>
  );
}

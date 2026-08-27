"use client";

import { useMarket } from "@/components/market-provider";

export function MarketText({ dom, intl }: { dom: string; intl: string }) {
  const { market } = useMarket();
  return <>{market === "international" ? intl : dom}</>;
}

export function MarketPill() {
  const { market } = useMarket();
  const dom = market === "domestic";
  return (
    <span
      className={`inline-block rounded-full px-3 py-1.5 font-mono text-[11px] font-bold tracking-[0.12em] ${
        dom ? "bg-dom-bg text-dom" : "border border-accent/40 bg-accent-light text-accent-hover"
      }`}
    >
      {dom ? "INDIAN DOMESTIC MARKET" : "OVERSEAS EXPORT MARKET"}
    </span>
  );
}

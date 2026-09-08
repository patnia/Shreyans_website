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

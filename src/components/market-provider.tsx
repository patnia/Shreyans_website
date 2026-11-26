"use client";

import { createContext, useContext, type ReactNode } from "react";
import { usePathname } from "next/navigation";

// The names no longer match their content: "domestic" is the default,
// Agricon-led copy used across the site, and "international" is the
// SAC-focused copy shown only on /domestic/.
type Market = "domestic" | "international";

const MarketContext = createContext<{ market: Market }>({ market: "domestic" });

export function MarketProvider({ children }: { children: ReactNode }) {
  // Taken from the address alone. Remembering it between pages left the
  // domestic copy showing elsewhere after a reload or a typed address.
  const market: Market = usePathname()?.startsWith("/domestic") ? "international" : "domestic";

  return <MarketContext.Provider value={{ market }}>{children}</MarketContext.Provider>;
}

export function useMarket() {
  return useContext(MarketContext);
}

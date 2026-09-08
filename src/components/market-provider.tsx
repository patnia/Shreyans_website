"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// These two literal values also drive the color/font theme in globals.css
// ([data-market="international"] overrides :root), which is why they're
// still named this way. As of the Agricon-primary restructure, "domestic"
// is the default state and now means the Agricon-led site (most pages,
// including Home) — "international" is the override, triggered only by
// visiting /domestic/, and now means the SAC-focused content. The names no
// longer match their content; only the CSS selector cares about the literal
// strings, so don't read too much into them.
type Market = "domestic" | "international";

const MarketContext = createContext<{
  market: Market;
  setMarket: (m: Market) => void;
}>({
  market: "domestic",
  setMarket: () => {},
});

const KEY = "agriconMarket";

export function MarketProvider({ children }: { children: ReactNode }) {
  const [market, setMarketState] = useState<Market>("domestic");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY) as Market | null;
      if (saved === "domestic" || saved === "international") {
        setMarketState(saved);
      }
    } catch {
      // localStorage unavailable, keep default
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.market = market;
  }, [market]);

  function setMarket(m: Market) {
    setMarketState(m);
    try {
      localStorage.setItem(KEY, m);
    } catch {
      // ignore
    }
  }

  return (
    <MarketContext.Provider value={{ market, setMarket }}>
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket() {
  return useContext(MarketContext);
}

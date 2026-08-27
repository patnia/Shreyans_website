"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

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

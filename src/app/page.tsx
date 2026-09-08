"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// The site now opens directly on the Agricon-led homepage rather than
// forcing every visitor through the two-panel market picker. SAC/domestic
// enquiries are reached instead via the "Domestic" link in the
// header/footer, which leads to /domestic/ — see that page for how the
// Precision & Prestige theme is applied there.
// (Gateway component is left in src/components/gateway.tsx, unused, in case
// we want to bring back a full market-split experience later.)
export default function RootPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/home/");
  }, [router]);
  return null;
}

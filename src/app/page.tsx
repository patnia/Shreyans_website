"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// The site now opens directly on the domestic (SAC) homepage rather than
// forcing every visitor through the two-panel market picker. Export
// enquiries are reached instead via the "Export" link in the header/footer,
// which leads to /export/ — see that page for how the SAP theme is applied.
// (Gateway component is left in src/components/gateway.tsx, unused, in case
// we want to bring back a full market-split experience later.)
export default function RootPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/home/");
  }, [router]);
  return null;
}

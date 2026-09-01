"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useMarket } from "@/components/market-provider";

const NAV = [
  { href: "/home/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/capabilities/", label: "Capabilities" },
  { href: "/products/", label: "Products" },
  { href: "/customers/", label: "Customers" },
  { href: "/quality/", label: "Quality" },
  { href: "/contact/", label: "Contact" },
  { href: "/export/", label: "Export" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const active = `${pathname.replace(/\/$/, "")}/`;
  const { market } = useMarket();
  const logoSrc = market === "domestic" ? "/images/logo-auto-horizontal.png" : "/images/logo-agricon-horizontal.png";
  const logoAlt = market === "domestic" ? "Shreyans Auto and Components" : "Shreyans Agricon Products";

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-[92px] max-w-6xl items-center justify-between gap-4 px-6">
        <Link href="/home/" className="flex items-center">
          <Image src={logoSrc} alt={logoAlt} width={220} height={58} className="h-14 w-auto rounded-md bg-white p-1.5" priority />
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`border-b-2 py-1.5 text-sm font-medium transition-colors ${
                active === n.href
                  ? "border-accent text-accent-hover"
                  : "border-transparent text-body hover:border-accent hover:text-ink"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex flex-none items-center gap-4">
          <Link
            href="/contact/"
            className="inline-block flex-none whitespace-nowrap rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-accent-ink transition-colors hover:bg-accent-hover"
          >
            Request a quote
          </Link>

          <a
            href="/documents/Shreyans-Brochure.pdf"
            download
            className="inline-block flex-none whitespace-nowrap rounded-lg border border-accent px-5 py-2.5 text-sm font-bold text-accent-hover transition-colors hover:bg-accent-light"
          >
            Brochure
          </a>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden flex h-9 w-10 items-center justify-center rounded-lg border border-line bg-panel"
        >
          <span className="relative block h-[2px] w-[18px] bg-ink before:absolute before:-top-[5px] before:block before:h-[2px] before:w-[18px] before:bg-ink after:absolute after:top-[5px] after:block after:h-[2px] after:w-[18px] after:bg-ink" />
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-line bg-panel px-6 pb-4">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={`block border-b border-line py-3 text-sm font-medium ${
                active === n.href ? "text-accent-hover" : "text-body"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

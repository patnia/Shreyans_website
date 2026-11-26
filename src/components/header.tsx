"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Download } from "lucide-react";

const NAV = [
  { href: "/about/", label: "About" },
  { href: "/capabilities/", label: "Capabilities" },
  { href: "/products/", label: "Products" },
  { href: "/customers/", label: "Customers" },
  { href: "/quality/", label: "Quality" },
  { href: "/contact/", label: "Contact" },
  { href: "/domestic/", label: "Domestic" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const active = `${pathname.replace(/\/$/, "")}/`;

  return (
    <header className="theme-dark sticky top-0 z-50 border-b border-line bg-bg">
      <div className="mx-auto flex h-[80px] max-w-6xl items-center justify-between gap-6 px-6">
        <Link href="/home/" className="flex flex-none items-center" aria-label="Shreyans home">
          <Image src="/images/logo-shreyans-dark.png" alt="Shreyans" width={168} height={40} className="h-9 w-auto" priority />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={active === n.href ? "page" : undefined}
              className={`border-b-2 py-1.5 text-sm font-medium transition-colors ${
                active === n.href
                  ? "border-accent text-ink"
                  : "border-transparent text-body hover:text-ink"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex flex-none items-center gap-5">
          <a
            href="/documents/Shreyans-Brochure.pdf"
            download
            className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            <Download size={15} aria-hidden="true" />
            Brochure
          </a>
          <Link
            href="/contact/"
            className="inline-block flex-none whitespace-nowrap rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-ink transition-colors hover:bg-accent-hover"
          >
            Request a quote
          </Link>
        </div>

        <button
          aria-label="Menu"
          aria-expanded={open}
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
          <Link
            href="/contact/"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-full bg-accent px-5 py-3 text-center text-sm font-bold text-accent-ink"
          >
            Request a quote
          </Link>
          <a href="/documents/Shreyans-Brochure.pdf" download className="mt-3 block text-center text-sm text-muted">
            Download brochure
          </a>
        </nav>
      )}
    </header>
  );
}

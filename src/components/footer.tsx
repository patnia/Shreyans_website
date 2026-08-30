"use client";

import Link from "next/link";
import Image from "next/image";
import { useMarket } from "@/components/market-provider";

export function Footer() {
  const { market } = useMarket();
  const logoSrc = market === "domestic" ? "/images/logo-auto-horizontal.png" : "/images/logo-agricon-horizontal.png";
  const logoAlt = market === "domestic" ? "Shreyans Auto and Components" : "Shreyans Agricon Products";

  return (
    <footer className="bg-dark text-[#A7C0A3]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-14 md:grid-cols-[1.5fr_1fr_1fr_1.1fr]">
        <div>
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={140}
            height={36}
            className="mb-4 h-9 w-auto rounded-md bg-white p-1"
          />
          <p className="text-sm leading-relaxed">
            House of precision machined components &amp; sub-assemblies. Supplying India&apos;s OEMs since 1989, exporting worldwide.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-mono text-[12.5px] tracking-[0.1em] text-[#EAF3E8]">EXPLORE</h4>
          <FooterLinks />
        </div>

        <div>
          <h4 className="mb-3 font-mono text-[12.5px] tracking-[0.1em] text-[#EAF3E8]">CERTIFIED</h4>
          <p className="py-1 text-sm">IATF 16949:2016</p>
          <p className="py-1 text-sm">ZED Certified</p>
          <p className="py-1 text-sm">Maruti Green Zone Supplier</p>
        </div>

        <div>
          <h4 className="mb-3 font-mono text-[12.5px] tracking-[0.1em] text-[#EAF3E8]">REACH US</h4>
          <p className="py-1 text-sm">F 4 &amp; 5, FIT, Sector 57, Faridabad 121004, Haryana</p>
          <a className="block py-1 text-sm hover:text-white" href="mailto:suparsh@shreyansagricon.com">
            suparsh@shreyansagricon.com
          </a>
          <a className="block py-1 text-sm hover:text-white" href="tel:+919810490896">
            +91 98104 90896
          </a>
          <a
            className="block py-1 text-sm hover:text-white"
            href="https://www.linkedin.com/company/shreyans-agri-con/"
            target="_blank"
            rel="noopener"
          >
            LinkedIn · Company
          </a>
          <a
            className="block py-1 text-sm hover:text-white"
            href="https://www.linkedin.com/in/suparsh-patni-shreyans/"
            target="_blank"
            rel="noopener"
          >
            LinkedIn · Suparsh Patni
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 border-t border-white/10 px-6 py-4 font-mono text-[11.5px] text-[#86A083]">
        <span>© 1989–2026 Shreyans Auto &amp; Components Pvt. Ltd. · shreyansagricon.com</span>
        <span>IATF 16949:2016 · ZED · 100% OEM</span>
      </div>
    </footer>
  );
}

function FooterLinks() {
  const links = [
    { href: "/home/", label: "Home" },
    { href: "/about/", label: "About" },
    { href: "/capabilities/", label: "Capabilities" },
    { href: "/products/", label: "Products" },
    { href: "/customers/", label: "Customers" },
    { href: "/quality/", label: "Quality" },
    { href: "/contact/", label: "Contact" },
  ];
  return (
    <>
      {links.map((l) => (
        <Link key={l.href} href={l.href} className="block py-1 text-sm hover:text-white">
          {l.label}
        </Link>
      ))}
    </>
  );
}

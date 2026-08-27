import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { MarketProvider } from "@/components/market-provider";

const fraunces = Fraunces({
  variable: "--font-plex-condensed",
  weight: ["600", "700"],
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Precision Machined Components · Shreyans Agricon",
  description:
    "Shreyans Agricon: precision machined components and sub-assemblies, IATF 16949:2016 & ZED certified, Faridabad, India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plexMono.variable} h-full antialiased`}>
      <body className="min-h-full font-sans text-body">
        <MarketProvider>{children}</MarketProvider>
      </body>
    </html>
  );
}

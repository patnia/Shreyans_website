"use client";

import Image from "next/image";

export function LogoMarquee({
  logos,
  speed = 32,
}: {
  logos: { src: string; alt: string }[];
  speed?: number;
}) {
  const doubled = [...logos, ...logos];
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div
        className="flex w-max animate-marquee hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((l, i) => (
          <figure
            key={`${l.src}-${i}`}
            className="flex w-[190px] flex-none items-center justify-center border-r border-line px-6 py-4"
          >
            <Image
              src={l.src}
              alt={l.alt}
              width={140}
              height={46}
              className="h-11 w-auto object-contain grayscale opacity-75 transition hover:grayscale-0 hover:opacity-100"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}

"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

export function MovingBorderButton({
  borderRadius = "9999px",
  children,
  href,
  target,
  onClick,
  containerClassName,
  borderClassName,
  duration = 2200,
  className,
}: {
  borderRadius?: string;
  children: React.ReactNode;
  href?: string;
  target?: string;
  onClick?: () => void;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
}) {
  const wrapperClassName = cn("relative overflow-hidden bg-transparent p-[1.5px] inline-block", containerClassName);
  const wrapperStyle = { borderRadius };

  const inner = (
    <>
      <div className="absolute inset-0" style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}>
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-14 w-14 opacity-90 bg-[radial-gradient(var(--color-accent)_40%,transparent_65%)]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center bg-accent px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-accent-hover",
          className
        )}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} target={target} rel={target === "_blank" ? "noopener" : undefined} className={wrapperClassName} style={wrapperStyle}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={wrapperClassName} style={wrapperStyle}>
      {inner}
    </button>
  );
}

export const MovingBorder = ({
  children,
  duration = 2200,
  rx,
  ry,
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
}) => {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).x ?? 0);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).y ?? 0);

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="absolute h-full w-full" width="100%" height="100%">
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <motion.div style={{ position: "absolute", top: 0, left: 0, display: "inline-block", transform }}>
        {children}
      </motion.div>
    </>
  );
};

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const KEY = "shreyansIntroSeen";
const COUNT = 8;
const RADIUS = 230;

const GLYPHS: React.ReactNode[] = [
  <g key="hex">
    <polygon points="32,6 54,19 54,45 32,58 10,45 10,19" />
    <circle cx="32" cy="32" r="9" />
  </g>,
  <g key="pin">
    <rect x="26" y="4" width="12" height="56" rx="3" />
    <path d="M26 18h12M26 28h12M26 38h12" />
  </g>,
  <g key="spool">
    <circle cx="32" cy="32" r="24" />
    <circle cx="32" cy="32" r="14" />
    <circle cx="32" cy="32" r="5" />
  </g>,
  <g key="lever">
    <rect x="12" y="27" width="40" height="10" rx="2" />
    <circle cx="10" cy="32" r="8" />
    <circle cx="54" cy="32" r="8" />
  </g>,
  <g key="ring">
    <circle cx="32" cy="32" r="22" />
    <circle cx="32" cy="32" r="12" />
    <path d="M32 4v8M32 52v8M4 32h8M52 32h8" />
  </g>,
  <g key="chain">
    <rect x="6" y="22" width="26" height="20" rx="10" />
    <rect x="30" y="22" width="26" height="20" rx="10" />
  </g>,
  <g key="stud">
    <rect x="22" y="6" width="20" height="14" />
    <rect x="28" y="20" width="8" height="38" />
    <path d="M28 28h8M28 36h8M28 44h8" />
  </g>,
  <g key="boss">
    <rect x="8" y="22" width="48" height="20" rx="4" />
    <circle cx="32" cy="32" r="7" />
    <circle cx="14" cy="32" r="3" />
    <circle cx="50" cy="32" r="3" />
  </g>,
];

export function IntroAnimation() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      setShow(false);
      return;
    }
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    const t = setTimeout(() => setShow(false), 5200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[80] grid cursor-pointer place-items-center overflow-hidden bg-dark"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          onClick={() => setShow(false)}
          aria-hidden="true"
        >
          <motion.div
            className="absolute left-1/2 top-1/2 h-0 w-0"
            initial={{ rotate: 0 }}
            animate={{ rotate: 200 }}
            transition={{ duration: 2.6, ease: [0.5, 0, 0.2, 1] }}
          >
            {GLYPHS.map((g, i) => {
              const a = (i / COUNT) * Math.PI * 2;
              const x = Math.cos(a) * RADIUS;
              const y = Math.sin(a) * RADIUS;
              return (
                <motion.svg
                  key={i}
                  viewBox="0 0 64 64"
                  className="absolute -left-8 -top-8 h-16 w-16 text-accent"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  initial={{ x: x * 1.6, y: y * 1.6, opacity: 0, scale: 0.6 }}
                  animate={{ x: [x * 1.6, x, x, 0], y: [y * 1.6, y, y, 0], opacity: [0, 1, 1, 0], scale: [0.6, 1, 1, 0.3] }}
                  transition={{ duration: 2.6, times: [0, 0.25, 0.6, 1], ease: "easeInOut" }}
                >
                  {g}
                </motion.svg>
              );
            })}
          </motion.div>

          <motion.div
            className="relative rounded-xl bg-white p-3 shadow-2xl"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.0, duration: 0.7, ease: "easeOut" }}
          >
            <Image
              src="/images/logo-shreyans-horizontal.png"
              alt="Shreyans"
              width={440}
              height={116}
              className="h-20 w-auto sm:h-24"
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

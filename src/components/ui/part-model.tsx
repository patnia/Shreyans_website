"use client";

import { useEffect, useRef, useState } from "react";

export type PartMotion = "spin" | "explode";

type Props = {
  src: string;
  alt: string;
  interactive?: boolean;
  className?: string;
  /** Longest side of the part as a share of the viewer height (scripted loops). */
  size?: number;
  explode?: { angle: [number, number]; tilt?: [number, number]; zoom: number };
  /** Scripted loop. Without it the model uses its own auto-rotate. */
  motion?: PartMotion;
  cycleMs?: number;
  running?: boolean;
  onProgress?: (progress: number) => void;
  onCycle?: () => void;
  onLoaded?: () => void;
  /** "roll pitch yaw", for a model exported on a different axis. */
  orientation?: string;
};

type ViewerElement = HTMLElement & {
  cameraOrbit: string;
  animationName: string;
  currentTime: number;
  getDimensions: () => { x: number; y: number; z: number };
  jumpCameraToGoal: () => void;
  play: () => void;
  pause: () => void;
};

const START_THETA = 35;
const FOV = 30;

// Camera distance that makes the model's longest side fill `size` of the
// viewer height. On narrow viewers the width is the limit instead.
function fitRadius(el: ViewerElement, longest: number, size: number) {
  const aspect = el.clientHeight ? el.clientWidth / el.clientHeight : 1;
  const share = size * Math.min(1, aspect / (size > 0.7 ? 1.4 : 0.8));
  return longest / (share * 2 * Math.tan((FOV * Math.PI) / 360));
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Assembled, pull apart, hold open, come back together, settle.
function explodeAmount(p: number) {
  if (p < 0.1) return 0;
  if (p < 0.42) return ease((p - 0.1) / 0.32);
  if (p < 0.62) return 1;
  if (p < 0.94) return 1 - ease((p - 0.62) / 0.32);
  return 0;
}

export function PartModel({
  src,
  alt,
  interactive = false,
  className,
  size = 0.5,
  explode,
  motion,
  cycleMs = 6000,
  running = true,
  onProgress,
  onCycle,
  onLoaded,
  orientation,
}: Props) {
  const ref = useRef<ViewerElement | null>(null);
  const elapsed = useRef(0);
  const longest = useRef(0);
  const [defined, setDefined] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const callbacks = useRef({ onProgress, onCycle, onLoaded });

  useEffect(() => {
    callbacks.current = { onProgress, onCycle, onLoaded };
  });

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    let cancelled = false;
    import("@google/model-viewer").then(() => {
      if (!cancelled) setDefined(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setLoaded(false);
    elapsed.current = 0;
    const el = ref.current;
    if (!el) return;
    const onLoad = () => {
      const d = el.getDimensions();
      longest.current = Math.max(d.x, d.y, d.z);
      if (motion) {
        const theta = motion === "explode" ? (explode?.angle[0] ?? 14) : START_THETA;
        const phi = motion === "explode" ? (explode?.tilt?.[0] ?? 74) : 78;
        el.cameraOrbit = `${theta}deg ${phi}deg ${fitRadius(el, longest.current, size)}m`;
        requestAnimationFrame(() => el.jumpCameraToGoal());
      }
      if (motion === "explode") {
        el.animationName = "explode";
        el.play();
        el.pause();
        el.currentTime = 0;
      }
      setLoaded(true);
      callbacks.current.onLoaded?.();
    };
    el.addEventListener("load", onLoad);
    return () => el.removeEventListener("load", onLoad);
  }, [defined, src, motion, size, explode]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !loaded || !motion || !running || reduceMotion) return;
    let frame = 0;
    let last: number | null = null;
    const tick = (now: number) => {
      // Cap the step so a stalled or hidden tab never skips part of a turn.
      elapsed.current += last === null ? 0 : Math.min(now - last, 80);
      last = now;
      let completed = false;
      if (elapsed.current >= cycleMs) {
        elapsed.current -= cycleMs;
        completed = true;
      }
      const p = elapsed.current / cycleMs;
      const radius = fitRadius(el, longest.current, size);
      if (motion === "spin") {
        el.cameraOrbit = `${START_THETA + 360 * p}deg 78deg ${radius}m`;
      } else {
        const open = explodeAmount(p);
        const [from, to] = explode?.angle ?? [14, 30];
        const [low, high] = explode?.tilt ?? [74, 68];
        // Stop just short of the clip's end, which would wrap back to the start.
        el.currentTime = open * 0.999;
        el.cameraOrbit = `${from + (to - from) * open}deg ${low + (high - low) * open}deg ${radius * (1 + (explode?.zoom ?? 0.5) * open)}m`;
      }
      callbacks.current.onProgress?.(completed ? 1 : p);
      if (completed) callbacks.current.onCycle?.();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [loaded, motion, running, reduceMotion, cycleMs, size, explode]);

  return (
    <div className={className}>
      {!loaded && (
        <span className="pointer-events-none absolute inset-0 grid place-items-center font-mono text-[11px] tracking-[0.16em] text-white/40">
          LOADING MODEL
        </span>
      )}
      {defined && (
        <model-viewer
          ref={ref}
          src={src}
          alt={alt}
          {...(interactive ? { "camera-controls": true } : { "disable-zoom": true })}
          {...(motion || reduceMotion
            ? {}
            : { "auto-rotate": true, "rotation-per-second": "45deg", "auto-rotate-delay": "0" })}
          {...(motion ? { "interpolation-decay": "1" } : {})}
          interaction-prompt="none"
          environment-image="neutral"
          tone-mapping="neutral"
          exposure="1.4"
          shadow-intensity={motion === "explode" ? "0" : "0.85"}
          shadow-softness="1"
          camera-orbit={motion ? undefined : `${START_THETA}deg 78deg 105%`}
          min-camera-orbit={motion ? "auto auto 1%" : "auto auto 40%"}
          max-camera-orbit={motion ? "auto auto 2000%" : "auto auto 300%"}
          field-of-view="30deg"
          orientation={orientation}
          style={{
            width: "100%",
            height: "100%",
            background: "transparent",
            opacity: loaded ? 1 : 0,
            transition: "opacity 400ms ease",
            ["--progress-bar-color" as string]: "transparent",
          }}
        />
      )}
    </div>
  );
}

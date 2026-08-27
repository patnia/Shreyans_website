"use client";

import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";

type AnimationControls = ReturnType<typeof useAnimation>;

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function useIsSmallScreen() {
  const [isSmall, setIsSmall] = useState(false);
  useIsomorphicLayoutEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const handle = () => setIsSmall(mq.matches);
    handle();
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, []);
  return isSmall;
}

const duration = 0.15;
const transition = { duration, ease: [0.32, 0.72, 0, 1] as const };
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const };

type CarouselItem = { src: string; alt: string };

const Carousel = memo(
  ({
    handleClick,
    controls,
    items,
    isCarouselActive,
  }: {
    handleClick: (item: CarouselItem) => void;
    controls: AnimationControls;
    items: CarouselItem[];
    isCarouselActive: boolean;
  }) => {
    const isSmall = useIsSmallScreen();
    const cylinderWidth = isSmall ? 1800 : 3200;
    const faceCount = items.length;
    const faceWidth = (cylinderWidth / faceCount) * 0.72;
    const radius = cylinderWidth / (2 * Math.PI);
    const rotation = useMotionValue(0);
    const transform = useTransform(rotation, (value) => `rotate3d(0, 1, 0, ${value}deg)`);
    const isDraggingRef = useRef(false);

    useAnimationFrame((_, delta) => {
      if (!isDraggingRef.current && isCarouselActive) {
        rotation.set(rotation.get() + delta * 0.009);
      }
    });

    return (
      <div
        className="flex h-full items-center justify-center"
        style={{ perspective: "1400px", transformStyle: "preserve-3d", willChange: "transform" }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{ transform, rotateY: rotation, width: cylinderWidth, transformStyle: "preserve-3d" }}
          onDragStart={() => {
            isDraggingRef.current = true;
          }}
          onDrag={(_, info) => isCarouselActive && rotation.set(rotation.get() + info.offset.x * 0.05)}
          onDragEnd={(_, info) => {
            isDraggingRef.current = false;
            isCarouselActive &&
              controls.start({
                rotateY: rotation.get() + info.velocity.x * 0.05,
                transition: { type: "spring", stiffness: 100, damping: 30, mass: 0.1 },
              });
          }}
          animate={controls}
        >
          {items.map((item, i) => (
            <motion.div
              key={`${item.src}-${i}`}
              className="absolute flex h-full origin-center items-center justify-center rounded-2xl border border-line bg-panel p-3 shadow-sm"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(item)}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="pointer-events-none object-cover"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/90 to-transparent px-2.5 pb-2 pt-5 text-center font-mono text-[10.5px] leading-tight text-white">
                  {item.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }
);
Carousel.displayName = "Carousel";

export function ThreeDCarousel({ items }: { items: CarouselItem[] }) {
  const [activeItem, setActiveItem] = useState<CarouselItem | null>(null);
  const [isCarouselActive, setIsCarouselActive] = useState(true);
  const controls = useAnimation();
  const cards = useMemo(() => items, [items]);

  const handleClick = (item: CarouselItem) => {
    setActiveItem(item);
    setIsCarouselActive(false);
    controls.stop();
  };

  const handleClose = () => {
    setActiveItem(null);
    setIsCarouselActive(true);
  };

  return (
    <motion.div layout className="relative">
      <AnimatePresence mode="sync">
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 m-5 flex items-center justify-center rounded-3xl bg-dark/60 md:m-24"
            transition={transitionOverlay}
          >
            <motion.div
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative max-h-[80vh] max-w-[80vw]"
            >
              <Image
                src={activeItem.src}
                alt={activeItem.alt}
                width={800}
                height={800}
                className="max-h-[80vh] max-w-[80vw] rounded-xl object-contain shadow-lg"
              />
              <p className="mt-3 text-center font-mono text-xs tracking-wide text-white">{activeItem.alt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative h-[320px] w-full overflow-hidden md:h-[420px]">
        <Carousel handleClick={handleClick} controls={controls} items={cards} isCarouselActive={isCarouselActive} />
      </div>
    </motion.div>
  );
}

"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { PartViewerDialog } from "@/components/part-viewer-dialog";
import { productGroups, type ProductGroup } from "@/data/specializations";

export function SpecializationGrid() {
  const [open, setOpen] = useState<ProductGroup | null>(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        {productGroups.map((s) => {
          const feature = s.family;
          return (
            <button
              key={s.id}
              onClick={() => setOpen(s)}
              className={`theme-dark group overflow-hidden rounded-2xl bg-panel text-left ${
                feature ? "sm:col-span-2" : ""
              }`}
            >
              <span
                className={`flex items-center justify-evenly px-2 ${feature ? "h-48 md:h-64" : "h-56"}`}
                style={{ background: "radial-gradient(circle at 50% 45%, #2a3c4f, #0e151d 78%)" }}
              >
                {s.stills.map((src) => (
                  <Image
                    key={src}
                    src={src}
                    alt=""
                    width={600}
                    height={450}
                    className={`h-full w-auto min-w-0 object-contain py-4 transition-transform duration-500 group-hover:scale-105 ${
                      s.stills.length > 3 ? "max-w-[22%]" : s.stills.length > 1 ? "max-w-[28%]" : "max-w-[85%]"
                    }`}
                  />
                ))}
              </span>
              <span className="flex items-end justify-between gap-4 p-5">
                <span>
                  {!s.tabsByName && (
                    <span className="block font-mono text-[11px] tracking-[0.14em] text-muted">
                      {s.category.toUpperCase()}
                    </span>
                  )}
                  <span className="font-heading mt-1 block text-lg font-bold text-ink">
                    {s.title}
                  </span>
                  {(s.family || s.note) && (
                    <span className="mt-1 block text-sm text-body">
                      {s.note ?? s.parts.map((p) => p.name).join(" · ")}
                    </span>
                  )}
                </span>
                <span className="flex-none text-sm font-bold text-accent">View in 3D →</span>
              </span>
            </button>
          );
        })}
      </div>
      {open && <PartViewerDialog specialization={open} onClose={close} />}
    </>
  );
}

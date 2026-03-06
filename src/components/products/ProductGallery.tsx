"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export function ProductGallery({ name, images }: { name: string; images: string[] }) {
  const safeImages = useMemo(() => (images?.length ? images : ["/media/placeholder.png"]), [images]);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  const current = safeImages[Math.min(active, safeImages.length - 1)];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (!open) return;
      if (e.key === "ArrowRight") setActive((v) => (v + 1) % safeImages.length);
      if (e.key === "ArrowLeft") setActive((v) => (v - 1 + safeImages.length) % safeImages.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, safeImages.length]);

  return (
    <>
      <div
        className="rounded-[26px] border border-white/12 bg-white/[0.06] backdrop-blur-2xl overflow-hidden"
        style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.10)" }}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative block w-full text-left"
          aria-label="Open image"
        >
          <div className="relative aspect-[4/5]">
            <Image
              src={current}
              alt={name}
              fill
              className="object-contain p-6"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.10),transparent_55%)]" />
          </div>
        </button>

        {safeImages.length > 1 ? (
          <div className="border-t border-white/10 p-3 flex gap-2 overflow-auto">
            {safeImages.slice(0, 10).map((src, i) => {
              const on = i === active;
              return (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  onClick={() => setActive(i)}
                  className={[
                    "relative h-14 w-20 flex-none overflow-hidden rounded-xl border transition",
                    on ? "border-white/30 bg-white/10" : "border-white/10 hover:border-white/20"
                  ].join(" ")}
                  aria-label={`Thumbnail ${i + 1}`}
                >
                  <Image src={src} alt={`${name} ${i + 1}`} fill className="object-cover" sizes="120px" />
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      {open ? (
        <div className="fixed inset-0 z-[200]">
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpen(false)}
            aria-label="Close"
          />
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="relative w-full max-w-5xl">
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/12 bg-black/30 backdrop-blur-2xl">
                <Image src={current} alt={name} fill className="object-contain p-6" sizes="100vw" priority />
              </div>

              {safeImages.length > 1 ? (
                <div className="mt-4 flex items-center justify-between text-white/80">
                  <button
                    type="button"
                    className="rounded-2xl border border-white/14 bg-white/10 px-4 py-2 hover:bg-white/14 transition"
                    onClick={() => setActive((v) => (v - 1 + safeImages.length) % safeImages.length)}
                  >
                    ←
                  </button>
                  <div className="text-sm tracking-[0.12em] uppercase">
                    {active + 1}/{safeImages.length}
                  </div>
                  <button
                    type="button"
                    className="rounded-2xl border border-white/14 bg-white/10 px-4 py-2 hover:bg-white/14 transition"
                    onClick={() => setActive((v) => (v + 1) % safeImages.length)}
                  >
                    →
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
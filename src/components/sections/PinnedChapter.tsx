"use client";

import { useEffect, useRef } from "react";
import { pinnedSection } from "@/lib/gsap/utils";

export function PinnedChapter({ locale }: { locale: string }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  let cleanup = () => {};
  let cancelled = false;

  const run = async () => {
    if (!wrapRef.current || !pinRef.current) return;

    // 1) отключаем pin на мобиле/планшетах
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    cleanup = await pinnedSection({
      trigger: wrapRef.current,
      pin: pinRef.current,
      end: "+=1400"
    });

    // 2) даём ScrollTrigger пересчитать всё после pin
    try {
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
      gsap.registerPlugin(ScrollTrigger);
      if (!cancelled) ScrollTrigger.refresh();
    } catch {}
  };

  run();

  return () => {
    cancelled = true;
    cleanup();
  };
}, []);

  return (
    <section ref={wrapRef} className="container py-[var(--section-pad)]">
      <div ref={pinRef} className="glass p-6 md:p-10">
        <div className="text-xs tracking-[0.28em] uppercase text-muted">Traceable path</div>
        <div className="mt-4 grid gap-6 md:grid-cols-3">
          {[
            { t: "Farm", d: "Чистая кормовая база и условия содержания." },
            { t: "Production", d: "Контроль температуры, качества и безопасности." },
            { t: "Shelf", d: "Быстрая логистика и свежесть до полки." }
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border border-glassBorder bg-white/55 p-5 backdrop-blur-md">
              <div className="text-sm font-medium text-accent2">{x.t}</div>
              <div className="mt-2 text-sm text-muted">{x.d}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-xs text-muted">
          На мобильных pinned секции автоматически упрощаются (fallback без pin).
        </div>
      </div>
    </section>
  );
}

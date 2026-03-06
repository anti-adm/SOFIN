"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

// Если используешь GSAP ScrollTrigger — раскомментируй блок ниже
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // В dev (React 19 + StrictMode) эффекты могут запускаться дважды.
    if (lenisRef.current) return;

    // gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      // Главная настройка "мягкости": чем меньше lerp — тем более "тяжёлый" и медленный скролл.
      lerp: 0.07,

      // Делает wheel плавным.
      smoothWheel: true,

      // Дополнительно замедляет колесо.
      wheelMultiplier: 0.75,

      // Чуть “тяжелее” на тачпаде/таче.
      touchMultiplier: 0.9,

      // Убирает резкие рывки от "бесконечного" wheel в macOS.
      syncTouch: true,

      // По желанию можно отключить бесконечный скролл
      infinite: false
    });

    lenisRef.current = lenis;

    // Когда Lenis скроллит — обновляем всё, что привязано к scroll (Framer Motion useScroll тоже корректно реагирует)
    // Если включишь ScrollTrigger:
    // lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;

      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
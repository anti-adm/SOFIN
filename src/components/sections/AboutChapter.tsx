"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { TransitionLink } from "@/components/nav/TransitionLink";
import { useMemo, useRef } from "react";

export function AboutChapter({ locale }: { locale: string }) {
  const wrapRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end start"]
  });

  const k = useSpring(scrollYProgress, { stiffness: 220, damping: 28, mass: 0.85 });
  const openK = useTransform(k, [0, 0.65], [0, 1], { clamp: true });

  // ✅ visible immediately on section enter (not empty)
  const titleOpacity = useTransform(openK, [0.00, 0.22], [1, 1], { clamp: true });
  const titleY = useTransform(openK, [0.00, 0.28], [10, 0], { clamp: true });

  const bodyOpacity = useTransform(openK, [0.08, 0.40], [0.78, 1], { clamp: true });
  const bodyY = useTransform(openK, [0.08, 0.40], [12, 0], { clamp: true });

  const blurV = useTransform(openK, [0.00, 0.35], [6, 0], { clamp: true });
  const blurFilter = useTransform(blurV, (b: number) => `blur(${Math.round(b)}px)`);

  const btnOpacity = useTransform(openK, [0.12, 0.50], [0.85, 1], { clamp: true });
  const btnY = useTransform(openK, [0.12, 0.50], [10, 0], { clamp: true });

  const topPad = useMemo(
    () => "pt-[calc(var(--header-h)+64px)] md:pt-[calc(var(--header-h)+86px)]",
    []
  );

  return (
    <section ref={wrapRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-[100vh] min-h-[760px] w-full overflow-hidden">
        <Image
          src="/media/hero/hero3.png"
          alt="SOFIN — About chapter"
          fill
          priority={false}
          className="object-cover blur-[4px] scale-[1.04] brightness-[0.74] contrast-[1.04] saturate-[1.02]"
          sizes="100vw"
        />

        {/* ✅ top must start dark to match Hero bottom */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[46vh] bg-gradient-to-b from-[rgba(9,18,33,0.92)] via-[rgba(9,18,33,0.42)] to-transparent" />

        {/* cinematic overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(1100px_700px_at_30%_15%,rgba(12,46,120,.10),transparent_55%),radial-gradient(1100px_700px_at_72%_25%,rgba(9,18,33,.32),transparent_62%),linear-gradient(to_bottom,rgba(9,18,33,.52),rgba(9,18,33,.18)_55%,rgba(9,18,33,.55))]" />

        {/* grain */}
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-soft-light"
          style={{ backgroundImage: "url(/media/grain.svg)", backgroundSize: "320px 320px" }}
        />

        {/* subtle animated lines (non-empty / borjomi-like vibe) */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.22]"
          initial={false}
          animate={{ opacity: [0.18, 0.26, 0.18] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(800px 200px at 70% 35%, rgba(255,255,255,0.10), transparent 60%), radial-gradient(900px 260px at 82% 60%, rgba(12,46,120,0.10), transparent 62%)"
          }}
        />

        <div className={`relative container h-full ${topPad} pb-14`}>
          <div className="h-full grid items-center">
            {/* ✅ shift right */}
            <div className="max-w-3xl md:ml-auto md:pr-6">
              <motion.div
                className="text-xs tracking-[0.28em] uppercase text-white/65"
                style={{ opacity: titleOpacity, y: titleY, filter: blurFilter }}
              >
                История
              </motion.div>

              <motion.h2
                className="h2 mt-4 text-white"
                style={{ opacity: titleOpacity, y: titleY, filter: blurFilter }}
              >
                Коротко о SOFIN
              </motion.h2>

              <motion.p
                className="mt-5 max-w-2xl text-[16px] leading-[1.75] text-white/80"
                style={{ opacity: bodyOpacity, y: bodyY, filter: blurFilter }}
              >
                Мы делаем молочные продукты из эко-фермы: чистое сырьё, стабильная логистика и
                внимание к качеству на каждом этапе. Контролируем свежесть, безопасность и вкус —
                от производства до полки.
              </motion.p>

              <motion.div className="mt-8" style={{ opacity: btnOpacity, y: btnY, filter: blurFilter }}>
                <TransitionLink href={`/${locale}/about`} className="btn btn-primary-dark glass-shimmer">
                  О компании →
                </TransitionLink>
              </motion.div>
            </div>
          </div>
        </div>

        {/* bottom fade for next sections */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-b from-transparent via-[rgba(9,18,33,0.20)] to-[rgba(9,18,33,0.10)]" />
      </div>
    </section>
  );
}
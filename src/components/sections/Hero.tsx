"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { TransitionLink } from "@/components/nav/TransitionLink";
import { useMemo, useRef } from "react";

export function Hero({ locale }: { locale: string }) {
  const wrapRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end start"],
  });

  const k = useSpring(scrollYProgress, { stiffness: 220, damping: 28, mass: 0.8 });
  const openK = useTransform(k, [0, 0.62], [0, 1], { clamp: true });

  // Card sizing
  const pad = useTransform(openK, [0, 1], [14, 34]);
  const radius = useTransform(openK, [0, 1], [18, 28]);
  const cardScale = useTransform(openK, [0, 1], [0.98, 1]);
  const maxW = useTransform(openK, [0, 1], [520, 760]);
  const cardY = useTransform(openK, [0, 1], [10, 0]);

  // Content collapse
  const contentMaxH = useTransform(openK, [0.12, 0.6], [0, 260], { clamp: true });
  const contentOpacity = useTransform(openK, [0.18, 0.55], [0, 1], { clamp: true });
  const contentY = useTransform(openK, [0.18, 0.55], [10, 0], { clamp: true });
  const blurV = useTransform(openK, [0.18, 0.55], [10, 0], { clamp: true });
  const contentFilter = useTransform(blurV, (b: number) => `blur(${Math.round(b)}px)`);
  const contentPointer = useTransform(openK, (v: number) => (v > 0.55 ? "auto" : "none"));

  // “No block at top”: shell appears gradually
  const shellA = useTransform(openK, [0, 0.25, 1], [0, 0.10, 0.16], { clamp: true });
  const borderA = useTransform(openK, [0, 0.25, 1], [0, 0.12, 0.18], { clamp: true });
  const shadowA = useTransform(openK, [0, 0.25, 1], [0, 0.18, 0.28], { clamp: true });
  const blurPx = useTransform(openK, [0, 0.25, 1], [0, 10, 14], { clamp: true });

  // ✅ FIX TS: do not use motionValue.to
  const shellBg = useTransform(shellA, (a: number) => `rgba(255,255,255,${a})`);
  const shellBorder = useTransform(borderA, (a: number) => `1px solid rgba(255,255,255,${a})`);
  const shellShadow = useTransform(
    shadowA,
    (a: number) => `0 18px 52px rgba(0,0,0,${a}), inset 0 1px 0 rgba(255,255,255,0.10)`
  );
  const backdrop = useTransform(blurPx, (b: number) => `blur(${Math.round(b)}px)`);

  // ✅ Extra contrast under text (this is what removes “black-looking” feel)
  const innerDarkA = useTransform(openK, [0, 0.25, 1], [0, 0.22, 0.30], { clamp: true });
  const innerDarkBg = useTransform(
    innerDarkA,
    (a: number) =>
      `linear-gradient(180deg, rgba(9,18,33,${a}) 0%, rgba(9,18,33,${Math.max(
        0,
        a - 0.10
      )}) 55%, rgba(9,18,33,0) 100%)`
  );

  const topPad = useMemo(
    () => "pt-[calc(var(--header-h)+44px)] md:pt-[calc(var(--header-h)+56px)]",
    []
  );

  return (
    <section ref={wrapRef} className="relative -mt-[var(--header-h)] h-[200vh]">
      <div className="sticky top-0 h-[100vh] min-h-[720px] w-full overflow-hidden">
        <Image
          src="/media/hero/12312322.png"
          alt="SOFIN"
          fill
          priority
          className="object-cover object-center blur-[6px] scale-[1] brightness-[0.70] contrast-[1.06] saturate-[1.02]"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-[radial-gradient(1100px_700px_at_30%_15%,rgba(12,46,120,.14),transparent_55%),radial-gradient(1100px_700px_at_72%_25%,rgba(9,18,33,.34),transparent_62%),linear-gradient(to_bottom,rgba(9,18,33,.78),rgba(9,18,33,.44)_46%,rgba(246,249,255,.06))]" />

        <div
          className="absolute inset-0 opacity-[0.10] mix-blend-soft-light"
          style={{ backgroundImage: "url(/media/grain.svg)", backgroundSize: "320px 320px" }}
        />

        <div className={`relative container h-full ${topPad} pb-10`}>
          <div className="h-full grid items-center">
            <motion.div className="will-change-transform" style={{ maxWidth: maxW, scale: cardScale, y: cardY }}>
              <motion.div
                className="relative overflow-hidden"
                style={{
                  padding: pad,
                  borderRadius: radius,
                  background: shellBg,
                  border: shellBorder,
                  boxShadow: shellShadow,
                  backdropFilter: backdrop as unknown as string,
                  WebkitBackdropFilter: backdrop as unknown as string,
                }}
              >
                {/* subtle top highlight */}
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    opacity: openK,
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.02) 100%)",
                  }}
                />

                {/* ✅ contrast layer under text (prevents “black text feeling”) */}
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{ opacity: openK, background: innerDarkBg }}
                />

                {/* ✅ FORCE white text for entire content block */}
                <div className="relative text-white">
                  <div className="text-xs tracking-[0.34em] uppercase text-white/70">SOFIN</div>

                  <h1 className="h1 mt-4 text-white">
                    От фермы <br /> до полки
                  </h1>

                  <motion.div
                    className="overflow-hidden"
                    style={{
                      maxHeight: contentMaxH,
                      opacity: contentOpacity,
                      y: contentY,
                      filter: contentFilter,
                      pointerEvents: contentPointer as any,
                    }}
                  >
                    <p className="mt-6 max-w-xl text-[15px] leading-[1.78] text-white/78">
                      Свежие, качественные и полезные молочные продукты из эко-фермы — с вниманием к
                      безопасности, вкусу и пути каждого продукта.
                    </p>

                    <div className="mt-9 flex flex-wrap items-center gap-3">
                      <TransitionLink href={`/${locale}/products`} className="btn btn-primary-dark glass-shimmer">
                        Смотреть продукцию
                      </TransitionLink>

                      {/* ✅ ensure not inheriting dark */}
                      <TransitionLink href={`/${locale}/about`} className="btn btn-ghost-dark text-white/80 hover:text-white">
                        О компании →
                      </TransitionLink>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* glue to next section (no banding) */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[52vh]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(9,18,33,0.12) 30%, rgba(9,18,33,0.92) 100%)",
          }}
        />
      </div>
    </section>
  );
}
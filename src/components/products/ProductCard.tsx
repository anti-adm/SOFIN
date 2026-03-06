"use client";

import Image from "next/image";
import { type Product } from "@/lib/content/types";
import { TransitionLink } from "@/components/nav/TransitionLink";

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.92"
      />
    </svg>
  );
}

function clamp2LinesStyle(): React.CSSProperties {
  return {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden"
  };
}

export function ProductCard({ locale, p }: { locale: string; p: Product }) {
  const src = p.images?.[0] ? p.images[0] : "/media/placeholder.png";
  const alt = p.name ? p.name : "SOFIN product";
  const weight = p.facts?.netWeight;

  return (
    <TransitionLink href={`/${locale}/products/${p.slug}`} className="group block">
      <div
        className={[
          "relative overflow-hidden rounded-[22px]",
          "border border-white/12 bg-white/[0.06]",
          "backdrop-blur-2xl backdrop-saturate-150",
          "transition duration-300",
          "hover:border-white/18"
        ].join(" ")}
        style={{
          boxShadow: "0 18px 55px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.10)"
        }}
      >
        {/* top media */}
        <div className="relative aspect-[4/3]">
          {/* subtle brand haze */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(12,46,120,0.18),transparent_62%)]" />

          <Image
            src={src}
            alt={alt}
            fill
            className={[
              "transition duration-700",
              "group-hover:scale-[1.04]",
              // SVG-плейсхолдеры и “плоские” картинки смотрятся лучше contain
              src.endsWith(".svg") ? "object-contain p-8" : "object-cover"
            ].join(" ")}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* bottom readability */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

          {/* small chips */}
          <div className="absolute left-3 top-3 flex items-center gap-2">
            <div className="rounded-full border border-white/18 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] uppercase text-white/80 backdrop-blur-xl">
              {p.category}
            </div>

            {weight ? (
              <div className="rounded-full border border-white/18 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80 backdrop-blur-xl">
                {weight}
              </div>
            ) : null}
          </div>
        </div>

        {/* bottom content */}
        <div className="p-4 md:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[15px] md:text-[16px] font-semibold text-white leading-snug">
                {p.name}
              </div>

              <div className="mt-2 text-[13px] md:text-[14px] leading-[1.55] text-white/70" style={clamp2LinesStyle()}>
                {p.description}
              </div>
            </div>

            <div
              className={[
                "mt-0.5 shrink-0",
                "h-9 w-9 rounded-full",
                "border border-white/16 bg-white/8",
                "grid place-items-center",
                "text-white/70",
                "transition duration-200",
                "group-hover:bg-white/12 group-hover:text-white"
              ].join(" ")}
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)" }}
              aria-hidden="true"
            >
              <ArrowIcon />
            </div>
          </div>
        </div>

        {/* micro shine */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"
          style={{
            background:
              "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.14) 45%, transparent 70%)",
            transform: "translateX(-40%)"
          }}
        />
      </div>
    </TransitionLink>
  );
}
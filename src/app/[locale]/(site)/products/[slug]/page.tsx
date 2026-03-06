import Image from "next/image";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { type AppLocale, isLocale } from "@/lib/i18n/locales";
import { getProduct } from "@/lib/content/products";
import React from "react";
import { ProductGallery } from "@/components/products/ProductGallery";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params;
  const locale = (isLocale(raw) ? raw : "uz") as AppLocale;

  const p = await getProduct(locale, slug);
  if (!p) return buildMetadata({ locale, pathname: `/products/${slug}`, title: "Product" });

  return buildMetadata({
    locale,
    pathname: `/products/${slug}`,
    title: p.name,
    description: p.description
  });
}

export default async function ProductPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params;
  const locale = (isLocale(raw) ? raw : "uz") as AppLocale;

  const p = await getProduct(locale, slug);
  if (!p) return notFound();

  const nut = p.nutrition;

  return (
    <div className="relative min-h-[100vh]">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <Image
          src="/media/products/hero.png"
          alt="SOFIN background"
          fill
          priority
          className="object-cover blur-[2px] scale-[1.03] brightness-[0.60] contrast-[1.06] saturate-[1.02]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[radial-gradient(1100px_700px_at_30%_15%,rgba(12,46,120,.12),transparent_55%),radial-gradient(1100px_700px_at_72%_25%,rgba(9,18,33,.48),transparent_62%),linear-gradient(to_bottom,rgba(9,18,33,.86),rgba(9,18,33,.55)_50%,rgba(9,18,33,.82))]" />
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-soft-light"
          style={{ backgroundImage: "url(/media/grain.svg)", backgroundSize: "320px 320px" }}
        />
        <div className="absolute inset-x-0 top-0 h-[36vh] bg-gradient-to-b from-[rgba(9,18,33,0.88)] via-[rgba(9,18,33,0.35)] to-transparent" />
      </div>

      <section className="container pt-[calc(var(--header-h)+30px)] md:pt-[calc(var(--header-h)+50px)] pb-[var(--section-pad)]">
        {/* Breadcrumbs */}
        <div className="text-[12px] text-white/55">
          <a className="hover:text-white/80 transition" href={`/${locale}`}>
            Главная
          </a>
          <span className="mx-2 text-white/35">›</span>
          <a className="hover:text-white/80 transition" href={`/${locale}/products`}>
            Каталог
          </a>
          <span className="mx-2 text-white/35">›</span>
          <span className="text-white/80">{p.name}</span>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* LEFT */}
          <div className="lg:col-span-5">
            <ProductGallery name={p.name} images={p.images ?? []} />
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-7">
            <div
              className="rounded-[26px] border border-white/10 bg-white/[0.05] backdrop-blur-2xl backdrop-saturate-150 p-6 md:p-8"
              style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.10)" }}
            >
              <h1 className="text-[42px] md:text-[56px] leading-[0.96] font-semibold tracking-[-0.03em] text-white">
                {p.name}
              </h1>

              <p className="mt-4 max-w-2xl text-[15px] md:text-[16px] leading-[1.85] text-white/75">
                {p.description}
              </p>

              {/* NUTRITION */}
              {nut ? (
                <>
                  <div className="mt-10 grid gap-4 sm:grid-cols-2">
                    <MetricCard icon={<IconProtein />} label="Белки" value={nut.protein} suffix="г" />
                    <MetricCard icon={<IconCarbs />} label="Углеводы" value={nut.carbs} suffix="г" />
                    <MetricCard icon={<IconFats />} label="Жиры" value={nut.fats} suffix="г" />
                    <MetricCard icon={<IconKcal />} label="Ккал" value={nut.kcal} />
                  </div>

                  {nut.note ? (
                    <div className="mt-5 text-[13px] text-white/55">{nut.note}</div>
                  ) : null}

                  <div className="mt-8 h-px bg-white/10" />
                </>
              ) : null}

              {/* FACTS */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <MetricCard icon={<IconClock />} label="Срок хранения" value={p.facts?.shelfLife ?? "—"} />
                <MetricCard icon={<IconBox />} label="Кол-во в упаковке" value={p.facts?.packCount ?? "—"} />
                <MetricCard icon={<IconWeight />} label="Масса нетто" value={p.facts?.netWeight ?? "—"} />
              </div>

              {/* INGREDIENTS */}
              <h2 className="mt-12 text-[34px] md:text-[44px] leading-[1] font-semibold tracking-[-0.02em] text-white">
                Состав
              </h2>
              <p className="mt-5 text-[15px] md:text-[16px] leading-[1.9] text-white/72">
                {p.ingredients ?? "—"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function formatVal(v: string | number | null | undefined) {
  if (v === null || v === undefined) return "—";
  if (typeof v === "number") return Number.isFinite(v) ? String(v) : "—";
  const s = v.trim();
  return s.length ? s : "—";
}

function MetricCard({
  icon,
  label,
  value,
  suffix
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number | null | undefined;
  suffix?: string;
}) {
  const txt = formatVal(value);

  return (
    <div
      className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4 flex items-start gap-4"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)" }}
    >
      <div className="text-white/80">{icon}</div>
      <div className="min-w-0">
        <div className="text-[13px] tracking-[0.14em] uppercase text-white/55">{label}</div>
        <div className="mt-1 text-[18px] font-semibold text-white">
          {txt}
          {txt !== "—" && suffix ? ` ${suffix}` : ""}
        </div>
      </div>
    </div>
  );
}

/* Icons (your style: thin, clean, readable on dark) */
function IconProtein() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 7c0-2 1.6-3 4-3s4 1 4 3-1.6 3-4 3-4-1-4-3Z" stroke="currentColor" strokeWidth="1.6" opacity="0.9" />
      <path d="M6 20c.6-3.8 2.6-6 6-6s5.4 2.2 6 6" stroke="currentColor" strokeWidth="1.6" opacity="0.9" strokeLinecap="round" />
    </svg>
  );
}
function IconCarbs() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3v18" stroke="currentColor" strokeWidth="1.6" opacity="0.9" strokeLinecap="round" />
      <path d="M7 8c2-2 8-2 10 0" stroke="currentColor" strokeWidth="1.6" opacity="0.9" strokeLinecap="round" />
      <path d="M7 16c2 2 8 2 10 0" stroke="currentColor" strokeWidth="1.6" opacity="0.9" strokeLinecap="round" />
    </svg>
  );
}
function IconFats() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3s6 6.2 6 11.1A6 6 0 1 1 6 14.1C6 9.2 12 3 12 3Z" stroke="currentColor" strokeWidth="1.6" opacity="0.9" />
    </svg>
  );
}
function IconKcal() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2c3 4 3 6 1 8 3-1 6 2 6 6a7 7 0 1 1-14 0c0-3 2-6 6-8" stroke="currentColor" strokeWidth="1.6" opacity="0.9" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 8v5l3 2" stroke="currentColor" strokeWidth="1.6" opacity="0.9" strokeLinecap="round" />
      <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z" stroke="currentColor" strokeWidth="1.6" opacity="0.9" />
    </svg>
  );
}
function IconBox() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 8.5 12 3 3 8.5v7L12 21l9-5.5v-7Z" stroke="currentColor" strokeWidth="1.6" opacity="0.9" />
      <path d="M3 8.5 12 14l9-5.5" stroke="currentColor" strokeWidth="1.6" opacity="0.9" />
    </svg>
  );
}
function IconWeight() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 20h10" stroke="currentColor" strokeWidth="1.6" opacity="0.9" strokeLinecap="round" />
      <path d="M9 20V8a3 3 0 0 1 6 0v12" stroke="currentColor" strokeWidth="1.6" opacity="0.9" strokeLinecap="round" />
      <path d="M10 8h4" stroke="currentColor" strokeWidth="1.6" opacity="0.9" strokeLinecap="round" />
    </svg>
  );
}
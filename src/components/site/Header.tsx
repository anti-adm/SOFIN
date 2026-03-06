"use client";

import { TransitionLink } from "@/components/nav/TransitionLink";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MobileMenu } from "./MobileMenu";
import { type AppLocale } from "@/lib/i18n/locales";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function normPath(p: string) {
  return (p || "/").split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
}

function stripLocale(pathname: string, locale: AppLocale) {
  const p = normPath(pathname);
  const prefix = `/${locale}`;
  if (p === prefix) return "";
  if (p.startsWith(prefix + "/")) return p.slice(prefix.length);
  return p;
}

function isActiveLink(pathname: string, href: string, locale: AppLocale) {
  const p = normPath(pathname);
  const h = normPath(href);

  const homeHref = `/${locale}`;
  if (h === homeHref) return p === homeHref;

  return p === h || p.startsWith(h + "/");
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
      <path d="M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
        stroke="currentColor"
        strokeWidth="1.8"
        opacity="0.9"
      />
      <path d="M2 12h20" stroke="currentColor" strokeWidth="1.8" opacity="0.55" />
      <path
        d="M12 2c2.9 2.6 4.5 6.1 4.5 10S14.9 19.4 12 22c-2.9-2.6-4.5-6.1-4.5-10S9.1 4.6 12 2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        opacity="0.55"
      />
    </svg>
  );
}

export function Header({
  locale,
  nav
}: {
  locale: AppLocale;
  nav: { href: string; label: string }[];
}) {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  // desktop language
  const [langOpen, setLangOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // ✅ закрываем моб. меню ТОЛЬКО когда реально поменялся pathname
  useEffect(() => {
    setLangOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  // lock scroll while mobile menu open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // glass dynamics
  const [k, setK] = useState(0);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef(0);
  const curRef = useRef(0);

  useEffect(() => {
    const read = () => {
      const y = window.scrollY || 0;
      targetRef.current = clamp(y / 80, 0, 1);
      if (rafRef.current) return;

      const tick = () => {
        const cur = curRef.current;
        const next = cur + (targetRef.current - cur) * 0.14;
        curRef.current = next;
        setK(next);

        if (Math.abs(targetRef.current - next) < 0.002) {
          rafRef.current = null;
          return;
        }
        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // close desktop language on outside click / ESC
  useEffect(() => {
    if (!langOpen) return;

    const onDown = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setLangOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLangOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [langOpen]);

  const liftY = useMemo(() => Math.round(2 - 2 * k), [k]);

  const shellBg = useMemo(() => {
    const a = 0.18 + 0.07 * k;
    return `rgba(235,242,255,${a.toFixed(3)})`;
  }, [k]);

  const borderA = useMemo(() => (0.22 + 0.10 * k).toFixed(3), [k]);

  const shadow = useMemo(() => {
    const s1 = 0.10 + 0.08 * k;
    const s2 = 0.18 + 0.10 * k;
    return `0 18px 55px rgba(0,0,0,${s1.toFixed(3)}), 0 6px 18px rgba(0,0,0,${s2.toFixed(3)})`;
  }, [k]);

  // locale links preserving current path
  const rest = stripLocale(pathname, locale);
  const locales: AppLocale[] = ["uz", "ru", "en"];
  const localeHref = (l: AppLocale) => `/${l}${rest}`;

  return (
    <header className="fixed top-3 left-0 right-0 z-[80]">
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu overlay"
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 z-[60] bg-black/20"
        />
      )}

      <div className="container">
        <div className="will-change-transform" style={{ transform: `translate3d(0, ${liftY}px, 0)` }}>
          <div
            ref={wrapRef}
            className={[
              "relative",
              "overflow-hidden md:overflow-visible",
              "rounded-[22px] md:rounded-[26px]",
              "border backdrop-blur-2xl backdrop-saturate-150",
              "transition-[box-shadow] duration-300",
              "text-slate-900"
            ].join(" ")}
            style={{
              background: shellBg,
              borderColor: `rgba(255,255,255,${borderA})`,
              boxShadow: shadow
            }}
          >
            {/* texture */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.36) 42%, rgba(255,255,255,0.12) 100%)"
                }}
              />
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(20,40,90,0.25) 1px, transparent 0)",
                  backgroundSize: "22px 22px"
                }}
              />
              <div className="absolute inset-x-0 top-0 h-px bg-white/70" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-black/5" />
            </div>

            {/* bar */}
            <div className="relative flex items-center justify-between h-[60px] md:h-[var(--header-h)] px-4 md:px-5">
              <TransitionLink href={`/${locale}`} className="relative flex items-center gap-3 min-w-0">
                <div className="h-12 w-12 md:h-[58px] md:w-[58px] rounded-2xl border border-white/35 bg-white/45 backdrop-blur-xl grid place-items-center overflow-hidden">
                  <img
                    src="/media/logotip.png"
                    alt="SOFIN"
                    className="h-9 w-9 md:h-10 md:w-10 object-contain"
                    draggable={false}
                  />
                </div>

                <div className="hidden sm:block leading-tight min-w-0">
                  <div className="text-[12px] md:text-[13px] font-semibold tracking-[0.28em] text-slate-950">SOFIN</div>
                  <div className="text-[11px] md:text-xs font-medium text-slate-600 mt-0.5 tracking-[0.02em]">
                    От фермы до полки
                  </div>
                </div>
              </TransitionLink>

              <nav className="relative hidden md:flex items-center gap-2">
                {nav.map((it) => {
                  const active = isActiveLink(pathname, it.href, locale);
                  return (
                    <TransitionLink
                      key={it.href}
                      href={it.href}
                      className={[
                        "relative px-3 py-2 rounded-2xl",
                        "text-[13px] font-semibold tracking-[0.08em]",
                        "transition-colors duration-200",
                        active ? "text-slate-950" : "text-slate-700 hover:text-slate-950"
                      ].join(" ")}
                    >
                      {active && (
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 rounded-2xl"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.26) 100%)",
                            boxShadow:
                              "0 10px 26px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.75)",
                            border: "1px solid rgba(255,255,255,0.30)"
                          }}
                        />
                      )}
                      <span className="relative">{it.label}</span>
                    </TransitionLink>
                  );
                })}
              </nav>

              <div className="relative flex items-center gap-2 md:gap-3">
                {/* desktop language */}
                <div className="hidden md:block relative">
                  <button
                    type="button"
                    aria-label="Language"
                    aria-expanded={langOpen}
                    onClick={() => setLangOpen((v) => !v)}
                    className="relative rounded-2xl border px-3 py-2 border-white/25 bg-white/10 backdrop-blur-xl text-slate-800 hover:text-slate-950 transition duration-200 grid place-items-center shadow-[inset_0_1px_0_rgba(255,255,255,0.30)]"
                  >
                    <GlobeIcon />
                  </button>

                  <div
                    className={[
                      "absolute right-0 top-[calc(100%+10px)] z-[90]",
                      "origin-top-right transition duration-200 ease-out",
                      langOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    ].join(" ")}
                    style={{
                      transform: langOpen ? "translate3d(0,0,0) scale(1)" : "translate3d(0,-6px,0) scale(0.98)"
                    }}
                  >
                    <div
                      className="relative overflow-hidden rounded-[22px] border border-white/25 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_22px_70px_rgba(0,0,0,0.22)]"
                      style={{ background: shellBg }}
                    >
                      <div className="relative p-2 w-[210px]">
                        <div className="px-2 py-1.5 text-[11px] tracking-[0.18em] font-semibold text-slate-600">LANGUAGE</div>
                        <div className="mt-1 grid gap-1">
                          {locales.map((l) => {
                            const current = l === locale;
                            return (
                              <TransitionLink
                                key={l}
                                href={localeHref(l)}
                                className={[
                                  "rounded-xl px-3 py-2",
                                  "text-[13px] font-semibold tracking-[0.10em]",
                                  "border backdrop-blur-xl transition",
                                  "shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]",
                                  current
                                    ? "text-slate-950 bg-white/35 border-white/25"
                                    : "text-slate-700 bg-white/12 border-white/20 hover:bg-white/22 hover:text-slate-950"
                                ].join(" ")}
                              >
                                {l.toUpperCase()}
                              </TransitionLink>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* mobile burger */}
                <button
                  className="md:hidden relative rounded-2xl border h-10 w-10 border-white/25 bg-white/10 backdrop-blur-xl text-slate-800 hover:text-slate-950 transition duration-200 grid place-items-center shadow-[inset_0_1px_0_rgba(255,255,255,0.30)]"
                  onClick={() => setMobileOpen((v) => !v)}
                  aria-label="Open menu"
                  type="button"
                >
                  <MenuIcon />
                </button>
              </div>
            </div>

            <div
              className={[
                "md:hidden relative",
                "transition-[max-height,opacity] duration-200 ease-out",
                mobileOpen ? "opacity-100" : "opacity-0"
              ].join(" ")}
              style={{ maxHeight: mobileOpen ? 420 : 0 }}
            >
              <div className="px-4">
                <div className="h-px bg-white/35" />
              </div>

              <div className="px-4 py-3">
                <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} items={nav} locale={locale} localeHref={localeHref} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
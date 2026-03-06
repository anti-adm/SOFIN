"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { type AppLocale } from "@/lib/i18n/locales";

function normPath(p: string) {
  return (p || "/").split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
}

function isActive(pathname: string, href: string, locale: AppLocale) {
  const p = normPath(pathname);
  const h = normPath(href);
  const home = `/${locale}`;
  if (h === home) return p === home;
  return p === h || p.startsWith(h + "/");
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

export function MobileMenu({
  open,
  onClose,
  items,
  locale,
  localeHref
}: {
  open: boolean;
  onClose: () => void;
  items: { href: string; label: string }[];
  locale: AppLocale;
  localeHref: (l: AppLocale) => string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    if (!open) setLangOpen(false);
  }, [open]);

  const push = (href: string) => {
    // ВАЖНО: не закрываем меню тут.
    // Header сам закроет меню после реального pathname-change.
    startTransition(() => router.push(href));
  };

  const locales: AppLocale[] = ["uz", "ru", "en"];

  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between">
        <div className="text-[11px] tracking-[0.22em] font-semibold text-white/55">MENU</div>

        <button
          type="button"
          onClick={onClose}
          className="text-[12px] font-semibold tracking-[0.10em] text-white/70 hover:text-white transition"
        >
          CLOSE
        </button>
      </div>

      <div className="grid gap-2">
        {items.map((it) => {
          const active = isActive(pathname, it.href, locale);
          return (
            <button
              key={it.href}
              type="button"
              onClick={() => push(it.href)}
              className={[
                "text-left",
                "rounded-2xl px-4 py-3",
                "border backdrop-blur-xl transition",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]",
                "text-[15px] font-semibold tracking-[0.04em]",
                active
                  ? "bg-white/10 border-white/14 text-white"
                  : "bg-white/0 border-white/10 text-white/75 hover:text-white hover:bg-white/8"
              ].join(" ")}
            >
              {it.label}
            </button>
          );
        })}
      </div>

      {/* language */}
      <div className="pt-1">
        <div className="text-[11px] tracking-[0.18em] font-semibold text-white/55">LANGUAGE</div>

        <div className="mt-2 flex items-stretch gap-2">
          <button
            type="button"
            aria-label="Open language"
            aria-expanded={langOpen}
            onClick={() => setLangOpen((v) => !v)}
            className="rounded-2xl border h-10 w-10 flex-none border-white/14 bg-white/5 backdrop-blur-xl text-white/75 hover:text-white transition duration-200 grid place-items-center shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]"
          >
            <GlobeIcon />
          </button>

          <div
            className={[
              "overflow-hidden rounded-2xl border border-white/14 backdrop-blur-xl",
              "transition-[max-width,opacity] duration-200 ease-out",
              langOpen ? "opacity-100" : "opacity-0"
            ].join(" ")}
            style={{
              maxWidth: langOpen ? 260 : 0,
              background: "rgba(255,255,255,0.04)"
            }}
          >
            <div className="px-2 py-1 flex gap-1">
              {locales.map((l) => {
                const current = l === locale;
                return (
                  <button
                    key={l}
                    type="button"
                    onClick={() => push(localeHref(l))}
                    className={[
                      "rounded-xl px-3 py-2",
                      "text-[13px] font-semibold tracking-[0.10em]",
                      "border backdrop-blur-xl transition",
                      "shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]",
                      current
                        ? "text-white bg-white/10 border-white/14"
                        : "text-white/70 bg-white/0 border-white/10 hover:bg-white/8 hover:text-white"
                    ].join(" ")}
                  >
                    {l.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
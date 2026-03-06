"use client";

import { usePathname, useRouter } from "next/navigation";
import { LOCALES, type AppLocale } from "@/lib/i18n/locales";
import { stripLocale, withLocale } from "@/lib/i18n/routing";
import { motion } from "framer-motion";
import { requestIntro } from "@/components/intro/introBus";
import { flushSync } from "react-dom";

export function LocaleSwitcher({ locale }: { locale: AppLocale }) {
  const router = useRouter();
  const pathname = usePathname();
  const base = stripLocale(pathname);

  return (
    <div className="flex items-center gap-1 rounded-full border border-glassBorder bg-white/55 px-2 py-1 backdrop-blur-md">
      {LOCALES.map((l) => {
        const active = l === locale;

        return (
          <button
            key={l}
            type="button"
            onClick={() => {
              if (active) return;

              const nextUrl = withLocale(l, base);

              // show logo overlay immediately
              flushSync(() => {
                requestIntro("mini");
              });

              // navigate after a tiny delay so the overlay paints first
              setTimeout(() => {
                router.push(nextUrl);
              }, 30);
            }}
            className="relative px-2.5 py-1 text-xs uppercase tracking-widest"
            aria-label={`Switch language to ${l}`}
          >
            {active && (
              <motion.span
                layoutId="loc"
                className="absolute inset-0 rounded-full bg-accent/10"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className={active ? "relative text-accent2" : "relative text-muted"}>{l}</span>
          </button>
        );
      })}
    </div>
  );
}
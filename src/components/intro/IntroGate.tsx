"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { IntroLoader } from "./IntroLoader";
import { onIntroRequest } from "./introBus";

const KEY = "sofin_intro_seen";

export function IntroGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lastPathRef = useRef<string | null>(null);

  const [mode, setMode] = useState<"full" | "mini">("full");
  const [show, setShow] = useState(false);

  // lock scroll while intro visible
  useEffect(() => {
    if (!show) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [show]);

  // listen to "pre-navigation" requests (instant overlay)
  useEffect(() => {
    return onIntroRequest((m) => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;
      setMode(m);
      setShow(true);
    });
  }, []);

  // first load only (full intro once per session)
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    if (lastPathRef.current === null) {
      lastPathRef.current = pathname;
      const seen = sessionStorage.getItem(KEY) === "1";
      if (!seen) {
        setMode("full");
        setShow(true);
      }
      return;
    }
  }, [pathname]);

  if (!show) return <>{children}</>;

  return (
    <>
      <IntroLoader
        mode={mode}
        onDone={() => {
          sessionStorage.setItem(KEY, "1");
          setShow(false);
        }}
      />
      {children}
    </>
  );
}
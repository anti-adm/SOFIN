"use client";

import { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { requestIntro } from "@/components/intro/introBus";
import { flushSync } from "react-dom";

type Props = LinkProps & {
  className?: string;
  children: React.ReactNode;
};

export function TransitionLink({ href, children, className }: Props) {
  const router = useRouter();

  return (
    <a
      href={String(href)}
      className={className}
      onClick={(e) => {
        // allow new tab / middle click / modified click
        if (
          e.defaultPrevented ||
          e.button !== 0 ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey
        )
          return;

        e.preventDefault();

        // 1) force overlay to render NOW
        flushSync(() => {
          requestIntro("mini");
        });

        // 2) navigate on next tick (gives DOM a frame)
        setTimeout(() => {
          router.push(String(href));
        }, 30);
      }}
    >
      {children}
    </a>
  );
}
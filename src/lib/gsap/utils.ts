export async function gsapCore() {
  const gsap = (await import("gsap")).default;
  const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}

export function isSmallScreen() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(max-width: 900px)").matches;
}

export async function pinnedSection(opts: { trigger: Element; pin: Element; start?: string; end?: string }) {
  const { gsap, ScrollTrigger } = await gsapCore();
  if (isSmallScreen()) return () => {};

  const st = ScrollTrigger.create({
    trigger: opts.trigger,
    start: opts.start ?? "top top",
    end: opts.end ?? "+=1200",
    pin: opts.pin,
    pinSpacing: true,
    scrub: true,
    anticipatePin: 1,
    invalidateOnRefresh: true
  });


  ScrollTrigger.refresh();

  return () => st.kill();
}

export async function parallaxY(el: Element, amount = 80) {
  const { gsap } = await gsapCore();
  if (isSmallScreen()) return () => {};
  const tween = gsap.to(el, { y: amount, ease: "none", scrollTrigger: { trigger: el, scrub: true } });
  return () => tween.kill();
}

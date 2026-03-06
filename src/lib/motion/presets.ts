export const EASE = [0.16, 1, 0.3, 1] as const;

export const fadeUp = {
  initial: { opacity: 0, y: 16, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.7, ease: EASE }
} as const;

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.55, ease: EASE }
} as const;

export const scaleIn = {
  initial: { opacity: 0, scale: 0.985, filter: "blur(10px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  transition: { duration: 0.65, ease: EASE }
} as const;

export const blurIn = {
  initial: { opacity: 0, filter: "blur(14px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  transition: { duration: 0.75, ease: EASE }
} as const;

export const staggerChildren = {
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.08 }
  }
} as const;

export const pageTransition = {
  initial: { opacity: 0, y: 10, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, filter: "blur(12px)" },
  transition: { duration: 0.55, ease: EASE }
} as const;
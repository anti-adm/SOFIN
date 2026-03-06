// src/components/intro/introBus.ts
type Listener = (mode: "mini" | "full") => void;

const listeners = new Set<Listener>();

export function onIntroRequest(fn: Listener): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn); // важно: без return boolean
  };
}

export function requestIntro(mode: "mini" | "full" = "mini") {
  listeners.forEach((fn) => fn(mode));
}
"use client";

import { useMemo, useState } from "react";
import { z } from "zod";

const Schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});

export function ContactForm() {
  const [v, setV] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const result = useMemo(() => Schema.safeParse(v), [v]);

  const error = (key: keyof typeof v) => {
    if (!touched[key]) return "";
    const issue = result.success ? null : result.error.issues.find((i) => i.path[0] === key);
    return issue?.message ?? "";
  };

  return (
    <div className="glass p-6 md:p-8">
      <div className="text-xs tracking-[0.28em] uppercase text-muted">Form (UI only)</div>
      <div className="mt-4 grid gap-4">
        <Field label="Name" value={v.name} onChange={(x: string) => setV((s) => ({ ...s, name: x }))} onBlur={() => setTouched((s) => ({ ...s, name: true }))} error={error("name")} />
        <Field label="Email" value={v.email} onChange={(x: string) => setV((s) => ({ ...s, email: x }))} onBlur={() => setTouched((s) => ({ ...s, email: true }))} error={error("email")} />
        <FieldArea label="Message" value={v.message} onChange={(x: string) => setV((s) => ({ ...s, message: x }))} onBlur={() => setTouched((s) => ({ ...s, message: true }))} error={error("message")} />
        <button
          type="button"
          disabled={!result.success}
          className="rounded-2xl border border-glassBorder bg-accent/10 px-5 py-3 text-sm text-accent2 backdrop-blur-md transition hover:shadow-soft disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, onBlur, error }: any) {
  return (
    <div>
      <div className="text-xs tracking-[0.18em] uppercase text-muted">{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className="mt-2 w-full rounded-2xl border border-glassBorder bg-white/55 px-4 py-3 text-sm outline-none backdrop-blur-md focus:border-accent/40"
      />
      {error && <div className="mt-2 text-xs text-red-600">{error}</div>}
    </div>
  );
}

function FieldArea({ label, value, onChange, onBlur, error }: any) {
  return (
    <div>
      <div className="text-xs tracking-[0.18em] uppercase text-muted">{label}</div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        rows={5}
        className="mt-2 w-full rounded-2xl border border-glassBorder bg-white/55 px-4 py-3 text-sm outline-none backdrop-blur-md focus:border-accent/40"
      />
      {error && <div className="mt-2 text-xs text-red-600">{error}</div>}
    </div>
  );
}

import { buildMetadata } from "@/lib/seo/metadata";
import { type AppLocale, isLocale } from "@/lib/i18n/locales";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "uz") as AppLocale;
  return buildMetadata({ locale, pathname: "/privacy", title: "Privacy" });
}

export default async function PrivacyPage() {
  return (
    <section className="container pt-[var(--section-pad)]">
      <div className="h1">Privacy policy</div>
      <div className="mt-6 glass p-6 md:p-10">
        <div className="mx-auto max-w-[720px]">
          <p className="p">
            MVP placeholder. Replace with your real policy text. Keep the structure: sections, short paragraphs, calm typography.
          </p>
          <div className="mt-6 hr" />
          <div className="mt-6 space-y-4">
            <p className="p">1. What we collect: form fields (if enabled later), basic analytics (optional).</p>
            <p className="p">2. How we use it: to respond to requests and improve the site.</p>
            <p className="p">3. Contact: yangi_asr_2000@mail.ru</p>
          </div>
        </div>
      </div>
    </section>
  );
}

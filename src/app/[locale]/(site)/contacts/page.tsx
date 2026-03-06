import { buildMetadata } from "@/lib/seo/metadata";
import { type AppLocale, isLocale } from "@/lib/i18n/locales";
import { ContactForm } from "@/components/forms/ContactForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "uz") as AppLocale;
  return buildMetadata({ locale, pathname: "/contacts", title: "Contacts" });
}

export default async function ContactsPage({ params }: { params: Promise<{ locale: string }> }) {
  await params;

  return (
    <section className="container pt-[var(--section-pad)]">
      <div className="h1">Contacts</div>
      <p className="p mt-3 max-w-2xl"></p>

      <div className="mt-10 grid gap-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="glass p-6">
            <div className="text-sm font-medium text-accent2">SOFIN Uzbekistan</div>
            <div className="mt-4 text-sm text-muted space-y-1">
              <div>Телефон: +998 71 200 36 36</div>
              <div>Telegram: @sofin.uz</div>
              <div>Instagram: sofin.uz</div>
              <div>Email: yangi_asr_2000@mail.ru</div>
            </div>
            <div className="mt-6 hr" />
            <div className="mt-6 text-xs text-muted">
              Map placeholder (). 
            </div>
            <div className="mt-4 rounded-3xl border border-glassBorder bg-white/45 p-6 text-sm text-muted backdrop-blur-md">
              Map placeholder
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

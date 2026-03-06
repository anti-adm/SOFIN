import { buildMetadata } from "@/lib/seo/metadata";
import { type AppLocale, isLocale } from "@/lib/i18n/locales";
import { PinnedChapter } from "@/components/sections/PinnedChapter";
import { StorySection } from "@/components/sections/StorySection";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "uz") as AppLocale;
  return buildMetadata({ locale, pathname: "/about", title: "About" });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "uz") as AppLocale;

  return (
    <div>
      <section className="container pt-[var(--section-pad)]">
        <div className="h1">About SOFIN</div>
        <p className="p mt-3 max-w-2xl">
          
        </p>
      </section>

      <StorySection
        eyebrow="Timeline"
        title="From farm routines to shelf-ready logistics"
        subtitle="MVP narrative blocks. Later you can swap with real milestones from content files."
        media={{ kind: "image", src: "/media/story-farm.svg", alt: "Timeline" }}
      />

      <PinnedChapter locale={locale} />
    </div>
  );
}
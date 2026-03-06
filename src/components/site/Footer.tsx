import { TransitionLink } from "@/components/nav/TransitionLink";

export function Footer({ locale }: { locale: string }) {
  return (
    <footer className="mt-[var(--section-pad)]">
      <div className="relative">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: "url(/media/footer-bg.svg)",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-white" />
        <div className="relative container py-12">
          <div className="glass p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
              <div>
                <div className="text-sm font-medium tracking-[0.22em] text-accent2">SOFIN</div>
                <div className="mt-2 text-sm text-muted max-w-md">
                  Свежие, качественные и полезные молочные продукты из эко-фермы.
                </div>
                <div className="mt-6 text-sm text-muted space-y-1">
                  <div>Телефон: +998 71 200 36 36</div>
                  <div>Telegram: @sofin.uz</div>
                  <div>Instagram: sofin.uz</div>
                  <div>Email: yangi_asr_2000@mail.ru</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <TransitionLink className="text-muted hover:text-accent2 transition" href={`/${locale}/products`}>Products</TransitionLink>
                <TransitionLink className="text-muted hover:text-accent2 transition" href={`/${locale}/about`}>About</TransitionLink>
                <TransitionLink className="text-muted hover:text-accent2 transition" href={`/${locale}/recipes`}>Recipes</TransitionLink>
                <TransitionLink className="text-muted hover:text-accent2 transition" href={`/${locale}/contacts`}>Contacts</TransitionLink>
                <TransitionLink className="text-muted hover:text-accent2 transition" href={`/${locale}/privacy`}>Privacy</TransitionLink>
              </div>
            </div>

            <div className="hr my-8" />
            <div className="text-xs text-muted flex items-center justify-between">
              <div>© {new Date().getFullYear()} SOFIN</div>
              <div className="tracking-[0.18em] uppercase">Uzbekistan</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

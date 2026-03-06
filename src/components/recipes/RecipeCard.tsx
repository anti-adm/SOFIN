import Image from "next/image";
import Link from "next/link";
import { type RecipeFrontmatter } from "@/lib/content/types";

export function RecipeCard({ r, locale }: { r: RecipeFrontmatter; locale: string }) {
  return (
    <Link href={`/${locale}/recipes/${r.slug}`} className="group glass overflow-hidden transition hover:shadow-lift">
      <div className="relative aspect-[16/10]">
        <Image src={r.coverImage} alt={r.title} fill className="object-cover transition duration-700 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="text-xs tracking-[0.28em] uppercase text-muted">{new Date(r.publishedAt).toLocaleDateString()}</div>
          <div className="text-xs text-muted">{r.tags[0]}</div>
        </div>
        <div className="mt-2 text-[15px] font-medium text-accent2">{r.title}</div>
        <div className="mt-2 text-sm text-muted">{r.excerpt}</div>
      </div>
    </Link>
  );
}

import { renderMdx } from "@/lib/mdx/render";

export async function ArticleBody({ source }: { source: string }) {
  return (
    <article className="prose prose-neutral max-w-none">
      <div className="rounded-3xl border border-glassBorder bg-white/55 p-6 md:p-10 backdrop-blur-md shadow-soft">
        <div className="mx-auto max-w-[720px]">{await renderMdx(source)}</div>
      </div>
    </article>
  );
}

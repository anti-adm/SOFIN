import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

export async function renderMdx(source: string) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm]
        }
      }}
      components={{
        h2: (p) => <h2 className="mt-10 text-2xl font-semibold tracking-tight" {...p} />,
        h3: (p) => <h3 className="mt-8 text-xl font-semibold tracking-tight" {...p} />,
        p: (p) => <p className="mt-4 text-[15px] leading-7 text-muted" {...p} />,
        ul: (p) => <ul className="mt-4 list-disc pl-6 text-[15px] leading-7 text-muted" {...p} />,
        li: (p) => <li className="mt-2" {...p} />,
        blockquote: (p) => (
          <blockquote className="mt-6 rounded-2xl border border-glassBorder bg-white/55 p-5 text-[15px] leading-7 text-muted backdrop-blur-md" {...p} />
        )
      }}
    />
  );
}

import Image from "next/image";

type Props = {
  eyebrow?: string;
  flip?: boolean;
  title: string;
  subtitle?: string;
  image?: string | null;
  media?: { kind: "image"; src: string; alt: string } | null;
  // ...
};

export function StorySection({ title, subtitle, image, media, eyebrow, flip }: Props) {
  const src = typeof image === "string" && image.trim()
    ? image
    : media?.kind === "image"
      ? media.src
      : "";

  const hasImage = src.length > 0;

  return (
    <section>
      {/* ... */}
      <div className="glass overflow-hidden">
        <div className="relative aspect-[16/11]">
          {hasImage ? (
          <Image
            src={src}
            alt={media?.kind === "image" ? media.alt : title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.55),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(120,160,255,0.25),transparent_60%)]" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
        </div>
      </div>
      {/* ... */}
    </section>
  );
}
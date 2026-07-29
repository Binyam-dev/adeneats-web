export default function SceneHeading({
  chapter,
  eyebrow,
  title,
  body,
  theme = "dark",
}: {
  chapter: string;
  eyebrow: string;
  title: React.ReactNode;
  body?: string;
  theme?: "dark" | "light";
}) {
  const light = theme === "light";
  return (
    <div className="max-w-2xl">
      <div className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] ${light ? "text-berbere" : "text-gold"}`}>
        <span className={`font-display text-2xl ${light ? "text-teff/35" : "text-injera/35"}`}>{chapter}</span>
        {eyebrow}
      </div>
      <h2 className={`mt-5 font-display text-[clamp(2.8rem,6vw,5.8rem)] leading-[0.95] tracking-[-0.035em] ${light ? "text-teff" : "text-injera"}`}>
        {title}
      </h2>
      {body && <p className={`mt-6 max-w-xl text-lg leading-relaxed ${light ? "text-teff/70" : "text-injera-dim"}`}>{body}</p>}
    </div>
  );
}

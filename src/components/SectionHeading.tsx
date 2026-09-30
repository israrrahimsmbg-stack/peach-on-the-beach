interface SectionHeadingProps {
  kicker: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  kicker,
  title,
  lede,
  align = "left",
}: SectionHeadingProps) {
  const alignCls = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-3xl ${alignCls}`}>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-bronze">
        {kicker}
      </p>
      <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-navy md:text-5xl">
        {title}
      </h2>
      {lede && (
        <p className="mt-5 text-base font-light leading-relaxed text-stone md:text-lg">
          {lede}
        </p>
      )}
    </div>
  );
}

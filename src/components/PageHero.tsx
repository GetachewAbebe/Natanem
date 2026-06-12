export default function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="bg-blueprint bg-ink-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-amber-brand">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-wide sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-100/90">
            {description}
          </p>
        )}
      </div>
      <div className="bg-hazard h-2" />
    </section>
  );
}

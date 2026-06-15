import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-blueprint bg-ink-950 text-white">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-start justify-center px-4 py-24 sm:px-6 lg:px-8">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-amber-brand">
          Error 404
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-wide sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-100/90">
          The page you are looking for does not exist or may have been moved.
          Let us get you back on track.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/"
            className="bg-amber-brand px-8 py-4 font-display font-bold uppercase tracking-wide text-ink-950 transition-colors hover:bg-amber-deep"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="border-2 border-white/70 px-8 py-4 font-display font-bold uppercase tracking-wide text-white transition-colors hover:border-amber-brand hover:text-amber-brand"
          >
            Contact Us
          </Link>
        </div>
      </div>
      <div className="bg-hazard h-2" />
    </section>
  );
}

"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-blueprint bg-ink-950 text-white">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-start justify-center px-4 py-24 sm:px-6 lg:px-8">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-amber-brand">
          Something Went Wrong
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-wide sm:text-5xl">
          We Hit a Snag
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-100/90">
          An unexpected error occurred while loading this page. Please try again
          — if the problem continues, contact us directly and we will help.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={reset}
            className="bg-amber-brand px-8 py-4 font-display font-bold uppercase tracking-wide text-ink-950 transition-colors hover:bg-amber-deep"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="border-2 border-white/70 px-8 py-4 font-display font-bold uppercase tracking-wide text-white transition-colors hover:border-amber-brand hover:text-amber-brand"
          >
            Back to Home
          </Link>
        </div>
      </div>
      <div className="bg-hazard h-2" />
    </section>
  );
}

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-ink-100 border-t-amber-brand" />
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-ink-600">
          Loading
        </p>
      </div>
    </div>
  );
}

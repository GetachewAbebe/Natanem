"use client";

import { useEffect, useRef, useState } from "react";

// Animates a stat value from zero to its target when scrolled into view.
// Accepts strings like "12+", "85+", "240+", "1.2M+" — it animates the
// numeric part and preserves any suffix (+, M+, etc.).
export default function CountUp({ value }: { value: string }) {
  const match = value.match(/^([\d.]+)(.*)$/);
  const isNumeric = match !== null;
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const decimals = match && match[1].includes(".") ? 1 : 0;

  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const el = ref.current;
    if (!el || !isNumeric || started.current) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const finish = () => setDisplay(target.toFixed(decimals));

    if (reduce || !("IntersectionObserver" in window)) {
      started.current = true;
      const id = requestAnimationFrame(finish);
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();
        const duration = 1500;
        let startTime = 0;
        const step = (now: number) => {
          if (!startTime) startTime = now;
          const progress = Math.min(1, (now - startTime) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay((target * eased).toFixed(decimals));
          if (progress < 1) requestAnimationFrame(step);
          else finish();
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isNumeric, target, decimals]);

  if (!isNumeric) return <span>{value}</span>;

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

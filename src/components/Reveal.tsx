"use client";

import { useEffect, useRef, useState } from "react";

// Fades and slides its children up as they scroll into view. Lightweight —
// one IntersectionObserver per instance, no animation library. Falls back to
// instantly visible if the observer or motion preferences require it.
const HIDDEN_TRANSFORM: Record<string, string> = {
  up: "translateY(28px)",
  left: "translateX(-44px)",
  right: "translateX(44px)",
};

export default function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  id,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
  id?: string;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error — ref typing across the union of tag names is safe here
      ref={ref}
      id={id}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : HIDDEN_TRANSFORM[direction],
        transition: "opacity 0.7s ease-out, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

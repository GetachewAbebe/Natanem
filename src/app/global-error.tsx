"use client";

import { useEffect } from "react";

// Catches errors thrown in the root layout itself (e.g. the CMS/database
// being unreachable while loading site-wide settings). It replaces the whole
// document, so it must render its own <html>/<body> and use inline styles —
// no layout or global stylesheet is available here.
export default function GlobalError({
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
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a1120",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: "560px" }}>
          <p
            style={{
              color: "#f5a623",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Service Temporarily Unavailable
          </p>
          <h1
            style={{
              marginTop: "16px",
              fontSize: "36px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              lineHeight: 1.1,
            }}
          >
            We Will Be Right Back
          </h1>
          <p
            style={{
              marginTop: "20px",
              fontSize: "18px",
              lineHeight: 1.6,
              color: "rgba(227, 233, 242, 0.9)",
            }}
          >
            The site is having a temporary problem. Please try again in a
            moment.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "32px",
              backgroundColor: "#f5a623",
              color: "#0a1120",
              border: "none",
              padding: "16px 32px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}

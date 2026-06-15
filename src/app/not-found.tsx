import Link from "next/link";

// App-root 404 for URLs that match neither the (frontend) nor (payload)
// route group. Because those route groups are separate root layouts, a
// globally unmatched URL has no layout to render in — so this page is
// self-contained with its own <html>/<body> and inline styles.
export default function NotFound() {
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
            Error 404
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
            Page Not Found
          </h1>
          <p
            style={{
              marginTop: "20px",
              fontSize: "18px",
              lineHeight: 1.6,
              color: "rgba(227, 233, 242, 0.9)",
            }}
          >
            The page you are looking for does not exist or may have been moved.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              marginTop: "32px",
              backgroundColor: "#f5a623",
              color: "#0a1120",
              textDecoration: "none",
              padding: "16px 32px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
            }}
          >
            Back to Home
          </Link>
        </div>
      </body>
    </html>
  );
}

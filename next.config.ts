import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // CI builds produce a self-contained bundle for the cPanel server
  // (set STANDALONE=1); local builds keep `next start` working.
  output: process.env.STANDALONE ? "standalone" : undefined,
  devIndicators: {
    // Keep the dev-tools badge out of the bottom-left corner, where it
    // covers the Payload admin's settings/logout buttons.
    position: "bottom-right",
  },
  async headers() {
    // Baseline hardening applied to every route. No strict CSP here — the
    // Payload admin relies on inline scripts/styles, and a misconfigured CSP
    // would break it; revisit with nonces if a CSP is required later.
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default withPayload(nextConfig);

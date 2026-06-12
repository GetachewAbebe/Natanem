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
};

export default withPayload(nextConfig);

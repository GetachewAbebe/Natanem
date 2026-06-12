import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    // Keep the dev-tools badge out of the bottom-left corner, where it
    // covers the Payload admin's settings/logout buttons.
    position: "bottom-right",
  },
};

export default withPayload(nextConfig);

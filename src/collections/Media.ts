import path from "path";

import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  upload: {
    // Anchored to the process working directory so uploads land in the same
    // place in dev and in the standalone production bundle, where deploys
    // are configured to never overwrite it.
    staticDir: path.resolve(process.cwd(), "media"),
    imageSizes: [
      {
        name: "card",
        width: 800,
        height: 500,
        position: "centre",
      },
      {
        name: "hero",
        width: 1600,
        position: "centre",
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description: "Describe the image for screen readers and SEO.",
      },
    },
  ],
};

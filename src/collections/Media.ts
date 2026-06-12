import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  upload: {
    staticDir: "media",
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

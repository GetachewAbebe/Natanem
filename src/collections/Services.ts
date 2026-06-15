import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "displayOrder"],
    description:
      "Service lines shown on the Services page, the homepage, and the contact form's service dropdown.",
  },
  access: {
    read: () => true,
  },
  defaultSort: "displayOrder",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "Used for direct links, e.g. /services#my-service.",
      },
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: {
        description:
          "Photo shown alongside this service. Leave empty for a styled placeholder.",
      },
    },
    {
      name: "details",
      type: "array",
      admin: {
        description: "Bullet points listed under the service.",
      },
      fields: [{ name: "item", type: "text", required: true }],
    },
    {
      name: "displayOrder",
      type: "number",
      required: true,
      defaultValue: 99,
      admin: {
        position: "sidebar",
        description: "Lower numbers appear first.",
      },
    },
  ],
};

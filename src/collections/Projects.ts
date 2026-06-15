import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "status", "displayOrder"],
    description:
      "Portfolio projects shown on the Projects page; the first three (by display order) are featured on the homepage.",
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
        description: "Used for direct links, e.g. /projects#my-project.",
      },
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: ["Residential", "Commercial", "Infrastructure"],
    },
    {
      name: "location",
      type: "text",
      required: true,
    },
    {
      name: "year",
      type: "text",
      required: true,
      admin: {
        description: "Year the project started or was delivered, e.g. 2024.",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      options: ["Completed", "Ongoing"],
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description:
          "Main project photo shown on the card. Leave empty for a styled placeholder.",
      },
    },
    {
      name: "stats",
      type: "array",
      maxRows: 3,
      admin: {
        description: "Up to three key figures shown on the project card.",
      },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "value", type: "text", required: true },
      ],
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

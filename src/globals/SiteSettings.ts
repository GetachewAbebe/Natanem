import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  admin: {
    description:
      "Company-wide content: brand name, navigation, contact details, stats, and footer.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "brand",
      type: "group",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          admin: { description: "First part of the logo text (white)." },
        },
        {
          name: "accent",
          type: "text",
          required: true,
          admin: { description: "Second part of the logo text (amber)." },
        },
      ],
    },
    {
      name: "navLinks",
      type: "array",
      admin: {
        description:
          "Menu items in the header. The page address must match an existing page (/, /about, /services, /projects, /contact).",
      },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true, label: "Page address" },
      ],
    },
    {
      name: "contact",
      type: "group",
      admin: {
        description: "Used in the footer and on the Contact page.",
      },
      fields: [
        { name: "address", type: "text", required: true },
        { name: "phone", type: "text", required: true },
        { name: "email", type: "text", required: true },
        {
          name: "hoursShort",
          type: "text",
          required: true,
          admin: { description: "One-line version shown in the footer." },
        },
        {
          name: "hoursLines",
          type: "textarea",
          required: true,
          admin: {
            description:
              "Shown on the Contact page; each line becomes its own row.",
          },
        },
      ],
    },
    {
      name: "stats",
      type: "array",
      admin: {
        description: "Company stats shown on the homepage and About page.",
      },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "value", type: "text", required: true },
      ],
    },
    {
      name: "footer",
      type: "group",
      fields: [
        { name: "description", type: "textarea", required: true },
        { name: "quickLinksTitle", type: "text", required: true },
        { name: "contactTitle", type: "text", required: true },
        {
          name: "copyright",
          type: "text",
          required: true,
          admin: {
            description: "Shown after the year, e.g. © 2026 <this text>.",
          },
        },
      ],
    },
    {
      name: "siteMeta",
      type: "group",
      label: "SEO defaults",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          admin: { description: "Default browser-tab title (used on the homepage)." },
        },
        { name: "description", type: "textarea", required: true },
      ],
    },
  ],
};

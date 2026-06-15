import type { GlobalConfig } from "payload";

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Home Page",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "hero",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text", required: true },
        {
          name: "title",
          type: "text",
          required: true,
          admin: { description: "Main headline (white part)." },
        },
        {
          name: "titleAccent",
          type: "text",
          required: true,
          admin: { description: "Last words of the headline, shown in amber." },
        },
        { name: "description", type: "textarea", required: true },
        { name: "primaryCtaLabel", type: "text", required: true, label: "Primary button text" },
        { name: "secondaryCtaLabel", type: "text", required: true, label: "Secondary button text" },
        {
          name: "backgroundImage",
          type: "upload",
          relationTo: "media",
          admin: {
            description:
              "Optional hero background photo (a wide, high-quality project image works best). Leave empty for the dark blueprint pattern.",
          },
        },
      ],
    },
    {
      name: "servicesSection",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text", required: true },
        { name: "title", type: "text", required: true },
      ],
    },
    {
      name: "projectsSection",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "allProjectsLabel", type: "text", required: true },
      ],
    },
    {
      name: "whySection",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
        { name: "ctaLabel", type: "text", required: true, label: "Button text" },
        {
          name: "points",
          type: "array",
          fields: [
            { name: "title", type: "text", required: true },
            { name: "text", type: "textarea", required: true },
          ],
        },
      ],
    },
    {
      name: "cta",
      type: "group",
      label: "Bottom call-to-action",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "text", type: "textarea", required: true },
        { name: "buttonLabel", type: "text", required: true },
      ],
    },
  ],
};

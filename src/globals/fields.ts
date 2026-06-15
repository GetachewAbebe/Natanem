import type { Field } from "payload";

export const heroGroup = (overrides: Partial<{ description: boolean }> = {}): Field => ({
  name: "hero",
  type: "group",
  fields: [
    { name: "eyebrow", type: "text", required: true },
    { name: "title", type: "text", required: true },
    ...(overrides.description === false
      ? []
      : [{ name: "description", type: "textarea", required: true } as Field]),
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description:
          "Optional background photo behind this page's header. Leave empty for the dark blueprint pattern.",
      },
    },
  ],
});

export const metaGroup = (): Field => ({
  name: "meta",
  type: "group",
  label: "SEO",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      admin: { description: "Shown in the browser tab and search results." },
    },
    { name: "description", type: "textarea", required: true },
  ],
});

import type { GlobalConfig } from "payload";

import { heroGroup, metaGroup } from "./fields";

export const AboutPage: GlobalConfig = {
  slug: "about-page",
  label: "About Page",
  access: {
    read: () => true,
  },
  fields: [
    metaGroup(),
    heroGroup(),
    {
      name: "story",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text", required: true },
        { name: "title", type: "text", required: true },
        {
          name: "paragraphs",
          type: "array",
          fields: [{ name: "text", type: "textarea", required: true }],
        },
      ],
    },
    {
      name: "mission",
      type: "group",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "text", type: "textarea", required: true },
      ],
    },
    {
      name: "vision",
      type: "group",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "text", type: "textarea", required: true },
      ],
    },
    {
      name: "valuesSection",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text", required: true },
        { name: "title", type: "text", required: true },
        {
          name: "items",
          type: "array",
          fields: [
            { name: "title", type: "text", required: true },
            { name: "text", type: "textarea", required: true },
          ],
        },
      ],
    },
    {
      name: "teamSection",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text", required: true },
        { name: "title", type: "text", required: true },
        {
          name: "members",
          type: "array",
          fields: [
            { name: "name", type: "text", required: true },
            { name: "role", type: "text", required: true },
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
        { name: "buttonLabel", type: "text", required: true },
      ],
    },
  ],
};

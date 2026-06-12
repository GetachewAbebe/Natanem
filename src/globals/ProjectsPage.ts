import type { GlobalConfig } from "payload";

import { heroGroup, metaGroup } from "./fields";

export const ProjectsPage: GlobalConfig = {
  slug: "projects-page",
  label: "Projects Page",
  access: {
    read: () => true,
  },
  fields: [
    metaGroup(),
    heroGroup(),
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

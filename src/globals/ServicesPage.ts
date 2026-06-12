import type { GlobalConfig } from "payload";

import { heroGroup, metaGroup } from "./fields";

export const ServicesPage: GlobalConfig = {
  slug: "services-page",
  label: "Services Page",
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
        { name: "text", type: "textarea", required: true },
        { name: "buttonLabel", type: "text", required: true },
      ],
    },
  ],
};

import type { GlobalConfig } from "payload";

import { heroGroup, metaGroup } from "./fields";

export const ContactPage: GlobalConfig = {
  slug: "contact-page",
  label: "Contact Page",
  access: {
    read: () => true,
  },
  fields: [
    metaGroup(),
    heroGroup(),
    {
      name: "detailLabels",
      type: "group",
      admin: {
        description:
          "Headings for the contact details column. The values themselves (address, phone…) are edited in Site Settings.",
      },
      fields: [
        { name: "office", type: "text", required: true },
        { name: "phone", type: "text", required: true },
        { name: "email", type: "text", required: true },
        { name: "hours", type: "text", required: true },
      ],
    },
    {
      name: "mapPlaceholder",
      type: "text",
      required: true,
      admin: { description: "Caption shown beneath the office-location map." },
    },
    {
      name: "mapEmbedUrl",
      type: "text",
      admin: {
        description:
          "Paste a map 'embed' URL to show your exact office location. In Google Maps: Share → Embed a map → copy the src=\"…\" link. Leave empty to show a default Addis Ababa map.",
      },
    },
    {
      name: "formSection",
      type: "group",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "intro", type: "textarea", required: true },
      ],
    },
    {
      name: "form",
      type: "group",
      admin: { description: "Labels and texts of the inquiry form." },
      fields: [
        { name: "nameLabel", type: "text", required: true },
        { name: "namePlaceholder", type: "text", required: true },
        { name: "emailLabel", type: "text", required: true },
        { name: "emailPlaceholder", type: "text", required: true },
        { name: "phoneLabel", type: "text", required: true },
        { name: "phonePlaceholder", type: "text", required: true },
        { name: "serviceLabel", type: "text", required: true },
        { name: "servicePlaceholder", type: "text", required: true },
        { name: "otherServiceOption", type: "text", required: true },
        { name: "messageLabel", type: "text", required: true },
        { name: "messagePlaceholder", type: "textarea", required: true },
        { name: "submitLabel", type: "text", required: true },
        { name: "successTitle", type: "text", required: true },
        { name: "successText", type: "textarea", required: true },
        {
          name: "errorText",
          type: "textarea",
          required: true,
          admin: {
            description: "Shown if the inquiry could not be sent.",
          },
        },
      ],
    },
  ],
};

import type { CollectionConfig } from "payload";

export const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  labels: {
    singular: "Contact Submission",
    plural: "Contact Submissions",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "service", "message", "createdAt"],
    description: "Inquiries sent through the website's contact form.",
  },
  access: {
    // Created only by the contact form's server action (which bypasses
    // access control); the public REST API cannot create or read these.
    create: ({ req }) => Boolean(req.user),
    read: ({ req }) => Boolean(req.user),
    update: () => false,
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "phone",
      type: "text",
    },
    {
      name: "service",
      type: "text",
      admin: {
        description: "Service the visitor selected in the form.",
      },
    },
    {
      name: "message",
      type: "textarea",
      required: true,
    },
  ],
};

import path from "path";
import { fileURLToPath } from "url";

import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { ContactSubmissions } from "./collections/ContactSubmissions";
import { Media } from "./collections/Media";
import { Projects } from "./collections/Projects";
import { Services } from "./collections/Services";
import { Users } from "./collections/Users";
import { AboutPage } from "./globals/AboutPage";
import { ContactPage } from "./globals/ContactPage";
import { HomePage } from "./globals/HomePage";
import { ProjectsPage } from "./globals/ProjectsPage";
import { ServicesPage } from "./globals/ServicesPage";
import { SiteSettings } from "./globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Email is only wired up when SMTP credentials are present (set them in the
// cPanel "Setup Node.js App" environment). Without them — e.g. local dev —
// Payload falls back to logging emails to the console.
const email =
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
    ? nodemailerAdapter({
        defaultFromName: process.env.SMTP_FROM_NAME || "Natanem Engineering",
        defaultFromAddress: process.env.SMTP_FROM || process.env.SMTP_USER,
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 465),
          secure: Number(process.env.SMTP_PORT || 465) === 465,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        },
      })
    : undefined;

export default buildConfig({
  admin: {
    user: Users.slug,
    components: {
      graphics: {
        Logo: "/components/admin/Logo#Logo",
        Icon: "/components/admin/Icon#Icon",
      },
    },
    meta: {
      titleSuffix: " – Natanem Engineering",
      icons: [{ rel: "icon", type: "image/png", url: "/favicon.png" }],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Projects, Services, ContactSubmissions, Media, Users],
  globals: [
    SiteSettings,
    HomePage,
    AboutPage,
    ServicesPage,
    ProjectsPage,
    ContactPage,
  ],
  editor: lexicalEditor(),
  email,
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteAdapter({
    // Auto schema-push is disabled: the schema is stable, and libsql's dev
    // push is non-idempotent here (it retries CREATE INDEX on existing
    // indexes and throws). After changing collections/globals, push once with
    // `npx payload migrate:create` + apply, or temporarily set push: true.
    push: false,
    client: {
      url: process.env.DATABASE_URI || "file:./payload.db",
    },
  }),
  graphQL: {
    disable: true,
  },
  sharp,
});

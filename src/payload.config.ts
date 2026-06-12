import path from "path";
import { fileURLToPath } from "url";

import { sqliteAdapter } from "@payloadcms/db-sqlite";
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
      icons: [{ rel: "icon", type: "image/x-icon", url: "/favicon.ico" }],
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
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || "file:./payload.db",
    },
  }),
  graphQL: {
    disable: true,
  },
  sharp,
});

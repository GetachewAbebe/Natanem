/**
 * Uploads the placeholder construction photos in /.seed-assets into the Payload
 * Media library and attaches them to the matching projects, services, and page
 * hero backgrounds.
 *
 * Safe to re-run: a media file is only uploaded once (matched by filename), and
 * a target's image is only set while it is still empty — so editor changes and
 * real photos uploaded later are never overwritten.
 *
 * Run with: npm run seed:media
 */
import path from "path";
import { fileURLToPath } from "url";

import config from "@payload-config";
import { getPayload, type Payload } from "payload";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.resolve(dirname, "../.seed-assets");

/* slug -> image filename in /.seed-assets */
const projectImages: Record<string, string> = {
  "skyline-office-tower": "proj-skyline-office-tower.jpg",
  "green-meadows-apartments": "proj-green-meadows-apartments.jpg",
  "eastern-corridor-road": "proj-eastern-corridor-road.jpg",
  "unity-mall": "proj-unity-mall.jpg",
  "lakeview-villas": "proj-lakeview-villas.jpg",
  "industrial-park-drainage": "proj-industrial-park-drainage.jpg",
};

const serviceImages: Record<string, string> = {
  residential: "svc-residential.jpg",
  commercial: "svc-commercial.jpg",
  infrastructure: "svc-infrastructure.jpg",
  renovation: "svc-renovation.jpg",
  "project-management": "svc-project-management.jpg",
  "design-build": "svc-design-build.jpg",
};

/* page-global slug -> hero background image filename */
type PageGlobalSlug =
  | "home-page"
  | "about-page"
  | "services-page"
  | "projects-page"
  | "contact-page";

const heroImages: Record<PageGlobalSlug, string> = {
  "home-page": "hero-home.jpg",
  "about-page": "hero-about.jpg",
  "services-page": "hero-services.jpg",
  "projects-page": "hero-projects.jpg",
  "contact-page": "hero-contact.jpg",
};

/**
 * Upload a file into the media collection once. Returns the media doc id,
 * reusing an existing upload when the filename already exists.
 */
const uploadOnce = async (
  payload: Payload,
  filename: string,
  alt: string,
): Promise<number> => {
  const existing = await payload.find({
    collection: "media",
    where: { filename: { equals: filename } },
    limit: 1,
  });
  if (existing.docs.length > 0) {
    payload.logger.info(`Media "${filename}" already uploaded — reusing.`);
    return existing.docs[0].id as number;
  }
  const doc = await payload.create({
    collection: "media",
    data: { alt },
    filePath: path.join(assetsDir, filename),
  });
  payload.logger.info(`Uploaded media "${filename}".`);
  return doc.id as number;
};

const seedMedia = async () => {
  const payload = await getPayload({ config });

  /* Projects ------------------------------------------------------------- */
  for (const [slug, filename] of Object.entries(projectImages)) {
    const res = await payload.find({
      collection: "projects",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    const doc = res.docs[0];
    if (!doc) {
      payload.logger.warn(`Project "${slug}" not found — skipping image.`);
      continue;
    }
    if (doc.coverImage) {
      payload.logger.info(`Project "${slug}" already has a cover — skipping.`);
      continue;
    }
    const mediaId = await uploadOnce(payload, filename, `${doc.title} project photo`);
    await payload.update({
      collection: "projects",
      id: doc.id,
      data: { coverImage: mediaId },
    });
    payload.logger.info(`Attached cover image to project "${slug}".`);
  }

  /* Services ------------------------------------------------------------- */
  for (const [slug, filename] of Object.entries(serviceImages)) {
    const res = await payload.find({
      collection: "services",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    const doc = res.docs[0];
    if (!doc) {
      payload.logger.warn(`Service "${slug}" not found — skipping image.`);
      continue;
    }
    if (doc.image) {
      payload.logger.info(`Service "${slug}" already has an image — skipping.`);
      continue;
    }
    const mediaId = await uploadOnce(payload, filename, `${doc.title} service photo`);
    await payload.update({
      collection: "services",
      id: doc.id,
      data: { image: mediaId },
    });
    payload.logger.info(`Attached image to service "${slug}".`);
  }

  /* Page hero backgrounds ------------------------------------------------ */
  for (const [slug, filename] of Object.entries(heroImages) as [
    PageGlobalSlug,
    string,
  ][]) {
    const global = (await payload.findGlobal({ slug })) as {
      hero?: { backgroundImage?: unknown };
    };
    const hero = global.hero ?? {};
    if (hero.backgroundImage) {
      payload.logger.info(`Global "${slug}" hero already has a background — skipping.`);
      continue;
    }
    const mediaId = await uploadOnce(payload, filename, `${slug} hero background`);
    await payload.updateGlobal({
      slug,
      data: { hero: { ...hero, backgroundImage: mediaId } },
    });
    payload.logger.info(`Attached hero background to global "${slug}".`);
  }

  payload.logger.info("Media seed complete.");
  process.exit(0);
};

void seedMedia();

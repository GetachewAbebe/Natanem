/**
 * One-off corrective script: replaces the six placeholder images that were not
 * construction-related with the corrected versions now in /.seed-assets.
 *
 * For each target it detaches the current image, deletes the old media upload,
 * uploads the corrected file, and re-attaches it. Run once with:
 *   node --env-file=.env --import tsx src/fix-media.ts
 */
import path from "path";
import { fileURLToPath } from "url";

import config from "@payload-config";
import { getPayload, type Payload } from "payload";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.resolve(dirname, "../.seed-assets");

const projectFixes: Record<string, string> = {};
const serviceFixes: Record<string, string> = {
  "project-management": "svc-project-management.jpg",
  "design-build": "svc-design-build.jpg",
};
type PageGlobalSlug =
  | "home-page"
  | "about-page"
  | "services-page"
  | "projects-page"
  | "contact-page";

const heroFixes: Record<PageGlobalSlug, string> = {} as Record<
  PageGlobalSlug,
  string
>;

const idOf = (value: unknown): number | null =>
  typeof value === "number"
    ? value
    : value && typeof value === "object" && "id" in value
      ? ((value as { id: number }).id)
      : null;

const uploadFresh = async (payload: Payload, filename: string, alt: string) => {
  // Remove any prior media row with this filename so a clean upload is created.
  const prior = await payload.find({
    collection: "media",
    where: { filename: { equals: filename } },
    limit: 100,
  });
  for (const doc of prior.docs) {
    await payload.delete({ collection: "media", id: doc.id });
  }
  const created = await payload.create({
    collection: "media",
    data: { alt },
    filePath: path.join(assetsDir, filename),
  });
  return created.id as number;
};

const fixMedia = async () => {
  const payload = await getPayload({ config });

  for (const [slug, filename] of Object.entries(projectFixes)) {
    const res = await payload.find({
      collection: "projects",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    const doc = res.docs[0];
    if (!doc) continue;
    const oldId = idOf(doc.coverImage);
    await payload.update({ collection: "projects", id: doc.id, data: { coverImage: null } });
    if (oldId) await payload.delete({ collection: "media", id: oldId }).catch(() => {});
    const newId = await uploadFresh(payload, filename, `${doc.title} project photo`);
    await payload.update({ collection: "projects", id: doc.id, data: { coverImage: newId } });
    payload.logger.info(`Fixed project "${slug}".`);
  }

  for (const [slug, filename] of Object.entries(serviceFixes)) {
    const res = await payload.find({
      collection: "services",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    const doc = res.docs[0];
    if (!doc) continue;
    const oldId = idOf(doc.image);
    await payload.update({ collection: "services", id: doc.id, data: { image: null } });
    if (oldId) await payload.delete({ collection: "media", id: oldId }).catch(() => {});
    const newId = await uploadFresh(payload, filename, `${doc.title} service photo`);
    await payload.update({ collection: "services", id: doc.id, data: { image: newId } });
    payload.logger.info(`Fixed service "${slug}".`);
  }

  for (const [slug, filename] of Object.entries(heroFixes) as [
    PageGlobalSlug,
    string,
  ][]) {
    const global = (await payload.findGlobal({ slug })) as {
      hero?: { backgroundImage?: unknown };
    };
    const hero = global.hero ?? {};
    const oldId = idOf(hero.backgroundImage);
    await payload.updateGlobal({ slug, data: { hero: { ...hero, backgroundImage: null } } });
    if (oldId) await payload.delete({ collection: "media", id: oldId }).catch(() => {});
    const newId = await uploadFresh(payload, filename, `${slug} hero background`);
    await payload.updateGlobal({ slug, data: { hero: { ...hero, backgroundImage: newId } } });
    payload.logger.info(`Fixed hero background "${slug}".`);
  }

  payload.logger.info("Media fix complete.");
  process.exit(0);
};

void fixMedia();

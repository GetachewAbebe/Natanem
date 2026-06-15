/**
 * TEMPORARY stock imagery. Downloads free Unsplash construction/architecture
 * photos and assigns them to projects + page heroes, so the design can be
 * reviewed with real photography in place. Replace each one with genuine
 * Natanem project photos through the admin (Media / each Project / each page's
 * Hero) whenever they are available.
 *
 * Run with: node --env-file=.env --import tsx src/seed-images.ts
 *
 * Stock images and the local DB are gitignored, so these never deploy — they
 * exist only on this machine for review.
 */
import fs from "fs";
import os from "os";
import path from "path";

import config from "@payload-config";
import { getPayload, type Payload } from "payload";

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1600&q=75&fit=crop&auto=format`;

// All IDs below were visually verified to depict construction, buildings, or
// trades — matched to each project's actual type.
const projectImages = [
  { slug: "skyline-office-tower", id: "1486406146926-c627a92ad1ab", alt: "Modern high-rise office towers" },
  { slug: "green-meadows-apartments", id: "1545324418-cc1a3fa10c00", alt: "Contemporary residential apartment block" },
  { slug: "eastern-corridor-road", id: "1517089152318-42ec560349c0", alt: "Earthworks and excavation at a civil construction site" },
  { slug: "unity-mall", id: "1487958449943-2429e8be8625", alt: "Modern commercial building with a glass facade" },
  { slug: "lakeview-villas", id: "1600585154340-be6161a56a0c", alt: "Modern villa at dusk" },
  { slug: "industrial-park-drainage", id: "1504307651254-35680f356dfd", alt: "Construction crew working with steel reinforcement" },
];

const heroImages = [
  { global: "home-page", id: "1541888946425-d81bb19240f5", alt: "Construction team on a large concrete slab" },
  { global: "about-page", id: "1516216628859-9bccecab13ca", alt: "Construction workers raising a structure" },
  { global: "services-page", id: "1621905251189-08b45d6a269e", alt: "Tradesman installing electrical wiring on site" },
  { global: "projects-page", id: "1449157291145-7efd050a4d0e", alt: "High-rise towers rising into the mist" },
  { global: "contact-page", id: "1503387762-592deb58ef4e", alt: "Engineer drafting construction plans" },
] as const;

const serviceImages = [
  { slug: "residential", id: "1605146769289-440113cc3d00", alt: "Residential homes development" },
  { slug: "commercial", id: "1486406146926-c627a92ad1ab", alt: "Commercial office towers" },
  { slug: "infrastructure", id: "1517089152318-42ec560349c0", alt: "Civil works and earthmoving" },
  { slug: "renovation", id: "1487958449943-2429e8be8625", alt: "Modern building facade" },
  { slug: "project-management", id: "1516216628859-9bccecab13ca", alt: "Construction site team at work" },
  { slug: "design-build", id: "1503387762-592deb58ef4e", alt: "Architectural design and drafting" },
];

async function downloadAndCreate(
  payload: Payload,
  url: string,
  alt: string,
): Promise<number> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed (${res.status}) for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const dest = path.join(os.tmpdir(), `natanem-seed-${Date.now()}-${Math.round(Math.random() * 1e6)}.jpg`);
  fs.writeFileSync(dest, buf);
  const doc = await payload.create({
    collection: "media",
    data: { alt },
    filePath: dest,
  });
  fs.unlinkSync(dest);
  return doc.id as number;
}

async function setHeroImage(payload: Payload, slug: string, mediaId: number) {
  // Globals validate the whole document on update, so read the current values
  // (depth 0 → relationships as ids) and write them back with the new image.
  const rest = (await payload.findGlobal({ slug: slug as never, depth: 0 })) as Record<
    string,
    unknown
  >;
  delete rest.id;
  delete rest.createdAt;
  delete rest.updatedAt;
  delete rest.globalType;
  const hero = (rest.hero ?? {}) as Record<string, unknown>;
  await payload.updateGlobal({
    slug: slug as never,
    depth: 0,
    data: { ...rest, hero: { ...hero, backgroundImage: mediaId } } as never,
  });
}

const run = async () => {
  const payload = await getPayload({ config });
  // Optional args limit which groups seed, e.g. `... src/seed-images.ts services`.
  const args = process.argv.slice(2);
  const wants = (group: string) => args.length === 0 || args.includes(group);

  if (wants("projects")) {
    for (const item of projectImages) {
      const found = await payload.find({
        collection: "projects",
        where: { slug: { equals: item.slug } },
        limit: 1,
      });
      const project = found.docs[0];
      if (!project) {
        payload.logger.warn(`Project "${item.slug}" not found — skipping.`);
        continue;
      }
      const mediaId = await downloadAndCreate(payload, unsplash(item.id), item.alt);
      await payload.update({
        collection: "projects",
        id: project.id,
        data: { coverImage: mediaId },
      });
      payload.logger.info(`Set cover image for project "${item.slug}".`);
    }
  }

  if (wants("services")) {
    for (const item of serviceImages) {
      const found = await payload.find({
        collection: "services",
        where: { slug: { equals: item.slug } },
        limit: 1,
      });
      const service = found.docs[0];
      if (!service) {
        payload.logger.warn(`Service "${item.slug}" not found — skipping.`);
        continue;
      }
      const mediaId = await downloadAndCreate(payload, unsplash(item.id), item.alt);
      await payload.update({
        collection: "services",
        id: service.id,
        data: { image: mediaId },
      });
      payload.logger.info(`Set image for service "${item.slug}".`);
    }
  }

  if (wants("heroes")) {
    for (const item of heroImages) {
      const mediaId = await downloadAndCreate(payload, unsplash(item.id), item.alt);
      await setHeroImage(payload, item.global, mediaId);
      payload.logger.info(`Set hero image for "${item.global}".`);
    }
  }

  payload.logger.info("Stock imagery seeded. Replace via the admin when real photos are ready.");
  process.exit(0);
};

void run();

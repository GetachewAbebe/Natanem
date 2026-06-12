import config from "@payload-config";
import { getPayload } from "payload";
import { cache } from "react";

import type {
  AboutPage,
  ContactPage,
  HomePage,
  Project,
  ProjectsPage,
  Service,
  ServicesPage,
  SiteSetting,
} from "@/payload-types";

export type { Project, Service };

const payloadClient = cache(async () => getPayload({ config }));

export const getSiteSettings = cache(async (): Promise<SiteSetting> => {
  const payload = await payloadClient();
  return payload.findGlobal({ slug: "site-settings" });
});

export const getHomePage = cache(async (): Promise<HomePage> => {
  const payload = await payloadClient();
  return payload.findGlobal({ slug: "home-page" });
});

export const getAboutPage = cache(async (): Promise<AboutPage> => {
  const payload = await payloadClient();
  return payload.findGlobal({ slug: "about-page" });
});

export const getServicesPage = cache(async (): Promise<ServicesPage> => {
  const payload = await payloadClient();
  return payload.findGlobal({ slug: "services-page" });
});

export const getProjectsPage = cache(async (): Promise<ProjectsPage> => {
  const payload = await payloadClient();
  return payload.findGlobal({ slug: "projects-page" });
});

export const getContactPage = cache(async (): Promise<ContactPage> => {
  const payload = await payloadClient();
  return payload.findGlobal({ slug: "contact-page" });
});

export const getProjects = cache(async (): Promise<Project[]> => {
  const payload = await payloadClient();
  const { docs } = await payload.find({
    collection: "projects",
    sort: "displayOrder",
    limit: 100,
  });
  return docs;
});

export const getServices = cache(async (): Promise<Service[]> => {
  const payload = await payloadClient();
  const { docs } = await payload.find({
    collection: "services",
    sort: "displayOrder",
    limit: 100,
  });
  return docs;
});

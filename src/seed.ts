/**
 * One-time migration of the site content that previously lived in
 * src/lib/data.ts and hardcoded page copy into the Payload CMS.
 *
 * Safe to re-run: existing collection slugs are skipped and globals are
 * only seeded while still empty, so editor changes are never overwritten.
 *
 * Run with: npm run seed
 */
import config from "@payload-config";
import { getPayload, type Payload } from "payload";

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

const legacyServices = [
  {
    slug: "residential",
    title: "Residential Construction",
    summary:
      "Custom homes, apartment complexes, and residential compounds built to last generations.",
    details: [
      "Custom villa and home construction",
      "Apartment and condominium development",
      "Residential renovations and extensions",
      "Compound walls, landscaping, and finishing works",
    ],
  },
  {
    slug: "commercial",
    title: "Commercial Buildings",
    summary:
      "Office towers, retail centers, and mixed-use developments delivered on schedule and on budget.",
    details: [
      "Office buildings and business centers",
      "Retail and shopping complexes",
      "Hotels, restaurants, and hospitality projects",
      "Warehouses and light industrial facilities",
    ],
  },
  {
    slug: "infrastructure",
    title: "Infrastructure & Civil Works",
    summary:
      "Roads, drainage, and public works that connect communities and power economic growth.",
    details: [
      "Road construction and rehabilitation",
      "Drainage and stormwater systems",
      "Bridges and culverts",
      "Site grading and earthworks",
    ],
  },
  {
    slug: "renovation",
    title: "Renovation & Finishing",
    summary:
      "Transforming existing structures with modern finishes, structural upgrades, and expert craftsmanship.",
    details: [
      "Structural assessment and retrofitting",
      "Interior and exterior finishing",
      "Electrical and plumbing upgrades",
      "Facade modernization",
    ],
  },
  {
    slug: "project-management",
    title: "Project Management",
    summary:
      "End-to-end construction management — planning, procurement, supervision, and handover.",
    details: [
      "Construction planning and scheduling",
      "Cost estimation and budget control",
      "Quality assurance and site supervision",
      "Procurement and subcontractor management",
    ],
  },
  {
    slug: "design-build",
    title: "Design & Build",
    summary:
      "A single team for architecture, engineering, and construction — from first sketch to final handover.",
    details: [
      "Architectural design and visualization",
      "Structural and MEP engineering",
      "Permit drawings and approvals",
      "Turnkey delivery",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

const legacyProjects = [
  {
    slug: "skyline-office-tower",
    title: "Skyline Office Tower",
    category: "Commercial" as const,
    location: "Addis Ababa",
    year: "2025",
    status: "Ongoing" as const,
    description:
      "A 14-storey Grade-A office tower with underground parking, curtain-wall facade, and smart building systems in the heart of the financial district.",
    stats: [
      { label: "Floors", value: "14" },
      { label: "Built Area", value: "18,500 m²" },
      { label: "Completion", value: "2027" },
    ],
  },
  {
    slug: "green-meadows-apartments",
    title: "Green Meadows Apartments",
    category: "Residential" as const,
    location: "Addis Ababa",
    year: "2024",
    status: "Completed" as const,
    description:
      "A 120-unit residential community with landscaped courtyards, playgrounds, and full utility infrastructure, delivered two months ahead of schedule.",
    stats: [
      { label: "Units", value: "120" },
      { label: "Blocks", value: "6" },
      { label: "Delivered", value: "2024" },
    ],
  },
  {
    slug: "eastern-corridor-road",
    title: "Eastern Corridor Road Upgrade",
    category: "Infrastructure" as const,
    location: "Oromia Region",
    year: "2023",
    status: "Completed" as const,
    description:
      "Rehabilitation of 24 km of arterial road including asphalt overlay, drainage systems, and pedestrian walkways serving over 200,000 daily commuters.",
    stats: [
      { label: "Length", value: "24 km" },
      { label: "Culverts", value: "38" },
      { label: "Delivered", value: "2023" },
    ],
  },
  {
    slug: "unity-mall",
    title: "Unity Shopping Mall",
    category: "Commercial" as const,
    location: "Adama",
    year: "2023",
    status: "Completed" as const,
    description:
      "A modern three-storey retail center with 85 shops, a food court, cinema, and rooftop parking, anchoring the city's new commercial district.",
    stats: [
      { label: "Shops", value: "85" },
      { label: "Built Area", value: "12,000 m²" },
      { label: "Delivered", value: "2023" },
    ],
  },
  {
    slug: "lakeview-villas",
    title: "Lakeview Villas",
    category: "Residential" as const,
    location: "Bishoftu",
    year: "2022",
    status: "Completed" as const,
    description:
      "Sixteen luxury lakeside villas with private gardens, premium finishes, and integrated solar power systems.",
    stats: [
      { label: "Villas", value: "16" },
      { label: "Plot Area", value: "4.2 ha" },
      { label: "Delivered", value: "2022" },
    ],
  },
  {
    slug: "industrial-park-drainage",
    title: "Industrial Park Drainage Network",
    category: "Infrastructure" as const,
    location: "Hawassa",
    year: "2025",
    status: "Ongoing" as const,
    description:
      "Design and construction of a comprehensive stormwater drainage network protecting a 140-hectare industrial park from seasonal flooding.",
    stats: [
      { label: "Coverage", value: "140 ha" },
      { label: "Pipeline", value: "11 km" },
      { label: "Completion", value: "2026" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Seed runners                                                        */
/* ------------------------------------------------------------------ */

const seedCollections = async (payload: Payload) => {
  for (const [index, service] of legacyServices.entries()) {
    const existing = await payload.find({
      collection: "services",
      where: { slug: { equals: service.slug } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      payload.logger.info(`Skipping service "${service.slug}" — already exists.`);
      continue;
    }
    await payload.create({
      collection: "services",
      data: {
        title: service.title,
        slug: service.slug,
        summary: service.summary,
        details: service.details.map((item) => ({ item })),
        displayOrder: index + 1,
      },
    });
    payload.logger.info(`Created service "${service.slug}".`);
  }

  for (const [index, project] of legacyProjects.entries()) {
    const existing = await payload.find({
      collection: "projects",
      where: { slug: { equals: project.slug } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      payload.logger.info(`Skipping project "${project.slug}" — already exists.`);
      continue;
    }
    await payload.create({
      collection: "projects",
      data: { ...project, displayOrder: index + 1 },
    });
    payload.logger.info(`Created project "${project.slug}".`);
  }
};

const seedGlobals = async (payload: Payload) => {
  const siteSettings = await payload.findGlobal({ slug: "site-settings" });
  if (siteSettings?.brand?.name) {
    payload.logger.info("Skipping globals — already seeded.");
    return;
  }

  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      brand: { name: "Natanem", accent: "Engineering" },
      navLinks: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Projects", href: "/projects" },
        { label: "Contact", href: "/contact" },
      ],
      contact: {
        address: "Addis Ababa, Ethiopia",
        phone: "+251 911 000 000",
        email: "info@natanemengineering.com",
        hoursShort: "Mon–Sat: 8:00 AM – 6:00 PM",
        hoursLines: "Monday – Saturday\n8:00 AM – 6:00 PM",
      },
      stats: [
        { label: "Years of Experience", value: "12+" },
        { label: "Projects Delivered", value: "85+" },
        { label: "Skilled Professionals", value: "240+" },
        { label: "Work Hours, Zero Incidents", value: "1.2M+" },
      ],
      footer: {
        description:
          "A full-service construction company delivering residential, commercial, and infrastructure projects with uncompromising quality, safety, and on-time delivery.",
        quickLinksTitle: "Quick Links",
        contactTitle: "Contact",
        copyright: "Natanem Engineering. All rights reserved.",
      },
      siteMeta: {
        title: "Natanem Engineering | Building Ethiopia's Future",
        description:
          "Natanem Engineering is a full-service construction company delivering residential, commercial, and infrastructure projects with uncompromising quality and safety.",
      },
    },
  });
  payload.logger.info("Seeded Site Settings.");

  await payload.updateGlobal({
    slug: "home-page",
    data: {
      hero: {
        eyebrow: "Construction · Engineering · Excellence",
        title: "We Build the Structures That Build",
        titleAccent: "Communities",
        description:
          "Natanem Engineering delivers residential, commercial, and infrastructure projects with uncompromising quality, safety, and on-time delivery — from first sketch to final handover.",
        primaryCtaLabel: "Request a Quote",
        secondaryCtaLabel: "View Our Work",
      },
      servicesSection: { eyebrow: "What We Do", title: "Our Services" },
      projectsSection: {
        eyebrow: "Our Work",
        title: "Featured Projects",
        allProjectsLabel: "All Projects →",
      },
      whySection: {
        eyebrow: "Why Natanem",
        title: "Built on Discipline, Delivered with Pride",
        body: "Every project we take on is led by experienced engineers, executed by trained crews, and governed by an ISO 9001 certified quality system. We plan rigorously, communicate honestly, and stand behind every structure we hand over.",
        ctaLabel: "About Our Company",
        points: [
          {
            title: "On-Time, On-Budget Delivery",
            text: "Detailed scheduling and cost control on every project — we commit to dates and we keep them.",
          },
          {
            title: "Safety Without Compromise",
            text: "Over 1.2 million work hours without a lost-time incident, backed by continuous training and audits.",
          },
          {
            title: "Certified Quality",
            text: "ISO 9001 certified processes with documented inspections at every construction stage.",
          },
          {
            title: "One Team, Full Service",
            text: "Design, engineering, construction, and handover under one roof — one point of accountability.",
          },
        ],
      },
      cta: {
        title: "Have a Project in Mind?",
        text: "Tell us about it — we will respond with a consultation within one business day.",
        buttonLabel: "Get a Free Quote",
      },
    },
  });
  payload.logger.info("Seeded Home Page.");

  await payload.updateGlobal({
    slug: "about-page",
    data: {
      meta: {
        title: "About Us",
        description:
          "Learn about Natanem Engineering — our story, values, and the team behind our residential, commercial, and infrastructure projects.",
      },
      hero: {
        eyebrow: "Who We Are",
        title: "About Natanem Engineering",
        description:
          "A construction company founded on a simple belief: buildings should be delivered with the same precision they are designed with.",
      },
      story: {
        eyebrow: "Our Story",
        title: "From a Small Crew to a Full-Service Builder",
        paragraphs: [
          {
            text: "Natanem Engineering began over a decade ago as a small team of engineers taking on residential renovations. What set us apart was discipline: every job finished on time, every budget respected, every client kept informed.",
          },
          {
            text: "That reputation grew into larger commissions — apartment blocks, office buildings, retail centers, and public infrastructure. Today we employ more than 240 professionals and skilled tradespeople, operating across multiple regions with an ISO 9001 certified quality management system.",
          },
          {
            text: "Through that growth, our founding principle has not changed: we build every structure as if our own name will hang on it — because it does.",
          },
        ],
      },
      mission: {
        title: "Our Mission",
        text: "To deliver construction projects of lasting quality — safely, on time, and on budget — while developing the engineers and tradespeople who will build our country's future.",
      },
      vision: {
        title: "Our Vision",
        text: "To be the most trusted construction partner in the region — the first name clients call when a project must be done right.",
      },
      valuesSection: {
        eyebrow: "What Guides Us",
        title: "Our Values",
        items: [
          {
            title: "Integrity",
            text: "We quote honestly, report transparently, and deliver exactly what we promise — no shortcuts, no surprises.",
          },
          {
            title: "Safety First",
            text: "Every person on our sites goes home safe, every day. Safety planning comes before scheduling, always.",
          },
          {
            title: "Craftsmanship",
            text: "From foundation to finishing, we hold our work to the standard we would demand for our own homes.",
          },
          {
            title: "Accountability",
            text: "One team owns your project from start to handover. When you call, the person who answers can act.",
          },
        ],
      },
      teamSection: {
        eyebrow: "Leadership",
        title: "The Team Behind the Work",
        members: [
          {
            name: "Founder & General Manager",
            role: "Civil Engineer, 15+ years in building construction",
          },
          {
            name: "Head of Engineering",
            role: "Structural Engineer, high-rise and industrial specialist",
          },
          {
            name: "Head of Projects",
            role: "Construction Manager, PMP-certified, 60+ projects delivered",
          },
          {
            name: "Head of Quality & Safety",
            role: "ISO 9001 lead auditor and certified safety professional",
          },
        ],
      },
      cta: {
        title: "Let's Build Something Together",
        buttonLabel: "Contact Us",
      },
    },
  });
  payload.logger.info("Seeded About Page.");

  await payload.updateGlobal({
    slug: "services-page",
    data: {
      meta: {
        title: "Services",
        description:
          "Residential construction, commercial buildings, infrastructure, renovation, project management, and design-build services from Natanem Engineering.",
      },
      hero: {
        eyebrow: "What We Do",
        title: "Our Services",
        description:
          "Six core service lines, one standard of quality. Whatever the scale, we bring the same engineering discipline to every project.",
      },
      cta: {
        title: "Not Sure Which Service You Need?",
        text: "Describe your project and our engineers will recommend the right approach.",
        buttonLabel: "Talk to an Engineer",
      },
    },
  });
  payload.logger.info("Seeded Services Page.");

  await payload.updateGlobal({
    slug: "projects-page",
    data: {
      meta: {
        title: "Projects",
        description:
          "Explore Natanem Engineering's portfolio of completed and ongoing residential, commercial, and infrastructure projects.",
      },
      hero: {
        eyebrow: "Our Work",
        title: "Projects Portfolio",
        description:
          "A selection of the residential, commercial, and infrastructure projects we have delivered — and the ones rising right now.",
      },
      cta: {
        title: "Your Project Could Be Next",
        buttonLabel: "Start a Conversation",
      },
    },
  });
  payload.logger.info("Seeded Projects Page.");

  await payload.updateGlobal({
    slug: "contact-page",
    data: {
      meta: {
        title: "Contact",
        description:
          "Get in touch with Natanem Engineering for quotes, consultations, and project inquiries.",
      },
      hero: {
        eyebrow: "Get In Touch",
        title: "Contact Us",
        description:
          "Tell us about your project and we will respond within one business day.",
      },
      detailLabels: {
        office: "Office",
        phone: "Phone",
        email: "Email",
        hours: "Working Hours",
      },
      mapPlaceholder: "Our Office — Addis Ababa, Ethiopia",
      formSection: {
        title: "Request a Quote",
        intro:
          "Fill out the form below and our team will get back to you with a consultation.",
      },
      form: {
        nameLabel: "Full Name *",
        namePlaceholder: "Your name",
        emailLabel: "Email *",
        emailPlaceholder: "you@example.com",
        phoneLabel: "Phone",
        phonePlaceholder: "+251 ...",
        serviceLabel: "Service Needed",
        servicePlaceholder: "Select a service",
        otherServiceOption: "Other / Not sure",
        messageLabel: "Project Details *",
        messagePlaceholder:
          "Tell us about your project — location, size, timeline, and anything else we should know.",
        submitLabel: "Send Inquiry",
        successTitle: "Thank You!",
        successText:
          "Your inquiry has been received. Our team will contact you within one business day.",
        errorText:
          "Something went wrong and your inquiry could not be sent. Please try again, or contact us directly by phone or email.",
      },
    },
  });
  payload.logger.info("Seeded Contact Page.");

};

const seed = async () => {
  const payload = await getPayload({ config });
  await seedCollections(payload);
  await seedGlobals(payload);
  payload.logger.info("Seed complete.");
  process.exit(0);
};

void seed();

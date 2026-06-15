import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getContactPage, getServices, getSiteSettings } from "@/lib/content";
import { resolveImage } from "@/lib/image";
import ContactForm from "./ContactForm";

// Default office-location map (central Addis Ababa) used until a specific
// embed URL is set in the CMS.
const DEFAULT_MAP =
  "https://www.openstreetmap.org/export/embed.html?bbox=38.7350%2C8.9900%2C38.7900%2C9.0300&layer=mapnik&marker=9.0108%2C38.7613";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage();
  return { title: page.meta.title, description: page.meta.description };
}

export default async function ContactPage() {
  const [page, settings, services] = await Promise.all([
    getContactPage(),
    getSiteSettings(),
    getServices(),
  ]);

  const contactDetails = [
    { label: page.detailLabels.office, lines: [settings.contact.address] },
    { label: page.detailLabels.phone, lines: [settings.contact.phone] },
    { label: page.detailLabels.email, lines: [settings.contact.email] },
    {
      label: page.detailLabels.hours,
      lines: settings.contact.hoursLines.split("\n").filter(Boolean),
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        description={page.hero.description}
        backgroundImage={resolveImage(page.hero.backgroundImage)}
      />

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <Reveal direction="left" className="space-y-8">
            {contactDetails.map((item) => (
              <div key={item.label} className="flex gap-4">
                <span className="mt-1 h-10 w-1.5 shrink-0 bg-amber-brand" />
                <div>
                  <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-ink-900">
                    {item.label}
                  </h2>
                  {item.lines.map((line) => (
                    <p key={line} className="mt-1 text-ink-700">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
            <div className="overflow-hidden border border-ink-100 shadow-sm">
              <iframe
                src={page.mapEmbedUrl || DEFAULT_MAP}
                title={`${settings.contact.address} — office location`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full"
              />
              <div className="bg-hazard h-1.5" />
              <p className="bg-ink-950 px-4 py-3 text-center font-display text-xs uppercase tracking-widest text-amber-brand">
                {page.mapPlaceholder}
              </p>
            </div>
          </Reveal>

          <Reveal direction="right" delay={120} className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-ink-900">
              {page.formSection.title}
            </h2>
            <p className="mt-2 text-ink-700">{page.formSection.intro}</p>
            <div className="mt-8">
              <ContactForm
                texts={page.form}
                services={services.map((s) => ({ slug: s.slug, title: s.title }))}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

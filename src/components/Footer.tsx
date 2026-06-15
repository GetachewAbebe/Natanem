import Image from "next/image";
import Link from "next/link";

import type { SiteSetting } from "@/payload-types";

type Props = {
  brand: SiteSetting["brand"];
  navLinks: NonNullable<SiteSetting["navLinks"]>;
  contact: SiteSetting["contact"];
  footer: SiteSetting["footer"];
};

export default function Footer({ brand, navLinks, contact, footer }: Props) {
  const quickLinks = navLinks.filter((link) => link.href !== "/");

  return (
    <footer className="bg-ink-950 text-ink-100">
      <div className="bg-hazard h-2" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <Image
            src="/logo-full-white.png"
            alt={`${brand.name} ${brand.accent}`}
            width={940}
            height={569}
            className="h-16 w-auto"
          />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-100/80">
            {footer.description}
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            {footer.quickLinksTitle}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-amber-brand">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            {footer.contactTitle}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-100/80">
            <li>{contact.address}</li>
            <li>
              <a
                href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                className="hover:text-amber-brand"
              >
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="hover:text-amber-brand">
                {contact.email}
              </a>
            </li>
            <li>{contact.hoursShort}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-800">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-ink-100/60 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {footer.copyright}
        </p>
      </div>
    </footer>
  );
}

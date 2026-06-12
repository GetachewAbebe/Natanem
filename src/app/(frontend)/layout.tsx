import type { Metadata } from "next";
import { Geist, Oswald } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteSettings } from "@/lib/content";

// All frontend content is managed in the CMS; render at request time so
// edits appear immediately after publishing.
export const dynamic = "force-dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: {
      default: settings.siteMeta.title,
      template: `%s | ${settings.brand.name} ${settings.brand.accent}`,
    },
    description: settings.siteMeta.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header brand={settings.brand} navLinks={settings.navLinks ?? []} />
        <main className="flex-1">{children}</main>
        <Footer
          brand={settings.brand}
          navLinks={settings.navLinks ?? []}
          contact={settings.contact}
          footer={settings.footer}
        />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

import SiteHeader from "@/components/SiteHeader";
import ContactDock from "@/components/ContactDock";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nisacentrum.cz";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Nisa Centrum Reality",
  url: siteUrl,
  telephone: "+420702064442",
  email: "info@nisacentrum.cz",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Zámečnická 563/8",
    addressLocality: "Liberec",
    postalCode: "46001",
    addressCountry: "CZ",
  },
  areaServed: [
    "Liberecký kraj",
    "Ústecký kraj",
    "Královéhradecký kraj",
    "Středočeský kraj",
    "Praha a okolí",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title:
    "Vendy Hornová | Reality Liberec, Praha, Ústí nad Labem, Hradec Králové a okolí",
  description:
    "Prodej a pronájem nemovitostí v oblasti Liberec, Praha, Ústí nad Labem, Hradec Králové a okolí. Ocenění nemovitosti zdarma. Profesionální marketing, homestaging a právní servis.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Nisa Centrum Reality",
    title:
      "Vendy Hornová | Reality Liberec, Praha, Ústí nad Labem, Hradec Králové a okolí",
    description:
      "Prodej a pronájem nemovitostí v oblasti Liberec, Praha, Ústí nad Labem, Hradec Králové a okolí. Ocenění nemovitosti zdarma.",
  },
};

function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white/45">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-black/65">
        <div className="grid gap-8 md:grid-cols-3 md:items-start">
          {/* Nisa Centrum Reality */}
          <div>
            <p className="font-semibold text-black">Nisa Centrum Reality</p>
            <p className="mt-1">
              Liberec, Praha, Ústí nad Labem, Hradec Králové a okolí
            </p>
          </div>

          {/* Kontakt */}
          <div>
            <p className="font-semibold text-black">Kontakt</p>
            <div className="mt-2 space-y-2">
              <div>
                <p className="text-xs font-medium text-black/60">Telefon</p>
                <a
                  href="tel:+420702064442"
                  className="text-black hover:text-black/70"
                >
                  +420 702 064 442
                </a>
              </div>
              <div>
                <p className="text-xs font-medium text-black/60">E-mail</p>
                <a
                  href="mailto:info@nisacentrum.cz"
                  className="text-black hover:text-black/70"
                >
                  info@nisacentrum.cz
                </a>
              </div>
              <div>
                <p className="text-xs font-medium text-black/60">Adresa</p>
                <p className="text-black">
                  Zámečnická 563/8
                  <br />
                  Liberec IV – Perštýn
                  <br />
                  46001 Liberec
                </p>
              </div>
            </div>
          </div>

          {/* O nás */}
          <div>
            <p className="font-semibold text-black">O nás</p>
            <div className="mt-2 space-y-2 text-xs">
              <div>
                <p className="font-medium text-black">NISACENTRUM s.r.o.</p>
              </div>
              <div>
                <p className="font-medium text-black/60">IČO</p>
                <p className="text-black">27273385</p>
              </div>
              <div>
                <p className="font-medium text-black/60">DIČ</p>
                <p className="text-black">CZ27273385</p>
              </div>
              <div>
                <p className="font-medium text-black/60">Datová schránka</p>
                <p className="text-black">yqkqb7n</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-black/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Nisa Centrum Reality</p>
          <p>Prodej • Pronájem • Vyhledání nemovitosti • Ocenění zdarma</p>
          <p>
            Web vytvořilo{" "}
            <a
              href="https://www.setio.cz/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-black hover:text-black/70"
            >
              SetIO
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body className="min-h-dvh antialiased text-[color:var(--ink)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <SiteHeader />
        <main>{children}</main>

        <ContactDock />

        <Footer />
      </body>
    </html>
  );
}



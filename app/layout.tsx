import type { Metadata, Viewport } from "next";
import { Building2, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import "./globals.css";

import SiteHeader from "@/components/SiteHeader";
import ContactDock from "@/components/ContactDock";
import GlobalClickAnalytics from "@/components/GlobalClickAnalytics";
import CookieConsentManager from "@/components/CookieConsentManager";
import OpenCookieSettingsButton from "@/components/OpenCookieSettingsButton";
import { SITE_URL } from "@/lib/site-url";

const siteUrl = SITE_URL;
const gaMeasurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-SHJRYT54LL";

const socialProfiles = [
  "https://www.facebook.com/realitynisacentrum?locale=cs_CZ",
  "https://www.instagram.com/nisa_centrum_reality",
  "https://www.youtube.com/@nisacentrumreality",
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["RealEstateAgent", "LocalBusiness"],
      "@id": `${siteUrl}#real-estate-agent`,
      name: "Nisa Centrum Reality",
      url: siteUrl,
      logo: `${siteUrl}/android-chrome-512x512.png`,
      image: [`${siteUrl}/og-logo.png`],
      description:
        "Realitní kancelář Liberec pro prodej, pronájem a ocenění nemovitosti zdarma. Nisa Centrum Reality působí v Liberci, Praze a dalších regionech.",
      telephone: "+420721292462",
      email: "info@nisacentrum.cz",
      sameAs: socialProfiles,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Zámečnická 563/8",
        addressLocality: "Liberec",
        postalCode: "46001",
        addressCountry: "CZ",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: "+420721292462",
          email: "info@nisacentrum.cz",
          availableLanguage: ["cs-CZ"],
        },
      ],
      areaServed: [
        "Liberecký kraj",
        "Ústecký kraj",
        "Královéhradecký kraj",
        "Středočeský kraj",
        "Praha a okolí",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Služby Nisa Centrum Reality",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Ocenění nemovitosti zdarma",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Prodej nemovitostí",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Pronájem nemovitostí",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
      url: siteUrl,
      name: "Nisa Centrum Reality",
      inLanguage: "cs-CZ",
      publisher: {
        "@id": `${siteUrl}#real-estate-agent`,
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  manifest: "/manifest.json",
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  title: "Nisa Centrum Reality",
  description:
    "Realitní kancelář Liberec pro prodej, pronájem a ocenění nemovitosti zdarma. Zkušení realitní makléři pro Liberec, Prahu a okolní regiony.",
  keywords: [
    "realitní kancelář Liberec",
    "realitní makléř Liberec",
    "ocenění nemovitosti zdarma",
    "prodej nemovitosti Liberec",
    "pronájem nemovitosti Liberec",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Nisa Centrum Reality",
    title: "Nisa Centrum Reality",
    description:
      "Realitní kancelář Liberec pro prodej, pronájem a ocenění nemovitosti zdarma. Zkušení realitní makléři pro Liberec, Prahu a okolní regiony.",
    images: [
      {
        url: "/og-logo.png",
        width: 1200,
        height: 630,
        alt: "Realitní kancelář Liberec - Nisa Centrum Reality",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nisa Centrum Reality",
    description:
      "Realitní kancelář Liberec pro prodej, pronájem a ocenění nemovitosti zdarma. Zkušení realitní makléři pro Liberec, Prahu a okolní regiony.",
    images: ["/og-logo.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f4ed",
};

function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(247,244,237,0.95))]">
      <div className="mx-auto max-w-screen-2xl px-4 py-10 text-sm text-black/70 sm:px-6 xl:px-8">
        <div className="mb-7 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/50">
            Nisa Centrum Reality
          </p>
          <span className="mx-auto mt-2 block h-[5px] w-52 [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.2)_0%,rgba(230,194,94,0.95)_30%,rgba(230,194,94,0.95)_70%,rgba(230,194,94,0.2)_100%)]" />
        </div>

        <div className="grid gap-5 md:grid-cols-3 md:items-stretch">
          <section className="rounded-2xl border border-black/10 bg-white/80 p-5 shadow-sm backdrop-blur">
            <p className="font-semibold text-black">Kde působíme</p>
            <p className="mt-2 leading-relaxed">
              Liberec, Praha, Ústí nad Labem, Hradec Králové a okolí
            </p>
          </section>

          <section className="rounded-2xl border border-black/10 bg-white/80 p-5 shadow-sm backdrop-blur">
            <p className="font-semibold text-black">Kontakt</p>
            <div className="mt-3 space-y-3">
              <a
                href="tel:+420721292462"
                className="inline-flex items-center gap-2 text-black hover:text-black/70"
              >
                <Phone className="h-4 w-4 text-[color:var(--gold2)]" />
                +420 721 292 462
              </a>
              <a
                href="mailto:info@nisacentrum.cz"
                className="flex items-center gap-2 text-black hover:text-black/70"
              >
                <Mail className="h-4 w-4 text-[color:var(--gold2)]" />
                info@nisacentrum.cz
              </a>
              <p className="flex items-start gap-2 text-black">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold2)]" />
                <span>
                  Zámečnická 563/8
                  <br />
                  Liberec IV - Perštýn
                  <br />
                  46001 Liberec
                </span>
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-black/10 bg-white/80 p-5 shadow-sm backdrop-blur">
            <p className="font-semibold text-black">Firemní údaje</p>
            <div className="mt-3 space-y-2">
              <p className="flex items-center gap-2 font-medium text-black">
                <Building2 className="h-4 w-4 text-[color:var(--gold2)]" />
                NISACENTRUM s.r.o.
              </p>
              <p>
                <span className="font-medium text-black/60">IČO: </span>
                <span className="text-black">27273385</span>
              </p>
              <p>
                <span className="font-medium text-black/60">DIČ: </span>
                <span className="text-black">CZ27273385</span>
              </p>
              <p>
                <span className="font-medium text-black/60">Datová schránka: </span>
                <span className="text-black">yqkqb7n</span>
              </p>
            </div>
          </section>
        </div>

        <div className="mt-8 border-t border-black/10 pt-5">
          <div className="flex flex-col items-center gap-2 text-center text-xs md:text-sm">
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

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-black/70">
            <Link href="/gdpr" className="hover:text-black">
              Ochrana osobních údajů (GDPR)
            </Link>
            <Link href="/cookies" className="hover:text-black">
              Zásady cookies
            </Link>
            <OpenCookieSettingsButton
              label="Nastaveni cookies"
              className="inline-flex items-center gap-1.5 text-xs text-black/70 hover:text-black"
            />
          </div>

          <p className="mt-3 text-center text-xs text-black/60">
            Nisa Centrum Reality si vyhrazuje právo na změny a případné chyby v
            uvedených textech, cenách a parametrech nabídek.
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
      <head>
        <meta name="seznam-wmt" content="x8ny2qBSoMqI6qy4h4d09l0Uu4zuEIVq" />
      </head>
      <body className="min-h-dvh antialiased text-[color:var(--ink)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <CookieConsentManager measurementId={gaMeasurementId} />
        <GlobalClickAnalytics />
        <SiteHeader />
        <main>{children}</main>

        <ContactDock />

        <Footer />
      </body>
    </html>
  );
}

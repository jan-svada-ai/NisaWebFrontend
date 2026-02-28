import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-url";

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  title: "Kontakt | Realitní kancelář Liberec | Nisa Centrum Reality",
  description:
    "Kontaktujte Nisa Centrum Reality. Konzultace pro prodej, pronájem, vyhledání i ocenění nemovitosti zdarma v Liberci, Praze a okolí. Odpovídáme rychle a věcně.",
  keywords: [
    "kontakt realitní kancelář",
    "realitní kancelář Liberec kontakt",
    "ocenění nemovitosti kontakt",
    "prodej nemovitosti kontakt",
    "pronájem nemovitosti kontakt",
  ],
  alternates: {
    canonical: `${siteUrl}/kontakt`,
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/kontakt`,
    title: "Kontakt | Realitní kancelář Liberec | Nisa Centrum Reality",
    description:
      "Domluvte konzultaci pro prodej, pronájem nebo ocenění nemovitosti zdarma.",
  },
  twitter: {
    card: "summary",
    title: "Kontakt | Realitní kancelář Liberec | Nisa Centrum Reality",
    description:
      "Kontakt pro rychlou konzultaci: prodej, pronájem, vyhledání i ocenění.",
  },
};

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

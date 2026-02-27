import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-url";

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  title: "Reference klientů | Nisa Centrum Reality",
  description:
    "Skutečné recenze klientů Nisa Centrum Reality z Google a Firmy.cz. Podívejte se na zkušenosti s prodejem i pronájmem nemovitostí.",
  keywords: [
    "reference realitní kancelář",
    "recenze realitní kancelář",
    "Nisa Centrum Reality recenze",
    "Firmy.cz recenze",
    "Google recenze reality",
  ],
  alternates: {
    canonical: `${siteUrl}/reference`,
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/reference`,
    title: "Reference klientů | Nisa Centrum Reality",
    description:
      "Recenze z Google a Firmy.cz. Reálné zkušenosti klientů s naší realitní kanceláří.",
  },
  twitter: {
    card: "summary",
    title: "Reference klientů | Nisa Centrum Reality",
    description:
      "Zobrazujeme aktuální hodnocení a recenze klientů z externích portálů.",
  },
};

export default function ReferenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

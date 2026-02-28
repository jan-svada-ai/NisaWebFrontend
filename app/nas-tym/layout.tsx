import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-url";

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  title: "Realitní makléři Liberec | Náš tým | Nisa Centrum Reality",
  description:
    "Poznejte realitní makléře Nisa Centrum Reality. Přímý kontakt na specialisty pro prodej, pronájem i ocenění nemovitosti zdarma v Liberci, Praze a okolí.",
  keywords: [
    "realitní makléř Liberec",
    "realitní makléř",
    "realitní kancelář Liberec",
    "kontakt na makléře",
    "prodej nemovitosti",
    "pronájem nemovitosti",
    "ocenění nemovitosti zdarma",
  ],
  alternates: {
    canonical: `${siteUrl}/nas-tym`,
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/nas-tym`,
    title: "Realitní makléři Liberec | Náš tým | Nisa Centrum Reality",
    description:
      "Kontaktujte konkrétního realitního makléře a domluvte bezpečný postup pro prodej, pronájem nebo ocenění nemovitosti.",
  },
  twitter: {
    card: "summary",
    title: "Realitní makléři Liberec | Náš tým | Nisa Centrum Reality",
    description:
      "Profesionální tým realitních makléřů pro prodej, pronájem a ocenění nemovitostí.",
  },
};

export default function NasTymLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-url";

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  title: "Náš tým makléřů | Liberec, Praha a okolí | Nisa Centrum Reality",
  description:
    "Seznamte se s realitními makléři Nisa Centrum Reality. Přímý kontakt na specialisty pro prodej, pronájem i ocenění nemovitosti v Liberci, Praze a okolí.",
  keywords: [
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
    type: "profile",
    url: `${siteUrl}/nas-tym`,
    title: "Náš tým makléřů | Liberec, Praha a okolí | Nisa Centrum Reality",
    description:
      "Kontaktujte konkrétního makléře a domluvte bezpečný postup pro prodej nebo pronájem.",
  },
  twitter: {
    card: "summary",
    title: "Náš tým makléřů | Liberec, Praha a okolí | Nisa Centrum Reality",
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


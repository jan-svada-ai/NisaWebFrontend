import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-url";

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  title: "Nemovitosti Liberec a okolí | Aktuální nabídka | Nisa Centrum Reality",
  description:
    "Aktuální nabídka bytů, domů, pozemků a komerčních nemovitostí pro Liberec, Prahu, Ústí nad Labem, Hradec Králové a okolí. Pomůžeme i s oceněním nemovitosti zdarma.",
  keywords: [
    "nemovitosti Liberec",
    "realitní kancelář Liberec",
    "aktuální nabídka nemovitostí",
    "prodej nemovitosti",
    "pronájem nemovitosti",
    "byty na prodej",
    "domy na prodej",
    "pozemky na prodej",
    "ocenění nemovitosti zdarma",
  ],
  alternates: {
    canonical: `${siteUrl}/nabidka`,
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/nabidka`,
    title: "Nemovitosti Liberec a okolí | Aktuální nabídka | Nisa Centrum Reality",
    description:
      "Procházejte aktuální nabídku prodeje a pronájmu nemovitostí v Liberci, Praze a dalších klíčových regionech.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nemovitosti Liberec a okolí | Aktuální nabídka | Nisa Centrum Reality",
    description: "Byty, domy, pozemky i komerční nemovitosti v aktuální nabídce.",
  },
};

export default function NabidkaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-url";

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  title:
    "Aktuální nabídka nemovitostí | Prodej a pronájem | Nisa Centrum Reality",
  description:
    "Aktuální nabídka bytů, domů, pozemků a komerčních nemovitostí. Prodej i pronájem v Liberci, Praze, Ústí nad Labem, Hradci Králové a okolí.",
  keywords: [
    "realitní kancelář",
    "aktuální nabídka nemovitostí",
    "prodej nemovitosti",
    "pronájem nemovitosti",
    "byty na prodej",
    "domy na prodej",
    "pozemky na prodej",
    "nemovitosti Liberec",
  ],
  alternates: {
    canonical: `${siteUrl}/nabidka`,
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/nabidka`,
    title: "Aktuální nabídka nemovitostí | Nisa Centrum Reality",
    description:
      "Procházejte aktuální nabídku prodeje a pronájmu nemovitostí v klíčových regionech.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aktuální nabídka nemovitostí | Nisa Centrum Reality",
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


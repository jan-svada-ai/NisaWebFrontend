import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${SITE_URL}/vyhledavani-na-miru/`,
  },
};

export default function SluzbyVyhledavaniNaMiruLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

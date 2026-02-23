import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${SITE_URL}/prodej-pronajem/`,
  },
};

export default function SluzbyProdejPronajemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

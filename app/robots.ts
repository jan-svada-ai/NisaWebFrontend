import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

export const dynamic = "force-static";

const siteUrl = SITE_URL;

const host = siteUrl
  .replace(/^https?:\/\//i, "")
  .replace(/\/.*$/, "");

const robotsDisallow = [
  "/api/",
  "/*?*utm_*",
  "/*?*fbclid=*",
  "/*?*gclid=*",
  "/*?*yclid=*",
  "/*?*ref=*",
  "/*?*source=*",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: ["/"],
        disallow: robotsDisallow,
      },
      {
        userAgent: "SeznamBot",
        allow: ["/"],
        disallow: robotsDisallow,
      },
      {
        userAgent: "Bingbot",
        allow: ["/"],
        disallow: robotsDisallow,
      },
      {
        userAgent: "*",
        allow: ["/"],
        disallow: robotsDisallow,
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host,
  };
}

import { NextResponse } from "next/server";
import {
  fetchBrokerByVizitkaSlug,
  normalizeExternalUrl,
} from "@/lib/makler-vizitka";
import { SITE_URL } from "@/lib/site-url";

export const dynamic = "force-dynamic";

function escapeVcardValue(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}

function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  if (parts.length <= 1) {
    return {
      firstName: fullName.trim(),
      lastName: "",
    };
  }

  return {
    firstName: parts.slice(0, -1).join(" "),
    lastName: parts.at(-1) ?? "",
  };
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ vizitkaSlug: string }> },
) {
  const { vizitkaSlug } = await context.params;
  const broker = await fetchBrokerByVizitkaSlug(vizitkaSlug);

  if (!broker || !broker.vizitkaSlug) {
    return new NextResponse("Not found", { status: 404 });
  }

  const { firstName, lastName } = splitName(broker.jmeno);
  const websiteUrl = normalizeExternalUrl(broker.webUrl);
  const cardUrl = `${SITE_URL}/${encodeURIComponent(broker.vizitkaSlug)}`;
  const filenameBase = broker.slug?.trim() || broker.vizitkaSlug;

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${escapeVcardValue(broker.jmeno)}`,
    `N:${escapeVcardValue(lastName)};${escapeVcardValue(firstName)};;;`,
    "ORG:Nisa Centrum Reality",
    broker.pozice ? `TITLE:${escapeVcardValue(broker.pozice)}` : "",
    broker.telefon ? `TEL;TYPE=CELL:${escapeVcardValue(broker.telefon)}` : "",
    broker.email ? `EMAIL;TYPE=INTERNET:${escapeVcardValue(broker.email)}` : "",
    `URL:${escapeVcardValue(cardUrl)}`,
    websiteUrl ? `URL;TYPE=WORK:${escapeVcardValue(websiteUrl)}` : "",
    "END:VCARD",
  ].filter(Boolean);

  return new NextResponse(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filenameBase}.vcf"`,
      "Cache-Control": "no-store",
    },
  });
}

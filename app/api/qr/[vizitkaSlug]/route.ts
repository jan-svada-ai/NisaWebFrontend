import { NextResponse } from "next/server";
import { fetchBrokerByVizitkaSlug } from "@/lib/makler-vizitka";
import { generateQrSvg } from "@/lib/qr-code";
import { SITE_URL } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ vizitkaSlug: string }> },
) {
  const { vizitkaSlug } = await context.params;
  const broker = await fetchBrokerByVizitkaSlug(vizitkaSlug);

  if (!broker || !broker.vizitkaSlug) {
    return new NextResponse("Not found", { status: 404 });
  }

  const cardUrl = `${SITE_URL}/${encodeURIComponent(broker.vizitkaSlug)}`;
  const svg = await generateQrSvg(cardUrl);
  const filenameBase = broker.slug?.trim() || broker.vizitkaSlug;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filenameBase}-qr.svg"`,
      "Cache-Control": "no-store",
    },
  });
}

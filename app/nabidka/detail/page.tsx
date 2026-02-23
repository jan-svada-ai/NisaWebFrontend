"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import DetailPageClient from "../[slug]/DetailPageClient";

function DetailContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") ?? "";

  if (!slug) {
    return (
      <main className="min-h-screen pt-24">
        <div className="mx-auto max-w-screen-lg px-4 text-center">
          <p className="text-black/70">
            Chybí parametr inzerátu. Otevřete detail z aktuální nabídky.
          </p>
          <Link
            href="/nabidka"
            className="btn-main mt-4 inline-flex items-center justify-center rounded-full bg-[color:var(--gold1)] px-6 py-3 text-sm font-semibold text-black"
          >
            Zpět na nabídku
          </Link>
        </div>
      </main>
    );
  }

  return <DetailPageClient slug={slug} />;
}

export default function NabidkaDetailPage() {
  return (
    <Suspense fallback={<main className="min-h-screen pt-24" />}>
      <DetailContent />
    </Suspense>
  );
}



"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import MaklerDetailClient from "../[slug]/MaklerDetailClient";

function DetailContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") ?? "";

  if (!slug) {
    return (
      <main className="min-h-screen pt-24">
        <div className="mx-auto max-w-screen-lg px-4 text-center">
          <p className="text-black/70">
            Chybí parametr makléře. Otevřete detail ze stránky Náš tým.
          </p>
          <Link
            href="/nas-tym"
            className="btn-main mt-4 inline-flex items-center justify-center rounded-full bg-[color:var(--gold1)] px-6 py-3 text-sm font-semibold text-black"
          >
            Zpět na Náš tým
          </Link>
        </div>
      </main>
    );
  }

  return <MaklerDetailClient slug={slug} />;
}

export default function NasTymDetailPage() {
  return (
    <Suspense fallback={<main className="min-h-screen pt-24" />}>
      <DetailContent />
    </Suspense>
  );
}

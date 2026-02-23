"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LegacyVyhledavaniNaMiruPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/vyhledavani-na-miru/");
  }, [router]);

  return (
    <main className="min-h-screen pt-24">
      <div className="mx-auto max-w-screen-md px-4 py-16 text-center text-black/70">
        <p>Přesměrování na aktuální stránku…</p>
        <Link
          href="/vyhledavani-na-miru/"
          className="mt-4 inline-flex rounded-full border border-black/20 px-5 py-2.5 text-sm font-semibold text-black"
        >
          Pokračovat
        </Link>
      </div>
    </main>
  );
}


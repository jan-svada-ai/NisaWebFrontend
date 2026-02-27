"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ListPlus, Star } from "lucide-react";

type TestimonialItem = {
  text: string;
  author: string;
  source: "google" | "firmy";
  url: string;
  rating: number;
};

export default function AnimatedTestimonials({
  items,
}: {
  items: TestimonialItem[];
}) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="mx-auto max-w-6xl">
      <div
        className={[
          "mb-6 flex justify-center transition-all duration-500",
          revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        ].join(" ")}
        style={{ transitionDelay: "80ms" }}
      >
        <a
          href="https://www.firmy.cz/detail/13200814-nisa-centrum-reality-liberec.html#hodnoceni"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-2xl border border-black/10 bg-white/85 px-5 py-3 shadow-sm"
        >
          <Image
            src="https://www.firmy.cz/img-stars/light-13200814.svg"
            alt="Hodnocení firmy Nisa Centrum Reality na Firmy.cz: 5 hvězdiček"
            width={320}
            height={54}
            className="h-11 w-auto"
            unoptimized
          />
        </a>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item, idx) => (
          <article
            key={`${item.author}-${item.source}-${idx}`}
            className={[
              "rounded-3xl border border-black/10 bg-white/80 p-5 text-left shadow-sm transition-all duration-500",
              revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
            ].join(" ")}
            style={{ transitionDelay: `${idx * 120}ms` }}
          >
            <div className="mb-3 inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-black/70">
              {item.source === "google" ? "Google" : "Firmy.cz"}
            </div>

            <div className="mb-3 flex items-center gap-1 text-[color:var(--gold2)]">
              {Array.from({ length: 5 }).map((_, starIdx) => (
                <Star
                  key={starIdx}
                  className="h-3.5 w-3.5"
                  fill={starIdx < Math.round(item.rating) ? "currentColor" : "none"}
                />
              ))}
              <span className="ml-1 text-xs font-semibold text-black/70">
                {item.rating.toFixed(1)}
              </span>
            </div>

            <p className="text-base leading-relaxed text-black/80">
              &bdquo;{item.text}&ldquo;
            </p>
            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-black/60">{item.author}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--gold2)] hover:underline"
              >
                Zobrazit originál
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>

      <div
        className={[
          "mt-8 flex flex-wrap justify-center gap-3 transition-all duration-500",
          revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        ].join(" ")}
        style={{ transitionDelay: `${items.length * 120}ms` }}
      >
        <Link
          href="/reference"
          className="btn-main inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-6 py-3 text-sm font-semibold text-black"
        >
          <ListPlus className="h-4 w-4" />
          Zobrazit všechny reference
        </Link>
        <a
          href="https://share.google/mTkMMCC6dhLqSGPAv"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-main inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-white/70 px-6 py-3 text-sm font-semibold text-black"
        >
          <Star className="h-4 w-4" />
          Google profil
        </a>
      </div>
    </div>
  );
}


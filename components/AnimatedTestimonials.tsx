"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type TestimonialItem = {
  text: string;
  author: string;
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
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item, idx) => (
          <article
            key={item.author}
            className={[
              "rounded-3xl border border-black/10 bg-white/80 p-6 text-left shadow-sm transition-all duration-500",
              revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
            ].join(" ")}
            style={{ transitionDelay: `${idx * 120}ms` }}
          >
            <p className="text-base leading-relaxed text-black/80">
              &bdquo;{item.text}&ldquo;
            </p>
            <p className="mt-4 text-sm font-semibold text-black/60">
              {item.author}
            </p>
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
          Zobrazit všechny reference
        </Link>
        <a
          href="https://share.google/mTkMMCC6dhLqSGPAv"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-main inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-white/70 px-6 py-3 text-sm font-semibold text-black"
        >
          Google profil
        </a>
      </div>
    </div>
  );
}

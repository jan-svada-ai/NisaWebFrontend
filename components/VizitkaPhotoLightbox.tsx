"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Expand, X } from "lucide-react";

type VizitkaPhotoLightboxProps = {
  src: string;
  alt: string;
};

export default function VizitkaPhotoLightbox({
  src,
  alt,
}: VizitkaPhotoLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group relative block h-full w-full"
        aria-label="Zvětšit profilovou fotku"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 112px, 128px"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
          priority
        />
        <span className="absolute inset-x-3 bottom-3 inline-flex items-center justify-center gap-1 rounded-full bg-black/55 px-2 py-1 text-[11px] font-semibold text-white opacity-0 transition group-hover:opacity-100">
          <Expand className="h-3.5 w-3.5" />
          Zvětšit
        </span>
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-white transition hover:bg-white/18"
            aria-label="Zavřít zvětšenou fotku"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="relative h-[70vh] w-full max-w-xl overflow-hidden rounded-[32px] border border-white/15 bg-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

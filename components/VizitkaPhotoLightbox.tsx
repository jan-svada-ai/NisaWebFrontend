"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Expand } from "lucide-react";

type VizitkaPhotoLightboxProps = {
  src: string;
  alt: string;
};

export default function VizitkaPhotoLightbox({
  src,
  alt,
}: VizitkaPhotoLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
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
          sizes="(max-width: 640px) 128px, 160px"
          quality={95}
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
          priority
        />
        <span className="absolute inset-x-3 bottom-3 inline-flex items-center justify-center gap-1 rounded-full bg-black/55 px-2 py-1 text-[11px] font-semibold text-white opacity-0 transition group-hover:opacity-100">
          <Expand className="h-3.5 w-3.5" />
          Zvětšit
        </span>
      </button>

      {isMounted && isOpen
        ? createPortal(
            <div
              className="fixed inset-0 z-[9999] bg-black"
              onClick={() => setIsOpen(false)}
            >
              <div
                className="relative h-full w-full"
                onClick={(event) => event.stopPropagation()}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="100vw"
                  quality={100}
                  className="object-contain"
                  priority
                />
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

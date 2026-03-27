"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Expand, X } from "lucide-react";

type VizitkaQrLightboxProps = {
  svgMarkup: string;
};

export default function VizitkaQrLightbox({
  svgMarkup,
}: VizitkaQrLightboxProps) {
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
        className="group relative mx-auto block w-full max-w-[270px] bg-white p-2 shadow-[0_10px_24px_rgba(0,0,0,0.05)]"
        aria-label="Zvětšit QR kód"
      >
        <div
          className="mx-auto aspect-square w-full [&_svg]:block [&_svg]:h-full [&_svg]:w-full"
          dangerouslySetInnerHTML={{ __html: svgMarkup }}
        />
        <span className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
          <Expand className="h-4 w-4" />
        </span>
      </button>

      {isMounted && isOpen
        ? createPortal(
            <div
              className="fixed inset-0 z-[9999] bg-black/95 px-4 py-6"
              role="dialog"
              aria-modal="true"
              aria-label="Zvětšený QR kód"
              onClick={() => setIsOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur transition hover:bg-black/75 sm:right-6 sm:top-6"
                aria-label="Zavřít zvětšený QR kód"
              >
                <X className="h-6 w-6" />
              </button>

              <div
                className="flex h-full items-center justify-center"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="w-full max-w-[34rem] bg-white p-4 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:p-5">
                  <div
                    className="aspect-square w-full [&_svg]:block [&_svg]:h-full [&_svg]:w-full"
                    dangerouslySetInnerHTML={{ __html: svgMarkup }}
                  />
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

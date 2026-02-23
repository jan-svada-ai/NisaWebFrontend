"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Mail, Phone, Instagram, Facebook, Plus, X } from "lucide-react";

type DesktopItem =
  | {
      kind: "link";
      href: string;
      label: string;
      icon: ReactNode;
      strong?: boolean;
    }
  | {
      kind: "a";
      href: string;
      label: string;
      icon: ReactNode;
      strong?: boolean;
      external?: boolean;
    };

export default function ContactDock() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // Zavřít klikem mimo (hlavně mobil)
  useEffect(() => {
    function onDown(e: MouseEvent | TouchEvent) {
      const t = e.target as Node;
      if (ref.current && !ref.current.contains(t)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, []);

  // ESC zavře
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // MOBILE: ať funguje group-hover pro ikonku
  const mobileItem =
    "group inline-flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-black/85 transition hover:bg-black/5";

  const mobileIcon =
    "h-5 w-5 shrink-0 text-black/70 transition group-hover:text-[color:var(--gold2)]";

  const desktopItems: DesktopItem[] = [
    {
      kind: "link",
      href: "/kontakt#formular",
      label: "Napište nám",
      icon: <Mail className="h-5 w-5" />,
      strong: true,
    },
    {
      kind: "a",
      href: "tel:+420721292462",
      label: "Zavolejte nám",
      icon: <Phone className="h-5 w-5" />,
    },
    {
      kind: "a",
      href: "https://www.instagram.com/nisa_centrum_reality?igsh=MW92NnF3MHdiZ243OQ==",
      label: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      external: true,
    },
    {
      kind: "a",
      href: "https://www.facebook.com/realitynisacentrum?locale=cs_CZ",
      label: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      external: true,
    },
  ];

  return (
    <div ref={ref} className="fixed bottom-5 right-5 z-40">
      {/* =======================
          DESKTOP (>= xl): fixní lišta + tooltip doleva
          ======================= */}
      <div className="hidden xl:block">
        <div className="rounded-2xl border border-black/10 bg-white/85 shadow-2xl backdrop-blur-xl ring-1 ring-[color:var(--gold1)]/20">
          {/* items-end + overflow-visible -> tooltip se nepřekresluje */}
          <div className="flex w-16 flex-col items-end justify-center gap-2 overflow-visible p-2">
            {desktopItems.map((item) => {
              const strong = !!item.strong;

              const iconBtnBase =
                "relative group inline-flex h-12 w-12 items-center justify-center rounded-xl " +
                "border border-black/10 shadow-sm backdrop-blur transition " +
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold1)]/50";

              const iconBtnColors = strong
                ? "bg-black text-white hover:bg-black/90"
                : "bg-white/90 text-black/75 hover:bg-white";

              const tooltipBase =
                "pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-3 " +
                "inline-flex items-center gap-2 rounded-xl border border-black/10 " +
                "px-4 py-3 text-base font-semibold shadow-xl backdrop-blur " +
                "opacity-0 translate-x-2 transition-all duration-200 " +
                "group-hover:opacity-100 group-hover:translate-x-0";

              const tooltipColors = strong
                ? "bg-black text-white"
                : "bg-white/95 text-black/85";

              const tooltipIcon = strong
                ? "text-white"
                : "text-[color:var(--gold2)] text-lg";

              const iconOnButton = strong
                ? "text-white"
                : "text-black/55 group-hover:text-[color:var(--gold2)] transition";

              const tooltipContent = (
                <span className={`${tooltipBase} ${tooltipColors}`}>
                  <span className={tooltipIcon}>{item.icon}</span>
                  <span className="whitespace-nowrap">{item.label}</span>
                </span>
              );

              if (item.kind === "link") {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`${iconBtnBase} ${iconBtnColors}`}
                    aria-label={item.label}
                    title={item.label}
                  >
                    <span className={iconOnButton}>{item.icon}</span>
                    {tooltipContent}
                  </Link>
                );
              }

              const isExternal = !!item.external;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className={`${iconBtnBase} ${iconBtnColors}`}
                  aria-label={item.label}
                  title={item.label}
                >
                  <span className={iconOnButton}>{item.icon}</span>
                  {tooltipContent}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* =======================
          MOBILE (< xl): jen + + panel
          ======================= */}
      <div className="xl:hidden relative">
        {/* panel */}
        <div
          className={[
            "absolute right-0 bottom-16 w-[240px] overflow-hidden rounded-2xl border border-black/10 bg-white/90 p-2 shadow-2xl backdrop-blur-xl ring-1 ring-[color:var(--gold1)]/20",
            "origin-bottom-right transition-all duration-200",
            open
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none translate-y-2 opacity-0",
          ].join(" ")}
        >
          <Link
            href="/kontakt#formular"
            className="inline-flex w-full items-center gap-3 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-black/90"
            onClick={() => setOpen(false)}
          >
            <Mail className="h-5 w-5 shrink-0 text-white" />
            <span className="whitespace-nowrap">Napište nám</span>
          </Link>

          <a
            href="tel:+420721292462"
            className={mobileItem}
            onClick={() => setOpen(false)}
          >
            <Phone className={mobileIcon} />
            <span className="whitespace-nowrap">Zavolejte nám</span>
          </a>

          <a
            href="https://www.instagram.com/nisa_centrum_reality?igsh=MW92NnF3MHdiZ243OQ=="
            target="_blank"
            rel="noopener noreferrer"
            className={mobileItem}
            onClick={() => setOpen(false)}
          >
            <Instagram className={mobileIcon} />
            <span className="whitespace-nowrap">Instagram</span>
          </a>

          <a
            href="https://www.facebook.com/realitynisacentrum?locale=cs_CZ"
            target="_blank"
            rel="noopener noreferrer"
            className={mobileItem}
            onClick={() => setOpen(false)}
          >
            <Facebook className={mobileIcon} />
            <span className="whitespace-nowrap">Facebook</span>
          </a>
        </div>

        {/* + tlačítko (vpravo dole) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-2xl transition hover:bg-black/90"
          aria-label={open ? "Zavřít kontakty" : "Otevřít kontakty"}
        >
          {open ? <X className="h-6 w-6" /> : <Plus className="h-7 w-7" />}
        </button>
      </div>
    </div>
  );
}




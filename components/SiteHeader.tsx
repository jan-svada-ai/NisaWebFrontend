"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  HandCoins,
  KeyRound,
  Gift,
  Search,
  ListChecks,
  Handshake,
  Layers,
  ChevronDown,
  MapPin,
  Star,
  MoreHorizontal,
  Menu,
  X,
} from "lucide-react";

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  // když je otevřené mobilní menu, nechceme scrollovat stránkou pod tím
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const icon =
    "h-5 w-5 shrink-0 text-black/55 transition group-hover:text-[color:var(--gold2)]";

  const centerLabel =
    "pointer-events-none absolute left-1/2 top-1/2 w-[calc(100%-2.5rem)] -translate-x-1/2 -translate-y-1/2 text-center leading-tight";

  const itemBase =
    "group relative flex h-14 w-28 items-center px-2 text-[13px] font-medium text-black/80 transition hover:bg-black/5 lg:w-32 lg:text-[14px] xl:w-36";

  const withDivider =
    "after:absolute after:right-0 after:top-2 after:bottom-2 after:w-[2px] after:bg-[color:var(--gold1)]/70 last:after:hidden";

  const panel =
    "rounded-2xl border border-black/10 bg-white/85 p-2 shadow-2xl backdrop-blur-xl ring-1 ring-[color:var(--gold1)]/20";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-black/10 bg-white/65 backdrop-blur-xl">
        {/* nižší header */}
        <div className="mx-auto flex h-16 max-w-screen-2xl items-stretch gap-4 pl-2 pr-3 sm:pl-2 sm:pr-6 lg:pl-3 lg:pr-8">
          {/* LOGO */}
          <Link href="/" className="flex items-stretch self-stretch">
            <span className="relative block h-full w-[170px] sm:w-[220px]">
              <Image
                src="/logo-nisa.png"
                alt="Nisa Centrum Reality"
                fill
                sizes="(max-width: 640px) 170px, 220px"
                className="object-contain object-left"
                priority
              />
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center">
            <Link href="/" className={`${itemBase} ${withDivider}`}>
              <Home className={`${icon} row-span-2`} />
              <span className={centerLabel}>Úvod</span>
            </Link>

            <Link
              href="/prodej-pronajem"
              className={`${itemBase} ${withDivider}`}
            >
              <KeyRound className={`${icon} row-span-2`} />
              <span className={centerLabel}>
                <span className="block">Prodej a</span>
                <span className="block">pronájem</span>
                <span className="block">nemovitosti</span>
              </span>
            </Link>
            <a
              href="https://leady.valuo.cz/kalkulace/5dfdb68a089d608a996823b2bc0f53d9"
              target="_blank"
              rel="noopener noreferrer"
              className={`${itemBase} ${withDivider}`}
            >
              <HandCoins className={`${icon} row-span-2`} />
              <span className={centerLabel}>
                <span className="block">Ocenění</span>
                <span className="block">nemovitosti</span>
                <span className="block">zdarma</span>
              </span>
            </a>

            <Link
              href="/vyhledavani-na-miru"
              className={`${itemBase} ${withDivider}`}
            >
              <Search className={`${icon} row-span-2`} />
              <span className={centerLabel}>
                <span className="block">Vyhledávání</span>
                <span className="block">nemovitosti</span>
                <span className="block">na míru</span>
              </span>
            </Link>

            <Link
              href="/tipni-realitu"
              className={`${itemBase} ${withDivider}`}
            >
              <Gift className={`${icon} row-span-2`} />
              <span className={centerLabel}>
                <span className="block">Pošli tip</span>
                <span className="block">na reality</span>
              </span>
            </Link>

            <Link href="/nabidka" className={`${itemBase} ${withDivider}`}>
              <ListChecks className={`${icon} row-span-2`} />
              <span className={centerLabel}>
                <span className="block">Aktuální</span>
                <span className="block">nabídka</span>
              </span>
            </Link>

            <Link
              href="/co-vse-pro-vas-udelame"
              className={`${itemBase} ${withDivider}`}
            >
              <Layers className={`${icon} row-span-2`} />
              <span className={centerLabel}>
                <span className="block">Co vše</span>
                <span className="block">pro Vás</span>
                <span className="block">uděláme</span>
              </span>
            </Link>

            <Link href="/nas-tym" className={`${itemBase} ${withDivider}`}>
              <Handshake className={`${icon} row-span-2`} />
              <span className={centerLabel}>
                <span className="block">Náš</span>
                <span className="block">tým</span>
              </span>
            </Link>

            {/* VÍCE - desktop dropdown (hover) */}
            <div className={`${itemBase} ${withDivider} relative`}>
              <button
                type="button"
                className="flex h-full w-full items-center pl-2 pr-2"
                aria-haspopup="menu"
              >
                <MoreHorizontal className={icon} />
                <span className={centerLabel}>
                  Více
                </span>
                <ChevronDown className="ml-auto h-3.5 w-3.5 text-black/55 transition group-hover:text-[color:var(--gold2)]" />
              </button>

              <div className="absolute left-0 top-full z-50 pt-2 opacity-0 translate-y-1 pointer-events-none transition group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
                <div className="absolute left-10 top-1 h-3 w-3 rotate-45 border-l border-t border-black/10 bg-white/85 backdrop-blur-xl" />
                <div className={`w-64 ${panel}`}>
                  <Link
                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-black/80 transition hover:bg-[color:var(--gold1)]/15 hover:text-black"
                    href="/kontakt"
                  >
                    <MapPin className="h-4 w-4 text-[color:var(--gold2)]" />
                    Kontakt
                  </Link>
                  <Link
                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-black/80 transition hover:bg-[color:var(--gold1)]/15 hover:text-black"
                    href="/reference"
                  >
                    <Star className="h-4 w-4 text-[color:var(--gold2)]" />
                    Reference
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* MOBILE: hamburger */}
          <button
            type="button"
            className="ml-auto my-2 inline-flex md:hidden h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-white/70 text-black/80 shadow-sm backdrop-blur transition hover:bg-white/85"
            onClick={() => setMobileOpen(true)}
            aria-label="Otevřít menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* MOBILE OVERLAY + DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-black/35 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          <div className="absolute right-0 top-0 h-full w-[86%] max-w-[380px] bg-white/95 shadow-2xl ring-1 ring-black/10">
            <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
              <div className="relative h-[56px] w-[240px]">
                <Image
                  src="/logo-nisa.png"
                  alt="Nisa Centrum Reality"
                  fill
                  sizes="240px"
                  className="object-contain object-left"
                  priority
                />
              </div>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-white/70 text-black/80"
                onClick={() => setMobileOpen(false)}
                aria-label="Zavřít menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-3">
              <MobileItem
                href="/"
                icon={<Home className="h-5 w-5 text-black/70" />}
                title="Úvod"
                onClick={() => setMobileOpen(false)}
              />
              <MobileItem
                href="https://leady.valuo.cz/kalkulace/5dfdb68a089d608a996823b2bc0f53d9"
                icon={<HandCoins className="h-5 w-5 text-black/70" />}
                title="Ocenění nemovitosti zdarma"
                external
                onClick={() => setMobileOpen(false)}
              />
              <MobileItem
                href="/prodej-pronajem"
                icon={<KeyRound className="h-5 w-5 text-black/70" />}
                title="Prodej a pronájem nemovitosti"
                onClick={() => setMobileOpen(false)}
              />
              <MobileItem
                href="/vyhledavani-na-miru"
                icon={<Search className="h-5 w-5 text-black/70" />}
                title="Vyhledávání nemovitosti na míru"
                onClick={() => setMobileOpen(false)}
              />
              <MobileItem
                href="/tipni-realitu"
                icon={<Gift className="h-5 w-5 text-black/70" />}
                title="Pošli tip na reality"
                onClick={() => setMobileOpen(false)}
              />
              <MobileItem
                href="/nabidka"
                icon={<ListChecks className="h-5 w-5 text-black/70" />}
                title="Aktuální nabídka"
                onClick={() => setMobileOpen(false)}
              />
              <MobileItem
                href="/#proc-maklere"
                icon={<Handshake className="h-5 w-5 text-black/70" />}
                title="Proč mít svého makléře?"
                onClick={() => setMobileOpen(false)}
              />
              <MobileItem
                href="/co-vse-pro-vas-udelame"
                icon={<Layers className="h-5 w-5 text-black/70" />}
                title="Naše služby"
                onClick={() => setMobileOpen(false)}
              />
              <MobileItem
                href="/nas-tym"
                icon={<Handshake className="h-5 w-5 text-black/70" />}
                title="Náš tým"
                onClick={() => setMobileOpen(false)}
              />

              {/* Mobile "Více" jako accordion */}
              <div className="mt-2 relative z-10">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-left font-semibold text-black/80 active:scale-[0.99]"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMobileMoreOpen((v) => !v);
                  }}
                  aria-expanded={mobileMoreOpen}
                  aria-controls="mobile-more-panel"
                >
                  <span className="inline-flex items-center gap-3">
                    <MoreHorizontal className="h-5 w-5 text-black/70" />
                    Více
                  </span>
                  <ChevronDown
                    className={[
                      "h-5 w-5 text-black/60 transition",
                      mobileMoreOpen ? "rotate-180" : "",
                    ].join(" ")}
                  />
                </button>

                <div
                  id="mobile-more-panel"
                  className={[
                    "mt-2 overflow-hidden rounded-2xl border border-black/10 bg-white/80",
                    mobileMoreOpen ? "block" : "hidden",
                  ].join(" ")}
                  onClick={(e) => e.stopPropagation()}
                >
                  <MobileSubItem
                    href="/kontakt"
                    icon={
                      <MapPin className="h-4 w-4 text-[color:var(--gold2)]" />
                    }
                    title="Kontakt"
                    onClick={() => setMobileOpen(false)}
                  />
                  <MobileSubItem
                    href="/reference"
                    icon={
                      <Star className="h-4 w-4 text-[color:var(--gold2)]" />
                    }
                    title="Reference"
                    onClick={() => setMobileOpen(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function MobileItem({
  href,
  icon,
  title,
  subtitle,
  external = false,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  external?: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={onClick}
      className="mb-2 flex items-center gap-3 rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-black/80 transition hover:bg-white/85"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-black/5">
        {icon}
      </span>
      <span className="leading-tight">
        <span className="block font-semibold">{title}</span>
        {subtitle ? (
          <span className="block text-sm text-black/60">{subtitle}</span>
        ) : null}
      </span>
    </Link>
  );
}

function MobileSubItem({
  href,
  icon,
  title,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 text-black/80 transition hover:bg-[color:var(--gold1)]/15"
    >
      {icon}
      <span className="font-semibold">{title}</span>
    </Link>
  );
}




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

  const itemBase =
    "group relative shrink-0 flex h-14 w-[98px] items-center justify-center gap-2 px-2 text-left text-[12px] font-medium leading-[1.1] text-black/80 transition hover:bg-black/5 xl:w-[108px] xl:text-[13px] 2xl:w-[118px]";

  const withDivider =
    "after:absolute after:right-0 after:top-2 after:bottom-2 after:w-[2px] after:bg-[color:var(--gold1)]/70 last:after:hidden";

  const panel =
    "rounded-2xl border border-black/10 bg-white/90 p-2 shadow-2xl backdrop-blur-xl ring-1 ring-[color:var(--gold1)]/20";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-black/10 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-screen-2xl items-stretch gap-1 px-2 sm:px-3 lg:px-4 xl:px-6">
          <Link href="/" className="flex items-stretch self-stretch shrink-0">
            <span className="relative block h-full w-[138px] sm:w-[165px] xl:w-[198px]">
              <Image
                src="/logo-nisa.webp"
                alt="Nisa Centrum Reality"
                fill
                sizes="(max-width: 640px) 140px, (max-width: 1280px) 170px, 200px"
                className="object-contain object-left"
                priority
              />
            </span>
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-start lg:flex">
            <Link href="/" className={`${itemBase} ${withDivider}`}>
              <Home className={icon} />
              <span className="block">Úvod</span>
            </Link>

            <Link href="/prodej-pronajem/" className={`${itemBase} ${withDivider}`}>
              <KeyRound className={icon} />
              <span className="block">
                <span className="block">Prodej a</span>
                <span className="block">pronájem</span>
              </span>
            </Link>

            <a
              href="https://leady.valuo.cz/kalkulace/5dfdb68a089d608a996823b2bc0f53d9"
              target="_blank"
              rel="noopener noreferrer"
              className={`${itemBase} ${withDivider}`}
            >
              <HandCoins className={icon} />
              <span className="block">
                <span className="block">Ocenění</span>
                <span className="block">zdarma</span>
              </span>
            </a>

            <Link href="/vyhledavani-na-miru/" className={`${itemBase} ${withDivider}`}>
              <Search className={icon} />
              <span className="block">
                <span className="block">Vyhledávání</span>
                <span className="block">na míru</span>
              </span>
            </Link>

            <Link href="/tipni-realitu/" className={`${itemBase} ${withDivider} max-[1060px]:hidden`}>
              <Gift className={icon} />
              <span className="block">
                <span className="block">Pošli tip</span>
                <span className="block">na reality</span>
              </span>
            </Link>

            <Link href="/nabidka/" className={`${itemBase} ${withDivider} max-[1140px]:hidden`}>
              <ListChecks className={icon} />
              <span className="block">
                <span className="block">Aktuální</span>
                <span className="block">nabídka</span>
              </span>
            </Link>

            <Link
              href="/co-vse-pro-vas-udelame/"
              className={`${itemBase} ${withDivider} max-[1220px]:hidden`}
            >
              <Layers className={icon} />
              <span className="block">
                <span className="block">Co vše</span>
                <span className="block">pro vás</span>
              </span>
            </Link>

            <Link href="/nas-tym/" className={`${itemBase} ${withDivider} max-[1300px]:hidden`}>
              <Handshake className={icon} />
              <span className="block">
                <span className="block">Náš</span>
                <span className="block">tým</span>
              </span>
            </Link>

            <Link href="/kontakt/" className={`${itemBase} ${withDivider} max-[1400px]:hidden`}>
              <MapPin className={icon} />
              <span className="block">
                <span className="block">Kontakt</span>
              </span>
            </Link>

            <Link href="/reference/" className={`${itemBase} ${withDivider} max-[1500px]:hidden`}>
              <Star className={icon} />
              <span className="block">
                <span className="block">Reference</span>
              </span>
            </Link>

            <div className={`${itemBase} ${withDivider} relative hidden max-[1500px]:flex`}>
              <button
                type="button"
                className="flex h-full w-full items-center justify-center gap-2 px-2 text-left"
                aria-haspopup="menu"
              >
                <MoreHorizontal className={icon} />
                <span className="inline-flex items-center gap-1 leading-none">
                  Více
                  <ChevronDown className="h-3.5 w-3.5 text-black/55 transition group-hover:text-[color:var(--gold2)]" />
                </span>
              </button>

              <div className="absolute right-0 top-full z-50 translate-y-1 pt-2 opacity-0 pointer-events-none transition group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto">
                <div className="absolute right-8 top-1 h-3 w-3 rotate-45 border-l border-t border-black/10 bg-white/90 backdrop-blur-xl" />
                <div className={`w-72 ${panel}`}>
                  <Link
                    className="hidden items-center gap-3 rounded-xl px-3 py-2 text-sm text-black/80 transition hover:bg-[color:var(--gold1)]/15 hover:text-black max-[1060px]:flex"
                    href="/tipni-realitu/"
                  >
                    <Gift className="h-4 w-4 text-[color:var(--gold2)]" />
                    Pošli tip na reality
                  </Link>
                  <Link
                    className="hidden items-center gap-3 rounded-xl px-3 py-2 text-sm text-black/80 transition hover:bg-[color:var(--gold1)]/15 hover:text-black max-[1140px]:flex"
                    href="/nabidka/"
                  >
                    <ListChecks className="h-4 w-4 text-[color:var(--gold2)]" />
                    Aktuální nabídka
                  </Link>
                  <Link
                    className="hidden items-center gap-3 rounded-xl px-3 py-2 text-sm text-black/80 transition hover:bg-[color:var(--gold1)]/15 hover:text-black max-[1220px]:flex"
                    href="/co-vse-pro-vas-udelame/"
                  >
                    <Layers className="h-4 w-4 text-[color:var(--gold2)]" />
                    Co vše pro vás uděláme
                  </Link>
                  <Link
                    className="hidden items-center gap-3 rounded-xl px-3 py-2 text-sm text-black/80 transition hover:bg-[color:var(--gold1)]/15 hover:text-black max-[1300px]:flex"
                    href="/nas-tym/"
                  >
                    <Handshake className="h-4 w-4 text-[color:var(--gold2)]" />
                    Náš tým
                  </Link>
                  <Link
                    className="hidden items-center gap-3 rounded-xl px-3 py-2 text-sm text-black/80 transition hover:bg-[color:var(--gold1)]/15 hover:text-black max-[1400px]:flex"
                    href="/kontakt/"
                  >
                    <MapPin className="h-4 w-4 text-[color:var(--gold2)]" />
                    Kontakt
                  </Link>
                  <Link
                    className="hidden items-center gap-3 rounded-xl px-3 py-2 text-sm text-black/80 transition hover:bg-[color:var(--gold1)]/15 hover:text-black max-[1500px]:flex"
                    href="/reference/"
                  >
                    <Star className="h-4 w-4 text-[color:var(--gold2)]" />
                    Reference
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <button
            type="button"
            className="ml-auto my-2 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-white/75 text-black/80 shadow-sm transition hover:bg-white/90 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Otevřít menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/35 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          <div className="absolute right-0 top-0 flex h-full w-[86%] max-w-[380px] flex-col bg-white/95 shadow-2xl ring-1 ring-black/10">
            <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
              <div className="relative h-[56px] w-[240px]">
                <Image
                  src="/logo-nisa.webp"
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

            <div className="min-h-0 flex-1 overflow-y-auto p-3 pb-5">
              <MobileItem href="/" title="Úvod" icon={<Home className="h-5 w-5 text-black/70" />} onClick={() => setMobileOpen(false)} />
              <MobileItem href="/prodej-pronajem/" title="Prodej a pronájem nemovitosti" icon={<KeyRound className="h-5 w-5 text-black/70" />} onClick={() => setMobileOpen(false)} />
              <MobileItem href="https://leady.valuo.cz/kalkulace/5dfdb68a089d608a996823b2bc0f53d9" title="Ocenění nemovitosti zdarma" icon={<HandCoins className="h-5 w-5 text-black/70" />} external onClick={() => setMobileOpen(false)} />
              <MobileItem href="/vyhledavani-na-miru/" title="Vyhledávání nemovitosti na míru" icon={<Search className="h-5 w-5 text-black/70" />} onClick={() => setMobileOpen(false)} />
              <MobileItem href="/tipni-realitu/" title="Pošli tip na reality" icon={<Gift className="h-5 w-5 text-black/70" />} onClick={() => setMobileOpen(false)} />
              <MobileItem href="/nabidka/" title="Aktuální nabídka" icon={<ListChecks className="h-5 w-5 text-black/70" />} onClick={() => setMobileOpen(false)} />
              <MobileItem href="/co-vse-pro-vas-udelame/" title="Co vše pro vás uděláme" icon={<Layers className="h-5 w-5 text-black/70" />} onClick={() => setMobileOpen(false)} />
              <MobileItem href="/nas-tym/" title="Náš tým" icon={<Handshake className="h-5 w-5 text-black/70" />} onClick={() => setMobileOpen(false)} />
              <MobileItem href="/kontakt/" title="Kontakt" icon={<MapPin className="h-5 w-5 text-black/70" />} onClick={() => setMobileOpen(false)} />
              <MobileItem href="/reference/" title="Reference" icon={<Star className="h-5 w-5 text-black/70" />} onClick={() => setMobileOpen(false)} />
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
  external = false,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
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
      <span className="block font-semibold leading-tight">{title}</span>
    </Link>
  );
}




"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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

function normalizePath(path: string): string {
  const cleanPath = path.split(/[?#]/)[0] ?? "/";
  if (!cleanPath || cleanPath === "/") return "/";
  return cleanPath.replace(/\/+$/, "");
}

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const currentPath = normalizePath(pathname ?? "/");

  const isPathActive = (href: string, aliases: string[] = []): boolean => {
    const allPaths = [href, ...aliases].map(normalizePath);
    return allPaths.some((path) => {
      if (path === "/") return currentPath === "/";
      return currentPath === path || currentPath.startsWith(`${path}/`);
    });
  };

  const isHomeActive = isPathActive("/");
  const isProdejActive = isPathActive("/prodej-pronajem", ["/sluzby/prodej-pronajem"]);
  const isOceneniActive = isPathActive("/oceneni-zdarma");
  const isVyhledavaniActive = isPathActive("/vyhledavani-na-miru", ["/sluzby/vyhledavani-na-miru"]);
  const isTipActive = isPathActive("/tipni-realitu");
  const isNabidkaActive = isPathActive("/nabidka", ["/nabidka/detail"]);
  const isSluzbyActive = isPathActive("/co-vse-pro-vas-udelame");
  const isTymActive = isPathActive("/nas-tym", ["/nas-tym/detail"]);
  const isKontaktActive = isPathActive("/kontakt");
  const isReferenceActive = isPathActive("/reference");

  const isMoreActive =
    isTipActive || isNabidkaActive || isSluzbyActive || isTymActive || isKontaktActive || isReferenceActive;

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const itemBase =
    "group relative shrink-0 flex h-14 w-[98px] items-center justify-center gap-2 px-2 text-left text-[12px] font-medium leading-[1.1] text-black/80 transition hover:bg-black/5 xl:w-[108px] xl:text-[13px] 2xl:w-[118px]";

  const withDivider =
    "after:absolute after:right-0 after:top-2 after:bottom-2 after:w-[2px] after:bg-[color:var(--gold1)]/70 last:after:hidden";

  const panel =
    "rounded-2xl border border-black/10 bg-white/90 p-2 shadow-2xl backdrop-blur-xl ring-1 ring-[color:var(--gold1)]/20";

  const navItemClass = (active: boolean) =>
    `${itemBase} ${withDivider} ${active ? "bg-[color:var(--gold1)]/20 text-black" : ""}`;

  const navIconClass = (active: boolean) =>
    `h-5 w-5 shrink-0 transition ${active ? "text-[color:var(--gold2)]" : "text-black/55 group-hover:text-[color:var(--gold2)]"}`;

  const dropdownItemClass = (active: boolean, visibilityClass: string) =>
    `${visibilityClass} items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
      active ? "bg-[color:var(--gold1)]/20 text-black" : "text-black/80 hover:bg-[color:var(--gold1)]/15 hover:text-black"
    }`;

  const mobileIconClass = (active: boolean) =>
    `h-5 w-5 ${active ? "text-[color:var(--gold2)]" : "text-black/70"}`;

  return (
    <header data-site-header className="fixed inset-x-0 top-0 z-50">
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
            <Link href="/" className={navItemClass(isHomeActive)}>
              <Home className={navIconClass(isHomeActive)} />
              <span className="block">Úvod</span>
            </Link>

            <Link href="/prodej-pronajem" className={navItemClass(isProdejActive)}>
              <KeyRound className={navIconClass(isProdejActive)} />
              <span className="block">
                <span className="block">Prodej a</span>
                <span className="block">pronájem</span>
              </span>
            </Link>

            <Link href="/oceneni-zdarma" className={navItemClass(isOceneniActive)}>
              <HandCoins className={navIconClass(isOceneniActive)} />
              <span className="block">
                <span className="block">Ocenění</span>
                <span className="block">zdarma</span>
              </span>
            </Link>

            <Link href="/vyhledavani-na-miru" className={navItemClass(isVyhledavaniActive)}>
              <Search className={navIconClass(isVyhledavaniActive)} />
              <span className="block">
                <span className="block">Vyhledávání</span>
                <span className="block">na míru</span>
              </span>
            </Link>

            <Link href="/tipni-realitu" className={`${navItemClass(isTipActive)} max-[1060px]:hidden`}>
              <Gift className={navIconClass(isTipActive)} />
              <span className="block">
                <span className="block">Pošli tip</span>
                <span className="block">na reality</span>
              </span>
            </Link>

            <Link href="/nabidka" className={`${navItemClass(isNabidkaActive)} max-[1140px]:hidden`}>
              <ListChecks className={navIconClass(isNabidkaActive)} />
              <span className="block">
                <span className="block">Aktuální</span>
                <span className="block">nabídka</span>
              </span>
            </Link>

            <Link
              href="/co-vse-pro-vas-udelame"
              className={`${navItemClass(isSluzbyActive)} max-[1220px]:hidden`}
            >
              <Layers className={navIconClass(isSluzbyActive)} />
              <span className="block">
                <span className="block">Co vše</span>
                <span className="block">pro vás</span>
              </span>
            </Link>

            <Link href="/nas-tym" className={`${navItemClass(isTymActive)} max-[1300px]:hidden`}>
              <Handshake className={navIconClass(isTymActive)} />
              <span className="block">
                <span className="block">Náš</span>
                <span className="block">tým</span>
              </span>
            </Link>

            <Link href="/kontakt" className={`${navItemClass(isKontaktActive)} max-[1400px]:hidden`}>
              <MapPin className={navIconClass(isKontaktActive)} />
              <span className="block">
                <span className="block">Kontakt</span>
              </span>
            </Link>

            <Link href="/reference" className={`${navItemClass(isReferenceActive)} max-[1500px]:hidden`}>
              <Star className={navIconClass(isReferenceActive)} />
              <span className="block">
                <span className="block">Reference</span>
              </span>
            </Link>

            <div className={`${navItemClass(isMoreActive)} relative hidden max-[1500px]:flex`}>
              <button
                type="button"
                className="flex h-full w-full items-center justify-center gap-2 px-2 text-left"
                aria-haspopup="menu"
              >
                <MoreHorizontal className={navIconClass(isMoreActive)} />
                <span className="inline-flex items-center gap-1 leading-none">
                  Více
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition ${
                      isMoreActive ? "text-[color:var(--gold2)]" : "text-black/55 group-hover:text-[color:var(--gold2)]"
                    }`}
                  />
                </span>
              </button>

              <div className="absolute right-0 top-full z-50 translate-y-1 pt-2 opacity-0 pointer-events-none transition group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto">
                <div className="absolute right-8 top-1 h-3 w-3 rotate-45 border-l border-t border-black/10 bg-white/90 backdrop-blur-xl" />
                <div className={`w-72 ${panel}`}>
                  <Link
                    className={dropdownItemClass(isTipActive, "hidden max-[1060px]:flex")}
                    href="/tipni-realitu"
                  >
                    <Gift className="h-4 w-4 text-[color:var(--gold2)]" />
                    Pošli tip na reality
                  </Link>
                  <Link
                    className={dropdownItemClass(isNabidkaActive, "hidden max-[1140px]:flex")}
                    href="/nabidka"
                  >
                    <ListChecks className="h-4 w-4 text-[color:var(--gold2)]" />
                    Aktuální nabídka
                  </Link>
                  <Link
                    className={dropdownItemClass(isSluzbyActive, "hidden max-[1220px]:flex")}
                    href="/co-vse-pro-vas-udelame"
                  >
                    <Layers className="h-4 w-4 text-[color:var(--gold2)]" />
                    Co vše pro vás uděláme
                  </Link>
                  <Link
                    className={dropdownItemClass(isTymActive, "hidden max-[1300px]:flex")}
                    href="/nas-tym"
                  >
                    <Handshake className="h-4 w-4 text-[color:var(--gold2)]" />
                    Náš tým
                  </Link>
                  <Link
                    className={dropdownItemClass(isKontaktActive, "hidden max-[1400px]:flex")}
                    href="/kontakt"
                  >
                    <MapPin className="h-4 w-4 text-[color:var(--gold2)]" />
                    Kontakt
                  </Link>
                  <Link
                    className={dropdownItemClass(isReferenceActive, "hidden max-[1500px]:flex")}
                    href="/reference"
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
              <MobileItem href="/" title="Úvod" active={isHomeActive} icon={<Home className={mobileIconClass(isHomeActive)} />} onClick={() => setMobileOpen(false)} />
              <MobileItem href="/prodej-pronajem" title="Prodej a pronájem nemovitosti" active={isProdejActive} icon={<KeyRound className={mobileIconClass(isProdejActive)} />} onClick={() => setMobileOpen(false)} />
              <MobileItem href="/oceneni-zdarma" title="Ocenění nemovitosti zdarma" active={isOceneniActive} icon={<HandCoins className={mobileIconClass(isOceneniActive)} />} onClick={() => setMobileOpen(false)} />
              <MobileItem href="/vyhledavani-na-miru" title="Vyhledávání nemovitosti na míru" active={isVyhledavaniActive} icon={<Search className={mobileIconClass(isVyhledavaniActive)} />} onClick={() => setMobileOpen(false)} />
              <MobileItem href="/tipni-realitu" title="Pošli tip na reality" active={isTipActive} icon={<Gift className={mobileIconClass(isTipActive)} />} onClick={() => setMobileOpen(false)} />
              <MobileItem href="/nabidka" title="Aktuální nabídka" active={isNabidkaActive} icon={<ListChecks className={mobileIconClass(isNabidkaActive)} />} onClick={() => setMobileOpen(false)} />
              <MobileItem href="/co-vse-pro-vas-udelame" title="Co vše pro vás uděláme" active={isSluzbyActive} icon={<Layers className={mobileIconClass(isSluzbyActive)} />} onClick={() => setMobileOpen(false)} />
              <MobileItem href="/nas-tym" title="Náš tým" active={isTymActive} icon={<Handshake className={mobileIconClass(isTymActive)} />} onClick={() => setMobileOpen(false)} />
              <MobileItem href="/kontakt" title="Kontakt" active={isKontaktActive} icon={<MapPin className={mobileIconClass(isKontaktActive)} />} onClick={() => setMobileOpen(false)} />
              <MobileItem href="/reference" title="Reference" active={isReferenceActive} icon={<Star className={mobileIconClass(isReferenceActive)} />} onClick={() => setMobileOpen(false)} />
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
  active = false,
  external = false,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  active?: boolean;
  external?: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={onClick}
      className={`mb-2 flex items-center gap-3 rounded-2xl border border-black/10 px-4 py-3 transition ${
        active ? "bg-[color:var(--gold1)]/20 text-black" : "bg-white/70 text-black/80 hover:bg-white/85"
      }`}
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-black/5">
        {icon}
      </span>
      <span className="block font-semibold leading-tight">{title}</span>
    </Link>
  );
}

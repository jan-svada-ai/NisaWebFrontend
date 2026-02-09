import Image from "next/image";
import Link from "next/link";
import StatsSection from "@/components/StatsSection";

function Icon({
  name,
  className = "h-5 w-5",
}: {
  name:
    | "shield"
    | "camera"
    | "handshake"
    | "map"
    | "key"
    | "keyRound"
    | "search"
    | "handCoins"
    | "phone"
    | "mail"
    | "globe"
    | "eye"
    | "gift"
    | "arrowRight"
    | "question"
    | "user"
    | "layers"
    | "briefcase";
  className?: string;
}) {
  const common = {
    className,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 2l8 4v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4z" />
          <path d="M9 12l2 2 4-5" />
        </svg>
      );
    case "camera":
      return (
        <svg {...common}>
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l2-3h8l2 3h3a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      );
    case "handshake":
      return (
        <svg {...common}>
          <path d="M11 5h2" />
          <path d="M7 8l3-3 4 4" />
          <path d="M17 8l-3-3-4 4" />
          <path d="M7 8l-4 4 5 5c1 1 2.6 1 3.6 0L12 16" />
          <path d="M17 8l4 4-5 5c-1 1-2.6 1-3.6 0L12 16" />
        </svg>
      );
    case "map":
      return (
        <svg {...common}>
          <path d="M9 20l-5 2V6l5-2 6 2 5-2v16l-5 2-6-2z" />
          <path d="M9 4v16" />
          <path d="M15 6v16" />
        </svg>
      );
    case "key":
      return (
        <svg {...common}>
          <path d="M21 2l-2 2" />
          <path d="M7 14a4 4 0 1 1 3-6.7L21 2l1 1-5.3 11A4 4 0 0 1 7 14z" />
          <path d="M11 10l2 2" />
        </svg>
      );
    case "keyRound":
      return (
        <svg {...common}>
          <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
          <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      );
    case "handCoins":
      return (
        <svg {...common}>
          <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
          <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
          <path d="m2 16 6 6" />
          <circle cx="16" cy="9" r="2.9" />
          <circle cx="6" cy="5" r="3" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.9 19.9 0 0 1-8.7-3.1 19.5 19.5 0 0 1-6-6A19.9 19.9 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.8.3 1.6.6 2.4a2 2 0 0 1-.5 2.1L8 9.4a16 16 0 0 0 6.6 6.6l1.2-1.1a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.4.6a2 2 0 0 1 1.7 1.9z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <path d="M4 4h16v16H4z" />
          <path d="M22 6l-10 7L2 6" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15 15 0 0 1 0 20" />
          <path d="M12 2a15 15 0 0 0 0 20" />
        </svg>
      );
    case "eye":
      return (
        <svg {...common}>
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "gift":
      return (
        <svg {...common}>
          <path d="M20 12v10H4V12" />
          <path d="M22 7H2v5h20V7z" />
          <path d="M12 22V7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
      );
    case "arrowRight":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );
    case "question":
      return (
        <svg {...common}>
          <path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <circle cx="12" cy="17" r=".5" fill="currentColor" />
        </svg>
      );
    case "user":
      return (
        <svg {...common}>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <polygon points="12 2 2 7 2 17 12 22 22 17 22 7 12 2" />
          <polyline points="2 7 12 12 22 7" />
          <polyline points="2 17 12 12 22 17" />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M3 12h18" />
        </svg>
      );
  }
}


function Section({
  id,
  title,
  subtitle,
  children,
  align = "left",
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  align?: "left" | "center";
}) {
  const isCenter = align === "center";

  return (
    <section id={id} className="scroll-mt-28">
      <div className="mx-auto max-w-screen-xl px-4 py-20">
        <p
          className={[
            "text-sm uppercase tracking-[0.2em] text-black/50",
            isCenter ? "text-center" : "",
          ].join(" ")}
        >
          NISA CENTRUM REALITY
        </p>

        <h2
          className={[
            "mt-3 font-semibold text-black",
            isCenter
              ? "text-balance text-5xl md:text-6xl tracking-tight text-center"
              : "text-4xl md:text-5xl",
          ].join(" ")}
        >
          <span
            className={
              isCenter
                ? "inline-flex flex-col items-center"
                : "inline-flex flex-col items-start"
            }
          >
            <span>{title}</span>
            <span className="mt-3 h-[6px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
          </span>
        </h2>

        {subtitle ? (
          <p
            className={[
              "mt-3 text-black/70",
              isCenter
                ? "mx-auto max-w-3xl text-center md:text-lg"
                : "max-w-3xl",
            ].join(" ")}
          >
            {subtitle}
          </p>
        ) : null}

        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative min-h-dvh">
        <video
          className="absolute inset-0 h-full w-full object-cover brightness-[1.25] contrast-[1.05] saturate-[1.1]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-poster.jpg"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-black/12 to-black/35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.56)_40%,rgba(0,0,0,0.26)_72%,rgba(0,0,0,0.1)_100%)]" />

        <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center pt-28">
          <div className="w-full max-w-6xl px-6 text-center md:px-12 lg:px-16">
            <p className="mb-4 text-base uppercase tracking-[0.2em] text-white/85">
              Liberecký, Ústecký, Královéhradecký, Středočeský kraj, Praha a
              okolí
            </p>

            <h1 className="mx-auto max-w-5xl text-5xl font-semibold leading-tight text-white md:text-7xl [text-shadow:0_2px_32px_rgba(0,0,0,0.65)]">
              <span className="inline-flex flex-col items-center">
                <span>Prodej a pronájem bez stresu.</span>
                <span className="mt-3 h-[6px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
              </span>
              <span className="mt-4 block text-[0.7em] text-[color:var(--gold1)] [text-shadow:0_2px_30px_rgba(0,0,0,0.8)]">
                S důrazem na cenu, rychlost a jistotu.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-lg font-medium leading-relaxed text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.75)]">
              Ocenění, profesionální prezentace a cílená propagace. Bezpečný
              průběh zajišťujeme ve spolupráci s advokátní kanceláří.
            </p>

            <div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-6">
              <Link
                href="https://leady.valuo.cz/kalkulace/5dfdb68a089d608a996823b2bc0f53d9"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-main inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-7 py-4 text-base font-semibold text-black lg:col-span-2"
              >
                <Icon name="handCoins" className="h-5 w-5" />
                Ocenění nemovitosti
              </Link>
              <Link
                href="/#proc-maklere"
                className="btn-main inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur-sm lg:col-span-2"
              >
                <Icon name="user" className="h-5 w-5" />
                Proč mít svého makléře
              </Link>
              <Link
                href="/#o-nas"
                className="btn-main inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-7 py-4 text-base font-semibold text-black lg:col-span-2"
              >
                <Icon name="user" className="h-5 w-5" />O nás
              </Link>
              <Link
                href="/#sluzby"
                className="btn-main inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur-sm lg:col-span-3"
              >
                <Icon name="briefcase" className="h-5 w-5" />
                Služby
              </Link>
              <Link
                href="/#faq"
                className="btn-main inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-7 py-4 text-base font-semibold text-black lg:col-span-3"
              >
                <Icon name="question" className="h-5 w-5" />
                Časté dotazy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTIKY */}
      <StatsSection
        stats={[
          {
            value: 200,
            label: "Prodaných nemovitostí",
            suffix: "+",
            icon: "home",
          },
          {
            value: 400,
            label: "Pronajatých nemovitostí",
            suffix: "+",
            icon: "building",
          },
          { value: 15, label: "Let v oboru", suffix: "+", icon: "clock" },
          {
            value: 300,
            label: "Uskutečněných obchodů",
            suffix: "+",
            icon: "star",
          },
        ]}
      />

      {/* O NÁS */}
      <div className="border-t border-black/10" />
      <Section id="o-nas" align="center" title="O nás">
        <div className="mx-auto max-w-5xl">
          {/* Text */}
          <div className="mb-12 space-y-6 text-center text-black/70">
            <p className="text-lg leading-relaxed">
              Jsme rodinná realitní kancelář, která staví na spolupráci, důvěře
              a osobním přístupu. Nemovitosti nevnímáme jen jako obchod, ale
              jako důležitý životní krok, ke kterému přistupujeme s respektem a
              maximální péčí.
            </p>

            <p className="text-lg leading-relaxed">
              Vaši nemovitost prodáme za nejvyšší možnou cenu díky kombinaci
              odborného know-how a individuálního přístupu ke každému klientovi.
              Využíváme osvědčené a efektivní nástroje, jako je profesionální
              home staging, kvalitní fotografie, videoprohlídky a cílená
              propagace na sociálních sítích. Vždy ale dbáme na to, aby celý
              proces probíhal srozumitelně, férově a v partnerské rovině.
            </p>

            <p className="text-lg leading-relaxed">
              Samozřejmostí v rámci našeho servisu jsou kompletní advokátní
              služby, vyhotovení průkazu energetické náročnosti budovy (PENB) i
              zajištění přepisu energií. S námi se nemusíte o nic starat – celým
              procesem Vás provedeme krok za krokem, s klidem, jistotou a
              lidským přístupem.
            </p>
          </div>

          {/* Karty */}
          <div className="mb-12">
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div className="rounded-3xl border border-black/10 bg-white/70 p-7 shadow-sm text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex justify-center mb-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F6E3B1] text-black ring-1 ring-black/10">
                    <Icon name="camera" />
                  </div>
                </div>
                <p className="text-lg font-semibold text-black">
                  Foto • Video • Home staging
                </p>
                <p className="mt-2 text-sm text-black/70">
                  Profesionální prezentace vaší nemovitosti
                </p>
              </div>

              <div className="rounded-3xl border border-black/10 bg-white/70 p-7 shadow-sm text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex justify-center mb-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F6E3B1] text-black ring-1 ring-black/10">
                    <Icon name="shield" />
                  </div>
                </div>
                <p className="text-lg font-semibold text-black">
                  Právní zajištění
                </p>
                <p className="mt-2 text-sm text-black/70">
                  Spolupráce s ověřenými právními experty
                </p>
              </div>

              <div className="rounded-3xl border border-black/10 bg-white/70 p-7 shadow-sm text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex justify-center mb-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F6E3B1] text-black ring-1 ring-black/10">
                    <Icon name="map" />
                  </div>
                </div>
                <p className="text-lg font-semibold text-black">
                  Liberecký, Ústecký, Královéhradecký, Středočeský kraj, Praha a
                  okolí
                </p>
                <p className="mt-2 text-sm text-black/70">
                  Hluboká znalost místního trhu
                </p>
              </div>
            </div>
          </div>

          {/* Fotka */}
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-black/10 shadow-xl">
            <Image
              src="/Onas.jpeg"
              alt="O nás"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        </div>
      </Section>
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="h-px w-full bg-[color:var(--gold1)]/45" />
      </div>

      {/* PROČ MÍT SVÉHO REALITNÍHO MAKLÉŘE */}
      <div className="border-t border-black/10" />
      <Section
        id="proc-maklere"
        align="center"
        title="Proč mít svého realitního makléře"
        subtitle="Nejde jen o inzerát. Jde o správnou cenu, strategii, vyjednávání a bezpečný proces – s minimem starostí pro vás."
      >
        {/* Wrapper - fotka jako "pozadí" vlevo, obsah uprostřed */}
        <div className="relative">
          {/* FOTKA VENDY - mimo hlavní obsah, vlevo */}
          <div className="pointer-events-none absolute left-0 top-10 hidden -translate-x-[85%] lg:block z-0">
            <Image
              src="/fotoVendy.png"
              alt="Tým NISA CENTRUM REALITY"
              width={420}
              height={630}
              className="h-auto w-[300px] rounded-2xl object-cover scale-x-[-1]"
              priority
            />
          </div>

          {/* CONTENT - KARTIČKY - uprostřed */}
          <div className="relative z-10 mx-auto flex max-w-[90%] flex-col items-start gap-6 px-4">
            {(() => {
              const items = [
                {
                  icon: "handCoins" as const,
                  title: "Správné nacenění a strategie",
                  text: 'Cenu nenastavujeme "od stolu". Vycházíme z prohlídky, dat a reálné poptávky v lokalitě.',
                  detail:
                    "Analyzujeme trh, konkurenci a specifika nemovitosti. Nastavíme cenu, která přitáhne zájemce a přitom maximalizuje výnos. Žádné odhady od stolu – jen reálná data.",
                },
                {
                  icon: "camera" as const,
                  title: "Prezentace, která prodává",
                  text: "Home staging, fotografie, video, texty a cílení – aby se nemovitost ukázala ve správném světle.",
                  detail:
                    "Profesionální úprava prostoru, kvalitní vizuály a texty, které upoutají. Vytvoříme prezentaci, která zazaujme a zvýší šanci na rychlý prodej za nejvyšší cenu.",
                },
                {
                  icon: "map" as const,
                  title: "Lokální znalost a síť kontaktů",
                  text: "Liberec a okolí dobře známe. Víme, co se prodává, za kolik a komu.",
                  detail:
                    "Dlouholeté zkušenosti v regionu nám dávají přehled o poptávce, cenách i specifických požadavcích kupců. Naše síť kontaktů urychlí prodej.",
                },
                {
                  icon: "shield" as const,
                  title: "Bezpečné smlouvy a úschova",
                  text: "Smlouvy řeší advokáti/kanceláři. Hlídáme termíny, návaznosti i administrativu.",
                  detail:
                    "Spolupracujeme s ověřenými advokáty a notáři. Zálohy jdou do úschovy, smlouvy kontrolujeme právně. Celý proces je bezpečný a transparentní.",
                },
                {
                  icon: "eye" as const,
                  title: "Prohlídky a komunikace bez chaosu",
                  text: "Organizuji prohlídky, odpovídám zájemcům a vyjednávám — vy máte klid.",
                  detail:
                    "Plánujeme prohlídky, prověřujeme zájemce, odpovídáme na dotazy a vyjednáváme podmínky. Vy se můžete věnovat svému životu – o vše se postaráme.",
                },
                {
                  icon: "search" as const,
                  title: "Umím i najít nemovitost na míru",
                  text: "Hledám podle vašich požadavků a pomáhám prověřit vhodnost nabídky.",
                  detail:
                    "Aktivně vyhledáváme nemovitosti odpovídající vašim kritériím. Využíváme naši databázi i neveřejné nabídky. Šetříme váš čas a pomáháme najít ten pravý domov.",
                },
              ];

              const leftCol = items.filter((_, idx) => idx % 2 === 0);
              const rightCol = items.filter((_, idx) => idx % 2 === 1);

              const renderItem = (item: (typeof items)[number]) => (
                <details
                  key={item.title}
                  className="group rounded-2xl border border-black/10 bg-white/90 shadow-sm transition-all hover:shadow-md open:bg-white"
                >
                  <summary className="flex cursor-pointer items-center gap-3 p-4 list-none">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#F6E3B1] text-black ring-1 ring-black/10">
                      <Icon name={item.icon} className="h-5 w-5 text-black" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-black">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-black/70">
                        {item.text}
                      </p>
                    </div>
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-300 text-black/70 transition-transform group-open:rotate-45">
                      +
                    </div>
                  </summary>
                  <div className="px-4 pb-4 pl-[4.5rem]">
                    <p className="border-l-2 border-[color:var(--gold1)]/30 pl-4 text-sm leading-relaxed text-black/60">
                      {item.detail}
                    </p>
                  </div>
                </details>
              );

              return (
                <div className="grid gap-3 sm:grid-cols-2 sm:items-start">
                  <div className="flex flex-col gap-3">{leftCol.map(renderItem)}</div>
                  <div className="flex flex-col gap-3">{rightCol.map(renderItem)}</div>
                </div>
              );
            })()}

            {/* CALLOUT CTA */}
            <div className="mt-6 w-full">
              <div className="mx-auto w-full max-w-4xl rounded-3xl border border-black/10 bg-white/90 p-5 text-center shadow-sm">
                <p className="text-base font-semibold text-black">
                  Neváhejte nás ještě dnes kontaktovat
                </p>
                <p className="mt-1 text-sm leading-relaxed text-black/70">
                  Rádi s Vámi proberueme Vaši situaci, doporučíme nejlepší
                  postup a vše srozumitelně dovysvětlíme.
                </p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2 sm:justify-items-center">
                  <a
                    href="tel:+420702064442"
                    className="btn-main inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-6 py-3 text-sm font-semibold text-black"
                  >
                    <Icon name="phone" className="h-4 w-4" />
                    Zavolejte nám
                  </a>
                  <a
                    href="mailto:info@nisacentrum.cz"
                    className="btn-main inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
                  >
                    <Icon name="mail" className="h-4 w-4" />
                    Napište nám e-mail
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* SLUŽBY */}
      <div className="border-t border-black/10" />
      <Section
        id="sluzby"
        align="center"
        title="Služby"
        subtitle="Vyberte, co aktuálně řešíte. Rádi vám doporučíme nejrychlejší a nejbezpečnější postup."
      >
        <div className="relative">
          <div className="pointer-events-none absolute right-0 -top-10 z-0 hidden translate-x-[88%] lg:block">
            <Image
              src="/Terka.png"
              alt="Tým NISA CENTRUM REALITY"
              width={540}
              height={760}
              className="h-auto w-[440px] rounded-2xl object-cover"
            />
          </div>

          <div className="relative z-10 mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
          {[
            {
              icon: "keyRound" as const,
              t: "Prodej a pronájem nemovitosti",
              d: "Kompletní servis od ocenění až po předání klíčů: home staging, foto/video, inzerce, propagace, prohlídky, vyjednávání a právní dohled.",
              cta: ["Domluvit schůzku", "/kontakt"],
              detail: "/prodej-pronajem",
            },
            {
              icon: "handCoins" as const,
              t: "Ocenění nemovitosti zdarma",
              d: "Bezplatné a nezávazné ocenění založené na prohlídce, znalosti trhu a srovnatelných prodejích v okolí.",
              cta: [
                "Získat ocenění",
                "https://leady.valuo.cz/kalkulace/5dfdb68a089d608a996823b2bc0f53d9",
              ],
              detail:
                "https://leady.valuo.cz/kalkulace/5dfdb68a089d608a996823b2bc0f53d9",
            },
            {
              icon: "search" as const,
              t: "Vyhledávání nemovitosti na míru",
              d: "Hledáme podle vašich požadavků, sledujeme nabídky, spolupracujeme s makléři a prověřujeme i nevystavené nemovitosti.",
              cta: ["Domluvit schůzku", "/kontakt"],
              detail: "/vyhledavani-na-miru",
            },
            {
              icon: "gift" as const,
              t: "Pošli tip na reality",
              d: "Máte tip na nemovitost k prodeji nebo pronájmu? Pošlete kontakt a získejte odměnu, pokud se obchod uskuteční.",
              cta: ["Poslat tip", "/kontakt"],
              detail: "/tipni-realitu",
            },
          ].map((x) => (
            <div
              key={x.t}
              className="rounded-3xl border border-black/10 bg-white/70 p-7 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F6E3B1] text-black ring-1 ring-black/10">
                  <Icon name={x.icon} />
                </span>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-black">{x.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-black/70">
                    {x.d}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {x.cta[1].startsWith("http") ? (
                      <a
                        href={x.cta[1]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-main inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white"
                      >
                        <Icon name={x.icon} className="h-4 w-4" />
                        {x.cta[0]}
                      </a>
                    ) : (
                      <Link
                        href={x.cta[1]}
                        className="btn-main inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white"
                      >
                        <Icon name={x.icon} className="h-4 w-4" />
                        {x.cta[0]}
                      </Link>
                    )}
                    {x.detail.startsWith("http") ? (
                      <a
                        href={x.detail}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-main inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-6 py-3 text-sm font-semibold text-black"
                      >
                        <Icon name="arrowRight" className="h-4 w-4" />
                        Detail
                      </a>
                    ) : (
                      <Link
                        href={x.detail}
                        className="btn-main inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-6 py-3 text-sm font-semibold text-black"
                      >
                        <Icon name="arrowRight" className="h-4 w-4" />
                        Detail
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <div className="border-t border-black/10" />
      <Section
        id="faq"
        align="center"
        title="Časté dotazy"
        subtitle="Nejčastější otázky k prodeji, pronájmu, provizím, smlouvám a bezpečnosti převodu."
      >
        <div className="grid gap-3">
          {[
            {
              q: "Jaké služby nabízíte a co vše je jejich součástí?",
              a: "Zajišťujeme ocenění nemovitosti (zdarma a nezávazně), kompletní prodej i pronájem. Součástí je příprava prezentace (home staging, foto/video), inzerce, cílená propagace, prohlídky, komunikace se zájemci a dohled nad celým procesem.",
            },
            {
              q: "Kolik stojí vaše služby a kdy se hradí provize?",
              a: "U prodeje se provize typicky pohybuje v rozmezí 3–5 % dle typu nemovitosti a rozsahu služeb (vždy je jasně sjednaná předem ve smlouvě). U pronájmu je služba pro majitele zpravidla bez přímé platby – hradí ji budoucí nájemník.",
            },
            {
              q: "Vyhledáváte nemovitosti i na míru podle požadavků klienta?",
              a: "Ano. Aktivně hledáme podle vašich parametrů, sledujeme aktuální nabídky, spolupracujeme s dalšími makléři a pomáháme prověřit vhodnost vybraných nemovitostí.",
            },
            {
              q: "Jak probíhá prodej nebo pronájem nemovitosti krok za krokem?",
              a: "Začneme osobní schůzkou a prohlídkou nemovitosti. Navrhneme cenu a strategii, připravíme prezentaci a propagaci. Následně řešíme komunikaci, prohlídky a vyjednávání. U prodeje následují rezervační a kupní smlouvy (přes advokátní servis) a převod na katastru. U pronájmu prověřujeme zájemce, připravují se smlouvy a proběhne předání.",
            },
            {
              q: "Kolik stojí ocenění nemovitosti a je možné jej získat zdarma?",
              a: "Ocenění je zdarma a nezávazné. Pomůže vám mít reálný přehled o hodnotě nemovitosti – pro budoucí prodej, pronájem i pro majetková/dědická řešení.",
            },
            {
              q: "V jakých lokalitách působíte?",
              a: "Působíme v Libereckém, Ústeckém, Královéhradeckém a Středočeském kraji, v Praze a okolí. Díky rozsáhlé síti spolupracujících makléřů a hluboké znalosti regionu dokážeme efektivně zajistit prodej, pronájem i vyhledání nemovitostí napříč těmito lokalitami.",
            },
            {
              q: "Jak vás mohu kontaktovat a je možné se nejprve nezávazně poradit?",
              a: "Ano, nezávazná konzultace je možná. Zavolejte, napište SMS nebo e-mail – zvolíme způsob, který vám vyhovuje.",
            },
            {
              q: "Jak určíte správnou cenu mé nemovitosti?",
              a: "Cenu neurčujeme od stolu. Podíváme se na nemovitost osobně, zohledníme stav, lokalitu a srovnatelné prodeje. Odhad vždy vysvětlíme a nastavíme společně realistický plán.",
            },
          ].map((x) => (
            <details
              key={x.q}
              className="group rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm open:bg-white/80"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-black">
                <span>{x.q}</span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-black/70 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-black/70">
                {x.a}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/kontakt"
            className="btn-main inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-7 py-3.5 text-base font-semibold text-black"
          >
            <Icon name="mail" className="h-4 w-4" />
            Poslat jiný dotaz
          </Link>
        </div>
      </Section>

      {/* KONTAKT */}
      <div className="border-t border-black/10" />
      <Section
        id="kontakt"
        align="center"
        title="Kontakt"
        subtitle="Ozvěte se nám – rádi s vámi probereme prodej, pronájem, ocenění i vyhledání nemovitosti."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 rounded-3xl border border-black/10 bg-white/70 p-7 shadow-sm">
            <p className="text-lg font-medium tracking-tight text-black">
              NISA CENTRUM REALITY
            </p>
            <p className="mt-1 text-sm text-black/65">
              Realitní kancelář • Liberecký, Ústecký, Královéhradecký,
              Středočeský kraj, Praha a okolí
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <a
                href="tel:+420702064442"
                className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white/80 p-4 transition hover:border-[color:var(--gold1)]"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--gold1)]/35 text-black">
                  <Icon name="phone" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-black/50">
                    Telefon
                  </p>
                  <p className="font-semibold text-black">+420 702 064 442</p>
                </div>
              </a>

              <a
                href="mailto:info@nisacentrum.cz"
                className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white/80 p-4 transition hover:border-[color:var(--gold1)]"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--gold1)]/35 text-black">
                  <Icon name="mail" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-black/50">
                    E-mail
                  </p>
                  <p className="font-semibold text-black">
                    info@nisacentrum.cz
                  </p>
                </div>
              </a>

              <a
                href="https://www.nisacentrum.cz"
                className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white/80 p-4 transition hover:border-[color:var(--gold1)]"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--gold1)]/35 text-black">
                  <Icon name="globe" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-black/50">
                    Web
                  </p>
                  <p className="font-semibold text-black">www.nisacentrum.cz</p>
                </div>
              </a>

              <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white/80 p-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--gold1)]/35 text-black">
                  <Icon name="shield" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-black/50">
                    IČO / Datová schránka
                  </p>
                  <p className="font-semibold text-black">27273385 • yqkqb7n</p>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="tel:+420702064442"
                className="btn-main inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-6 py-3 text-sm font-semibold text-black"
              >
                <Icon name="phone" className="h-4 w-4" />
                Zavolat
              </a>
              <a
                href="mailto:info@nisacentrum.cz"
                className="btn-main inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-white/60 px-6 py-3 text-sm font-semibold text-black"
              >
                <Icon name="mail" className="h-4 w-4" />
                Napsat e-mail
              </a>
              <a
                href="https://leady.valuo.cz/kalkulace/5dfdb68a089d608a996823b2bc0f53d9"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-main inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
              >
                <Icon name="handCoins" className="h-4 w-4" />
                Ocenění zdarma
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white/70 p-7 shadow-sm">
            <p className="text-sm font-semibold text-black">
              Nejrychlejší postup
            </p>
            <p className="mt-2 text-sm text-black/70">
              Napište nám lokalitu, typ nemovitosti a časovou představu. Ozveme
              se a domluvíme další krok.
            </p>

            <div className="mt-5 grid gap-3">
              {[
                ["Prodej", "Strategie, marketing, prohlídky, smlouvy."],
                ["Pronájem", "Prověření zájemců a bezpečný proces."],
                ["Vyhledání", "Najdeme vhodné nabídky a ušetříme vám čas."],
              ].map(([t, d]) => (
                <div
                  key={t}
                  className="rounded-2xl border border-black/10 bg-white/80 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-black/50">
                    {t}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-black">{d}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Link
                href="/kontakt"
                className="btn-main inline-flex items-center justify-center rounded-full border border-black/15 bg-white/60 px-6 py-3 text-sm font-semibold text-black"
              >
                Kontaktní stránka →
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}




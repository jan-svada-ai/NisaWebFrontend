import type { Metadata } from "next";
import {
  ArrowRight,
  BriefcaseBusiness,
  Coins,
  HandCoins,
  Hourglass,
  MapPinHouse,
  Projector,
  Scale,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { SITE_URL } from "@/lib/site-url";
import CemapCalculator from "./CemapCalculator";
import OceneniLeadForm from "./OceneniLeadForm";
import StepCarousel, { type StepCard } from "./StepCarousel";

const faqItems = [
  {
    question: "Je online ocenění nemovitosti zdarma opravdu bez závazků?",
    answer:
      "Ano. Online výpočet ani následná konzultace vás nic nestojí. Výsledek můžete využít jako podklad pro další rozhodnutí o prodeji nebo pronájmu.",
  },
  {
    question: "Jak přesný je online odhad ceny nemovitosti?",
    answer:
      "Výstup je datový tržní odhad založený na lokalitě, parametrech a historických transakcích. Pro finální prodejní strategii vždy doporučujeme doplnit osobní konzultaci makléře.",
  },
  {
    question: "Pro jaké nemovitosti umí kalkulace spočítat odhad?",
    answer:
      "Nejčastěji byty, domy a pozemky. U atypických nemovitostí je vždy lepší přímá konzultace s makléřem, protože zohlední konkrétní stav, lokalitu i obchodní strategii.",
  },
  {
    question: "Je možné získat odhad i pro pronájem?",
    answer:
      "Ano, kalkulace umí i orientační odhad pro pronájem. Pro dosažení lepší ceny ale doporučujeme využít realitní kancelář, která pomůže nastavit správnou strategii i prezentaci nabídky.",
  },
];

const valuationSteps: StepCard[] = [
  {
    id: "oceneni-parametry",
    number: 1,
    title: "Vyplnění parametrů",
    description:
      "Vyplníte adresu a základní údaje o nemovitosti potřebné pro orientační odhad ceny.",
    duration: "1-2 minuty",
    icon: "textWrap",
    href: "#online-kalkulacka",
    ctaLabel: "Vyplnit parametry",
  },
  {
    id: "oceneni-vypocet",
    number: 2,
    title: "Proběhne výpočet",
    description:
      "Po odeslání údajů proběhne automatický výpočet ceny na základě dat z trhu.",
    duration: "pár sekund",
    icon: "calculator",
    href: "#online-kalkulacka",
    ctaLabel: "Spočítat odhad",
  },
  {
    id: "oceneni-orientacni-cena",
    number: 3,
    title: "Máte orientační cenu",
    description:
      "Po výpočtu získáte orientační cenu, která slouží jako první přehled o hodnotě nemovitosti.",
    duration: "ihned",
    icon: "coins",
    href: "#online-kalkulacka",
    ctaLabel: "Zobrazit odhad",
  },
  {
    id: "oceneni-kontakt-maklere",
    number: 4,
    title: "Kontaktujete naše makléře",
    description:
      "Navážete kontakt s naším týmem a předáte detailnější informace o nemovitosti a cíli ocenění.",
    duration: "dle dostupnosti",
    icon: "users",
    href: "#formular",
    ctaLabel: "Kontaktovat makléře",
  },
  {
    id: "oceneni-domluva-schuzky",
    number: 5,
    title: "Dohodnete si schůzku",
    description:
      "Domluvíte si termín osobní konzultace a prohlídky, kde makléř posoudí reálný stav nemovitosti.",
    duration: "1-3 dny",
    icon: "coffee",
    href: "#formular",
    ctaLabel: "Domluvit schůzku",
  },
  {
    id: "oceneni-presny-odhad",
    number: 6,
    title: "Proběhne přesný odhad",
    description:
      "Po osobním posouzení dostanete přesné ocenění a doporučení pro další postup prodeje nebo pronájmu.",
    duration: "dle domluvy",
    icon: "fileCheck",
    href: "#formular",
    ctaLabel: "Kontaktovat makléře",
  },
];

const onlineEstimatePoints = [
  {
    icon: Coins,
    text: "Odhad tržní ceny bytu, domu a pozemku během pár sekund.",
  },
  {
    icon: HandCoins,
    text: "Vhodné pro prodej, pronájem, dědictví i orientační nacenění.",
  },
  {
    icon: UserRound,
    text: "Následná konzultace makléře vám pomůže nastavit prodejní taktiku.",
  },
  {
    icon: ShieldCheck,
    text: "Bez závazků a bez nutnosti okamžité spolupráce.",
  },
];

export const metadata: Metadata = {
  title: "Ocenění nemovitosti zdarma | Online tržní odhad | Nisa Centrum Reality",
  description:
    "Ocenění nemovitosti zdarma online. Orientační odhad ceny bytu, domu nebo pozemku pro Liberec, Prahu a okolí. Pro přesné nacenění kontaktujte naše makléře.",
  alternates: {
    canonical: `${SITE_URL}/oceneni-zdarma`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/oceneni-zdarma`,
    title: "Ocenění nemovitosti zdarma | Online tržní odhad | Nisa Centrum Reality",
    description:
      "Ocenění nemovitosti zdarma online. Orientační odhad ceny bytu, domu nebo pozemku pro Liberec, Prahu a okolí. Pro přesné nacenění kontaktujte naše makléře.",
    images: [
      {
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ocenění nemovitosti zdarma | Online tržní odhad | Nisa Centrum Reality",
    description:
      "Ocenění nemovitosti zdarma online. Orientační odhad ceny bytu, domu nebo pozemku pro Liberec, Prahu a okolí. Pro přesné nacenění kontaktujte naše makléře.",
    images: ["/android-chrome-512x512.png"],
  },
};

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <h2 className="text-4xl font-semibold text-black md:text-5xl">
        <span className="inline-flex flex-col items-center">
          <span>{title}</span>
          <span className="mt-3 h-[6px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
        </span>
      </h2>
      <p className="mt-4 text-base leading-relaxed text-black/70 md:text-lg">{subtitle}</p>
    </div>
  );
}

export default function OceneniZdarmaPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, var(--paper0), var(--paper1) 45%, var(--paper2))",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="relative min-h-dvh">
        <video
          className="absolute inset-0 h-full w-full object-cover brightness-[1.08]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.avif"
        >
          <source src="/hero-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
          <source src="/hero.mp4" type="video/mp4" media="(min-width: 768px)" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-black/12 to-black/35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.56)_40%,rgba(0,0,0,0.26)_72%,rgba(0,0,0,0.1)_100%)]" />

        <div className="relative z-10 flex min-h-dvh flex-col items-center justify-start px-5 pb-8 pt-20 text-center sm:px-8 md:px-12 lg:px-16">
          <p className="mb-4 text-[0.9rem] uppercase tracking-[0.2em] text-white/85">
            Liberecký, Ústecký, Královéhradecký, Středočeský kraj, Praha a okolí
          </p>

          <h1 className="mx-auto max-w-5xl text-[2.8rem] font-semibold leading-tight text-white md:text-[4rem] [text-shadow:0_2px_32px_rgba(0,0,0,0.65)]">
            <span className="inline-flex flex-col items-center">
              <span>Ocenění nemovitosti zdarma</span>
              <span className="mt-3 h-[6px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
            </span>
            <span className="mt-3 block text-[0.63em] text-[color:var(--gold1)] [text-shadow:0_2px_30px_rgba(0,0,0,0.8)]">
              Online tržní odhad ceny.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-base font-medium leading-relaxed text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.75)]">
            Zadejte adresu a parametry nemovitosti. Odhad ceny bytu, domu nebo pozemku
            získáte během pár sekund.
          </p>

          <div className="mt-auto w-full pb-10">
            <div className="mx-auto mt-9 grid max-w-3xl gap-3 px-1 sm:grid-cols-2 sm:px-0">
              <a
                href="#online-kalkulacka"
                className="btn-main inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-5 py-2.5 text-base font-semibold text-black"
              >
                <HandCoins className="h-5 w-5" />
                Spočítat odhad hned online
              </a>
              <a
                href="#formular"
                className="btn-main inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-base font-semibold text-white backdrop-blur-sm"
              >
                <ArrowRight className="h-5 w-5" />
                Konzultace s makléřem
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="online-kalkulacka" className="border-t border-black/10 py-20 md:py-24">
        <div className="mx-auto w-full max-w-screen-xl px-4">
          <SectionHeading
            title="Online odhad ceny nemovitosti"
            subtitle="Výpočet slouží jako automatický orientační odhad. Pro přesné nacenění, strategii a finální prodejní cenu doporučujeme osobní konzultaci s naším makléřem."
          />

          <div className="mx-auto mt-10 max-w-5xl">
            <CemapCalculator />
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
            {onlineEstimatePoints.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.text}
                  className="rounded-2xl border border-black/10 bg-white/80 p-4 shadow-sm md:p-5"
                >
                  <div className="flex items-center gap-4 md:gap-5">
                    <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[color:var(--gold1)]/30 md:h-16 md:w-16">
                      <Icon className="h-7 w-7 text-[color:var(--gold2)] md:h-8 md:w-8" />
                    </span>
                    <p className="text-base leading-relaxed text-black/75 md:text-lg">
                      {item.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <OceneniLeadForm />

      <section className="border-t border-black/10 py-20 md:py-24 min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-screen-xl px-4">
          <SectionHeading
            title="Jak probíhá ocenění krok za krokem"
            subtitle="Stejný jasný postup pro prodej i pronájem, od prvního vyplnění až po osobní přesné ocenění s makléřem."
          />
          <p className="mx-auto mt-5 max-w-4xl text-center text-base leading-relaxed text-black/70">
            Nejprve získáte orientační cenu online. Poté navážeme osobní konzultací,
            kde nastavíme přesné nacenění podle reálného stavu nemovitosti a trhu.
          </p>
          <p className="mx-auto mt-3 max-w-4xl text-center text-base leading-relaxed text-black/70">
            Díky tomu máte rychlý datový základ i přesný expertní pohled pro
            prodej, pronájem nebo další strategické rozhodnutí.
          </p>
          <p className="mx-auto mt-3 max-w-4xl text-center text-base leading-relaxed text-black/70">
            Ať řešíte prodej bytu, domu, pozemku nebo nastavení nájemného, získáte
            nejdřív rychlý orientační odhad a pak navazující přesné ocenění.
            Působíme v lokalitách Liberec, Praha, Ústí nad Labem, Hradec Králové a okolí.
          </p>
          <StepCarousel steps={valuationSteps} />
          <p className="mt-8 inline-flex w-full items-center justify-center gap-2 text-center text-base font-medium text-black/70">
            <Hourglass className="h-4 w-4 text-[color:var(--gold2)]" />
            Celkový odhad: online výpočet během sekund, přesné ocenění po osobní schůzce.
          </p>
        </div>
      </section>

      <section className="border-t border-black/10 py-20 md:py-24">
        <div className="mx-auto w-full max-w-screen-xl px-4">
          <SectionHeading
            title="Co má největší vliv na cenu nemovitosti"
            subtitle="Nejde jen o m². Výslednou tržní cenu ovlivňuje kombinace lokality, stavu, dispozice, právního stavu a aktuální poptávky."
          />

          <div className="mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-2">
            {[
              {
                icon: MapPinHouse,
                title: "Lokalita a mikrolokalita",
                text: "Dopravní dostupnost, občanská vybavenost, okolní zástavba a poptávka v konkrétní části města.",
              },
              {
                icon: Scale,
                title: "Technický a právní stav",
                text: "Rekonstrukce, energetická náročnost, věcná břemena, zástavy a další faktory ovlivňující prodejnost.",
              },
              {
                icon: BriefcaseBusiness,
                title: "Typ obchodu",
                text: "Jinou strategii potřebuje rychlý prodej, jinou výnosový pronájem nebo příprava na dědické řízení.",
              },
              {
                icon: Projector,
                title: "Prezentace a načasování",
                text: "Kvalitní marketing, správné nacenění a vhodný čas uvedení na trh rozhodují o výsledné ceně i rychlosti obchodu. Přesně s tím vám pomůžeme, abyste dosáhli maximální možné ceny.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm"
              >
                <div className="grid grid-cols-[auto_1fr] items-start gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F6E3B1] text-black ring-1 ring-black/10">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-black">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-black/70">{item.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 py-20 md:py-24">
        <div className="mx-auto w-full max-w-screen-xl px-4">
          <SectionHeading
            title="Časté dotazy"
            subtitle="Nejčastější otázky k online odhadu ceny, přesnosti výpočtu a navazující spolupráci s makléřem."
          />

          <div className="mx-auto mt-10 grid max-w-5xl gap-3">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-black/10 bg-white/80 p-5 shadow-sm open:bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="text-left text-base font-semibold text-black">{item.question}</span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-black/70 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 border-l-2 border-[color:var(--gold1)]/35 pl-4 text-sm leading-relaxed text-black/70">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}





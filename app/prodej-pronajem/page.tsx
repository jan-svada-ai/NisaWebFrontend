import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Hourglass,
  KeyRound,
  Mail,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import StepCarousel from "./StepCarousel";

export const metadata: Metadata = {
  title: "Prodej a pronájem nemovitostí | Nisa Centrum Reality",
  description:
    "Postup prodeje a pronájmu krok za krokem: od konzultace přes prezentaci, inzerci a prohlídky až po smlouvy a bezpečné předání.",
};

type StepCard = {
  id: string;
  number: number;
  title: string;
  description: string;
  duration: string;
  icon:
    | "users"
    | "handCoins"
    | "camera"
    | "megaphone"
    | "home"
    | "fileSignature"
    | "checkCircle"
    | "searchCheck";
};

const saleSteps: StepCard[] = [
  {
    id: "prodej-konzultace",
    number: 1,
    title: "Konzultace",
    description: "Probereme cíle, stav nemovitosti a navrhneme realistický plán.",
    duration: "0,25-0,5 měsíce",
    icon: "users",
  },
  {
    id: "prodej-naceneni",
    number: 2,
    title: "Nacenění",
    description: "Na základě dat z trhu nastavíme cenu s potenciálem rychlého prodeje.",
    duration: "0,25 měsíce",
    icon: "handCoins",
  },
  {
    id: "prodej-prezentace",
    number: 3,
    title: "Foto a homestaging",
    description: "Připravíme prostor, foto i video tak, aby nabídka zaujala na první pohled.",
    duration: "0,25 měsíce",
    icon: "camera",
  },
  {
    id: "prodej-inzerce",
    number: 4,
    title: "Inzerce",
    description: "Spouštíme inzerci na klíčových portálech a cílenou propagaci.",
    duration: "0,25 měsíce",
    icon: "megaphone",
  },
  {
    id: "prodej-prohlidky",
    number: 5,
    title: "Prohlídky",
    description: "Organizujeme prohlídky, řešíme dotazy a vedeme vyjednávání.",
    duration: "0,25-1,5 měsíce",
    icon: "home",
  },
  {
    id: "prodej-smlouvy",
    number: 6,
    title: "Vytvoření a podepsání smluv",
    description: "Zajistíme smlouvy a bezpečný průběh transakce s právním servisem.",
    duration: "0,5 měsíce",
    icon: "fileSignature",
  },
  {
    id: "prodej-hotovo",
    number: 7,
    title: "Máme hotovo",
    description: "Dokončíme převod a předání. Kontrolujeme, aby vše sedělo do detailu.",
    duration: "0,25 měsíce",
    icon: "checkCircle",
  },
];

const rentSteps: StepCard[] = [
  {
    id: "pronajem-konzultace",
    number: 1,
    title: "Konzultace",
    description: "Nastavíme strategii pronájmu a optimální cenovou hladinu.",
    duration: "0,25 měsíce",
    icon: "users",
  },
  {
    id: "pronajem-naceneni",
    number: 2,
    title: "Nacenění",
    description: "Spočítáme tržní nájemné podle lokality, dispozice a stavu.",
    duration: "0,25 měsíce",
    icon: "handCoins",
  },
  {
    id: "pronajem-prezentace",
    number: 3,
    title: "Foto a příprava inzerátu",
    description: "Vytvoříme prezentaci, která přitáhne kvalitní zájemce.",
    duration: "0,25 měsíce",
    icon: "camera",
  },
  {
    id: "pronajem-inzerce",
    number: 4,
    title: "Inzerce",
    description: "Zveřejníme nabídku a aktivně komunikujeme se zájemci.",
    duration: "0,25 měsíce",
    icon: "megaphone",
  },
  {
    id: "pronajem-zajemci",
    number: 5,
    title: "Prověření zájemců",
    description: "Prověříme bonitu a spolehlivost zájemců, aby pronájem byl bezpečný.",
    duration: "0,25 měsíce",
    icon: "searchCheck",
  },
  {
    id: "pronajem-prohlidky",
    number: 6,
    title: "Prohlídky",
    description: "Vedeme prohlídky a vybereme nejvhodnějšího nájemníka.",
    duration: "0,25-0,75 měsíce",
    icon: "home",
  },
  {
    id: "pronajem-smlouvy",
    number: 7,
    title: "Vytvoření a podepsání smluv",
    description: "Připravíme nájemní dokumentaci a dohlédneme na její podpis.",
    duration: "0,25 měsíce",
    icon: "fileSignature",
  },
  {
    id: "pronajem-hotovo",
    number: 8,
    title: "Máme hotovo",
    description: "Proběhne předání bytu/domu a kompletní administrativa.",
    duration: "0,25 měsíce",
    icon: "checkCircle",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Právní jistota",
    text: "Smlouvy i financování držíme pod kontrolou ve spolupráci s právními specialisty.",
    detail:
      "Každý krok má jasná pravidla. Řešíme rizika předem, hlídáme termíny a bezpečnost plateb.",
  },
  {
    icon: Sparkles,
    title: "Lepší cena a podmínky",
    text: "Nastavíme strategii tak, aby vaše nemovitost na trhu neztratila hodnotu.",
    detail:
      "Pracujeme s daty z regionu, vyjednáváme profesionálně a cíleně. Výsledkem je vyšší výnos i jistota.",
  },
  {
    icon: UserRound,
    title: "Úspora času",
    text: "Komunikaci se zájemci, prohlídky i papírování bereme na sebe.",
    detail:
      "Máte průběžné informace, ale nemusíte řešit operativu. Soustředíte se na své priority, my na obchod.",
  },
  {
    icon: SearchCheck,
    title: "Výběr kvalitních zájemců",
    text: "U pronájmu i prodeje pracujeme s prověřením poptávek, ne jen s počtem kontaktů.",
    detail:
      "Lepší kvalita zájemců znamená méně komplikací, rychlejší uzavření a bezpečnější průběh obchodu.",
  },
];

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <h2 className="text-3xl font-semibold text-black md:text-4xl">{title}</h2>
      <div className="mx-auto mt-3 h-[6px] w-56 [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
      <p className="mt-4 text-base leading-relaxed text-black/70 md:text-lg">
        {subtitle}
      </p>
    </div>
  );
}

export default function ProdejPronajemPage() {
  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, var(--paper0), var(--paper1) 45%, var(--paper2))",
      }}
    >
      <section className="relative isolate min-h-dvh overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover brightness-[1.2] contrast-[1.05] saturate-[1.05]"
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

        <div className="relative z-10 flex min-h-dvh items-center justify-center px-6 py-20 text-center">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl [text-shadow:0_2px_32px_rgba(0,0,0,0.65)]">
              Prodej a pronájem nemovitostí
            </h1>
            <div className="mx-auto mt-3 h-[6px] w-72 [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />

            <p className="mx-auto mt-7 max-w-3xl text-lg font-medium leading-relaxed text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.75)]">
              Transparentní postup krok za krokem. Od první konzultace až po
              bezpečné dokončení obchodu.
            </p>

            <div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-6">
              <a
                href="#jak-probiha-prodej"
                className="btn-main inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-7 py-4 text-base font-semibold text-black lg:col-span-2"
              >
                <KeyRound className="h-5 w-5" />
                Jak probíhá prodej?
              </a>
              <Link
                href="/kontakt"
                className="btn-main inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur-sm lg:col-span-2"
              >
                <Mail className="h-5 w-5" />
                Kontaktujte nás
              </Link>
              <a
                href="#jak-probiha-pronajem"
                className="btn-main inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-7 py-4 text-base font-semibold text-black lg:col-span-2"
              >
                <SearchCheck className="h-5 w-5" />
                Jak probíhá pronájem?
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="jak-probiha-prodej" className="border-t border-black/10 py-20">
        <div className="mx-auto max-w-screen-xl px-4">
          <SectionHeading
            title="Jak probíhá prodej?"
            subtitle="Každý krok má jasný cíl, termín i výstup. Díky tomu víte, co se děje a proč."
          />
          <StepCarousel steps={saleSteps} />
          <p className="mt-8 inline-flex w-full items-center justify-center gap-2 text-center text-base font-medium text-black/70">
            <Hourglass className="h-4 w-4 text-[color:var(--gold2)]" />
            Celkový odhad: přibližně 1-3 měsíce podle trhu a typu nemovitosti.
          </p>
        </div>
      </section>

      <section
        id="jak-probiha-pronajem"
        className="border-t border-black/10 py-20"
      >
        <div className="mx-auto max-w-screen-xl px-4">
          <SectionHeading
            title="Jak probíhá pronájem?"
            subtitle="Pronájem je rychlejší, ale vyžaduje pečlivý výběr nájemce a správně nastavené smlouvy."
          />
          <StepCarousel steps={rentSteps} />
          <p className="mt-8 inline-flex w-full items-center justify-center gap-2 text-center text-base font-medium text-black/70">
            <Hourglass className="h-4 w-4 text-[color:var(--gold2)]" />
            Celkový odhad: přibližně 1-2 měsíce podle lokality a poptávky.
          </p>
        </div>
      </section>

      <section className="border-t border-black/10 py-20">
        <div className="mx-auto max-w-screen-xl px-4">
          <SectionHeading
            title="Proč prodat nebo pronajmout s námi"
            subtitle="Kombinujeme obchodní zkušenost, marketing a právní jistotu v jednom procesu."
          />
          <div className="mx-auto mt-10 grid max-w-5xl gap-3">
            {benefits.map((item) => {
              const Icon = item.icon;
              return (
                <details
                  key={item.title}
                  className="group rounded-2xl border border-black/10 bg-white/80 p-5 shadow-sm open:bg-white"
                >
                  <summary className="flex cursor-pointer list-none items-center gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F6E3B1] ring-1 ring-black/10">
                      <Icon className="h-5 w-5 text-black" />
                    </span>
                    <span className="flex-1 text-left">
                      <span className="block text-lg font-semibold text-black">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-sm text-black/70">
                        {item.text}
                      </span>
                    </span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-black/70 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 border-l-2 border-[color:var(--gold1)]/35 pl-4 text-sm leading-relaxed text-black/65">
                    {item.detail}
                  </p>
                </details>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 py-20">
        <div className="mx-auto max-w-screen-xl px-4 text-center">
          <SectionHeading
            title="Začněte ještě dnes"
            subtitle="Stačí jeden kontakt. Navrhneme nejlepší postup přesně pro vaši situaci."
          />
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/kontakt"
              className="btn-main inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-8 py-3.5 text-base font-semibold text-black"
            >
              <Mail className="h-4 w-4" />
              Kontaktujte nás
            </Link>
            <Link
              href="/co-vse-pro-vas-udelame"
              className="btn-main inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-white px-8 py-3.5 text-base font-semibold text-black"
            >
              <ArrowRight className="h-4 w-4" />
              Podrobný popis služeb
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

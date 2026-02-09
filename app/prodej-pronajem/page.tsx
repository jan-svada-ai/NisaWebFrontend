import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Clock3,
  FileSignature,
  HandCoins,
  Home,
  Megaphone,
  SearchCheck,
  ShieldCheck,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Prodej a pronájem nemovitostí | Nisa Centrum Reality",
  description:
    "Postup prodeje a pronájmu krok za krokem: od konzultace přes prezentaci, inzerci a prohlídky až po smlouvy a bezpečné předání.",
};

type StepCard = {
  id: string;
  number: string;
  title: string;
  description: string;
  duration: string;
  icon: React.ComponentType<{ className?: string }>;
};

const saleSteps: StepCard[] = [
  {
    id: "prodej-konzultace",
    number: "01",
    title: "Konzultace",
    description: "Probereme cíle, stav nemovitosti a navrhneme realistický plán.",
    duration: "1-2 dny",
    icon: Users,
  },
  {
    id: "prodej-naceneni",
    number: "02",
    title: "Nacenění",
    description: "Na základě dat z trhu nastavíme cenu s potenciálem rychlého prodeje.",
    duration: "1-3 dny",
    icon: HandCoins,
  },
  {
    id: "prodej-prezentace",
    number: "03",
    title: "Foto a homestaging",
    description: "Připravíme prostor, foto i video tak, aby nabídka zaujala na první pohled.",
    duration: "2-5 dní",
    icon: Camera,
  },
  {
    id: "prodej-inzerce",
    number: "04",
    title: "Inzerce",
    description: "Spouštíme inzerci na klíčových portálech a cílenou propagaci.",
    duration: "1 den",
    icon: Megaphone,
  },
  {
    id: "prodej-prohlidky",
    number: "05",
    title: "Prohlídky",
    description: "Organizujeme prohlídky, řešíme dotazy a vedeme vyjednávání.",
    duration: "1-6 týdnů",
    icon: Home,
  },
  {
    id: "prodej-smlouvy",
    number: "06",
    title: "Smlouvy a podpisy",
    description: "Zajistíme smlouvy a bezpečný průběh transakce s právním servisem.",
    duration: "1-3 týdny",
    icon: FileSignature,
  },
  {
    id: "prodej-hotovo",
    number: "07",
    title: "Máme hotovo",
    description: "Dokončíme převod a předání. Kontrolujeme, aby vše sedělo do detailu.",
    duration: "1-2 dny",
    icon: CheckCircle2,
  },
];

const rentSteps: StepCard[] = [
  {
    id: "pronajem-konzultace",
    number: "01",
    title: "Konzultace",
    description: "Nastavíme strategii pronájmu a optimální cenovou hladinu.",
    duration: "1-2 dny",
    icon: Users,
  },
  {
    id: "pronajem-naceneni",
    number: "02",
    title: "Nacenění",
    description: "Spočítáme tržní nájemné podle lokality, dispozice a stavu.",
    duration: "1 den",
    icon: HandCoins,
  },
  {
    id: "pronajem-prezentace",
    number: "03",
    title: "Foto a příprava inzerátu",
    description: "Vytvoříme prezentaci, která přitáhne kvalitní zájemce.",
    duration: "1-3 dny",
    icon: Camera,
  },
  {
    id: "pronajem-inzerce",
    number: "04",
    title: "Inzerce",
    description: "Zveřejníme nabídku a aktivně komunikujeme se zájemci.",
    duration: "1 den",
    icon: Megaphone,
  },
  {
    id: "pronajem-zajemci",
    number: "05",
    title: "Prověření zájemců",
    description: "Prověříme bonitu a spolehlivost zájemců, aby pronájem byl bezpečný.",
    duration: "2-5 dní",
    icon: SearchCheck,
  },
  {
    id: "pronajem-prohlidky",
    number: "06",
    title: "Prohlídky",
    description: "Vedeme prohlídky a vybereme nejvhodnějšího nájemníka.",
    duration: "1-3 týdny",
    icon: Home,
  },
  {
    id: "pronajem-smlouvy",
    number: "07",
    title: "Smlouvy a podpisy",
    description: "Připravíme nájemní dokumentaci a dohlédneme na její podpis.",
    duration: "2-5 dní",
    icon: FileSignature,
  },
  {
    id: "pronajem-hotovo",
    number: "08",
    title: "Máme hotovo",
    description: "Proběhne předání bytu/domu a kompletní administrativa.",
    duration: "1 den",
    icon: CheckCircle2,
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
    icon: HandCoins,
    title: "Lepší cena a podmínky",
    text: "Nastavíme strategii tak, aby vaše nemovitost na trhu neztratila hodnotu.",
    detail:
      "Pracujeme s daty z regionu, vyjednáváme profesionálně a cíleně. Výsledkem je vyšší výnos i jistota.",
  },
  {
    icon: Users,
    title: "Úspora času",
    text: "Komunikaci se zájemci, prohlídky i papírování bereme na sebe.",
    detail:
      "Máte průběžné informace, ale nemusíte řešit operativu. Soustředíte se na své priority, my na obchod.",
  },
  {
    icon: Camera,
    title: "Reprezentativní prezentace",
    text: "Profesionální foto a jasný inzerát zvyšují důvěru i zájem.",
    detail:
      "Dobře připravená prezentace zkracuje čas prodeje/pronájmu a posouvá kvalitu poptávek.",
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

function StepCarousel({ steps }: { steps: StepCard[] }) {
  return (
    <div className="mt-10 overflow-x-auto pb-3">
      <div className="flex min-w-max gap-4">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <article
              key={step.id}
              className="w-[300px] rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm backdrop-blur-sm"
            >
              <p className="text-xs font-semibold tracking-[0.2em] text-black/45">
                KROK {step.number}
              </p>
              <div className="mt-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F6E3B1] ring-1 ring-black/10">
                <Icon className="h-5 w-5 text-black" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-black">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-black/70">
                {step.description}
              </p>
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-black/70">
                <Clock3 className="h-4 w-4 text-[color:var(--gold2)]" />
                Odhad: {step.duration}
              </p>
              <Link
                href={`/co-vse-pro-vas-udelame#${step.id}`}
                className="btn-main mt-5 inline-flex items-center gap-2 rounded-full bg-[color:var(--gold1)] px-5 py-2.5 text-sm font-semibold text-black"
              >
                Detail
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default function ProdejPronajemPage() {
  return (
    <main
      className="min-h-screen pt-20"
      style={{
        background:
          "linear-gradient(180deg, var(--paper0), var(--paper1) 45%, var(--paper2))",
      }}
    >
      <section className="relative isolate min-h-[84vh] overflow-hidden">
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

        <div className="relative z-10 flex min-h-[84vh] items-center justify-center px-6 py-20 text-center">
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
                className="btn-main inline-flex items-center justify-center rounded-full bg-[color:var(--gold1)] px-7 py-4 text-base font-semibold text-black lg:col-span-2"
              >
                Jak probíhá prodej?
              </a>
              <Link
                href="/kontakt"
                className="btn-main inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur-sm lg:col-span-2"
              >
                Kontaktujte nás
              </Link>
              <a
                href="#jak-probiha-pronajem"
                className="btn-main inline-flex items-center justify-center rounded-full bg-[color:var(--gold1)] px-7 py-4 text-base font-semibold text-black lg:col-span-2"
              >
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
          <p className="mt-8 text-center text-base font-medium text-black/70">
            Celkový odhad: přibližně 4-12 týdnů podle trhu a typu nemovitosti.
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
          <p className="mt-8 text-center text-base font-medium text-black/70">
            Celkový odhad: obvykle 2-6 týdnů podle lokality a poptávky.
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
              className="btn-main inline-flex items-center justify-center rounded-full bg-[color:var(--gold1)] px-8 py-3.5 text-base font-semibold text-black"
            >
              Kontaktujte nás
            </Link>
            <a
              href="https://leady.valuo.cz/kalkulace/5dfdb68a089d608a996823b2bc0f53d9"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-main inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-8 py-3.5 text-base font-semibold text-black"
            >
              Ocenění zdarma
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

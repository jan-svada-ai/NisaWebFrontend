import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-url";
import {
  ArrowRight,
  Gift,
  Handshake,
  Hourglass,
  Mail,
  Megaphone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import StepCarousel from "./StepCarousel";

export const metadata: Metadata = {
  title: "Pošli tip na reality | Nisa Centrum Reality",
  description:
    "Máte tip na nemovitost k prodeji nebo pronájmu? Pošlete kontakt, my vše prověříme a po úspěšném obchodu vyplatíme odměnu.",
  alternates: {
    canonical: `${SITE_URL}/tipni-realitu/`,
  },
};

type StepCard = {
  id: string;
  number: number;
  title: string;
  description: string;
  duration: string;
  icon: "gift" | "mail" | "handshake" | "wallet";
};

const rewardSteps: StepCard[] = [
  {
    id: "tip-zadani",
    number: 1,
    title: "Pošlete kontakt",
    description:
      "Vyplníte základní informace o majiteli a nemovitosti. Čím přesnější kontakt, tím rychleji můžeme jednat.",
    duration: "5-15 minut",
    icon: "mail",
  },
  {
    id: "tip-overeni",
    number: 2,
    title: "Ověření a první jednání",
    description:
      "Kontakt prověříme, ověříme zájem majitele a navrhneme vhodný postup prodeje nebo pronájmu.",
    duration: "2-7 dní",
    icon: "handshake",
  },
  {
    id: "tip-realizace",
    number: 3,
    title: "Realizace obchodu",
    description:
      "Nemovitost profesionálně připravíme, spustíme propagaci, vedeme prohlídky a dotáhneme smluvní část.",
    duration: "1-3 měsíce",
    icon: "gift",
  },
  {
    id: "tip-odmena",
    number: 4,
    title: "Vyplacení odměny",
    description:
      "Po úspěšném dokončení transakce vám vyplatíme odměnu podle typu obchodu a předem domluvených podmínek.",
    duration: "do týdne po uzavření",
    icon: "wallet",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Diskrétnost a bezpečí",
    text: "Vaše jméno ani kontakt nikde nezveřejňujeme bez souhlasu.",
    detail:
      "S tipy pracujeme interně. Komunikace je vedena profesionálně a citlivě, aby byl chráněn váš vztah s majitelem i průběh celého obchodu.",
  },
  {
    icon: Megaphone,
    title: "Silný marketing v regionu",
    text: "Nabídky aktivně propagujeme v Liberci, Ústeckém, Královéhradeckém kraji, Středočeském a v Praze.",
    detail:
      "Díky zkušenosti v lokálním trhu umíme rychle rozhodnout, kde a jak nemovitost nabízet, aby se ozvali relevantní zájemci.",
  },
  {
    icon: Handshake,
    title: "Jasná pravidla odměny",
    text: "Předem víte, kdy a za jakých podmínek odměnu získáte.",
    detail:
      "Vysvětlíme vám postup i podmínky vyplacení. Žádná nejasná pravidla a žádná překvapení na konci procesu.",
  },
  {
    icon: Sparkles,
    title: "Kompletní servis",
    text: "Tip nekončí jen inzercí. Řešíme celý obchod od nacenění po předání.",
    detail:
      "V praxi to znamená méně rizik, vyšší šanci na úspěšný výsledek a rychlejší cestu k uzavření obchodu.",
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

export default function TipniRealituPage() {
  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, var(--paper0), var(--paper1) 45%, var(--paper2))",
      }}
    >
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

        <div className="relative z-10 flex min-h-dvh flex-col items-center justify-start pt-20 pb-6">
          <div className="w-full max-w-6xl px-5 text-center sm:px-8 md:px-12 lg:px-16">
            <p className="mb-4 text-[0.9rem] uppercase tracking-[0.2em] text-white/85">
              Liberecký, Ústecký, Královéhradecký, Středočeský kraj, Praha a okolí
            </p>

            <h1 className="mx-auto max-w-5xl text-[2.8rem] font-semibold leading-tight text-white md:text-[4rem] [text-shadow:0_2px_32px_rgba(0,0,0,0.65)]">
              <span className="inline-flex flex-col items-center">
                <span>Pošli tip na reality</span>
                <span className="mt-3 h-[6px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
              </span>
              <span className="mt-3 block text-[0.63em] text-[color:var(--gold1)] [text-shadow:0_2px_30px_rgba(0,0,0,0.8)]">
                S důrazem na cenu, rychlost a jistotu.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-base font-medium leading-relaxed text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.75)]">
              Máte kontakt na majitele, který uvažuje o prodeji nebo pronájmu?
              Pošlete nám tip a po úspěšném obchodu získáte odměnu.
            </p>
          </div>

          <div className="mt-auto w-full pb-10">
            <div className="mx-auto mt-9 grid max-w-3xl gap-3 px-1 sm:grid-cols-2 sm:px-0">
              <a
                href="#jak-ziskat-odmenu"
                className="btn-main inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-5 py-2.5 text-base font-semibold text-black"
              >
                <Gift className="h-5 w-5" />
                Jak získat odměnu?
              </a>
              <Link
                href="/kontakt"
                className="btn-main inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-base font-semibold text-white backdrop-blur-sm"
              >
                <Mail className="h-5 w-5" />
                Kontaktujte nás
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="jak-ziskat-odmenu"
        className="border-t border-black/10 py-20 md:py-24 min-h-screen flex items-center"
      >
        <div className="mx-auto w-full max-w-screen-xl px-4">
          <SectionHeading
            title="Jak získat odměnu"
            subtitle="Jednoduchý proces od prvního kontaktu až po vyplacení odměny. V každé fázi víte, co se bude dít a co je další krok."
          />
          <p className="mx-auto mt-5 max-w-4xl text-center text-base leading-relaxed text-black/70">
            Tip posuzujeme individuálně. Když má kontakt reálný potenciál,
            převezmeme kompletní realizaci obchodu a po dokončení Vás čeká
            odměna.
          </p>
          <p className="mx-auto mt-3 max-w-4xl text-center text-base leading-relaxed text-black/70">
            V praxi je důležité hlavně to, aby byl tip aktuální, kontakt ověřitelný
            a majitel byl otevřený dalšímu jednání. S tím vám pomůžeme už při
            prvním hovoru.
          </p>
          <StepCarousel steps={rewardSteps} />
          <p className="mt-8 inline-flex w-full items-center justify-center gap-2 text-center text-base font-medium text-black/70">
            <Hourglass className="h-4 w-4 text-[color:var(--gold2)]" />
            Celkový odhad: nejčastěji 1-3 měsíce podle typu nemovitosti a trhu.
          </p>
        </div>
      </section>

      <section className="border-t border-black/10 py-20 md:py-24 min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-screen-xl px-4">
          <SectionHeading
            title="Proč poslat tip právě nám"
            subtitle="Nejde jen o předání kontaktu. Důležité je, aby byl obchod profesionálně vedený a bezpečně dotažený do konce."
          />
          <p className="mx-auto mt-5 max-w-4xl text-center text-base leading-relaxed text-black/70">
            Kombinujeme lokální znalost, marketing a právní jistotu. Vaše role
            je jednoduchá: poslat tip. O zbytek se postará náš tým.
          </p>
          <p className="mx-auto mt-3 max-w-4xl text-center text-base leading-relaxed text-black/70">
            Každý relevantní tip má reálnou hodnotu. Proto nastavujeme jasná
            pravidla a srozumitelný postup, aby byla spolupráce dlouhodobě
            důvěryhodná pro všechny strany.
          </p>

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
                      <span className="mt-1 block text-sm text-black/70">{item.text}</span>
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

      <section className="border-t border-black/10 py-20 md:py-24 min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-screen-xl px-4 text-center">
          <SectionHeading
            title="Začněte ještě dnes"
            subtitle="Pošlete nám tip a během krátké doby vám řekneme, jaký má potenciál a jaký bude další postup."
          />
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-black/70">
            Každý relevantní kontakt prověřujeme rychle. Pokud se obchod
            realizuje, odměnu vyplatíme podle předem potvrzených pravidel.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/kontakt"
              className="btn-main inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-8 py-3.5 text-base font-semibold text-black"
            >
              <Mail className="h-4 w-4" />
              Poslat tip
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






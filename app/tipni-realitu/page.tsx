import Link from "next/link";
import type { Metadata } from "next";
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
    "Mate tip na nemovitost k prodeji nebo pronajmu? Poslete kontakt, my vse proverime a po uspesnem obchodu vyplatime odmenu.",
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
    title: "Poslete kontakt",
    description:
      "Vyplnite zakladni informace o majiteli a nemovitosti. Cim presnejsi kontakt, tim rychleji muzeme jednat.",
    duration: "5-15 minut",
    icon: "mail",
  },
  {
    id: "tip-overeni",
    number: 2,
    title: "Overeni a prvni jednani",
    description:
      "Kontakt proverime, overime zajem majitele a navrhneme vhodny postup prodeje nebo pronajmu.",
    duration: "2-7 dni",
    icon: "handshake",
  },
  {
    id: "tip-realizace",
    number: 3,
    title: "Realizace obchodu",
    description:
      "Nemovitost profesionalne pripravime, spustime propagaci, vedeme prohlidky a dotahneme smluvni cast.",
    duration: "1-3 mesice",
    icon: "gift",
  },
  {
    id: "tip-odmena",
    number: 4,
    title: "Vyplaceni odmeny",
    description:
      "Po uspesnem dokonceni transakce vam vyplatime odmenu podle typu obchodu a predem domluvenych podminek.",
    duration: "do 14 dni po uzavreni",
    icon: "wallet",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Diskretnost a bezpeci",
    text: "Vase jmeno ani kontakt nikde nezverejnujeme bez souhlasu.",
    detail:
      "S tipy pracujeme interne. Komunikace je vedena profesionalne a citlive, aby byl chranen vas vztah s majitelem i prubeh celeho obchodu.",
  },
  {
    icon: Megaphone,
    title: "Silny marketing v regionu",
    text: "Nabidky aktivne propagujeme v Liberci, Usteckem, Kralovehradeckem kraji, Stredoceskem a Praze.",
    detail:
      "Diky zkusenosti v lokalnim trhu umime rychle rozhodnout, kde a jak nemovitost komunikovat, aby se ozvali relevantni zajemci.",
  },
  {
    icon: Handshake,
    title: "Jasna pravidla odmeny",
    text: "Predem vite, kdy a za jakych podminek odmenu ziskate.",
    detail:
      "Vysvetlime vam postup i podminky vyplaceni. Zadna nejasna pravidla a zadna prekvapeni na konci procesu.",
  },
  {
    icon: Sparkles,
    title: "Kompletni servis",
    text: "Tip nekonci jen inzerci. Resime cely obchod od naceneni po predani.",
    detail:
      "V praxi to znamena mene rizik, vyssi sanci na uspesny vysledek a rychlejsi cestu k uzavreni obchodu.",
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
            <h1 className="text-5xl font-semibold leading-tight text-white md:text-7xl [text-shadow:0_2px_32px_rgba(0,0,0,0.65)]">
              <span className="inline-flex flex-col items-center">
                <span>Pošli tip na reality</span>
                <span className="mt-3 h-[6px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-lg font-medium leading-relaxed text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.75)]">
              Mate kontakt na majitele, ktery uvazuje o prodeji nebo pronajmu?
              Poslete nam tip a po uspesnem obchodu ziskate odmenu.
            </p>

            <div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-6">
              <a
                href="#jak-ziskat-odmenu"
                className="btn-main inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-7 py-4 text-base font-semibold text-black lg:col-span-2"
              >
                <Gift className="h-5 w-5" />
                Jak ziskat odmenu?
              </a>
              <Link
                href="/kontakt"
                className="btn-main inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur-sm lg:col-span-2"
              >
                <Mail className="h-5 w-5" />
                Kontaktujte nas
              </Link>
              <Link
                href="/co-vse-pro-vas-udelame"
                className="btn-main inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-7 py-4 text-base font-semibold text-black lg:col-span-2"
              >
                <ArrowRight className="h-5 w-5" />
                Co vse pro vas udelame
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
            title="Jak ziskat odmenu"
            subtitle="Jednoduchy proces od prvniho kontaktu az po vyplaceni odmeny. V kazde fazi vite, co se bude dit a co je dalsi krok."
          />
          <p className="mx-auto mt-5 max-w-4xl text-center text-base leading-relaxed text-black/70">
            Tip posuzujeme individualne. Kdyz ma kontakt realny potencial,
            prevezmeme kompletni realizaci obchodu a vy se nemusite starat o
            marketing, prohlidky ani smlouvy.
          </p>
          <p className="mx-auto mt-3 max-w-4xl text-center text-base leading-relaxed text-black/70">
            V praxi je dulezite hlavne to, aby byl tip aktualni, kontakt overitelny
            a majitel byl otevreny dalsimu jednani. S tim vam pomuzeme uz pri
            prvnim hovoru.
          </p>
          <StepCarousel steps={rewardSteps} />
          <p className="mt-8 inline-flex w-full items-center justify-center gap-2 text-center text-base font-medium text-black/70">
            <Hourglass className="h-4 w-4 text-[color:var(--gold2)]" />
            Celkovy odhad: nejcasteji 1-3 mesice podle typu nemovitosti a trhu.
          </p>
        </div>
      </section>

      <section className="border-t border-black/10 py-20 md:py-24 min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-screen-xl px-4">
          <SectionHeading
            title="Proc poslat tip prave nam"
            subtitle="Nejde jen o predani kontaktu. Dulezite je, aby byl obchod profesionalne vedeny a bezpecne dotazeny do konce."
          />
          <p className="mx-auto mt-5 max-w-4xl text-center text-base leading-relaxed text-black/70">
            Kombinujeme lokalni znalost, marketing a pravni jistotu. Vase role
            je jednoducha: poslat tip. O zbytek se postara nas tym.
          </p>
          <p className="mx-auto mt-3 max-w-4xl text-center text-base leading-relaxed text-black/70">
            Kazdy relevantni tip ma realnou hodnotu. Proto nastavujeme jasna
            pravidla a srozumitelny postup, aby byla spoluprace dlouhodobe
            duveryhodna pro vsechny strany.
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
            title="Zacnete jeste dnes"
            subtitle="Poslete nam tip a behem kratke doby vam rekneme, jaky ma potencial a jaky bude dalsi postup."
          />
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-black/70">
            Kazdy relevantni kontakt proverujeme rychle. Pokud se obchod
            realizuje, odmenu vyplatime podle predem potvrzenych pravidel.
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
              Podrobny popis sluzeb
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

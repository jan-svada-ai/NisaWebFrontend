import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-url";
import {
  ArrowRight,
  ExternalLink,
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
  alternates: {
    canonical: `${SITE_URL}/prodej-pronajem/`,
  },
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
    description:
      "Probereme cíl prodeje, stav nemovitosti i časový plán. Hned na začátku nastavíme realistickou strategii.",
    duration: "2-7 dní",
    icon: "users",
  },
  {
    id: "prodej-naceneni",
    number: 2,
    title: "Nacenění",
    description:
      "Na základě dat z trhu a lokální poptávky nastavíme cenu, která podpoří rychlý a zároveň výhodný prodej.",
    duration: "2-3 dny",
    icon: "handCoins",
  },
  {
    id: "prodej-prezentace",
    number: 3,
    title: "Foto a homestaging",
    description:
      "Připravíme prostor, foto i video tak, aby nabídka působila profesionálně a zaujala hned při prvním kontaktu.",
    duration: "4-10 dní",
    icon: "camera",
  },
  {
    id: "prodej-inzerce",
    number: 4,
    title: "Inzerce",
    description:
      "Spustíme inzerci na klíčových portálech a doplníme ji cíleně propagací na relevantní publikum.",
    duration: "2-5 dní",
    icon: "megaphone",
  },
  {
    id: "prodej-prohlidky",
    number: 5,
    title: "Prohlídky",
    description:
      "Organizujeme prohlídky, vedeme komunikaci se zájemci a profesionálně řídíme vyjednávání podmínek.",
    duration: "1-6 týdnů",
    icon: "home",
  },
  {
    id: "prodej-smlouvy",
    number: 6,
    title: "Vytvoření a podepsání smluv",
    description:
      "Zajistíme smlouvy, právní dohled i bezpečný platební proces. Hlídáme termíny a návaznost jednotlivých kroků.",
    duration: "2-3 týdny",
    icon: "fileSignature",
  },
  {
    id: "prodej-hotovo",
    number: 7,
    title: "Máme hotovo",
    description:
      "Dokončíme převod a předání nemovitosti. Kontrolujeme, aby byla transakce uzavřena bez otevřených bodů.",
    duration: "3-6 měsíců",
    icon: "checkCircle",
  },
];

const rentSteps: StepCard[] = [
  {
    id: "pronajem-konzultace",
    number: 1,
    title: "Konzultace",
    description:
      "Nastavíme strategii pronájmu, cílovou skupinu a ideální načasování uvedení nemovitosti na trh.",
    duration: "2-7 dní",
    icon: "users",
  },
  {
    id: "pronajem-naceneni",
    number: 2,
    title: "Nacenění",
    description:
      "Spočítáme tržní nájemné podle lokality, dispozice a stavu, aby byl pronájem konkurenceschopný i výhodný.",
    duration: "2-3 dny",
    icon: "handCoins",
  },
  {
    id: "pronajem-prezentace",
    number: 3,
    title: "Foto a příprava inzerátu",
    description:
      "Vytvoříme prezentaci, která přitáhne kvalitní zájemce a předem odpoví na nejčastější dotazy.",
    duration: "3-7 dní",
    icon: "camera",
  },
  {
    id: "pronajem-inzerce",
    number: 4,
    title: "Inzerce",
    description:
      "Zveřejníme nabídku, filtrujeme poptávky a aktivně komunikujeme jen s relevantními zájemci.",
    duration: "2-5 dní",
    icon: "megaphone",
  },
  {
    id: "pronajem-zajemci",
    number: 5,
    title: "Prověření zájemců",
    description:
      "Prověříme bonitu a spolehlivost zájemců, aby byl pronájem dlouhodobě stabilní a bezpečný.",
    duration: "3-7 dní",
    icon: "searchCheck",
  },
  {
    id: "pronajem-prohlidky",
    number: 6,
    title: "Prohlídky",
    description:
      "Vedeme prohlídky a pomůžeme vybrat nejvhodnějšího nájemníka podle vašich priorit.",
    duration: "1-3 týdny",
    icon: "home",
  },
  {
    id: "pronajem-smlouvy",
    number: 7,
    title: "Vytvoření a podepsání smluv",
    description:
      "Připravíme nájemní dokumentaci, předávací protokoly i pravidla spolupráce mezi pronajímatelem a nájemcem.",
    duration: "3-7 dní",
    icon: "fileSignature",
  },
  {
    id: "pronajem-hotovo",
    number: 8,
    title: "Máme hotovo",
    description:
      "Proběhne předání bytu nebo domu a finální administrativní uzavření celého procesu.",
    duration: "1-3 dny",
    icon: "checkCircle",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Právní jistota",
    text: "Smlouvy i financování držíme pod kontrolou ve spolupráci s právními specialisty.",
    detail:
      "Každý krok má jasná pravidla. Řešíme rizika předem, hlídáme termíny a bezpečnost plateb tak, aby byl obchod transparentní pro všechny strany.",
  },
  {
    icon: Sparkles,
    title: "Lepší cena a podmínky",
    text: "Nastavíme strategii tak, aby vaše nemovitost na trhu neztratila hodnotu.",
    detail:
      "Pracujeme s daty z regionu, profesionálně vyjednáváme a držíme jednotnou komunikaci. Výsledkem je vyšší výnos i menší prostor pro zbytečné slevy.",
  },
  {
    icon: UserRound,
    title: "Úspora času",
    text: "Komunikaci se zájemci, prohlídky i administrativu bereme na sebe.",
    detail:
      "Máte průběžné informace, ale nemusíte řešit operativu. Soustředíte se na své priority, zatímco my řídíme tempo, pořadí kroků a návaznost celého obchodu.",
  },
  {
    icon: SearchCheck,
    title: "Výběr kvalitních zájemců",
    text: "U pronájmu i prodeje pracujeme s prověřováním poptávek, ne jen s počtem kontaktů.",
    detail:
      "Lepší kvalita zájemců znamená méně komplikací, rychlejší uzavření a bezpečnější průběh obchodu. Zaměření je na výsledek, ne na počet telefonátů.",
  },
];

const advertisingPortals = [
  {
    name: "Sreality.cz",
    href: "https://www.sreality.cz/adresar/nisa-centrum-reality-liberec-liberec-iv-perstyn/19609",
    note: "Největší realitní portál v ČR s velmi silným dosahem poptávky.",
    logoSrc: "/portal-sreality.svg",
    logoAlt: "Logo Sreality.cz",
  },
  {
    name: "Reality.iDNES.cz",
    href: "https://reality.idnes.cz/rk/detail/nisa-centrum-s-r-o/5f194b2337ba4d3b6e2d8b23/",
    note: "Silný realitní portál mediální skupiny iDNES s vysokou návštěvností.",
    logoSrc: "/portal-reality-idnes.svg",
    logoAlt: "Logo Reality.iDNES.cz",
  },
  {
    name: "Nemovitosti Blesk",
    href: "https://nemovitosti.blesk.cz/nisa-centrum-s-r-o-1224",
    note: "Realitní platforma Blesk s širokým mainstreamovým zásahem.",
    logoSrc: "/portal-blesk-nemovitosti.svg",
    logoAlt: "Logo Nemovitosti Blesk",
  },
  {
    name: "ČESKÉREALITY.cz",
    href: "https://www.ceskereality.cz/realitni-kancelare/nisa-centrum-liberec/",
    note: "Dlouhodobě zavedený realitní portál se silnou regionální návštěvností.",
    logoSrc: "/portal-ceskereality.svg",
    logoAlt: "Logo ČESKÉREALITY.cz",
  },
  {
    name: "Black Reality",
    href: "https://www.black-reality.cz/reality/vse/?pobocka=821",
    note: "Moderní realitní portál s aktivní poptávkou a kvalitní prezentací nabídek.",
    logoSrc: "/portal-black-reality.png",
    logoAlt: "Logo Black Reality",
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
                <span>Prodej a pronájem nemovitostí</span>
                <span className="mt-3 h-[6px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
              </span>
              <span className="mt-3 block text-[0.63em] text-[color:var(--gold1)] [text-shadow:0_2px_30px_rgba(0,0,0,0.8)]">
                S důrazem na cenu, rychlost a jistotu.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-base font-medium leading-relaxed text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.75)]">
              Transparentní postup krok za krokem. Od první konzultace přes
              přípravu a marketing až po bezpečné dokončení obchodu.
            </p>
          </div>

          <div className="mt-auto w-full pb-10">
            <div className="mx-auto mt-9 grid max-w-5xl gap-3 px-1 sm:grid-cols-2 sm:px-0 lg:grid-cols-6">
              <a
                href="#jak-probiha-prodej"
                className="btn-main inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-5 py-2.5 text-base font-semibold text-black lg:col-span-2"
              >
                <KeyRound className="h-5 w-5" />
                Jak probíhá prodej?
              </a>
              <Link
                href="/kontakt"
                className="btn-main inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-base font-semibold text-white backdrop-blur-sm lg:col-span-2"
              >
                <Mail className="h-5 w-5" />
                Kontaktujte nás
              </Link>
              <a
                href="#jak-probiha-pronajem"
                className="btn-main inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-5 py-2.5 text-base font-semibold text-black lg:col-span-2"
              >
                <SearchCheck className="h-5 w-5" />
                Jak probíhá pronájem?
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="jak-probiha-prodej"
        className="border-t border-black/10 py-20 md:py-24 min-h-screen flex items-center"
      >
        <div className="mx-auto w-full max-w-screen-xl px-4">
          <SectionHeading
            title="Jak probíhá prodej?"
            subtitle="Každý krok má jasný cíl, termín i výstup. Vždy víte, co se děje, proč se to děje a jaký je navazující krok."
          />
          <p className="mx-auto mt-5 max-w-4xl text-center text-base leading-relaxed text-black/70">
            Prodej vedeme jako řízený proces. Nejde jen o inzerát, ale o
            načasování, kvalitu prezentace, práci se zájemci a bezpečné
            dotažení smluvní části. V každé fázi hlídáme tempo, komunikaci i
            konkrétní obchodní cíl.
          </p>
          <p className="mx-auto mt-3 max-w-4xl text-center text-base leading-relaxed text-black/70">
            U každé nemovitosti nastavíme strategii podle lokality, typu klienta
            a aktuální poptávky. Díky tomu nevznikají zbytečné prodlevy a
            majitel dostává průběžné informace, které pomáhají dělat dobrá
            rozhodnutí.
          </p>
          <StepCarousel steps={saleSteps} />
          <p className="mt-8 inline-flex w-full items-center justify-center gap-2 text-center text-base font-medium text-black/70">
            <Hourglass className="h-4 w-4 text-[color:var(--gold2)]" />
            Celkový odhad: přibližně 1-3 měsíce podle trhu a typu nemovitosti.
          </p>
          <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-relaxed text-black/60">
            U dobře naceněných nemovitostí v silné lokalitě se proces typicky
            zkracuje. U specifických nemovitostí může být naopak potřeba delšího
            vyjednávání a více kol prohlídek.
          </p>
        </div>
      </section>

      <section
        id="jak-probiha-pronajem"
        className="border-t border-black/10 py-20 md:py-24 min-h-screen flex items-center"
      >
        <div className="mx-auto w-full max-w-screen-xl px-4">
          <SectionHeading
            title="Jak probíhá pronájem?"
            subtitle="Pronájem bývá rychlejší než prodej, ale klíčový je pečlivý výběr nájemce a kvalitně připravená smluvní dokumentace."
          />
          <p className="mx-auto mt-5 max-w-4xl text-center text-base leading-relaxed text-black/70">
            U pronájmu je cílem nejen rychlost obsazení, ale hlavně stabilita.
            Proto klademe důraz na prověření zájemců, jasná pravidla nájemního
            vztahu a kvalitní předání nemovitosti.
          </p>
          <p className="mx-auto mt-3 max-w-4xl text-center text-base leading-relaxed text-black/70">
            Dobrý pronájem znamená méně starostí pro majitele i nájemce.
            Řešíme komunikaci, dokumentaci, předávací protokoly i navazující
            kroky tak, aby byl proces přehledný a právně bezpečný.
          </p>
          <StepCarousel steps={rentSteps} />
          <p className="mt-8 inline-flex w-full items-center justify-center gap-2 text-center text-base font-medium text-black/70">
            <Hourglass className="h-4 w-4 text-[color:var(--gold2)]" />
            Celkový odhad: přibližně 1-2 měsíce podle lokality a poptávky.
          </p>
          <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-relaxed text-black/60">
            Při silné poptávce se pronájem často uzavře výrazně rychleji.
            U náročnějších dispozic nebo specifických podmínek počítejte s
            delším filtrováním zájemců.
          </p>
        </div>
      </section>

      <section className="border-t border-black/10 py-20 md:py-24 min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-screen-xl px-4">
          <SectionHeading
            title="Proč prodat nebo pronajmout s námi"
            subtitle="Kombinujeme obchodní zkušenost, marketing, procesní řízení a právní jistotu v jednom celku."
          />
          <p className="mx-auto mt-5 max-w-4xl text-center text-base leading-relaxed text-black/70">
            Každý obchod stavíme na datech, komunikaci a důvěře. Klient má
            průběžný přehled, jasné termíny a partnera, který hlídá kvalitu
            výsledku od prvního kroku až po podpis smluv.
          </p>
          <p className="mx-auto mt-3 max-w-4xl text-center text-base leading-relaxed text-black/70">
            V praxi to znamená méně nejistoty, rychlejší rozhodování a lepší
            cenu nebo podmínky. Přesně to je role profesionálního makléře.
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

      <section className="border-t border-black/10 py-20 md:py-24 min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-screen-xl px-4 text-center">
          <SectionHeading
            title="Kde všude bude vidět Váš inzerát"
            subtitle="Vaši nabídku publikujeme na klíčových realitních portálech, aby získala maximální viditelnost a kvalitní poptávku."
          />
          <p className="mx-auto mt-5 max-w-4xl text-base leading-relaxed text-black/70">
            Kombinujeme více inzertních kanálů najednou, takže nemovitost
            nečeká jen na jeden zdroj poptávky. Díky tomu zvyšujeme počet
            relevantních zájemců i šanci na rychlejší uzavření obchodu.
          </p>
          <p className="mx-auto mt-3 max-w-4xl text-base leading-relaxed text-black/70">
            Propagaci zároveň podporujeme i na Instagramu a Facebooku. Níže je
            uvedený hlavní výběr portálů, ve skutečnosti využíváme ještě více
            relevantních inzertních kanálů podle typu nemovitosti a cílové
            skupiny.
          </p>

          <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2">
            {advertisingPortals.map((portal, index) => (
              <a
                key={portal.name}
                href={portal.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group rounded-2xl border border-black/10 bg-white/85 p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-white ${
                  index === advertisingPortals.length - 1
                    ? "sm:col-span-2 sm:w-[calc((100%-1rem)/2)] sm:justify-self-center"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-black">
                      {portal.name}
                    </p>
                    <p className="text-sm text-black/65">{portal.note}</p>
                  </div>
                  <div className="flex h-14 w-36 items-center justify-center rounded-xl border border-black/10 bg-white px-3">
                    <Image
                      src={portal.logoSrc}
                      alt={portal.logoAlt}
                      width={132}
                      height={36}
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                </div>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-black/75 transition group-hover:text-black">
                  Otevřít portál
                  <ExternalLink className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 py-20 md:py-24 min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-screen-xl px-4 text-center">
          <SectionHeading
            title="Začněte ještě dnes"
            subtitle="Stačí jeden kontakt. Navrhneme nejlepší postup přesně pro vaši situaci a vezmeme za něj odpovědnost."
          />
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-black/70">
            Ať řešíte prodej, pronájem nebo jen potřebujete srovnat možnosti,
            připravíme jasné kroky bez zbytečných komplikací. Na začátku
            nastavíme reálný plán a pak ho krok po kroku naplníme.
          </p>
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





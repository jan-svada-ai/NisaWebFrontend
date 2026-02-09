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
  title: "Prodej a pronajem nemovitosti | Nisa Centrum Reality",
  description:
    "Postup prodeje a pronajmu krok za krokem: od konzultace pres prezentaci, inzerci a prohlidky az po smlouvy a bezpecne predani.",
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
      "Probereme cil prodeje, stav nemovitosti i casovy plan. Hned na zacatku nastavime realistickou strategii.",
    duration: "1-2 tydny",
    icon: "users",
  },
  {
    id: "prodej-naceneni",
    number: 2,
    title: "Naceneni",
    description:
      "Na zaklade dat z trhu a lokalni poptavky nastavime cenu, ktera podpori rychly a zaroven vyhodny prodej.",
    duration: "3-7 dni",
    icon: "handCoins",
  },
  {
    id: "prodej-prezentace",
    number: 3,
    title: "Foto a homestaging",
    description:
      "Pripravime prostor, foto i video tak, aby nabidka pusobila profesionalne a zaujala hned pri prvnim kontaktu.",
    duration: "4-10 dni",
    icon: "camera",
  },
  {
    id: "prodej-inzerce",
    number: 4,
    title: "Inzerce",
    description:
      "Spustime inzerci na klicovych portalech a doplnime ji cilene propagaci na relevantni publikum.",
    duration: "2-5 dni",
    icon: "megaphone",
  },
  {
    id: "prodej-prohlidky",
    number: 5,
    title: "Prohlidky",
    description:
      "Organizujeme prohlidky, vedeme komunikaci se zajemci a profesionalne ridime vyjednavani podminek.",
    duration: "1-6 tydnu",
    icon: "home",
  },
  {
    id: "prodej-smlouvy",
    number: 6,
    title: "Vytvoreni a podepsani smluv",
    description:
      "Zajistime smlouvy, pravni dohled i bezpecny platebni proces. Hlidame terminy a navaznost jednotlivych kroku.",
    duration: "2-3 tydny",
    icon: "fileSignature",
  },
  {
    id: "prodej-hotovo",
    number: 7,
    title: "Mame hotovo",
    description:
      "Dokoncime prevod a predani nemovitosti. Kontrolujeme, aby byla transakce uzavrena bez otevrenych bodu.",
    duration: "2-5 dni",
    icon: "checkCircle",
  },
];

const rentSteps: StepCard[] = [
  {
    id: "pronajem-konzultace",
    number: 1,
    title: "Konzultace",
    description:
      "Nastavime strategii pronajmu, cilovou skupinu a idealni nacasovani uvedeni nemovitosti na trh.",
    duration: "3-7 dni",
    icon: "users",
  },
  {
    id: "pronajem-naceneni",
    number: 2,
    title: "Naceneni",
    description:
      "Spocitame trzni najemne podle lokality, dispozice a stavu, aby byl pronajem konkurenceschopny i vyhodny.",
    duration: "2-5 dni",
    icon: "handCoins",
  },
  {
    id: "pronajem-prezentace",
    number: 3,
    title: "Foto a priprava inzeratu",
    description:
      "Vytvorime prezentaci, ktera pritahne kvalitni zajemce a predem odpovi na nejcastejsi dotazy.",
    duration: "3-7 dni",
    icon: "camera",
  },
  {
    id: "pronajem-inzerce",
    number: 4,
    title: "Inzerce",
    description:
      "Zverejnime nabidku, filtrujeme poptavky a aktivne komunikujeme jen s relevantnimi zajemci.",
    duration: "2-5 dni",
    icon: "megaphone",
  },
  {
    id: "pronajem-zajemci",
    number: 5,
    title: "Provereni zajemcu",
    description:
      "Proverime bonitu a spolehlivost zajemcu, aby byl pronajem dlouhodobe stabilni a bezpecny.",
    duration: "3-7 dni",
    icon: "searchCheck",
  },
  {
    id: "pronajem-prohlidky",
    number: 6,
    title: "Prohlidky",
    description:
      "Vedeme prohlidky a pomuzeme vybrat nejvhodnejsiho najemnika podle vasich priorit.",
    duration: "1-3 tydny",
    icon: "home",
  },
  {
    id: "pronajem-smlouvy",
    number: 7,
    title: "Vytvoreni a podepsani smluv",
    description:
      "Pripravime najemni dokumentaci, predavaci protokoly i pravidla spoluprace mezi pronajimatelem a najemcem.",
    duration: "3-7 dni",
    icon: "fileSignature",
  },
  {
    id: "pronajem-hotovo",
    number: 8,
    title: "Mame hotovo",
    description:
      "Probehne predani bytu nebo domu a finalni administrativni uzavreni celeho procesu.",
    duration: "1-3 dny",
    icon: "checkCircle",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Pravni jistota",
    text: "Smlouvy i financovani drzime pod kontrolou ve spolupraci s pravnimi specialisty.",
    detail:
      "Kazdy krok ma jasna pravidla. Resime rizika predem, hlidame terminy a bezpecnost plateb tak, aby byl obchod transparentni pro vsechny strany.",
  },
  {
    icon: Sparkles,
    title: "Lepci cena a podminky",
    text: "Nastavime strategii tak, aby vase nemovitost na trhu neztratila hodnotu.",
    detail:
      "Pracujeme s daty z regionu, profesionalne vyjednavame a drzime jednotnou komunikaci. Vysledkem je vyssi vynos i mensi prostor pro zbytecne slevy.",
  },
  {
    icon: UserRound,
    title: "Uspora casu",
    text: "Komunikaci se zajemci, prohlidky i administrativu bereme na sebe.",
    detail:
      "Mate prubezne informace, ale nemusite resit operativu. Soustredite se na sve priority, zatimco my ridime tempo, poradi kroku a navaznost celeho obchodu.",
  },
  {
    icon: SearchCheck,
    title: "Vyber kvalitnich zajemcu",
    text: "U pronajmu i prodeje pracujeme s proverovanim poptavek, ne jen s poctem kontaktu.",
    detail:
      "Lepci kvalita zajemcu znamena mene komplikaci, rychlejsi uzavreni a bezpecnejsi prubeh obchodu. Zamereni je na vysledek, ne na pocet telefonatu.",
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
      <h2 className="text-4xl font-semibold text-black md:text-5xl">{title}</h2>
      <div className="mx-auto mt-3 h-[6px] w-64 [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
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
            <h1 className="text-5xl font-semibold leading-tight text-white md:text-7xl [text-shadow:0_2px_32px_rgba(0,0,0,0.65)]">
              Prodej a pronajem nemovitosti
            </h1>
            <div className="mx-auto mt-3 h-[6px] w-80 [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />

            <p className="mx-auto mt-7 max-w-3xl text-lg font-medium leading-relaxed text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.75)]">
              Transparentni postup krok za krokem. Od prvni konzultace pres
              pripravu a marketing az po bezpecne dokonceni obchodu.
            </p>

            <div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-6">
              <a
                href="#jak-probiha-prodej"
                className="btn-main inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-7 py-4 text-base font-semibold text-black lg:col-span-2"
              >
                <KeyRound className="h-5 w-5" />
                Jak probiha prodej?
              </a>
              <Link
                href="/kontakt"
                className="btn-main inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur-sm lg:col-span-2"
              >
                <Mail className="h-5 w-5" />
                Kontaktujte nas
              </Link>
              <a
                href="#jak-probiha-pronajem"
                className="btn-main inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-7 py-4 text-base font-semibold text-black lg:col-span-2"
              >
                <SearchCheck className="h-5 w-5" />
                Jak probiha pronajem?
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
            title="Jak probiha prodej?"
            subtitle="Kazdy krok ma jasny cil, termin i vystup. Vzdy vite, co se deje, proc se to deje a jaky je navazujici krok."
          />
          <p className="mx-auto mt-5 max-w-4xl text-center text-base leading-relaxed text-black/70">
            Prodej vedeme jako rizeny proces. Nejde jen o inzerat, ale o
            nacasovani, kvalitu prezentace, praci se zajemci a bezpecne
            dotazeni smluvni casti. V kazde fazi hlidame tempo, komunikaci i
            konkretni obchodni cil.
          </p>
          <p className="mx-auto mt-3 max-w-4xl text-center text-base leading-relaxed text-black/70">
            U kazde nemovitosti nastavime strategii podle lokality, typu klienta
            a aktualni poptavky. Diky tomu nevznikaji zbytecne prodlevy a
            majitel dostava prubezne informace, ktere pomahaji delat dobra
            rozhodnuti.
          </p>
          <StepCarousel steps={saleSteps} />
          <p className="mt-8 inline-flex w-full items-center justify-center gap-2 text-center text-base font-medium text-black/70">
            <Hourglass className="h-4 w-4 text-[color:var(--gold2)]" />
            Celkovy odhad: priblizne 1-3 mesice podle trhu a typu nemovitosti.
          </p>
          <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-relaxed text-black/60">
            U dobre nacenenych nemovitosti v silne lokalite se proces typicky
            zkracuje. U specifickych nemovitosti muze byt naopak potreba delsiho
            vyjednavani a vice kol prohlidek.
          </p>
        </div>
      </section>

      <section
        id="jak-probiha-pronajem"
        className="border-t border-black/10 py-20 md:py-24 min-h-screen flex items-center"
      >
        <div className="mx-auto w-full max-w-screen-xl px-4">
          <SectionHeading
            title="Jak probiha pronajem?"
            subtitle="Pronajem byva rychlejsi nez prodej, ale klicovy je peclivy vyber najemce a kvalitne pripravena smluvni dokumentace."
          />
          <p className="mx-auto mt-5 max-w-4xl text-center text-base leading-relaxed text-black/70">
            U pronajmu je cilem nejen rychlost obsazeni, ale hlavne stabilita.
            Proto klademe duraz na provereni zajemcu, jasna pravidla najemniho
            vztahu a kvalitni predani nemovitosti.
          </p>
          <p className="mx-auto mt-3 max-w-4xl text-center text-base leading-relaxed text-black/70">
            Dobry pronajem znamena mene starosti pro majitele i najemce.
            Resime komunikaci, dokumentaci, predavaci protokoly i navazujici
            kroky tak, aby byl proces prehledny a pravne bezpecny.
          </p>
          <StepCarousel steps={rentSteps} />
          <p className="mt-8 inline-flex w-full items-center justify-center gap-2 text-center text-base font-medium text-black/70">
            <Hourglass className="h-4 w-4 text-[color:var(--gold2)]" />
            Celkovy odhad: priblizne 1-2 mesice podle lokality a poptavky.
          </p>
          <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-relaxed text-black/60">
            Pri silne poptavce se pronajem casto uzavre vyrazne rychleji.
            U narocnejsich dispozic nebo specifickych podminek pocitejte s
            delsim filtrovani zajemcu.
          </p>
        </div>
      </section>

      <section className="border-t border-black/10 py-20 md:py-24 min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-screen-xl px-4">
          <SectionHeading
            title="Proc prodat nebo pronajmout s nami"
            subtitle="Kombinujeme obchodni zkusenost, marketing, procesni rizeni a pravni jistotu v jednom celku."
          />
          <p className="mx-auto mt-5 max-w-4xl text-center text-base leading-relaxed text-black/70">
            Kazdy obchod stavime na datech, komunikaci a duvere. Klient ma
            prubezny prehled, jasne terminy a partnera, ktery hlida kvalitu
            vysledku od prvniho kroku az po podpis smluv.
          </p>
          <p className="mx-auto mt-3 max-w-4xl text-center text-base leading-relaxed text-black/70">
            V praxi to znamena mene nejistoty, rychlejsi rozhodovani a lepsi
            cenu nebo podminky. Presne to je role profesionalniho maklere.
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
            title="Zacnete jeste dnes"
            subtitle="Staci jeden kontakt. Navrhneme nejlepsi postup presne pro vasi situaci a vezmeme za nej odpovednost."
          />
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-black/70">
            At resite prodej, pronajem nebo jen potrebujete srovnat moznosti,
            pripravime jasne kroky bez zbytecnych komplikaci. Na zacatku
            nastavime realny plan a pak ho krok po kroku naplnime.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/kontakt"
              className="btn-main inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-8 py-3.5 text-base font-semibold text-black"
            >
              <Mail className="h-4 w-4" />
              Kontaktujte nas
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

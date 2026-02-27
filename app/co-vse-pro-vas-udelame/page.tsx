import type { Metadata } from "next";
import Image from "next/image";
import type { ComponentType } from "react";
import {
  Camera,
  CircleDollarSign,
  FileText,
  Flower2,
  HandCoins,
  Megaphone,
  ShieldCheck,
  Signature,
  Target,
  UserRound,
  Users,
} from "lucide-react";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Co vše pro vás uděláme | Nisa Centrum Reality",
  description:
    "Detailní přehled služeb při prodeji a pronájmu nemovitosti krok za krokem.",
  alternates: {
    canonical: `${SITE_URL}/co-vse-pro-vas-udelame`,
  },
};

type DetailCard = {
  id: string;
  title: string;
  text: string;
  appliesTo: string;
  icon: ComponentType<{ className?: string }>;
  imageSrc?: string;
};

const details: DetailCard[] = [
  {
    id: "konzultace",
    title: "Konzultace",
    text: "Na začátku si vyjasníme vaše cíle, termín, očekávání i stav nemovitosti. Navrhneme konkrétní postup, aby celý proces běžel plynule.",
    appliesTo: "Prodej i pronájem",
    icon: UserRound,
    imageSrc: "/konzultace.avif",
  },
  {
    id: "naceneni",
    title: "Nacenění",
    text: "Pracujeme s tržními daty i lokální zkušeností. Nastavíme cenu tak, aby byla konkurenceschopná a současně chránila hodnotu vaší nemovitosti.",
    appliesTo: "Prodej i pronájem",
    icon: HandCoins,
    imageSrc: "/naceneni.avif",
  },
  {
    id: "strategie",
    title: "Strategie",
    text: "Navrhneme konkrétní obchodní a marketingový postup podle typu nemovitosti, lokality i aktuální situace na trhu.",
    appliesTo: "Prodej i pronájem",
    icon: Target,
    imageSrc: "/strategie.avif",
  },
  {
    id: "prezentace",
    title: "Foto, video",
    text: "Zajistíme profesionální fotografie a video, aby nabídka působila důvěryhodně, přitažlivě a oslovila správné zájemce.",
    appliesTo: "Prodej i pronájem",
    icon: Camera,
    imageSrc: "/fotoVideo.avif",
  },
  {
    id: "homestaging",
    title: "Homestaging",
    text: "Připravíme nemovitost pro focení i prohlídky tak, aby vynikly její silné stránky a zvýšila se atraktivita inzerátu.",
    appliesTo: "Prodej i pronájem",
    icon: Flower2,
    imageSrc: "/homestaging.avif",
  },
  {
    id: "inzerce",
    title: "Inzerce a propagace",
    text: "Nemovitost publikujeme na relevantních portálech a podpoříme ji cílenou propagací. Sledujeme výsledky a průběžně upravujeme strategii.",
    appliesTo: "Prodej i pronájem",
    icon: Megaphone,
    imageSrc: "/inzerce.avif",
  },
  {
    id: "prohlidky",
    title: "Prohlídky a komunikace",
    text: "Organizujeme prohlídky, vedeme jednání a filtrujeme relevantní zájemce. Vy dostáváte přehledné informace i doporučení dalšího postupu.",
    appliesTo: "Prodej i pronájem",
    icon: Users,
    imageSrc: "/Prohlidky.avif",
  },
  {
    id: "zajemci",
    title: "Prověření zájemců",
    text: "Prověřujeme bonitu, spolehlivost i motivaci zájemců. Cílem je snížit rizika a vybrat nájemníka, který bude fungovat dlouhodobě.",
    appliesTo: "Pronájem",
    icon: ShieldCheck,
    imageSrc: "/provereniZajemcu.avif",
  },
  {
    id: "penb",
    title: "PENB průkaz en. nár.",
    text: "Průkaz energetické náročnosti budovy (PENB) je dokument, kterým se vypočítává spotřeba spotřebovávané energie budovy.",
    appliesTo: "Prodej",
    icon: FileText,
    imageSrc: "/PENB.avif",
  },
  {
    id: "financovani",
    title: "Zajištění financování",
    text: "Při prodeji umíme zájemcům pomoci se zajištěním financování. Díky tomu se může celý obchod uzavřít rychleji a s menším rizikem komplikací.",
    appliesTo: "Prodej",
    icon: CircleDollarSign,
    imageSrc: "/Financovani.avif",
  },
  {
    id: "smlouvy",
    title: "Smlouvy a podpisy",
    text: "Připravíme potřebnou dokumentaci, ohlídáme právní návaznosti a zajistíme bezpečný podpis i předání. Vše přehledně a bez chaosu.",
    appliesTo: "Prodej i pronájem",
    icon: Signature,
    imageSrc: "/Smlouvy.avif",
  },
];

export default function CoVseProVasUdelamePage() {
  return (
    <main
      className="min-h-screen pt-24"
      style={{
        background:
          "linear-gradient(180deg, var(--paper0), var(--paper1) 45%, var(--paper2))",
      }}
    >
      <div className="mx-auto max-w-screen-xl px-4 pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-black/50">
            NISA CENTRUM REALITY
          </p>
          <h1 className="mt-3 text-5xl font-semibold text-black md:text-6xl">
            <span className="inline-flex flex-col items-center">
              <span>Co vše pro vás uděláme</span>
              <span className="mt-3 h-[6px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
            </span>
          </h1>
          <p className="mt-4 text-base text-black/70 md:text-lg">
            Přehledně a krok za krokem. Níže vidíte, co pro vás zajišťujeme při
            prodeji i pronájmu a jak dlouho jednotlivé fáze obvykle trvají.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {details.map((item) => (
            <article
              key={item.id}
              id={item.id}
              className="group scroll-mt-28 flex h-full flex-col rounded-3xl border border-black/10 bg-white/90 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[color:var(--gold1)]/45 hover:shadow-xl"
            >
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-black/55">
                {item.appliesTo}
              </div>

              <h2 className="mt-3 text-xl font-semibold text-black">
                <span className="inline-flex flex-col">
                  <span className="inline-flex items-center gap-2">
                    <item.icon className="h-5 w-5 text-[color:var(--gold2)]" />
                    {item.title}
                  </span>
                  <span className="mt-2 h-[5px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)] transition duration-300 group-hover:brightness-110" />
                </span>
              </h2>

              <p className="mt-3 text-base leading-relaxed text-black/75">
                {item.text}
              </p>

              {item.imageSrc ? (
                <div className="mt-auto pt-4">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-black/10 bg-white">
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                      className="object-contain"
                    />
                  </div>
                  <div className="mt-3 flex h-11 items-center justify-center">
                    {item.id === "financovani" ? (
                      <a
                        href="http://www.tohavefinance.cz/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-main flex w-fit items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[color:var(--gold1)]/90"
                      >
                        <Users className="h-4 w-4" />
                        Naši specialisté
                      </a>
                    ) : item.id === "homestaging" ? (
                      <a
                        href="https://www.designbyterez.cz/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-main flex w-fit items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[color:var(--gold1)]/90"
                      >
                        <Users className="h-4 w-4" />
                        Naše specialistka
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="mt-auto pt-4">
                  <div className="rounded-2xl border border-black/10 bg-[linear-gradient(135deg,rgba(243,232,203,0.7),rgba(255,255,255,0.85))] p-4 text-sm text-black/55">
                    Prostor pro fotografii kroku (doplníme z public).
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>

      </div>
    </main>
  );
}












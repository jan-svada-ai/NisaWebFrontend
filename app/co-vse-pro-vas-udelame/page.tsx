import type { Metadata } from "next";
import { Clock3, FileText, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Co vše pro vás uděláme | Nisa Centrum Reality",
  description:
    "Detailni prehled sluzeb pri prodeji a pronajmu nemovitosti krok za krokem.",
};

const details = [
  {
    id: "prodej-konzultace",
    title: "Prodej: Konzultace",
    text: "Zjistime vase cile, casove moznosti a stav nemovitosti. Nastavime realistickou strategii prodeje i plan dalsich kroku.",
    time: "1-2 dny",
  },
  {
    id: "prodej-naceneni",
    title: "Prodej: Naceneni",
    text: "Porovname trzni data, konkurencni nabidky a potencial lokality. Vysledkem je cena, ktera je atraktivni pro trh a zaroven chrani hodnotu nemovitosti.",
    time: "1-3 dny",
  },
  {
    id: "prodej-prezentace",
    title: "Prodej: Foto a homestaging",
    text: "Pripravime nemovitost k prezentaci, zajistime foto i video a vytvorime text nabidky tak, aby inzerat pusobil profesionalne a duveryhodne.",
    time: "2-5 dni",
  },
  {
    id: "prodej-inzerce",
    title: "Prodej: Inzerce",
    text: "Nabidku publikujeme na dulezitych realitnich kanalech a doplnime ji cilenou propagaci, ktera oslovi spravne publikum v danem regionu.",
    time: "1 den",
  },
  {
    id: "prodej-prohlidky",
    title: "Prodej: Prohlidky",
    text: "Organizujeme prohlidky, komunikujeme se zajemci a sbirame relevantni zpetnou vazbu. Vedeni jednani drzime pevne v rukou.",
    time: "1-6 tydnu",
  },
  {
    id: "prodej-smlouvy",
    title: "Prodej: Smlouvy a podpisy",
    text: "Pripravime rezervacni i kupni dokumentaci a zajistime bezpecny prubeh podpisu i plateb s pravnim dohledem.",
    time: "1-3 tydny",
  },
  {
    id: "prodej-hotovo",
    title: "Prodej: Mame hotovo",
    text: "Predani, prevody a finalni administrativu dotahneme do detailu. Mate jistotu, ze nic nezustalo otevrene.",
    time: "1-2 dny",
  },
  {
    id: "pronajem-konzultace",
    title: "Pronajem: Konzultace",
    text: "Nastavime cile pronajmu, rozpocet i harmonogram. Domluvime rozsah sluzeb a odpovednost jednotlivych kroku.",
    time: "1-2 dny",
  },
  {
    id: "pronajem-naceneni",
    title: "Pronajem: Naceneni",
    text: "Stanovime trzni najemne tak, aby byt nebo dum nebyl pod cenou a soucasne se zbytecne neprodluzovala doba obsazeni.",
    time: "1 den",
  },
  {
    id: "pronajem-prezentace",
    title: "Pronajem: Foto a priprava inzeratu",
    text: "Pripravime kvalitni prezentaci a nabidku, ktera pritahne relevantni zajemce s vyssi sanci na dlouhodobe stabilni pronajem.",
    time: "1-3 dny",
  },
  {
    id: "pronajem-inzerce",
    title: "Pronajem: Inzerce",
    text: "Publikujeme nabidku, filtrujeme dotazy a prubezne vyhodnocujeme kvalitu poptavek podle vasich priorit.",
    time: "1 den",
  },
  {
    id: "pronajem-zajemci",
    title: "Pronajem: Provereni zajemcu",
    text: "Proverujeme bonitu, spolehlivost i motivaci zajemcu. Cilem je snizit rizika a vybrat najemnika, ktery bude fungovat dlouhodobe.",
    time: "2-5 dni",
  },
  {
    id: "pronajem-prohlidky",
    title: "Pronajem: Prohlidky",
    text: "Vedeme prohlidky profesionalne, srozumitelne a efektivne. Vy dostavate jasne doporuceni pro finalni vyber najemnika.",
    time: "1-3 tydny",
  },
  {
    id: "pronajem-smlouvy",
    title: "Pronajem: Smlouvy a podpisy",
    text: "Zajistime kvalitni najemni dokumentaci, podpisy i predavaci protokoly. Vse ma jasna pravidla a kontrolni body.",
    time: "2-5 dni",
  },
  {
    id: "pronajem-hotovo",
    title: "Pronajem: Mame hotovo",
    text: "Finalni predani probehne bezpecne a transparentne. Mate kompletnI dokumentaci a jistotu navazujicich kroku.",
    time: "1 den",
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
            Detailni popis kroku prodeje a pronajmu, vcetne casovych odhadu,
            odpovednosti a navaznosti jednotlivych fazi.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-5xl space-y-4">
          {details.map((item) => (
            <article
              key={item.id}
              id={item.id}
              className="scroll-mt-28 rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-black">{item.title}</h2>
              <p className="mt-2 text-base leading-relaxed text-black/75">
                {item.text}
              </p>
              <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-black/70">
                <Clock3 className="h-4 w-4 text-[color:var(--gold2)]" />
                Odhad: {item.time}
              </p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-5xl rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-black">Pravni a procesni jistota</h2>
          <p className="mt-2 text-base leading-relaxed text-black/75">
            Kazdy obchod vedeme tak, aby byl bezpecny pro vsechny strany. Hlidame
            navaznost kroku, dokumentaci i terminy prevodu. Diky tomu je cely
            proces citelny, predvidatelny a bez zbytecnych prodlev.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold text-black/70">
            <span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1.5">
              <ShieldCheck className="h-4 w-4 text-[color:var(--gold2)]" />
              Pravni dohled
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1.5">
              <FileText className="h-4 w-4 text-[color:var(--gold2)]" />
              Kompletni dokumentace
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

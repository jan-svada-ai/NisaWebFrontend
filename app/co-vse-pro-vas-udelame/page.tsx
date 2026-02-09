import type { Metadata } from "next";
import { Clock3, FileText, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Co vše pro Vás uděláme | Nisa Centrum Reality",
  description:
    "Detailní přehled služeb při prodeji a pronájmu nemovitostí krok za krokem.",
};

const details = [
  {
    id: "prodej-konzultace",
    title: "Prodej: Konzultace",
    text: "Zjistíme vaše cíle, časové možnosti a stav nemovitosti. Nastavíme realistickou strategii prodeje i plán dalších kroků.",
    time: "1-2 dny",
  },
  {
    id: "prodej-naceneni",
    title: "Prodej: Nacenění",
    text: "Porovnáme tržní data, konkurenční nabídky a potenciál lokality. Výsledkem je cena, která je atraktivní a zároveň chrání vaši hodnotu.",
    time: "1-3 dny",
  },
  {
    id: "prodej-prezentace",
    title: "Prodej: Foto a homestaging",
    text: "Připravíme nemovitost k prezentaci, zajistíme foto/video a vytvoříme text nabídky tak, aby inzerát působil profesionálně.",
    time: "2-5 dní",
  },
  {
    id: "prodej-inzerce",
    title: "Prodej: Inzerce",
    text: "Nabídku publikujeme na důležitých realitních kanálech a doplníme ji cílenou propagací, která osloví správné publikum.",
    time: "1 den",
  },
  {
    id: "prodej-prohlidky",
    title: "Prodej: Prohlídky",
    text: "Organizujeme prohlídky, komunikujeme se zájemci a sbíráme relevantní zpětnou vazbu. Vedení jednání držíme pevně v rukou.",
    time: "1-6 týdnů",
  },
  {
    id: "prodej-smlouvy",
    title: "Prodej: Smlouvy a podpisy",
    text: "Připravíme rezervační i kupní dokumentaci a zajistíme bezpečný průběh podpisů i plateb s právním dohledem.",
    time: "1-3 týdny",
  },
  {
    id: "prodej-hotovo",
    title: "Prodej: Máme hotovo",
    text: "Předání, převody a finální administrativu dotáhneme do detailu. Vy máte jistotu, že nic nezůstalo otevřené.",
    time: "1-2 dny",
  },
  {
    id: "pronajem-konzultace",
    title: "Pronájem: Konzultace",
    text: "Nastavíme cíle pronájmu, rozpočet a harmonogram. Domluvíme si rozsah služeb a odpovědnost jednotlivých kroků.",
    time: "1-2 dny",
  },
  {
    id: "pronajem-naceneni",
    title: "Pronájem: Nacenění",
    text: "Stanovíme tržní nájemné tak, aby byt/dům nebyl pod cenou a současně se zbytečně neprodlužovala doba obsazení.",
    time: "1 den",
  },
  {
    id: "pronajem-prezentace",
    title: "Pronájem: Foto a příprava inzerátu",
    text: "Připravíme kvalitní prezentaci a nabídku, která přitáhne relevantní zájemce s lepší šancí na dlouhodobý a stabilní nájem.",
    time: "1-3 dny",
  },
  {
    id: "pronajem-inzerce",
    title: "Pronájem: Inzerce",
    text: "Publikujeme nabídku, filtrujeme dotazy a průběžně vyhodnocujeme kvalitu poptávek podle vašich priorit.",
    time: "1 den",
  },
  {
    id: "pronajem-zajemci",
    title: "Pronájem: Prověření zájemců",
    text: "Prověřujeme bonitu, spolehlivost a motivaci zájemců. Cílem je snížit rizika a vybrat nájemníka, který bude fungovat dlouhodobě.",
    time: "2-5 dní",
  },
  {
    id: "pronajem-prohlidky",
    title: "Pronájem: Prohlídky",
    text: "Vedeme prohlídky profesionálně, srozumitelně a efektivně. Vy dostáváte jasné doporučení na výběr nájemníka.",
    time: "1-3 týdny",
  },
  {
    id: "pronajem-smlouvy",
    title: "Pronájem: Smlouvy a podpisy",
    text: "Zajistíme kvalitní nájemní dokumentaci, podpisy i předávací protokoly. Vše má jasná pravidla a kontrolní body.",
    time: "2-5 dní",
  },
  {
    id: "pronajem-hotovo",
    title: "Pronájem: Máme hotovo",
    text: "Finální předání proběhne bezpečně a transparentně. Máte kompletní dokumentaci a jistotu navazujících kroků.",
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
          <h1 className="mt-3 text-4xl font-semibold text-black md:text-5xl">
            Co vše pro Vás uděláme
          </h1>
          <div className="mx-auto mt-3 h-[6px] w-56 [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
          <p className="mt-4 text-base text-black/70 md:text-lg">
            Detailní popis kroků prodeje a pronájmu, včetně časových odhadů.
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
          <h2 className="text-xl font-semibold text-black">Právní a procesní jistota</h2>
          <p className="mt-2 text-base leading-relaxed text-black/75">
            Každý obchod vedeme tak, aby byl bezpečný pro všechny strany. Hlídáme
            návaznost kroků, dokumentaci i termíny převodů.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold text-black/70">
            <span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1.5">
              <ShieldCheck className="h-4 w-4 text-[color:var(--gold2)]" />
              Právní dohled
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1.5">
              <FileText className="h-4 w-4 text-[color:var(--gold2)]" />
              Kompletní dokumentace
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

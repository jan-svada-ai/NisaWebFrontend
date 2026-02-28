# SEO Audit Checklist

Poslední aktualizace: 2026-02-28

## Zdroj pravidel
- Google Search Essentials
- Google SEO Starter Guide
- Bing Webmaster Guidelines
- IndexNow / Seznam Webmaster doporučení

## Hlavní hledané záměry
### Primární transactional fráze
- realitní kancelář Liberec
- realitní makléř Liberec
- prodej nemovitosti
- prodej bytu
- prodej domu
- prodat byt
- prodat dům
- pronájem nemovitosti
- pronájem bytu
- pronájem domu
- pronajmout byt
- pronajmout dům
- ocenění nemovitosti zdarma
- ocenění nemovitosti
- odhad ceny nemovitosti
- odhad ceny bytu
- odhad ceny domu
- odhad ceny pozemku

### Sekundární podpůrné fráze
- realitní služby
- realitní služby Liberec
- bezpečný prodej nemovitosti
- profesionální prezentace nemovitosti
- právní servis při prodeji nemovitosti

## Stav implementace
### Technický základ
- [x] `robots.txt` generované přes Next metadata route
- [x] `sitemap.xml` generovaná přes Next metadata route
- [x] Canonical na klíčových stránkách
- [x] Legacy `/sluzby/*` řešené jako noindex + canonical
- [x] OG obrázek sjednocený přes `/og-logo.png`
- [x] Favicon / manifest / apple-touch-icon nasazené
- [x] GA4 nasazeno a funguje
- [x] Bing ověření nasazené přes `BingSiteAuth.xml`

### On-page SEO
- [x] Homepage metadata přepsaná na local + transactional intent
- [x] Homepage zdůrazňuje `ocenění nemovitosti zdarma`
- [x] Homepage přirozeně pokrývá `prodat byt`, `prodat dům`, `pronajmout byt`, `pronajmout dům`
- [x] Stránka `/nas-tym` má vlastní metadata a silnější local SEO text
- [x] Alt texty hlavních obrázků na homepage jsou smysluplné
- [x] Reference blok na homepage používá skutečné zdroje a odkazy
- [x] Poškozená diakritika v hlavních SEO souborech opravená

### Strukturovaná data
- [x] `RealEstateAgent` + `LocalBusiness` v globálním layoutu
- [x] `WebSite` v globálním layoutu
- [x] `FAQPage` JSON-LD na homepage
- [x] `WebPage` JSON-LD na homepage
- [x] `CollectionPage` JSON-LD na `/nas-tym`

### Obsah a interní relevance
- [x] Homepage cílí na `realitní kancelář Liberec`
- [x] Homepage cílí na `ocenění nemovitosti zdarma`
- [x] `/nas-tym` cílí na `realitní makléř Liberec`
- [x] `/oceneni-zdarma` cílí na odhad a ocenění
- [x] `/co-vse-pro-vas-udelame` přirozeně pokrývá `realitní služby` a `realitní služby Liberec`
- [x] `/nabidka` a detailové stránky zůstávají indexovatelné a v sitemapě

## Otevřené body
### Doporučeno řešit v dalším kole
- [x] `app/reference/page.tsx` převedeno na SSR nebo server fetch.
- [x] Pokrytí fráze `realitní služby Liberec` doplněno i na další důležité stránce mimo homepage.
- [x] Page-level structured data doplněna i pro `/oceneni-zdarma`.
- [ ] Prověřit, zda se v Google postupně indexují aktualizované snippets po nasazení nových title/description.

### Manuální mimo kód
- [ ] Dál sbírat Google recenze a odpovídat na ně
- [ ] Dál pracovat s Google Business Profile
- [ ] Průběžně kontrolovat GSC: indexace, canonical, Coverage, Queries
- [ ] Průběžně kontrolovat Bing Webmaster Tools a Seznam Webmaster
- [ ] Přidávat kvalitní externí odkazy a lokální citace

## Poznámky
- Bez zakládání nových stránek jsme posílili hlavní commercial intent přes homepage a `/nas-tym`.
- Největší zbývající technický SEO dluh v kódu je SSR pro reference.
- Build po aktuálních úpravách prochází.
- Lokální build může u `sitemap.xml` spadnout do static fallbacku, pokud neběží backend na lokální API adrese. Na produkci je důležité ověřit, že sitemap tahá živá data z VPS backendu.

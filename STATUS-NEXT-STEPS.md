# STATUS / Next Steps

Posledni aktualizace: 2026-03-09

## Hotovo
- [x] Web bezi na VPS (`https://www.nisacentrum.cz`) za Nginx + PM2.
- [x] `robots.txt` a `sitemap.xml` jsou publikovane a funkcni.
- [x] Bing verifikace soubor (`BingSiteAuth.xml`) je nasazeny.
- [x] GA4 tag je nasazeny v layoutu (`G-SHJRYT54LL`).
- [x] CeMAP endpointy bezi pres web proxy (`/api/cemap/*`).
- [x] Konverzni udalosti `generate_lead` jsou napojene na hlavni formulare:
  - kontakt (`/kontakt`)
  - presne oceneni (`/oceneni-zdarma` kontaktni formular)
  - online oceneni CeMAP (`/oceneni-zdarma` kalkulace)
  - formular u detailu inzeratu
  - formular u detailu maklere
- [x] Globalni tracking kliknuti na `tel:` a `mailto:` odkazy (`contact_click`).
- [x] Opravena rozbita diakritika ve footeru, metadata a structured data textech.

## Rozpracovano
- [ ] Oznacit v GA4 udalost `generate_lead` jako klicovou udalost (konverze).
- [ ] Dodelat 2-3 jednoduche custom reporty v GA4 (leady dle zdroje/stranky).

## Rucni kroky (nelze automatizovat z kodu)
- [ ] Google Search Console:
  - [ ] URL inspection + Request indexing pro hlavni stranky.
  - [ ] Kontrola pokryti indexace po 3-7 dnech.
- [ ] Seznam Webmaster:
  - [ ] Vlozit sitemapu.
  - [ ] Kontrola chyb crawlovani.
- [ ] Bing Webmaster:
  - [ ] Overit sitemapu + coverage po 2-3 dnech.
- [ ] CeMAP:
  - [ ] Potvrdit produkcni provoz bez testovacich omezeni.
  - [ ] Udrzovat/monitorovat limitaci dotazu.

## Poznamka k praci
- Tento soubor aktualizuj po kazdem vetsim kroku (deploy, SEO zmena, analytics zmena),
  at se neopakuji uz hotove veci.

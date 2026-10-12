# Clover Pet & House Sitting — web pro Moniku

Statický web (čisté HTML/CSS/JS, žádný build). Běží na Netlify na **cloverpetsit.com**
(doména koupená přes Netlify, Netlify DNS). Starší domény cloverpetsitting.com / .co.uk
(Fasthosts) zatím na Netlify nevedou — viz TODO.
Oficiální název: **Clover Pet & House Sitting** (Monika Janalikova, Frome, Somerset).

## Struktura

```
web/
├── index.html          hlavní stránka (one-page)
├── terms.html          Terms & Conditions (přepis Moničina PDF, 19 sekcí)
├── css/styles.css      design systém (paleta, typografie, komponenty)
├── js/main.js          menu, galerie/lightbox, formulář, animace
├── assets/
│   ├── favicon.svg     zjednodušený čtyřlístek (detailní logo je na 16 px nečitelné)
│   └── img/
│       ├── logo-approved.webp  schválené transparentní logo pro web
│       ├── clover-mark.png     čtyřlístek vytažený ze schváleného loga
│       ├── about-silas.jpg     plnohodnotný převod dodané HEIC fotky
│       ├── og.jpg      náhled pro sdílení (s logem)
│       ├── gallery/    g01–g24 (ořezy z Moničina náhledu galerie)
│       └── reviews/    screenshoty 6 recenzí
├── robots.txt, sitemap.xml
├── llms.txt             shrnutí webu pro AI chatboty/asistenty (konvence llms.txt)
├── netlify.toml          .co.uk→.com redirect, čistá URL /terms bez .html
```

Lokální náhled: `npx serve . -l 5260` (nebo launch config **moni-web**).

## Co je hotové

- One-page web: hero → statistiky → About → Services + Jak to
  funguje (video hovor → faktura → sit) → Recenze (screenshoty) → Galerie →
  veřejný Google kalendář → Oblast → kontaktní formulář/e-mail → patička.
- `terms.html` = věrný přepis skutečného PDF „Clover Pet & House Sitting
  Terms & Conditions" (video call, platba převodem po faktuře, storno 7 dní,
  extended care fee, předání po 20:00 = další noc…).
- Logo: schválený transparentní kruhový odznak v hero sekci a patičce; čtyřlístek z něj v hlavičce.
- Barvy: krémová + jetelová zelená + zlatá „somerset day" (dle reálné byTilly
  palety) + meruňková. Mobile-first, SEO bez veřejného telefonu a úplné adresy.
- Recenze bez zmínky platformy; jedna z nich je použita jen jako textový citát.
- Kontaktní formulář přes **Netlify Forms** (formulář `enquiry`, AJAX, honeypot `bot-field`).
  Monika si v Netlify nastavuje e-mailová upozornění (Forms → Submission notifications);
  pole `email` nastaví Reply-To na klienta. Návod: `../Navod-kontaktni-formular.pdf`.

## TODO před spuštěním

1. **Další fotky v plné kvalitě** — pokud Monika pošle další originály, nahradit
   malé ořezy v `assets/img/gallery/`.
2. **Logo redesign** — návrh `assets/previews/logo-concept-v1.png` je pouze ke
   schválení a zatím není nasazený.
3. **Starší domény** — cloverpetsitting.com a .co.uk mají DNS u Fasthosts
   (ns*.livedns.co.uk) a míří na jejich parkovací server. Pokud je Monika chce
   zachovat: přidat je v Netlify (Domain management) a u Fasthosts nasměrovat DNS
   na Netlify; přesměrování na cloverpetsit.com už je v `netlify.toml`.
4. **Nasazování** — Monika nahrává ručně (Deploys → přetáhnout složku), Netlify
   není napojené na GitHub. Po nasazení Google Search Console + Business Profile.

## Poznámky k údajům na webu

- Veřejný web nezobrazuje telefon ani úplnou obchodní adresu.
- „50+ five-star reviews and references" je Moničin aktuální údaj.
- Statistiky (8+ let, 5.0★, 100 %) odpovídají profilu k červenci 2026.
- Na webu záměrně nejsou ceny — sazba je dle T&C individuální.

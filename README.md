# Vraagbaak · voorstelpagina

De voorstelpagina voor de Vraagbaak als één HTML-pagina, met wachtwoord beveiligd.
De inhoud wordt versleuteld met [StatiCrypt](https://github.com/robinmoisson/staticrypt) (AES-256).
Op GitHub staat alleen de versleutelde versie. Zonder wachtwoord is er niets te lezen, ook niet in de broncode.
De pagina werkt op laptop en telefoon.

## Wat staat waar

| Map/bestand | Wat | Op GitHub? |
|---|---|---|
| `src/page.html` | De pagina (tekst, opmaak, voortgang van de taken) | **Nee** |
| `src/logo.svg` | Mulderblauw-logo | **Nee** |
| `build/` | Onversleutelde, gebouwde pagina | **Nee** |
| `docs/index.html` | Versleutelde pagina, dit is wat GitHub Pages toont | Ja |
| `tools/build.mjs` | Bouwscript | Ja |
| `.staticrypt.json` | Zout voor de versleuteling (geen geheim) | Ja |

`.gitignore` houdt `src/` en `build/` buiten Git, zodat de leesbare versie nooit online komt.

## Snelste route: uploaden via de GitHub-website (geen Terminal)

1. Maak de versleutelde pagina (zie stap 1–4 hieronder) of vraag Claude om een kant-en-klaar bestand.
2. Ga naar github.com → **New repository** → naam `vraagbaak-voorstel` → **Public** → **Create repository**.
3. Klik op **uploading an existing file** en sleep alleen de map **`docs`** erin (met `index.html` en `.nojekyll`). Klik op **Commit changes**.
4. Ga naar **Settings → Pages** → *Deploy from a branch* → branch `main`, map `/docs` → **Save**.
5. Na een minuut staat de pagina op `https://<jouw-gebruikersnaam>.github.io/vraagbaak-voorstel/`.

Upload nooit `src/` of `build/`: daarin staat de leesbare versie.

## Eenmalig: online zetten

1. Installeer [Node.js](https://nodejs.org) (LTS) als je dat nog niet hebt.
2. Open Terminal in deze map en run `npm install`.
3. Kies een sterk wachtwoord van **minimaal 4 losse woorden** (bijvoorbeeld `kozijn-lantaarn-bever-tegel`).
   Iedereen met de link kan het versleutelde bestand downloaden en eindeloos wachtwoorden proberen, dus een kort wachtwoord is niet veilig.
4. Bouw en versleutel:
   ```bash
   VRAAGBAAK_PASSWORD='jouw-wachtwoord-hier' npm run encrypt
   ```
5. Maak op GitHub een nieuwe repository, bijvoorbeeld `vraagbaak-voorstel`. Kies **Public**: GitHub Pages is gratis voor publieke repositories, en de inhoud is toch versleuteld.
6. Zet de bestanden online:
   ```bash
   git init
   git add .
   git commit -m "Vraagbaak voorstel"
   git branch -M main
   git remote add origin https://github.com/<jouw-gebruikersnaam>/vraagbaak-voorstel.git
   git push -u origin main
   ```
7. Ga op GitHub naar **Settings → Pages**. Kies bij *Source*: **Deploy from a branch**, branch `main`, map `/docs`, en klik op **Save**.
8. Na een minuut staat de pagina op `https://<jouw-gebruikersnaam>.github.io/vraagbaak-voorstel/`.

Stuur de link per mail en het wachtwoord via een ander kanaal (Teams of sms), nooit samen in één bericht.

## Bijwerken (bijvoorbeeld de voortgang)

1. Pas `src/page.html` aan. De taken staan onderaan in de lijst `TASKS`: zet de `0` achter een taak op `1` als hij klaar is.
   Pas ook de datum aan bij "Bijgewerkt op".
2. Run opnieuw:
   ```bash
   VRAAGBAAK_PASSWORD='jouw-wachtwoord-hier' npm run encrypt
   git add docs && git commit -m "Voortgang bijgewerkt" && git push
   ```
Gebruik hetzelfde wachtwoord, anders moeten mensen opnieuw inloggen met het nieuwe.

## Goed om te weten

- **Wachtwoord vergeten = pagina opnieuw versleutelen** met een nieuw wachtwoord. Er is geen herstel.
- **Iemand de toegang afnemen** kan alleen door een nieuw wachtwoord te kiezen en dat aan de anderen te geven.
- **"Onthoud mij"** bewaart de toegang 30 dagen in die browser.
- **Bewaar `src/` goed.** Die map staat niet op GitHub. Zet deze projectmap in je back-up (of in een aparte, privé GitHub-repository), anders kun je de pagina niet meer bijwerken.
- **Zoekmachines**: de pagina vraagt Google om hem niet op te nemen. Zelfs als iemand hem vindt, ziet die alleen het wachtwoordscherm.

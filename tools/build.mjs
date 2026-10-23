// Bouwt de Vraagbaak-voorstelpagina.
// 1. src/page.html + src/logo.svg  -> build/plain.html (volledige HTML, NIET publiceren)
// 2. build/plain.html + wachtwoord -> docs/index.html (versleuteld, wel publiceren)
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";

const root = new URL("..", import.meta.url).pathname;
const page = readFileSync(root + "src/page.html", "utf8");
const logo = readFileSync(root + "src/logo.svg", "utf8").trim();
if (!page.includes("<!--LOGO-->")) throw new Error("Logo-plek <!--LOGO--> ontbreekt in src/page.html");
const body = page.replace("<!--LOGO-->", logo);

const full = `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="robots" content="noindex,nofollow">
<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>
</head>
<body>
${body}
</body>
</html>
`;
mkdirSync(root + "build", { recursive: true });
writeFileSync(root + "build/plain.html", full);
writeFileSync(root + "build/artifact.html", body);
console.log("build/plain.html klaar");

if (process.argv.includes("--encrypt")) {
  const pw = process.env.VRAAGBAAK_PASSWORD;
  if (!pw || pw.length < 12) throw new Error("Zet VRAAGBAAK_PASSWORD (minimaal 12 tekens) voordat je versleutelt.");
  mkdirSync(root + "docs", { recursive: true });
  execFileSync("npx", ["staticrypt", "build/plain.html", "-d", "docs", "--short",
    "--remember", "30",
    "--template-title", "Vraagbaak · Mulderblauw",
    "--template-instructions", "Voer het wachtwoord in dat je van Kim hebt gekregen.",
    "--template-button", "Openen",
    "--template-placeholder", "Wachtwoord",
    "--template-remember", "Onthoud mij 30 dagen",
    "--template-error", "Onjuist wachtwoord",
    "--template-color-primary", "#605243",
    "--template-color-secondary", "#f2eee8",
    "-p", pw], { cwd: root, stdio: "inherit", env: process.env });
  // staticrypt keeps the input file name; GitHub Pages needs index.html
  execFileSync("mv", ["docs/plain.html", "docs/index.html"], { cwd: root });
  writeFileSync(root + "docs/.nojekyll", "");
  console.log("docs/index.html versleuteld");
}

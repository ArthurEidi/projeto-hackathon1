// Tira screenshots de passos de aula em 400 x 860 px (tela de celular), para conferência visual.
// Precisa do app em modo dev (npx vite --port <porta>), pois usa o atalho "?passo=N".
//
// Uso:  node scripts/captura-aula.mjs <porta> <pasta-de-saida> <pilar/setor/slug>[:passos] ...
//   passos: "3" (um passo), "1-6" (intervalo) ou omitido (todos os passos da aula).
// Ex.:  node scripts/captura-aula.mjs 5210 ../capturas geometria/trigonometria/radianos-e-ciclo-trigonometrico:4 algebra/funcoes/funcao-afim
// Saída: <pasta>/<slug>-p<N>.png. Mostra só o estado inicial de cada passo (não arrasta nem clica).
// Navegador: variável NAVEGADOR, ou Edge/Chrome nos caminhos padrão do Windows.
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [porta, saida, ...alvos] = process.argv.slice(2);
if (!porta || !saida || alvos.length === 0) {
  console.error("Uso: node scripts/captura-aula.mjs <porta> <pasta-de-saida> <pilar/setor/slug>[:passos] ...");
  process.exit(1);
}
const navegador = [
  process.env.NAVEGADOR,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
].find((p) => p && existsSync(p));
if (!navegador) throw new Error("Navegador não encontrado; defina NAVEGADOR com o caminho do Chrome ou Edge.");
mkdirSync(saida, { recursive: true });

const depura = 9300 + Math.floor(Math.random() * 500);
const proc = spawn(navegador, [
  "--headless=new", "--disable-gpu", `--remote-debugging-port=${depura}`,
  `--user-data-dir=${mkdtempSync(join(tmpdir(), "captura-"))}`, "about:blank",
], { stdio: "ignore" });
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

let alvo;
for (let i = 0; i < 50 && !alvo; i++) {
  await espera(200);
  try {
    const lista = await (await fetch(`http://127.0.0.1:${depura}/json`)).json();
    alvo = lista.find((t) => t.type === "page");
  } catch { /* ainda subindo */ }
}
if (!alvo) { proc.kill(); throw new Error("Não consegui conectar ao navegador."); }

const ws = new WebSocket(alvo.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let seq = 0;
const pend = new Map();
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pend.has(m.id)) { pend.get(m.id)(m.result ?? m); pend.delete(m.id); }
});
const cdp = (method, params = {}) => new Promise((r) => { const id = ++seq; pend.set(id, r); ws.send(JSON.stringify({ id, method, params })); });

await cdp("Emulation.setDeviceMetricsOverride", { width: 400, height: 860, deviceScaleFactor: 1, mobile: true });

for (const a of alvos) {
  const [caminho, faixa] = a.split(":");
  const slug = caminho.split("/").pop();
  let passos;
  if (faixa) {
    const [ini, fim] = faixa.split("-").map(Number);
    passos = Array.from({ length: (fim ?? ini) - ini + 1 }, (_, k) => ini + k);
  } else {
    const aula = JSON.parse(readFileSync(`content/${caminho}/aula-01.json`, "utf8"));
    passos = aula.steps.map((_, k) => k + 1);
  }
  for (const n of passos) {
    await cdp("Page.navigate", { url: "about:blank" });
    await cdp("Page.navigate", { url: `http://localhost:${porta}/#/aula/${caminho}/aula-01?passo=${n}` });
    // Espera a aula aparecer (o vite pode estar recompilando) e mais um pouco para as animações.
    for (let t = 0; t < 40; t++) {
      await espera(250);
      const r = await cdp("Runtime.evaluate", { expression: "document.body.innerText.length", returnByValue: true });
      if ((r.result?.value ?? 0) > 20) break;
    }
    await espera(1500);
    const { data } = await cdp("Page.captureScreenshot", { format: "png" });
    const arq = join(saida, `${slug}-p${n}.png`);
    writeFileSync(arq, Buffer.from(data, "base64"));
    console.log(arq);
  }
}
ws.close();
proc.kill();

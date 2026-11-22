// Capturas reais do app para a landing page e para a documentação (21/11).
// Na raiz do repositório, rode npx vite --port <porta> --strictPort em outro terminal.
// Uso: node scripts/captura-telas.mjs <porta> [pasta-de-saida=docs/screenshots]
// Cada captura abre o app num navegador headless e chega ao estado mostrado por cliques e teclado,
// como um aluno faria (o atalho de desenvolvimento ?passo=N só escolhe o passo inicial). Nada é editado
// na página. prefers-reduced-motion fica ligado para não capturar animações pela metade (a bola do
// lançamento vai direto ao ponto de queda; a conta é a mesma).
// Navegador: variável NAVEGADOR, ou Edge/Chrome nos caminhos padrão do Windows.
import { once } from "node:events";
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setTimeout as espera } from "node:timers/promises";

const [porta, pasta = "docs/screenshots"] = process.argv.slice(2);
if (!/^\d+$/.test(porta ?? "")) {
  console.error("Uso: node scripts/captura-telas.mjs <porta> [pasta-de-saida]");
  process.exit(1);
}
const base = "http://localhost:" + porta;
const navegador = [
  process.env.NAVEGADOR,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
].find((p) => p && existsSync(p));
if (!navegador) throw new Error("Navegador não encontrado; defina NAVEGADOR.");

const DESKTOP = { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false };
const CELULAR = { width: 390, height: 844, deviceScaleFactor: 2, mobile: true };

/** Roteiro: cada item abre uma tela, faz as ações e salva um PNG. */
const ROTEIRO = [
  { arquivo: "01-inicio.png", tela: DESKTOP, url: "/#/", limpar: true, depois: [] },
  { arquivo: "02-disciplinas.png", tela: DESKTOP, url: "/#/", depois: [["rolar", ".faixa"]] },
  { arquivo: "03-trilha-matematica.png", tela: DESKTOP, url: "/#/materia/matematica", depois: [["clicar", "Vamos lá"], ["clicar", "Álgebra"], ["clicarSeletor", '[aria-controls^="painel-s:algebra/funcoes"]'], ["clicarSeletor", '[aria-controls="painel-u:algebra/funcoes/funcao-quadratica"]']] },
  { arquivo: "04-aula-funcao-quadratica.png", tela: DESKTOP, url: "/#/aula/algebra/funcoes/funcao-quadratica/aula-01?passo=2", depois: [["slider", 0, "ArrowLeft", 20]] },
  { arquivo: "05-questao-volei.png", tela: DESKTOP, url: "/#/aula/algebra/funcoes/saque-de-volei-enem-2022/aula-01?passo=3", depois: [["slider", 0, "ArrowRight", 2]] },
  { arquivo: "06-fisica-lancamento.png", tela: DESKTOP, url: "/#/aula/fisica/cinematica/lancamento-obliquo/aula-01?passo=2", depois: [["clicar", "Lançar"], ["esperar", 600], ["slider", 0, "ArrowRight", 6], ["clicar", "Lançar de novo"], ["esperar", 600]] },
  { arquivo: "07-quimica-solucoes.png", tela: DESKTOP, url: "/#/aula/quimica/solucoes/concentracao-comum/aula-01?passo=3", depois: [["slider", 0, "ArrowRight", 5], ["slider", 1, "ArrowLeft", 5]] },
  { arquivo: "08-feedback-questao.png", tela: DESKTOP, url: "/#/aula/algebra/funcoes/saque-de-volei-enem-2022/aula-01?passo=5", depois: [["clicar", "C) Apenas nos ginásios I, II e III."], ["clicar", "Verificar"]] },
  { arquivo: "09-conclusao.png", tela: DESKTOP, url: "/#/aula/algebra/funcoes/saque-de-volei-enem-2022/aula-01?passo=6", depois: [["clicar", "Concluir aula"], ["esperar", 400]] },
  { arquivo: "10-inicio-com-progresso.png", tela: DESKTOP, url: "/#/", depois: [["rolar", ".jornada"]] },
  { arquivo: "11-celular-inicio.png", tela: CELULAR, url: "/#/", depois: [] },
  { arquivo: "12-celular-fisica.png", tela: CELULAR, url: "/#/aula/fisica/cinematica/lancamento-obliquo/aula-01?passo=4", depois: [["slider", 0, "ArrowLeft", 6], ["clicar", "Lançar"], ["esperar", 600]] },
  { arquivo: "13-celular-questao-volei.png", tela: CELULAR, url: "/#/aula/algebra/funcoes/saque-de-volei-enem-2022/aula-01?passo=4", depois: [["clicar", "21,67 m"], ["clicar", "Verificar"]] },
];

function conectar(ws) {
  let seq = 0;
  const pendentes = new Map();
  ws.addEventListener("message", ({ data }) => {
    const msg = JSON.parse(data);
    if (msg.id) pendentes.get(msg.id)?.(msg);
  });
  const cdp = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = ++seq;
      const timer = setTimeout(() => reject(new Error("Tempo limite no CDP: " + method)), 20000);
      pendentes.set(id, (msg) => {
        clearTimeout(timer);
        pendentes.delete(id);
        if (msg.error) reject(new Error(method + ": " + msg.error.message));
        else resolve(msg.result);
      });
      ws.send(JSON.stringify({ id, method, params }));
    });
  const avaliar = async (fn, ...args) => {
    const r = await cdp("Runtime.evaluate", { expression: "(" + fn.toString() + ")(..." + JSON.stringify(args) + ")", returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
    return r.result.value;
  };
  return { cdp, avaliar };
}

// Funções executadas na página.
function clicarTexto(texto) {
  const alvo = [...document.querySelectorAll("button, a")].find((b) => b.textContent.trim() === texto && !b.disabled);
  if (!alvo) return "não achei: " + texto;
  alvo.click();
  return "ok";
}
function clicarSeletor(seletor) {
  const alvo = document.querySelector(seletor);
  if (!alvo) return "não achei: " + seletor;
  alvo.click();
  return "ok";
}
async function moverSlider(indice, tecla, vezes) {
  const trilho = document.querySelectorAll(".slider__track")[indice];
  if (!trilho) return "sem slider " + indice;
  trilho.focus();
  for (let i = 0; i < vezes; i++) {
    trilho.dispatchEvent(new KeyboardEvent("keydown", { key: tecla, bubbles: true }));
    await new Promise((r) => setTimeout(r, 30));
  }
  trilho.blur();
  return "ok";
}
function rolar(seletor) {
  const el = document.querySelector(seletor);
  if (!el) return "não achei: " + seletor;
  el.scrollIntoView({ block: "start" });
  const cont = el.closest(".pagina__conteudo");
  if (cont) cont.scrollTop -= 24;
  return "ok";
}
function pronto() {
  return document.fonts.status === "loaded" && !document.querySelector("vite-error-overlay") && Boolean(document.querySelector(".pagina, .step, .finish"));
}

const perfil = mkdtempSync(join(tmpdir(), "captura-telas-"));
const proc = spawn(navegador, ["--headless=new", "--disable-gpu", "--disable-extensions", "--hide-scrollbars", "--remote-debugging-port=0", "--user-data-dir=" + perfil, "about:blank"], { stdio: "ignore", windowsHide: true });
let ws;
try {
  let alvo;
  for (let i = 0; i < 50 && !alvo; i++) {
    await espera(200);
    const arq = join(perfil, "DevToolsActivePort");
    if (!existsSync(arq)) continue;
    try {
      const depura = readFileSync(arq, "utf8").split(/\r?\n/)[0];
      alvo = (await (await fetch("http://127.0.0.1:" + depura + "/json")).json()).find((t) => t.type === "page");
    } catch { /* ainda iniciando */ }
  }
  if (!alvo) throw new Error("Não consegui conectar ao navegador.");
  ws = new WebSocket(alvo.webSocketDebuggerUrl);
  await once(ws, "open");
  const { cdp, avaliar } = conectar(ws);
  await cdp("Page.enable");
  await cdp("Runtime.enable");
  await cdp("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  mkdirSync(pasta, { recursive: true });
  const log = [];
  for (const item of ROTEIRO) {
    await cdp("Emulation.setDeviceMetricsOverride", item.tela);
    if (item.limpar) {
      await cdp("Page.navigate", { url: base + "/#/" });
      await espera(1500);
      await avaliar(() => localStorage.clear());
    }
    await cdp("Page.navigate", { url: "about:blank" });
    await cdp("Page.navigate", { url: base + item.url });
    for (let i = 0; i < 100 && !(await avaliar(pronto).catch(() => false)); i++) await espera(150);
    await espera(700);
    for (const [acao, ...args] of item.depois) {
      let r = "ok";
      if (acao === "clicar") r = await avaliar(clicarTexto, ...args);
      if (acao === "clicarSeletor") r = await avaliar(clicarSeletor, ...args);
      if (acao === "slider") r = await avaliar(moverSlider, ...args);
      if (acao === "rolar") r = await avaliar(rolar, ...args);
      if (acao === "esperar") await espera(args[0]);
      if (r !== "ok") log.push(item.arquivo + ": " + r);
      await espera(350);
    }
    await espera(500);
    const { data } = await cdp("Page.captureScreenshot", { format: "png" });
    writeFileSync(join(pasta, item.arquivo), Buffer.from(data, "base64"));
    console.log("ok " + item.arquivo);
  }
  if (log.length) console.log("Avisos:\n" + log.join("\n"));
} finally {
  try {
    proc.kill();
  } catch { /* já saiu */ }
  ws?.close();
  await espera(500);
  try {
    rmSync(perfil, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
  } catch { /* perfil em uso */ }
}

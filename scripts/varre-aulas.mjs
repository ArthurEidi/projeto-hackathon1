// Varre o estado inicial dos passos em 400 × 860 px e a abertura do treino.
// Na raiz do repositório, rode npx vite --port <porta> --strictPort em outro terminal.
// Uso: node scripts/varre-aulas.mjs <porta> [filtro-de-slug]
// O filtro procura um trecho do slug. A execução completa grava docs/visual/varredura-b44.md;
// com filtro, o relatório sai no terminal. Requer Node com WebSocket global.
// Navegador: variável NAVEGADOR, ou Edge/Chrome nos caminhos padrão do Windows.
// VARREDURA_SEM_SANDBOX=1 permite rodar onde o sandbox do navegador não inicializa.
import { once } from "node:events";
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setTimeout as espera } from "node:timers/promises";

const [porta, filtro, ...extras] = process.argv.slice(2);
if (!/^\d+$/.test(porta ?? "") || Number(porta) < 1 || Number(porta) > 65535 || extras.length) {
  console.error("Uso: node scripts/varre-aulas.mjs <porta> [filtro-de-slug]");
  process.exit(1);
}
const base = "http://localhost:" + porta;
const largura = 400;
const altura = 860;
const navegador = [
  process.env.NAVEGADOR,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
].find((p) => p && existsSync(p));
if (!navegador) throw new Error("Navegador não encontrado; defina NAVEGADOR com o caminho do Chrome ou Edge.");

const json = (arquivo) => JSON.parse(readFileSync(arquivo, "utf8"));
const aulas = [];
for (const p of json("content/taxonomy.json").pilares) {
  for (const s of p.setores) {
    for (const u of s.unidades) {
      if (filtro && !u.id.includes(filtro)) continue;
      for (const aula of u.aulas) {
        if (!aula.arquivo) continue;
        aulas.push({ rota: [p.id, s.id, u.id, aula.id].join("/"), ...json("content/" + aula.arquivo) });
      }
    }
  }
}
if (!aulas.length) throw new Error("Nenhuma aula publicada corresponde ao filtro.");

function conectar(ws) {
  let seq = 0;
  const pendentes = new Map();
  const eventos = [];
  ws.addEventListener("close", () => {
    for (const concluir of pendentes.values()) concluir({ error: { message: "Conexão com o navegador encerrada." } });
  });
  ws.addEventListener("message", ({ data }) => {
    const msg = JSON.parse(data);
    if (msg.id) {
      const concluir = pendentes.get(msg.id);
      concluir?.(msg);
      return;
    }
    const p = msg.params;
    if (msg.method === "Runtime.exceptionThrown") {
      const e = p.exceptionDetails;
      eventos.push(["Exceção da página", e.exception?.description ?? e.text]);
    }
    if (msg.method === "Runtime.consoleAPICalled" && p.type === "error") {
      const detalhe = p.args.map((a) => a.value ?? a.description ?? a.unserializableValue ?? a.type).join(" ");
      eventos.push(["console.error", detalhe]);
    }
  });

  function cdp(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++seq;
      const timer = setTimeout(() => {
        pendentes.delete(id);
        reject(new Error("Tempo limite no CDP: " + method));
      }, 10000);
      pendentes.set(id, (msg) => {
        clearTimeout(timer);
        pendentes.delete(id);
        if (msg.error) reject(new Error(method + ": " + msg.error.message));
        else resolve(msg.result);
      });
      if (ws.readyState !== WebSocket.OPEN) {
        pendentes.delete(id);
        clearTimeout(timer);
        reject(new Error("Conexão com o navegador encerrada."));
        return;
      }
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async function avaliar(fn, ...args) {
    const expression = "(" + fn.toString() + ")(..." + JSON.stringify(args) + ")";
    const r = await cdp("Runtime.evaluate", { expression, returnByValue: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
    return r.result.value;
  }
  return { cdp, avaliar, eventos };
}

// Executada no navegador depois de o React montar a tela.
function medir(tipo, alternativas, largura, figuraTreino) {
  const visivel = (el) => {
    if (!el || !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) return false;
    const { width, height } = el.getBoundingClientRect();
    return width > 0 && height > 0;
  };
  const descricao = (el) => el.localName + (el.id ? "#" + el.id : "") +
    [...el.classList].slice(0, 3).map((c) => "." + c).join("");
  const problemas = [];
  const falta = (detalhe) => problemas.push([tipo === "treino" ? "Treino não abriu" : "Passo não renderizou", detalhe]);
  const erro = document.querySelector(".error-box, .stage__error, vite-error-overlay");
  if (erro) falta(erro.textContent?.trim() || descricao(erro));

  const abaixo = (seletor) => document.querySelector(".step " + seletor);
  const precisa = (seletor) => {
    const el = abaixo(seletor);
    if (!visivel(el)) falta("Elemento esperado ausente ou invisível: " + seletor);
    return el;
  };
  const opcoes = () => {
    const grupo = precisa(".options");
    const total = [...(grupo?.querySelectorAll("button") ?? [])].filter(visivel).length;
    if (total !== alternativas) falta("Alternativas visíveis: " + total + " de " + alternativas);
  };
  const figura = () => {
    const stage = precisa(".stage");
    const meios = stage?.querySelectorAll("canvas, svg, img");
    if (![...(meios ?? [])].some(visivel)) falta("Figura sem canvas, SVG ou imagem visível");
  };

  precisa(".step__body");
  if (tipo === "manim_video") {
    const video = precisa("video");
    if (video && (video.error || video.readyState < 1 || !video.videoWidth)) falta("Vídeo sem metadados de imagem");
  } else if (tipo === "treino") {
    if (!visivel(document.querySelector('[aria-label="Sair do treino"]'))) falta("Cabeçalho do treino ausente");
    if (!precisa(".prompt")?.textContent.trim()) falta("Enunciado vazio");
    opcoes();
    if (figuraTreino) figura();
  } else {
    figura();
    if (tipo === "concept_lock") {
      if (!precisa(".formula")?.textContent.trim()) falta("Fórmula vazia");
      precisa(".defs .def");
    }
    if (tipo === "micro_challenge") {
      if (!precisa(".prompt")?.textContent.trim()) falta("Enunciado vazio");
      opcoes();
    }
  }

  for (const [i, canvas] of [...document.querySelectorAll(".step .stage canvas")].entries()) {
    const nome = "canvas " + (i + 1) + (canvas.ariaLabel ? " (" + canvas.ariaLabel + ")" : "");
    if (!canvas.width || !canvas.height || !visivel(canvas)) {
      falta(nome + " sem área visível ou com dimensão zero");
      continue;
    }
    try {
      const ctx = canvas.getContext("2d");
      if (!ctx) continue;
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let temDesenho = false;
      for (let k = 0; k < data.length; k += 4) {
        if (data[k + 3] && (data[k] < 255 || data[k + 1] < 255 || data[k + 2] < 255)) {
          temDesenho = true;
          break;
        }
      }
      if (!temDesenho) falta(nome + " inteiramente branco ou transparente");
    } catch (e) {
      problemas.push(["Canvas sem leitura", nome + ": " + e.message]);
    }
  }

  const scrollWidth = document.documentElement.scrollWidth;
  if (scrollWidth > largura) problemas.push(["Rolagem lateral", "documentElement.scrollWidth = " + scrollWidth + " px"]);
  const excedentes = new Map();
  for (const el of document.body.querySelectorAll("*")) {
    // A geometria interna de SVGs (ícones) é medida pelo SVG externo.
    if (el.ownerSVGElement) continue;
    let { right } = el.getBoundingClientRect();
    if (right <= largura + 0.5 || !visivel(el)) continue;
    for (let pai = el.parentElement; pai && pai !== document.body; pai = pai.parentElement) {
      if (/^(hidden|clip)$/.test(getComputedStyle(pai).overflowX)) {
        right = Math.min(right, pai.getBoundingClientRect().left + pai.clientLeft + pai.clientWidth);
      }
    }
    if (right <= largura + 0.5) continue;
    const nome = descricao(el);
    const anterior = excedentes.get(nome);
    excedentes.set(nome, { n: (anterior?.n ?? 0) + 1, right: Math.max(right, anterior?.right ?? 0) });
  }
  if (excedentes.size) {
    const detalhe = [...excedentes].map(([nome, { n, right }]) =>
      nome + (n > 1 ? " ×" + n : "") + " → " + right.toFixed(1) + " px").join("; ");
    problemas.push(["Elemento além da borda", detalhe]);
  }
  return problemas;
}

async function aguardar(avaliar, tempo, fn, ...args) {
  const limite = Date.now() + tempo;
  do {
    const estado = await avaliar(fn, ...args);
    if (estado) return estado;
    await espera(50);
  } while (Date.now() < limite);
  return null;
}

async function varrer({ cdp, avaliar, eventos }) {
  await cdp("Page.enable");
  await cdp("Runtime.enable");
  await cdp("Emulation.setDeviceMetricsOverride", { width: largura, height: altura, deviceScaleFactor: 1, mobile: true });
  await cdp("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  const achados = [];
  let passos = 0;
  let treinos = 0;
  let treinosAbertos = 0;
  for (const [i, aula] of aulas.entries()) {
    const url = base + "/#/aula/" + aula.rota;
    for (const [index, step] of aula.steps.entries()) {
      const { errorText } = await cdp("Page.navigate", { url: url + "?passo=" + (index + 1) });
      if (errorText) throw new Error("Falha ao abrir " + url + ": " + errorText);
      const tempo = passos === 0 ? 45000 : 5000;
      const estado = await aguardar(avaliar, tempo, (pct, tipo) => {
        if (document.querySelector(".error-box, .stage__error, vite-error-overlay")) return "erro";
        const p = document.querySelector('.lesson-header [role="progressbar"]');
        if (p?.getAttribute("aria-valuenow") !== String(pct) || !document.querySelector(".step")) return null;
        if (tipo === "manim_video" && (document.querySelector("video")?.readyState ?? 0) < 1) return null;
        return "pronto";
      }, Math.round((index / aula.steps.length) * 100), step.type);
      await espera(100);
      const problemas = await avaliar(medir, step.type, step.options?.length ?? 0, largura, false);
      if (!estado) problemas.push(["Passo não renderizou", "O passo solicitado não ficou pronto em " + tempo / 1000 + " s"]);
      registrar(aula.rota, (index + 1) + " (" + step.type + ")", problemas);
      passos++;
    }

    const ultimo = aula.steps.at(-1);
    const primeira = [...aula.treino.faceis, ...aula.treino.medias][0];
    const instrucao = await avaliar((tipo, correta) => {
      const clicar = (seletor, texto) => {
        const botao = [...document.querySelectorAll(seletor)].find((el) => el.textContent.trim() === texto);
        if (!botao || botao.disabled) return false;
        botao.click();
        return true;
      };
      if (tipo === "micro_challenge" &&
          (!clicar(".options button", correta))) {
        return "Não foi possível confirmar a alternativa correta do último passo";
      }
      return "";
    }, ultimo.type, ultimo.options?.find((o) => o.correct)?.label ?? "");
    if (!instrucao && ultimo.type === "micro_challenge") {
      await aguardar(avaliar, 5000, () => {
        const verificar = [...document.querySelectorAll(".step button")]
          .find((b) => b.textContent.trim() === "Verificar" && !b.disabled);
        verificar?.click();
        return Boolean(verificar);
      });
    }
    const convite = !instrucao && await aguardar(avaliar, 5000, () => {
      const botoes = [...document.querySelectorAll(".step button, .finish button")];
      const treinar = botoes.find((b) => b.textContent.trim() === "Quero treinar" && !b.disabled);
      if (treinar) {
        treinar.click();
        return true;
      }
      botoes.find((b) => ["Continuar", "Concluir aula"].includes(b.textContent.trim()) && !b.disabled)?.click();
      return false;
    });
    const abriu = convite && await aguardar(avaliar, 5000, () => Boolean(document.querySelector('[aria-label="Sair do treino"]') && document.querySelector(".step .options")));
    if (abriu) await espera(100);
    const problemas = abriu
      ? await avaliar(medir, "treino", primeira?.options.length ?? 0, largura, Boolean(primeira?.figure))
      : [["Treino não abriu", instrucao || "Convite ou tela de treino indisponível após o último passo"]];
    if (abriu) treinosAbertos++;
    registrar(aula.rota, "treino", problemas);
    treinos++;
    console.error("[" + (i + 1) + "/" + aulas.length + "] " + aula.rota + " — " + aula.steps.length + " passos + treino");
  }
  return { achados, passos, treinos, treinosAbertos };

  function registrar(aula, passo, problemas) {
    const vistos = new Set();
    for (const [problema, detalhe] of [...eventos.splice(0), ...problemas]) {
      const chave = JSON.stringify([problema, detalhe]);
      if (vistos.has(chave)) continue;
      vistos.add(chave);
      achados.push([aula, passo, problema, detalhe]);
    }
  }
}

function relatorio({ achados, passos, treinos, treinosAbertos }) {
  const celula = (s) => s.replaceAll("|", "\\|").replace(/\s+/g, " ").trim();
  return [
    "# Varredura automática B44a",
    "",
    "Viewport de 400 × 860 px em navegador headless e Vite em modo dev. " +
      (filtro ? "Filtro de slug: " + filtro + "." : "Todas as aulas publicadas da taxonomia."),
    "",
    "Cada passo foi aberto pelo atalho de desenvolvimento e conferido no estado inicial. O treino foi acessado pelo convite após o último passo, até a primeira questão básica.",
    "",
    "A checagem usa os elementos esperados de cada tipo de passo e lê os pixels dos canvases 2D para identificar superfícies inteiramente brancas ou transparentes. O navegador emula `prefers-reduced-motion: reduce`, que desativa a animação de entrada do app. Na execução inicial, essa animação chegou a registrar 425 px de largura e elementos invisíveis durante a montagem do passo. A borda direita é medida ao longo de toda a tela rolável, com tolerância de 0,5 px para arredondamento. A medição ignora elementos invisíveis, a geometria interna de SVGs e a parte recortada por ancestrais com `overflow-x: hidden` ou `clip`. Elementos repetidos com o mesmo seletor aparecem agrupados por tela.",
    "",
    "| Aula | Passo | Problema | Detalhe |",
    "| --- | --- | --- | --- |",
    ...achados.map((a) => "| " + a.map(celula).join(" | ") + " |"),
    ...(achados.length ? [] : ["| — | — | — | Nenhum problema detectado. |"]),
    "",
    "**Total:** " + aulas.length + " aulas, " + passos + " passos e " + treinos + " treinos verificados (" +
      treinosAbertos + " abriram). " + achados.length + " registro(s) de problema.",
    "",
  ].join("\n");
}

const perfil = mkdtempSync(join(tmpdir(), "varredura-aulas-"));
const proc = spawn(navegador, [
  ...(process.env.VARREDURA_SEM_SANDBOX === "1" ? ["--no-sandbox"] : []),
  "--headless=new", "--disable-gpu", "--disable-extensions", "--remote-debugging-port=0",
  "--user-data-dir=" + perfil, "about:blank",
], { stdio: "ignore", windowsHide: true });
let erroNavegador;
proc.on("error", (erro) => { erroNavegador = erro; });
let ws;
let sessao;
try {
  const portaAtiva = join(perfil, "DevToolsActivePort");
  let alvo;
  for (let i = 0; i < 50 && !alvo; i++) {
    if (erroNavegador) throw erroNavegador;
    await espera(200);
    if (!existsSync(portaAtiva)) continue;
    try {
      const depura = readFileSync(portaAtiva, "utf8").split(/\r?\n/)[0];
      const resposta = await fetch("http://127.0.0.1:" + depura + "/json", { signal: AbortSignal.timeout(1000) });
      alvo = (await resposta.json()).find((t) => t.type === "page");
    } catch { /* DevTools ainda inicializando */ }
  }
  if (!alvo) throw new Error("Não consegui conectar ao navegador.");
  ws = new WebSocket(alvo.webSocketDebuggerUrl);
  await once(ws, "open", { signal: AbortSignal.timeout(5000) });
  sessao = conectar(ws);
  const resultado = relatorio(await varrer(sessao));
  if (filtro) {
    console.log(resultado);
  } else {
    mkdirSync("docs/visual", { recursive: true });
    const arquivo = "docs/visual/varredura-b44.md";
    writeFileSync(arquivo, resultado, "utf8");
    console.log(arquivo);
    console.log(resultado.trimEnd().split("\n").at(-1));
  }
} finally {
  if (proc.pid && proc.exitCode === null && proc.signalCode === null) {
    if (sessao && ws.readyState === WebSocket.OPEN) {
      const saiu = once(proc, "exit", { signal: AbortSignal.timeout(3000) }).catch(() => {});
      void sessao.cdp("Browser.close").catch(() => {});
      await saiu;
    }
    if (proc.exitCode === null && proc.signalCode === null) {
      const saiu = once(proc, "exit", { signal: AbortSignal.timeout(3000) }).catch(() => {});
      proc.kill();
      await saiu;
    }
  }
  ws?.close();
  try {
    rmSync(perfil, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
  } catch (erro) {
    console.error("Não foi possível remover o perfil temporário: " + erro.message);
  }
}


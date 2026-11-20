// Parte do atalho "App de Matemática" (scripts/abrir-app.cmd). Ver docs/HOSPEDAGEM.md, "Abrir no próprio PC".
// 1. Refaz o build só se dist/ faltar ou for mais velho que o último commit ou que algum arquivo de conteúdo/código.
// 2. Se a porta 4173 já serve este app, só abre o navegador. Se outra coisa ocupa a porta, avisa e para.
// 3. Senão, sobe `vite preview` em http://localhost:4173/ (porta fixa, --strictPort), abre o navegador padrão
//    e fica com a janela aberta: fechar a janela desliga o servidor.
import { execFileSync, spawn } from "node:child_process";
import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const PORTA = 4173;
const ENDERECO = `http://localhost:${PORTA}/`;
const TITULO = "<title>Matemática Interativa</title>";
const raiz = join(import.meta.dirname, "..");
process.chdir(raiz);

/** Data de modificação mais recente (ms) entre os arquivos de um caminho, recursivo. */
function maisRecente(caminho) {
  if (!existsSync(caminho)) return 0;
  const st = statSync(caminho);
  if (!st.isDirectory()) return st.mtimeMs;
  let m = 0;
  for (const nome of readdirSync(caminho)) m = Math.max(m, maisRecente(join(caminho, nome)));
  return m;
}

function precisaBuild() {
  const indice = join("dist", "index.html");
  if (!existsSync(indice)) return "não há build (dist/)";
  const build = statSync(indice).mtimeMs;
  const fontes = ["src", "content", "public", "index.html", "package.json", "package-lock.json", "vite.config.ts", "tsconfig.json"];
  if (fontes.some((f) => maisRecente(f) > build)) return "há código ou conteúdo mais novo que o build";
  try {
    const commit = Number(execFileSync("git", ["log", "-1", "--format=%ct"], { stdio: ["ignore", "pipe", "ignore"] }).toString().trim()) * 1000;
    if (commit > build) return "há um commit mais novo que o build";
  } catch {
    // sem git: vale só a comparação com os arquivos
  }
  return null;
}

/** "app" se a porta já serve este app; "outro" se responde outra coisa; "livre" se não responde. */
async function estadoDaPorta() {
  try {
    const r = await fetch(ENDERECO, { signal: AbortSignal.timeout(1500) });
    return r.ok && (await r.text()).includes(TITULO) ? "app" : "outro";
  } catch {
    return "livre";
  }
}

const abrirNavegador = () => spawn("cmd", ["/c", "start", "", ENDERECO], { detached: true, stdio: "ignore" }).unref();
const npm = (args) => new Promise((ok) => spawn("npm", args, { stdio: "inherit", shell: true }).on("exit", ok));

const estado = await estadoDaPorta();
if (estado === "app") {
  console.log(`O app já está aberto em ${ENDERECO}; abrindo o navegador.`);
  abrirNavegador();
  process.exit(0);
}
if (estado === "outro") {
  console.error(`A porta ${PORTA} está ocupada por outro programa. Feche-o e abra o atalho de novo.`);
  process.exit(1);
}

const motivo = precisaBuild();
if (motivo) {
  console.log(`Preparando o app (${motivo})...`);
  const codigo = await npm(["run", "build"]);
  if (codigo !== 0) {
    if (!existsSync(join("dist", "index.html"))) {
      console.error("O build falhou e não há versão anterior para abrir.");
      process.exit(1);
    }
    console.warn("\nO build falhou; abrindo a última versão compilada (dist/).\n");
  }
}

const vite = join("node_modules", "vite", "bin", "vite.js");
const servidor = spawn(process.execPath, [vite, "preview", "--port", String(PORTA), "--strictPort"], { stdio: "inherit" });
let subiu = false;
servidor.on("exit", (codigo) => {
  if (!subiu) console.error(`O servidor não subiu (código ${codigo}).`);
  process.exit(subiu ? 0 : 1);
});

for (let i = 0; i < 60 && !subiu; i++) {
  await new Promise((r) => setTimeout(r, 500));
  subiu = (await estadoDaPorta()) === "app";
}
if (!subiu) {
  console.error(`O app não respondeu em ${ENDERECO} depois de 30 s.`);
  servidor.kill();
  process.exit(1);
}
abrirNavegador();
console.log("\n==============================================================");
console.log(`  App de Matemática aberto em ${ENDERECO}`);
console.log("  Feche esta janela para desligar o app.");
console.log("==============================================================\n");

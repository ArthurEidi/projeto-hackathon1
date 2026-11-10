// Confere os planos de capítulo (docs/planos/*.md) contra docs/planos/_MODELO.md e cruza os
// slugs com docs/CURRICULO.md. Só lê arquivos. Uso: npm run lint:planos [-- --detalhes]
// Sai com código 1 se algum plano tiver erro (avisos não reprovam).
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { checkLine } from "../src/engine/textRules";

const root = join(import.meta.dirname, "..");
const dir = join(root, "docs/planos");
const detalhes = process.argv.includes("--detalhes");

const SECOES = ["a", "b", "c", "d", "e", "f", "g", "h", "i"] as const;
const NIVEIS = [
  { nome: "Fáceis", prefixo: "F", total: 4, maxOpcoes: 4 },
  { nome: "Médias", prefixo: "M", total: 3, maxOpcoes: 4 },
  { nome: "Desafios", prefixo: "D", total: 5, maxOpcoes: 4 },
  { nome: "Vestibular", prefixo: "V", total: 4, maxOpcoes: 5 },
] as const;

interface Resultado {
  arquivo: string;
  secoes: string;
  passos: string;
  treino: string;
  questoes: string;
  vestibular: string;
  falas: string;
  erros: string[];
  avisos: string[];
}

/** Trecho entre o cabeçalho que casa `inicio` e o próximo cabeçalho de nível igual ou maior. */
function trecho(linhas: string[], inicio: RegExp, nivel: number): string[] {
  const i = linhas.findIndex((l) => inicio.test(l));
  if (i < 0) return [];
  const fim = linhas.findIndex((l, j) => j > i && new RegExp(`^#{1,${nivel}} `).test(l));
  return linhas.slice(i + 1, fim < 0 ? undefined : fim);
}

/** Blocos que começam em cabeçalhos "#### …" dentro de um trecho. */
function blocos(linhas: string[]): { titulo: string; corpo: string[] }[] {
  const out: { titulo: string; corpo: string[] }[] = [];
  for (const l of linhas) {
    if (/^#### /.test(l)) out.push({ titulo: l, corpo: [] });
    else out.at(-1)?.corpo.push(l);
  }
  return out;
}

/** Linhas de opção de tabela: | `id` | rótulo | não/**sim** | "feedback" | … */
function opcoes(corpo: string[]) {
  return corpo
    .filter((l) => /^\|\s*`[^`]+`\s*\|/.test(l))
    .map((l) => {
      const cel = l.split("|").map((c) => c.trim());
      return { certa: /\*\*sim\*\*/i.test(cel[3] ?? ""), feedback: cel[4] ?? "" };
    });
}

const RE_ASPAS = /"([^"]{2,})"|“([^”]{2,})”/g;
/** Linhas que viram fala no app: só nelas as aspas são conferidas pelas regras de texto. */
const RE_LINHA_FALA =
  /^\s*-\s*\*\*(Paco|Tati|Enunciado|Fala do Paco|Definições)|^\*\*Frase de encerramento|^\|\s*`[^`]+`\s*\|.*\|\s*(não|\*\*sim\*\*)\s*\|/i;

function lintPlano(arquivo: string): Resultado {
  const texto = readFileSync(join(dir, arquivo), "utf8");
  const linhas = texto.split(/\r?\n/);
  const erros: string[] = [];
  const avisos: string[] = [];

  // Seções a)–i)
  const faltando = SECOES.filter((s) => !linhas.some((l) => new RegExp(`^## ${s}\\)`).test(l)));
  if (faltando.length) erros.push(`seções ausentes: ${faltando.map((s) => s + ")").join(" ")}`);

  // Roteiro: passos
  const roteiro = trecho(linhas, /^## h\)/, 2);
  const passos = roteiro.filter((l) => /^### Passo /.test(l));
  const tipos = roteiro
    .filter((l) => /^\s*-\s*\*\*Tipo:\*\*/.test(l))
    .map((l) => (l.match(/`([a-z_]+)`/) ?? [])[1] ?? "?");
  if (passos.length < 4 || passos.length > 8) erros.push(`${passos.length} passos (esperado 4 a 8)`);
  if (tipos.length && tipos[0] !== "interactive_canvas") erros.push(`1º passo é ${tipos[0]}, não interactive_canvas`);
  if (tipos.length && tipos.at(-1) !== "concept_lock") erros.push(`último passo é ${tipos.at(-1)}, não concept_lock`);
  if (passos.length && !tipos.includes("micro_challenge")) erros.push("roteiro sem micro_challenge");
  if (passos.length && tipos.length < passos.length) avisos.push(`${passos.length - tipos.length} passo(s) sem linha Tipo`);

  // Treino
  const treino = trecho(linhas, /^## i\)/, 2);
  const contagens: string[] = [];
  let questoesOk = 0;
  let questoesTotal = 0;
  let pendentes = 0;
  let reais = 0;
  for (const n of NIVEIS) {
    const sec = trecho(treino, new RegExp(`^### ${n.nome}`), 3);
    const qs = blocos(sec);
    contagens.push(String(qs.length));
    if (qs.length !== n.total) erros.push(`${n.nome}: ${qs.length} questões (esperado ${n.total})`);
    for (const q of qs) {
      const id = (q.titulo.match(/`([^`]+)`/) ?? [])[1] ?? q.titulo.replace(/^#### /, "");
      const pendente = n.prefixo === "V" && [q.titulo, ...q.corpo].some((l) => l.includes("PENDENTE-FONTE"));
      if (pendente) {
        pendentes++;
        continue;
      }
      questoesTotal++;
      const ops = opcoes(q.corpo);
      const certas = ops.filter((o) => o.certa).length;
      const semFeedback = ops.filter((o) => !/["“]/.test(o.feedback)).length;
      const problemas: string[] = [];
      if (ops.length < 2 || ops.length > n.maxOpcoes) problemas.push(`${ops.length} opções (2 a ${n.maxOpcoes})`);
      if (certas !== 1) problemas.push(`${certas} corretas`);
      if (semFeedback) problemas.push(`${semFeedback} opção(ões) sem feedback`);
      if (!q.corpo.some((l) => /\*\*Enunciado/.test(l))) problemas.push("sem enunciado");
      if (!q.corpo.some((l) => /Conta de conferência/.test(l))) avisos.push(`${id}: sem conta de conferência`);
      if (n.prefixo === "V") {
        reais++;
        const fonte = q.corpo.find((l) => /\*\*Fonte:\*\*/.test(l)) ?? "";
        if (!/\(adaptada\)/.test(fonte)) problemas.push("fonte sem '(adaptada)'");
        if (!/https?:\/\//.test(fonte) && !q.corpo.some((l) => /\*\*URL/.test(l) && /https?:\/\//.test(l))) {
          problemas.push("fonte sem URL");
        }
        if (!q.corpo.some((l) => /\*\*Fala do Paco/.test(l))) avisos.push(`${id}: vestibular sem fala do Paco`);
      }
      if (problemas.length) erros.push(`${id}: ${problemas.join(", ")}`);
      else questoesOk++;
    }
  }

  // Falas
  let falas = 0;
  let falasRuins = 0;
  linhas.forEach((l, i) => {
    if (!RE_LINHA_FALA.test(l)) return;
    for (const m of l.matchAll(RE_ASPAS)) {
      const t = m[1] ?? m[2];
      if (t.startsWith("$")) continue;
      falas++;
      const p = checkLine(t);
      if (p.length) {
        falasRuins++;
        erros.push(`linha ${i + 1}: ${p.join("; ")} — "${t.length > 60 ? t.slice(0, 57) + "..." : t}"`);
      }
    }
  });

  return {
    arquivo,
    secoes: faltando.length ? `faltam ${faltando.length}` : "ok",
    passos: String(passos.length),
    treino: contagens.join("/"),
    questoes: `${questoesOk}/${questoesTotal}`,
    vestibular: `${reais} reais, ${pendentes} pend.`,
    falas: falasRuins ? `${falasRuins}/${falas} ruins` : `${falas} ok`,
    erros,
    avisos,
  };
}

// ---------- Execução ----------

const arquivos = readdirSync(dir)
  .filter((f) => f.endsWith(".md") && f !== "_MODELO.md")
  .sort();
const resultados = arquivos.map(lintPlano);

const cab = ["arquivo", "seções", "passos", "treino F/M/D/V", "questões ok", "vestibular", "falas", "status"];
const linhasTabela = resultados.map((r) => [
  r.arquivo.replace(/\.md$/, ""),
  r.secoes,
  r.passos,
  r.treino,
  r.questoes,
  r.vestibular,
  r.falas,
  r.erros.length ? `${r.erros.length} erro(s)` : r.avisos.length ? `ok (${r.avisos.length} aviso)` : "ok",
]);
const larg = cab.map((c, i) => Math.max(c.length, ...linhasTabela.map((l) => l[i].length)));
const fmt = (l: string[]) => l.map((c, i) => c.padEnd(larg[i])).join("  ");
console.log(fmt(cab));
console.log(larg.map((w) => "-".repeat(w)).join("  "));
for (const l of linhasTabela) console.log(fmt(l));

const comErro = resultados.filter((r) => r.erros.length);
if (comErro.length || detalhes) {
  console.log("");
  for (const r of detalhes ? resultados : comErro) {
    if (!r.erros.length && !r.avisos.length) continue;
    console.log(`${r.arquivo}`);
    for (const e of r.erros) console.log(`  erro   ${e}`);
    if (detalhes) for (const a of r.avisos) console.log(`  aviso  ${a}`);
  }
}

// Cruzamento com o currículo
const curriculoPath = join(root, "docs/CURRICULO.md");
const slugsCurriculo = existsSync(curriculoPath)
  ? [...readFileSync(curriculoPath, "utf8").matchAll(/^\|[^|]*\|\s*`([a-z0-9-]+)`\s*\|/gm)].map((m) => m[1])
  : [];
const slugsPlanos = arquivos.map((f) => f.replace(/\.md$/, ""));
const faltam = slugsCurriculo.filter((s) => !slugsPlanos.includes(s) && s !== "cones");
const sobram = slugsPlanos.filter((s) => !slugsCurriculo.includes(s));

const totalPend = resultados.reduce((a, r) => a + Number(r.vestibular.match(/(\d+) pend/)?.[1] ?? 0), 0);
const totalReais = resultados.reduce((a, r) => a + Number(r.vestibular.match(/^(\d+) reais/)?.[1] ?? 0), 0);
console.log("");
console.log(`Resumo: ${resultados.length} planos; ${resultados.length - comErro.length} sem erro, ${comErro.length} com erro.`);
console.log(`Vestibular: ${totalReais} questões reais, ${totalPend} PENDENTE-FONTE.`);
console.log(`Currículo: ${slugsCurriculo.length} slugs; ${faltam.length} sem plano, ${sobram.length} planos fora do currículo.`);
if (faltam.length) console.log(`  sem plano: ${faltam.join(", ")}`);
if (sobram.length) console.log(`  fora do currículo: ${sobram.join(", ")}`);

process.exit(comErro.length ? 1 : 0);

// Valida conteúdo antes de dev/build: schema, hierarquia e regras de texto (140 caracteres,
// 2 frases, sem emoji, sem termos da lista negra). Sai com código 1 se houver erro.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { join, relative } from "node:path";
import { collectLines, Lesson, Taxonomy } from "../src/engine/schema";
import { checkLine, hasEmoji } from "../src/engine/textRules";

export function errosImagensVestibular(lesson: Lesson, publicDir: string): string[] {
  const erros: string[] = [];
  for (const q of lesson.treino.vestibular) {
    const imagens = [...(q.imagens ?? []), ...q.options.flatMap((o) => o.imagem ? [o.imagem] : [])];
    for (const imagem of imagens) {
      const arquivo = join(publicDir, imagem.src.slice(1));
      if (!existsSync(arquivo) || !statSync(arquivo).isFile()) erros.push(`questão ${q.id}: imagem inexistente ${imagem.src}`);
    }
  }
  return erros;
}

function main() {
const root = join(import.meta.dirname, "..");
const errors: string[] = [];
const warnings: string[] = [];

const readJson = (p: string) => JSON.parse(readFileSync(p, "utf8"));

const tax = Taxonomy.safeParse(readJson(join(root, "content/taxonomy.json")));
if (!tax.success) {
  errors.push(`content/taxonomy.json: ${tax.error.message}`);
} else {
  for (const p of tax.data.pilares)
    for (const s of p.setores)
      for (const u of s.unidades)
        for (const a of u.aulas) {
          for (const t of [a.titulo, a.subtitulo]) {
            for (const prob of checkLine(t)) errors.push(`taxonomy ${a.id} "${t}": ${prob}`);
          }
          if (!a.arquivo) continue;
          const file = join(root, "content", a.arquivo);
          if (!existsSync(file)) {
            errors.push(`taxonomy ${p.id}/${s.id}/${u.id}/${a.id}: arquivo inexistente content/${a.arquivo}`);
            continue;
          }
          const parsed = Lesson.safeParse(readJson(file));
          if (!parsed.success) {
            errors.push(`content/${a.arquivo}: ${parsed.error.message}`);
            continue;
          }
          const L = parsed.data;
          const tag = `content/${a.arquivo}`;
          errors.push(...errosImagensVestibular(L, join(root, "public")).map((e) => `${tag}: ${e}`));
          if (L.id !== a.id) errors.push(`${tag}: id "${L.id}" difere da taxonomia "${a.id}"`);
          if (L.caminho.pilar !== p.id || L.caminho.setor !== s.id || L.caminho.unidade !== u.id) {
            errors.push(`${tag}: caminho não bate com a taxonomia (${p.id}/${s.id}/${u.id})`);
          }
          if (L.steps.length < 4 || L.steps.length > 8) warnings.push(`${tag}: ${L.steps.length} passos`);
          for (const { path, text } of collectLines(L)) {
            for (const prob of checkLine(text)) errors.push(`${tag} ${path}: ${prob}\n    "${text}"`);
          }
          for (const st of L.steps) {
            if (st.type === "manim_video" && !existsSync(join(root, "public", st.src))) {
              warnings.push(`${tag} ${st.id}: vídeo ${st.src} ainda não renderizado (npm run manim)`);
            }
          }
        }
}

// Nenhum emoji em código de interface nem em conteúdo.
const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
for (const f of [...walk(join(root, "src")), ...walk(join(root, "content"))]) {
  if (!/\.(tsx?|css|json)$/.test(f)) continue;
  readFileSync(f, "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (hasEmoji(line)) errors.push(`${relative(root, f)}:${i + 1}: contém emoji`);
    });
}

for (const w of warnings) console.warn(`aviso  ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`erro   ${e}`);
  console.error(`\n${errors.length} erro(s) de conteúdo.`);
  process.exit(1);
}
console.log("conteúdo ok");

}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();

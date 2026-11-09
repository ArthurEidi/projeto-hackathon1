// Percorre a taxonomia e valida TODAS as aulas publicadas (com "arquivo"), como o lint de conteúdo.
// Um capítulo novo entra aqui automaticamente ao ser registrado na taxonomia.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { isComplete } from "./completion";
import { collectLines, Lesson, Taxonomy } from "./schema";
import { checkLine } from "./textRules";

const root = join(import.meta.dirname, "../..");
const readJson = (p: string) => JSON.parse(readFileSync(join(root, p), "utf8"));
const tax = Taxonomy.parse(readJson("content/taxonomy.json"));

const publicadas = tax.pilares.flatMap((p) =>
  p.setores.flatMap((s) =>
    s.unidades.flatMap((u) =>
      u.aulas.filter((a) => a.arquivo).map((a) => ({ caminho: { pilar: p.id, setor: s.id, unidade: u.id }, aula: a })),
    ),
  ),
);

describe("taxonomia", () => {
  it("tem os 3 pilares e ids únicos em cada nível", () => {
    expect(tax.pilares.map((p) => p.id)).toEqual(["aritmetica", "algebra", "geometria"]);
    const unidades = tax.pilares.flatMap((p) => p.setores.flatMap((s) => s.unidades.map((u) => u.id)));
    expect(new Set(unidades).size).toBe(unidades.length);
    for (const p of tax.pilares)
      for (const s of p.setores)
        for (const u of s.unidades) {
          expect(new Set(u.aulas.map((a) => a.id)).size, u.id).toBe(u.aulas.length);
          expect(u.aulas.map((a) => a.numero), u.id).toEqual(u.aulas.map((_, i) => i + 1));
        }
  });

  it("títulos e subtítulos seguem as regras de texto", () => {
    for (const p of tax.pilares)
      for (const s of p.setores)
        for (const u of s.unidades)
          for (const a of u.aulas) for (const t of [a.titulo, a.subtitulo]) expect(checkLine(t), t).toEqual([]);
  });

  it("há pelo menos as aulas de Cones e de Função Afim publicadas", () => {
    const arquivos = publicadas.map((x) => x.aula.arquivo);
    expect(arquivos).toContain("geometria/geometria-espacial/cones/aula-01.json");
    expect(arquivos).toContain("algebra/funcoes/funcao-afim/aula-01.json");
  });
});

describe.each(publicadas)("aula publicada $aula.arquivo", ({ caminho, aula }) => {
  const arquivo = `content/${aula.arquivo}`;

  it("existe, passa no schema e bate com a taxonomia", () => {
    expect(existsSync(join(root, arquivo))).toBe(true);
    const L = Lesson.parse(readJson(arquivo));
    expect(L.id).toBe(aula.id);
    expect(L.numero).toBe(aula.numero);
    expect(L.caminho).toEqual(caminho);
    expect(L.steps.length).toBeGreaterThanOrEqual(4);
    expect(L.steps.length).toBeLessThanOrEqual(8);
  });

  it("todas as falas respeitam as regras de texto", () => {
    for (const { path, text } of collectLines(Lesson.parse(readJson(arquivo)))) {
      expect(checkLine(text), `${path}: ${text}`).toEqual([]);
    }
  });

  it("vídeos referenciados existem em public/", () => {
    for (const s of Lesson.parse(readJson(arquivo)).steps) {
      if (s.type === "manim_video") expect(existsSync(join(root, "public", s.src)), s.src).toBe(true);
    }
  });
});

describe("motor genérico", () => {
  it("complete_when aceita gte, lte ou os dois", () => {
    expect(isComplete({ metric: "a", lte: -1 }, { a: 0 })).toBe(false);
    expect(isComplete({ metric: "a", lte: -1 }, { a: -1 })).toBe(true);
    expect(isComplete({ metric: "a", gte: 1, lte: 3 }, { a: 2 })).toBe(true);
    expect(isComplete({ metric: "a", gte: 1, lte: 3 }, { a: 4 })).toBe(false);
  });

  const afim = () => readJson("content/algebra/funcoes/funcao-afim/aula-01.json");

  it("complete_when sem gte nem lte é recusado", () => {
    const bad = afim();
    bad.steps[0].complete_when = { metric: "quadrantes" };
    expect(Lesson.safeParse(bad).success).toBe(false);
  });

  it("marca c1..c4 na fórmula exige entrada no glossário", () => {
    const bad = afim();
    delete bad.glossario.c1;
    expect(Lesson.safeParse(bad).success).toBe(false);
  });

  it("slider só aceita cor de marca ou ink", () => {
    const bad = afim();
    bad.steps[1].controls[0].color = "roxo";
    expect(Lesson.safeParse(bad).success).toBe(false);
  });

  it("plano_figura recusa referência a slider", () => {
    const bad = afim();
    bad.steps[6].figure.params.curvas[0].a = "$a";
    expect(Lesson.safeParse(bad).success).toBe(false);
  });

  it("ícone de unidade desconhecido é recusado", () => {
    const raw = readJson("content/taxonomy.json");
    raw.pilares[2].setores[0].unidades[0].icone = "foguete";
    expect(Taxonomy.safeParse(raw).success).toBe(false);
  });
});

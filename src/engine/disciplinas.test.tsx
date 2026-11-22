// 21/11: três áreas (Matemática, Física, Química), página inicial e navegação. Regressões do schema.
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { App } from "../App";
import { Inicio, AULA_QUESTAO_VISUAL } from "../paginas/Inicio";
import { PaginaDisciplina } from "../paginas/PaginaDisciplina";
import { listAulas, proximaAula, taxonomy } from "./content";
import { MATERIAS } from "./materias";
import { lerRota } from "./rota";
import { Lesson, Taxonomy } from "./schema";

describe("taxonomia com disciplinas", () => {
  it("Matemática continua com os 3 pilares; Física e Química vêm em disciplinas", () => {
    expect(taxonomy.pilares.map((p) => p.id)).toEqual(["aritmetica", "algebra", "geometria"]);
    expect(taxonomy.disciplinas.map((d) => d.id)).toEqual(["fisica", "quimica"]);
  });

  it("taxonomia antiga (sem disciplinas) segue válida; disciplina desconhecida ou repetida é recusada", () => {
    const base = { pilares: taxonomy.pilares };
    expect(Taxonomy.parse(base).disciplinas).toEqual([]);
    const fis = taxonomy.disciplinas[0];
    expect(Taxonomy.safeParse({ ...base, disciplinas: [{ ...fis, id: "historia" }] }).success).toBe(false);
    expect(Taxonomy.safeParse({ ...base, disciplinas: [fis, fis] }).success).toBe(false);
  });

  it("listAulas marca a área de cada aula e as 104 aulas de Matemática continuam lá", () => {
    const aulas = listAulas();
    const mat = aulas.filter((a) => a.materia === "matematica" && a.arquivo !== null);
    expect(mat.length).toBeGreaterThanOrEqual(105); // 104 + a questão visual do ENEM
    expect(aulas.filter((a) => a.materia === "fisica" && a.arquivo)).toHaveLength(1);
    expect(aulas.filter((a) => a.materia === "quimica" && a.arquivo)).toHaveLength(1);
    expect(new Set(aulas.map((a) => a.key)).size).toBe(aulas.length);
  });

  it("próxima aula fica na mesma área e pula aulas sem arquivo", () => {
    const aulas = listAulas();
    for (const a of aulas.filter((x) => x.arquivo !== null)) {
      const p = proximaAula(a.key);
      if (p) {
        expect(p.materia).toBe(a.materia);
        expect(p.arquivo).not.toBeNull();
      }
    }
    expect(proximaAula("fisica/cinematica/lancamento-obliquo/aula-01")).toBeNull();
    expect(proximaAula("nao/existe")).toBeNull();
  });
});

describe("schema", () => {
  it("desafio aceita até 5 alternativas (questão oficial A a E) e recusa 6", () => {
    const opcao = (id: string, correct = false) => ({ id, label: id, correct, feedback: "ok." });
    const passo = (n: number) => ({
      id: "d",
      type: "micro_challenge",
      figure: { widget: "plano_figura", params: {} },
      prompt: "p",
      options: Array.from({ length: n }, (_, i) => opcao(`o${i}`, i === 0)),
      lines: { intro: "i" },
    });
    const aula = (n: number) => ({
      id: "aula-01", numero: 1, titulo: "t", subtitulo: "s", caminho: { pilar: "a", setor: "b", unidade: "c" }, outro: "o",
      steps: [passo(n)],
      treino: { faceis: [], medias: [], desafios: [], vestibular: [] },
    });
    const erros = (n: number) => (Lesson.safeParse(aula(n)).error?.issues ?? []).filter((i) => i.path.includes("steps"));
    expect(erros(5)).toEqual([]);
    expect(erros(6).length).toBeGreaterThan(0);
  });
});

describe("rotas", () => {
  it("#/materia/<id> abre a área; área desconhecida volta ao início", () => {
    expect(lerRota("#/materia/fisica")).toEqual({ tipo: "materia", id: "fisica" });
    expect(lerRota("#/materia/quimica/")).toEqual({ tipo: "materia", id: "quimica" });
    expect(lerRota("#/materia/matematica")).toEqual({ tipo: "materia", id: "matematica" });
    expect(lerRota("#/materia/historia")).toEqual({ tipo: "trilha" });
  });
});

describe("páginas", () => {
  it("início apresenta só as três áreas, com contagens reais e a questão visual", () => {
    const html = renderToStaticMarkup(<Inicio onOpen={() => {}} />);
    expect(html).toContain("Entenda o que antes parecia");
    expect(html).toContain("impossível.");
    for (const m of MATERIAS) expect(html).toContain(`href="#/materia/${m.id}"`);
    for (const outra of ["Português", "História", "Biologia", "Geografia"]) expect(html).not.toContain(outra);
    const mat = listAulas().filter((a) => a.materia === "matematica" && a.arquivo).length;
    expect(html).toContain(`${mat} aulas interativas`);
    expect(html).toContain(`#/aula/${AULA_QUESTAO_VISUAL}`);
  });

  it("páginas de Física e Química listam só as aulas publicadas", () => {
    const fis = renderToStaticMarkup(<PaginaDisciplina id="fisica" onOpen={() => {}} />);
    expect(fis).toContain("A Bola que Faz Parábola");
    expect(fis).toContain('data-aula="fisica/cinematica/lancamento-obliquo/aula-01"');
    const qui = renderToStaticMarkup(<PaginaDisciplina id="quimica" onOpen={() => {}} />);
    expect(qui).toContain("A Cor da Concentração");
  });

  it("App: a raiz abre o início; #/materia/matematica abre a trilha completa", () => {
    vi.stubGlobal("location", { hash: "#/" });
    expect(renderToStaticMarkup(<App />)).toContain("Três áreas.");
    vi.stubGlobal("location", { hash: "#/materia/matematica" });
    const trilha = renderToStaticMarkup(<App />);
    expect(trilha).toContain("Aritmética");
    expect(trilha).toContain("Álgebra");
    vi.stubGlobal("location", { hash: "#/materia/quimica" });
    expect(renderToStaticMarkup(<App />)).toContain("Concentração e diluição");
    expect(renderToStaticMarkup(<App />)).toContain("A Cor da Concentração");
    vi.unstubAllGlobals();
  });
});

// Questão visual · ENEM 2022 Q150 (saque de vôlei): a aula leva à resposta D, e cada número é refeito.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { avaliar, encontros, raizes, resolverCurva, vertice } from "../widgets/common/plot2d";
import { PlanoCartesiano } from "../widgets/common/params";

const L = Lesson.parse(
  JSON.parse(readFileSync(join(import.meta.dirname, "../../content/algebra/funcoes/saque-de-volei-enem-2022/aula-01.json"), "utf8")),
);
const step = (id: string) => L.steps.find((s) => s.id === id)!;
const certa = (id: string) => Object.values(L.treino).flat().find((q) => q.id === id)!.options.find((o) => o.correct)!.label;

const eixo = { tipo: "quadratica" as const, a: -1 / 6, b: -7 / 3, c: 12 };
const piso = { ...eixo, t: { a: 1, b: 1, h: 0, k: 1.5 } };
const horizontal = (h: number) => ({ tipo: "afim" as const, a: 0, b: h, c: 0 });

describe("a questão e a conta", () => {
  it("enunciado preservado, fonte oficial e adaptação descrita", () => {
    const q = L.questao!;
    expect(q.fonte).toMatchObject({ banca: "ENEM", ano: 2022, adaptada: true });
    expect(q.fonte.urls[0]).toBe("https://api.enem.dev/v1/exams/2022/questions/150");
    expect(q.texto.join(" ")).toContain("1,5 m do piso da quadra");
    expect(q.texto.join(" ")).toContain("ginásio V: 40 m");
    expect(q.texto.at(-1)).toBe("O saque desse atleta foi invalidado");
  });

  it("vértice em x = −7 e y = 121/6; raízes −18 e 4; topo a 21,67 m do piso", () => {
    const v = vertice(eixo)!;
    expect(v.x).toBeCloseTo(-7, 9);
    expect(v.y).toBeCloseTo(121 / 6, 9);
    expect(raizes(eixo, -30, 30).map((r) => Math.round(r)).sort((a, b) => a - b)).toEqual([-18, 4]);
    expect(vertice(piso)!.y).toBeCloseTo(121 / 6 + 1.5, 9);
    expect((121 / 6 + 1.5).toFixed(2)).toBe("21.67");
  });

  it("tetos: 17, 18, 19 e 21 m são atingidos; 22 m e 40 m não (resposta D)", () => {
    for (const h of [17, 18, 19, 21]) expect(encontros(piso, horizontal(h), -19, 5).length, `${h} m`).toBe(2);
    for (const h of [22, 40]) expect(encontros(piso, horizontal(h), -19, 5), `${h} m`).toEqual([]);
    expect(encontros(piso, horizontal(19), -19, 5).map((x) => Math.round(x * 1e6) / 1e6)).toEqual([-11, -3]);
    expect(encontros(piso, horizontal(21), -19, 5).map((x) => Math.round(x * 1e6) / 1e6)).toEqual([-9, -5]);
  });

  it("o distrator C é o erro de não somar 1,5 m: 20,17 m fica abaixo de 21 m", () => {
    expect(121 / 6).toBeLessThan(21);
    expect(121 / 6).toBeGreaterThan(19);
  });
});

describe("passos da aula", () => {
  it("ler a trajetória: o arraste de −18 alcança a faixa de 10 dentro da janela", () => {
    const s = step("ler-trajetoria");
    if (s.type !== "interactive_canvas") throw new Error();
    const p = PlanoCartesiano.parse(s.params);
    expect(p.x[1] - (p.ponto!.x as number)).toBeGreaterThanOrEqual(s.complete_when.gte!);
  });

  it("achar o vértice: x = −7 é múltiplo do passo do ponto e a marca só aparece ao concluir", () => {
    const s = step("achar-vertice");
    if (s.type !== "interactive_canvas") throw new Error();
    const p = PlanoCartesiano.parse(s.params);
    expect(Number.isInteger(-7 / p.ponto!.passo)).toBe(true);
    expect(p.marcar.vertice).toBe(true);
    expect(s.antes_de_concluir).toEqual({ marcar: { vertice: false, eixo: false } });
    expect(s.complete_when).toMatchObject({ metric: "no_vertice", gte: 1 });
  });

  it("comparar tetos: conclui no primeiro teto que a bola não atinge (22 m)", () => {
    const s = step("comparar-tetos");
    if (s.type !== "interactive_canvas") throw new Error();
    const teto = s.controls.find((c) => c.id === "teto")!;
    expect(s.complete_when).toMatchObject({ metric: "teto", gte: 22 });
    expect(teto.initial).toBeLessThan(22);
    const p = PlanoCartesiano.parse(s.params);
    const k = resolverCurva(p.curvas[0], {});
    expect(avaliar(k, -7)).toBeCloseTo(121 / 6 + 1.5, 9);
    for (let h = teto.min; h <= teto.max; h += teto.step) {
      const toca = encontros(k, horizontal(h), p.x[0], p.x[1]).length > 0;
      expect(toca, `${h} m`).toBe(h <= 21);
    }
  });

  it("altura máxima: 21,67 m certo; as figuras das erradas mostram cada erro", () => {
    const s = step("altura-maxima");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("21,67 m");
    expect(avaliar(piso, 0)).toBeCloseTo(13.5, 9);
    expect(s.options.map((o) => o.label)).toEqual(["21,67 m", "20,17 m", "13,5 m", "7 m"]);
  });

  it("resposta da questão: 5 alternativas oficiais, só a D correta", () => {
    const s = step("responder-questao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.map((o) => o.label[0])).toEqual(["A", "B", "C", "D", "E"]);
    expect(s.options.filter((o) => o.correct).map((o) => o.id)).toEqual(["d"]);
    expect(s.prompt).toBe(L.questao!.texto.at(-1));
  });
});

describe("treino: gabaritos por conta", () => {
  it("valores da parábola", () => {
    expect(certa("y-em-0")).toBe(String(avaliar(eixo, 0)));
    expect(certa("x-vertice")).toBe("−7");
    expect(certa("raizes")).toBe("−18 e 4");
    const delta = eixo.b ** 2 - 4 * eixo.a * eixo.c;
    expect(delta).toBeCloseTo(121 / 9, 9);
  });
  it("tetos e eixo deslocado", () => {
    expect(certa("teto-19")).toBe("−11 e −3");
    expect(certa("teto-21")).toBe("−9 e −5");
    expect(certa("maior-teto")).toBe("21 m");
    expect(certa("eixo-25")).toBe(`${(121 / 6 + 2.5).toFixed(2).replace(".", ",")} m`);
  });
});

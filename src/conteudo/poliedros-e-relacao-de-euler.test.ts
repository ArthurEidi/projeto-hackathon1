// Poliedros e Relação de Euler · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { casco, contar, montarCena, verticesPoliedro } from "../widgets/common/solido/cenas";
import { Solido3d } from "../widgets/common/solido/params";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/geometria-espacial/poliedros-e-relacao-de-euler/aula-01.json",
      ),
      "utf8",
    ),
  ),
);

const certa = (id: string) =>
  Object.values(L.treino)
    .flat()
    .find((q) => q.id === id)!
    .options.find((o) => o.correct)!.label;

const step = (id: string) => L.steps.find((s) => s.id === id)!;

describe("passos da aula de poliedros e euler", () => {
  it("cada interactive_canvas pode ser concluído", () => {
    for (const s of L.steps) {
      if (s.type !== "interactive_canvas") continue;
      const { metric, gte, lte } = s.complete_when;
      const slider = s.controls.find((c) => c.id === metric);
      if (slider) {
        if (gte !== undefined) expect(slider.max, s.id).toBeGreaterThanOrEqual(gte);
        if (lte !== undefined) expect(slider.min, s.id).toBeLessThanOrEqual(lte);
        expect(slider.initial, `${s.id} não pode começar concluído`).not.toBe(gte ?? lte);
        const alvo = (gte ?? lte)!;
        expect(((alvo - slider.min) / slider.step) % 1, `${s.id}: alvo fora do passo`).toBeCloseTo(0, 9);
      } else {
        expect(["solidos_vistos", "V", "A", "F", "euler", "serrado", "solto"]).toContain(metric);
      }
    }
  });

  it("tetraedro-base: V = 4, A = 6, F = 4, Euler = 2", () => {
    const s = step("tetraedro-base");
    if (s.type !== "interactive_canvas") throw new Error();
    const c = contar(casco(verticesPoliedro("tetraedro")));
    expect(c).toEqual({ V: 4, A: 6, F: 4 });
    expect(c.V - c.A + c.F).toBe(2);
  });

  it("cortar-quina: serrar uma quina do cubo dá V = 10, A = 15, F = 7", () => {
    const s = step("cortar-quina");
    if (s.type !== "interactive_canvas") throw new Error();
    const c = montarCena(Solido3d.parse({ modo: "poliedro", solidos: ["cubo"], serrar: 1 }), {});
    expect([c.metricas.V, c.metricas.A, c.metricas.F, c.metricas.euler]).toEqual([10, 15, 7, 2]);
  });

  it("costura-das-arestas: cubo tem 6 faces de 4 lados = 24 lados, A = 24 / 2 = 12", () => {
    const s = step("costura-das-arestas");
    if (s.type !== "interactive_canvas") throw new Error();
    const lados = 6 * 4;
    expect(lados / 2).toBe(12);
  });

  it("desafio-euler: 8 faces e 12 arestas -> V = 6", () => {
    const F = 8;
    const A = 12;
    const V = 2 + A - F;
    expect(V).toBe(6);
    const s = step("desafio-euler");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)?.label).toBe("6");
  });

  it("fechamento: referências da fórmula existem no glossário", () => {
    const s = step("fechamento");
    if (s.type !== "concept_lock") throw new Error();
    for (const t of s.formula) {
      if (t.ref) expect(L.glossario?.[t.ref]).toBeDefined();
    }
  });
});

describe("treino: gabaritos conferidos por conta", () => {
  it("F1 elementos-cubo: V = 8, A = 12, F = 6", () => {
    const c = contar(casco(verticesPoliedro("cubo")));
    expect(c).toEqual({ V: 8, A: 12, F: 6 });
    expect(certa("elementos-cubo")).toBe("V = 8, A = 12, F = 6");
  });

  it("F2 achar-faces-euler: V=6, A=10 -> F = 2 + 10 - 6 = 6", () => {
    expect(2 + 10 - 6).toBe(6);
    expect(certa("achar-faces-euler")).toBe("6");
  });

  it("F3 achar-arestas-euler: F=5, V=5 -> A = 5 + 5 - 2 = 8", () => {
    expect(5 + 5 - 2).toBe(8);
    expect(certa("achar-arestas-euler")).toBe("8");
  });

  it("F4 costura-tetraedro: 4 * 3 / 2 = 6 arestas", () => {
    expect((4 * 3) / 2).toBe(6);
    expect(certa("costura-tetraedro")).toBe("6");
  });

  it("M1 octaedro-arestas-vertices: 8 faces triangulares -> A = 12, V = 6", () => {
    const A = (8 * 3) / 2;
    const V = 2 + A - 8;
    expect([A, V]).toEqual([12, 6]);
    expect(certa("octaedro-arestas-vertices")).toBe("A = 12 e V = 6");
  });

  it("M2 faces-mistas-arestas: (2*3 + 3*4)/2 = 9 arestas", () => {
    expect((2 * 3 + 3 * 4) / 2).toBe(9);
    expect(certa("faces-mistas-arestas")).toBe("9");
  });

  it("M3 dodecaedro-vertices: 12 pentágonos -> A = 30, V = 20", () => {
    const A = (12 * 5) / 2;
    const V = 2 + A - 12;
    expect([A, V]).toEqual([30, 20]);
    expect(certa("dodecaedro-vertices")).toBe("20");
  });

  it("D1 faces-quadrangulares-e-triangulares: F=9, A=16 -> V = 9", () => {
    const F = 4 + 5;
    const A = (4 * 3 + 5 * 4) / 2;
    const V = 2 + A - F;
    expect([F, A, V]).toEqual([9, 16, 9]);
    expect(certa("faces-quadrangulares-e-triangulares")).toBe("9");
  });

  it("D2 arestas-pelos-vertices: 8*3/2 = 12 arestas -> F = 6", () => {
    const A = (8 * 3) / 2;
    const F = 2 + A - 8;
    expect([A, F]).toEqual([12, 6]);
    expect(certa("arestas-pelos-vertices")).toBe("6");
  });

  it("D3 cubo-truncado-todos-vertices: 6 + 8 = 14 faces", () => {
    expect(6 + 8).toBe(14);
    expect(certa("cubo-truncado-todos-vertices")).toBe("14");
  });

  it("D4 fronteira-hexagonos-regulares: 3 * 120° = 360°", () => {
    expect(3 * 120).toBe(360);
    expect(certa("fronteira-hexagonos-regulares")).toContain("360°");
  });

  it("D5 bola-de-futebol-truncada: (12*5 + 20*6)/2 = 90", () => {
    expect((12 * 5 + 20 * 6) / 2).toBe(90);
    expect(certa("bola-de-futebol-truncada")).toBe("90");
  });
});

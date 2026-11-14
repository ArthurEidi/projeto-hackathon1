// Reta: Equação e Inclinação · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { raizes, type CurvaResolvida } from "../widgets/common/plot2d";
import { medidas, mover } from "../widgets/common/pontos/calc";
import { PontosParams } from "../widgets/common/pontos/params";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/geometria-analitica/reta-equacao-e-inclinacao/aula-01.json",
      ),
      "utf8",
    ),
  ),
);

const afim = (a: number, b: number): CurvaResolvida => ({ tipo: "afim", a, b, c: 0 });
const certa = (id: string) =>
  Object.values(L.treino)
    .flat()
    .find((q) => q.id === id)!
    .options.find((o) => o.correct)!.label;
const step = (id: string) => L.steps.find((s) => s.id === id)!;

describe("passos da aula de reta e inclinação", () => {
  const pontos = (id: string) => {
    const s = step(id);
    if (s.type !== "interactive_canvas" || s.widget !== "pontos_no_plano") throw new Error(id);
    const p = PontosParams.parse(s.params);
    const a = { x: Number(p.a[0]), y: Number(p.a[1]) };
    const b = { x: Number(p.b[0]), y: Number(p.b[1]) };
    return { p, a, b, cw: s.complete_when };
  };

  it("mesma-altura: começa com m = 0 e conclui ao subir B 3 (fala vale em (4; 5))", () => {
    const { p, a, b, cw } = pontos("mesma-altura");
    expect(cw).toMatchObject({ metric: "dy", gte: 3 });
    expect(medidas(a, b).m).toBe(0);
    expect(medidas(a, b).dy).toBeLessThan(3);
    const b2 = mover(p, {}, { x: 4, y: 5 });
    expect(medidas(a, b2).dy).toBe(3);
    expect(medidas(a, b2).m).toBe(1);
  });

  it("razao-constante: B preso à reta mantém m = 2 em toda posição", () => {
    const { p, a, cw } = pontos("razao-constante");
    expect(cw).toMatchObject({ metric: "pontos_vistos", gte: 3 });
    expect(p.prender_na_reta).toBe(true);
    for (const x of [-3, -1, 1, 3, 4]) expect(medidas(a, mover(p, {}, { x, y: 0 })).m).toBe(2);
  });

  it("reta-vertical: B na vertical de A dá dx = 0 e m indefinido", () => {
    const { p, a, b, cw } = pontos("reta-vertical");
    expect(cw).toMatchObject({ metric: "dx_zero", gte: 1 });
    expect(medidas(a, b).dx).not.toBe(0);
    const b2 = mover(p, {}, { x: 1, y: 4 });
    expect(medidas(a, b2).dx).toBe(0);
    expect(medidas(a, b2).m).toBeNull();
    expect(a.x).toBe(1);
  });

  it("corte-no-eixo-y: métrica de toque do plano_cartesiano", () => {
    const s = step("corte-no-eixo-y");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("intercepto_tocado");
  });

  it("desafio-equacao: reta por (1; 3) e (3; 7) e distratores", () => {
    const s = step("desafio-equacao");
    if (s.type !== "micro_challenge") throw new Error();
    const m = (7 - 3) / (3 - 1);
    const n = 3 - m * 1;
    expect([m, n]).toEqual([2, 1]);
    expect(s.options.find((o) => o.correct)!.label).toBe("y = 2x + 1");
    // y = 4x − 1: m = Δy = 4, n = 3 − 4 = −1
    expect(3 - 4 * 1).toBe(-1);
    // y = x + 2 passa por (1; 3) mas não por (3; 7)
    expect(1 + 2).toBe(3);
    expect(3 + 2).not.toBe(7);
  });

  it("fechamento: termos referenciados existem no glossário", () => {
    const s = step("fechamento");
    if (s.type !== "concept_lock") throw new Error();
    for (const t of s.formula) {
      if (t.ref) expect(L.glossario?.[t.ref], t.text).toBeDefined();
    }
  });
});

describe("gabaritos do treino", () => {
  it("fáceis: m=0, reta bissetriz, corte y, leitura do triângulo", () => {
    // m-0: (1; 1) e (3; 1)
    const m0 = (1 - 1) / (3 - 1);
    expect(certa("m-0")).toBe(String(m0));

    // m-1-corte-0: m=1, n=0 -> y = x
    expect(certa("m-1-corte-0")).toBe("y = x");

    // corte-em-3: y = 2x + 3 corta em (0; 3)
    expect(certa("corte-em-3")).toBe("(0; 3)");

    // delta-y-por-delta-x: (1; 2) a (3; 6) -> dx = 2, dy = 4
    expect(certa("delta-y-por-delta-x")).toBe("Δx = 2 e Δy = 4");
  });

  it("médias: 2 pontos, equação e ponto pertencente", () => {
    // m-3: (2; 1) e (4; 7)
    const m = (7 - 1) / (4 - 2);
    expect(m).toBe(3);
    expect(certa("m-3")).toBe(String(m));

    // equacao-m-menos-1: (0; 4) e (2; 2)
    const m2 = (2 - 4) / (2 - 0);
    expect(m2).toBe(-1);
    expect(certa("equacao-m-menos-1")).toBe("y = −x + 4");

    // ponto-na-reta: y = 3x - 1 para x = 2
    const yVal = 3 * 2 - 1;
    expect(yVal).toBe(5);
    expect(certa("ponto-na-reta")).toBe(String(yVal));
  });

  it("desafios: achar equação, inclinação negativa, vertical, raiz e alinhamento", () => {
    // reta-2-1-4-5: (2; 1) e (4; 5)
    const mComp = (5 - 1) / (4 - 2);
    const nComp = 1 - mComp * 2;
    expect(mComp).toBe(2);
    expect(nComp).toBe(-3);
    expect(certa("reta-2-1-4-5")).toBe("y = 2x − 3");

    // m-negativo: (1; 5) e (3; 1)
    const mNeg = (1 - 5) / (3 - 1);
    expect(mNeg).toBe(-2);
    expect(certa("m-negativo")).toBe("−2");

    // corte-no-eixo-x: y = −2x + 6 -> −2x + 6 = 0 -> x = 3
    const raiz = raizes(afim(-2, 6), -5, 5)[0];
    expect(raiz).toBe(3);
    expect(certa("corte-no-eixo-x")).toBe("x = 3");

    // reta-vertical: (1; 1) e (1; 5) -> x = 1
    expect(certa("reta-vertical")).toBe("x = 1");

    // alinhados: (0; 1), (1; 3) e (2; k) alinhados -> m = 2 -> k = 5
    expect(certa("alinhados")).toBe("5");
  });
});

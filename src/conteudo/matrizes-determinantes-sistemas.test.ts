// Matrizes, determinantes e sistemas lineares 2×2 · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { avaliar, type CurvaResolvida } from "../widgets/common/plot2d";
import { aplicar } from "../widgets/common/transformacao/calc";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/algebra/matrizes-e-sistemas/matrizes-determinantes-sistemas/aula-01.json",
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

describe("passos da aula: matrizes-determinantes-sistemas", () => {
  it("cada interactive_canvas pode ser concluído", () => {
    for (const s of L.steps) {
      if (s.type !== "interactive_canvas") continue;
      const { metric, gte, lte } = s.complete_when;
      const slider = s.controls.find((c) => c.id === metric);
      if (slider) {
        if (gte !== undefined) expect(slider.max, s.id).toBeGreaterThanOrEqual(gte);
        if (lte !== undefined) expect(slider.min, s.id).toBeLessThanOrEqual(lte);
        expect(slider.initial, `${s.id} não pode começar concluído`).not.toBe(gte ?? lte);
      } else {
        expect(["ponto_x", "quadrantes", "na_raiz", "no_encontro", "faixa_x"]).toContain(metric);
      }
    }
  });

  it("caso-neutro: matriz identidade preserva o vetor (x;1)", () => {
    const s = step("caso-neutro");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when).toEqual({ metric: "x", gte: 2 });
  });

  it("esticar-coluna: diag(a;1) dobra x quando a=2", () => {
    const s = step("esticar-coluna");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when).toEqual({ metric: "a", gte: 2 });
  });

  it("compor-maquinas: produto de transformações aplica B primeiro e A depois", () => {
    const s = step("compor-maquinas");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when).toEqual({ metric: "a", gte: 2 });
    // B(1;1) = (1+1; 1) = (2;1); A(2;1) com a=2 dá (4;1)
    const B = (v: [number, number]): [number, number] => [v[0] + v[1], v[1]];
    const A = (v: [number, number], a: number): [number, number] => [a * v[0], v[1]];
    expect(A(B([1, 1]), 2)).toEqual([4, 1]);
  });

  it("resolver-sistema: x+y=3 e x−y=1 se encontram em (2;1)", () => {
    const s = step("resolver-sistema");
    if (s.type !== "interactive_canvas") throw new Error();
    const r1 = afim(-1, 3);
    const r2 = afim(1, -1);
    expect(avaliar(r1, 2)).toBe(1);
    expect(avaliar(r2, 2)).toBe(1);
    expect(s.complete_when).toEqual({ metric: "no_encontro", gte: 1 });
  });

  it("conferir-previsao: micro_challenge acerta (2;3)", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("(2;3)");
    expect(s.options.find((o) => !o.correct)!.label).toBe("(2;6)");
    expect(s.options).toHaveLength(4);
    const lab = ({ x, y }: { x: number; y: number }) => `(${x};${y})`;
    expect(lab(aplicar([[2, 0], [0, 1]], { x: 1, y: 3 }))).toBe("(2;3)");
    expect(lab(aplicar([[2, 0], [0, 2]], { x: 1, y: 3 }))).toBe("(2;6)"); // dobrou as duas coordenadas
    expect(lab(aplicar([[1, 0], [0, 2]], { x: 1, y: 3 }))).toBe("(1;6)"); // o 2 foi para a direção y
    expect(lab({ x: 1 * 2, y: 1 * 0 })).toBe("(2;0)"); // parou em 1·(coluna 1), sem somar 3·(coluna 2)
    expect(lab(aplicar([[2, 0], [0, 0]], { x: 1, y: 3 }))).toBe("(2;0)"); // figura: matriz sem a 2ª coluna
    expect(s.options.map((o) => o.label)).toEqual(["(2;6)", "(2;3)", "(1;6)", "(2;0)"]);
    expect(new Set(s.options.map((o) => o.label)).size).toBe(4);
  });

  it("fechamento: referências da fórmula existem no glossário", () => {
    const s = step("fechamento");
    if (s.type !== "concept_lock") throw new Error();
    for (const t of s.formula) {
      if (t.ref) expect(L.glossario?.[t.ref], t.text).toBeDefined();
    }
    expect(s.definitions).toHaveLength(3);
  });
});

describe("gabaritos do treino: matrizes-determinantes-sistemas", () => {
  it("fáceis", () => {
    // F1: matriz identidade mantém o vetor
    expect(certa("f1-matrizes-determinantes-sistemas")).toBe("Mantém");

    // F2: primeira coluna é imagem de (1;0)
    expect(certa("f2-matrizes-determinantes-sistemas")).toBe("(1;0)");

    // F3: diag(2;1) dobra a coordenada x
    expect(certa("f3-matrizes-determinantes-sistemas")).toBe("x");

    // F4: retas paralelas distintas têm 0 pontos em comum
    expect(certa("f4-matrizes-determinantes-sistemas")).toBe("0");
  });

  it("médias", () => {
    // M1: diag(2;1) aplicado a (1;3) => (2;3)
    expect(certa("m1-matrizes-determinantes-sistemas")).toBe("(2;3)");

    // M2: det diag(2;3) = 2*3 = 6
    expect(certa("m2-matrizes-determinantes-sistemas")).toBe("6");

    // M3: x+y=3 e x-y=1 => (2;1)
    expect(certa("m3-matrizes-determinantes-sistemas")).toBe("(2;1)");
  });

  it("desafios", () => {
    // D1: diag(2;1)(x;y) = (1;1) => 2x=1 => x=0.5, y=1 => (0,5;1)
    expect(certa("d1-matrizes-determinantes-sistemas")).toBe("(0,5;1)");

    // D2: det A=0 não garante sem solução (pode ser SPI, infinitas)
    expect(certa("d2-matrizes-determinantes-sistemas")).toBe("Não");

    // D3: [[1,1],[0,1]]*(1;2) = (1+2; 2) = (3;2)
    expect(certa("d3-matrizes-determinantes-sistemas")).toBe("(3;2)");

    // D4: [[1,0],[0,1]] + [[2,0],[0,3]] = diag(3;4)
    expect(certa("d4-matrizes-determinantes-sistemas")).toBe("diag(3;4)");

    // D5: B(1;1)=(2;1), A(2;1)=(4;1)
    expect(certa("d5-matrizes-determinantes-sistemas")).toBe("(4;1)");
  });

  it("vestibular: gabaritos das 3 questões do ENEM conferidos por conta", () => {
    expect(L.treino.vestibular).toHaveLength(3);
    const somaColunas = (m: number[][]) => m[0].map((_, j) => m.reduce((s, linha) => s + linha[j], 0));
    // ENEM 2019/144: colunas = dias; segunda soma 11, os outros dias 10
    const acertos = [
      [3, 2, 0, 1, 2],
      [3, 2, 4, 1, 2],
      [2, 2, 2, 3, 2],
      [3, 2, 4, 1, 0],
      [0, 2, 0, 4, 4],
    ];
    expect(somaColunas(acertos)).toEqual([11, 10, 10, 10, 10]);
    expect(certa("enem-2019-acertos-por-dia")).toBe("Segunda-feira");
    // ENEM 2021/157: destino é a coluna j; a coluna 5 soma 12 (a linha 1, origem, soma 13)
    const A = [
      [0, 4, 2, 2, 5],
      [0, 0, 6, 2, 3],
      [2, 2, 0, 3, 0],
      [1, 0, 2, 0, 4],
      [1, 2, 0, 4, 0],
    ];
    expect(somaColunas(A)).toEqual([4, 8, 10, 11, 12]);
    expect(A[0].reduce((s, x) => s + x, 0)).toBe(13);
    expect(certa("enem-2021-regiao-destino")).toBe("5");
    // ENEM 2021/164: 12c+4k+3s+m = 18c+3k+2s+m = 10 dá k+s = 6c; xc+2k+s+m = 10 com a viagem II: x = 18 + 6 = 24
    // Conferência numérica: para quaisquer c, k (s = 6c − k, m = 10 − 30c − k) as duas viagens pesam 10 e x = 24 também.
    for (const [c, k] of [[0.1, 0.5], [0.2, 0.9], [0.05, 0.25]]) {
      const s = 6 * c - k;
      const m = 10 - 30 * c - k;
      expect(12 * c + 4 * k + 3 * s + m).toBeCloseTo(10, 12);
      expect(18 * c + 3 * k + 2 * s + m).toBeCloseTo(10, 12);
      expect(24 * c + 2 * k + s + m).toBeCloseTo(10, 12);
    }
    expect(certa("enem-2021-mala-camisetas")).toBe("24");
  });
});

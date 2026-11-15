// Transformações de gráficos de funções · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { avaliar, vertice, type CurvaResolvida } from "../widgets/common/plot2d";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/algebra/funcoes/transformacoes-graficos-de-funcoes/aula-01.json",
      ),
      "utf8",
    ),
  ),
);

const quad = (
  a = 1,
  b = 0,
  c = 0,
  t?: { a: number; b: number; h: number; k: number },
): CurvaResolvida => ({
  tipo: "quadratica",
  a,
  b,
  c,
  ...(t ? { t } : {}),
});

const certa = (id: string) =>
  Object.values(L.treino)
    .flat()
    .find((q) => q.id === id)!
    .options.find((o) => o.correct)!.label;

const step = (id: string) => L.steps.find((s) => s.id === id)!;

describe("passos da aula", () => {
  it("cada interactive_canvas pode ser concluído", () => {
    for (const s of L.steps) {
      if (s.type !== "interactive_canvas") continue;
      const { metric } = s.complete_when;
      expect(["ponto_x", "parametros_testados", "a"]).toContain(metric);
    }
  });

  it("curva-neutra: f(x) = x² e g(x) = x² coincidem e atingem ponto_x ≥ 2", () => {
    const s = step("curva-neutra");
    if (s.type !== "interactive_canvas") throw new Error();
    const c0 = quad(1, 0, 0);
    const c1 = quad(1, 0, 0);
    expect(avaliar(c0, 2)).toBe(4);
    expect(avaliar(c1, 2)).toBe(4);
    expect(s.complete_when.metric).toBe("ponto_x");
    expect(s.complete_when.gte).toBe(2);
  });

  it("transladar: g(x) = (x−h)²+k move o vértice para (h; k)", () => {
    const s = step("transladar");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.controls.map((c) => c.id)).toEqual(["h", "k"]);
    const g = quad(1, 0, 0, { a: 1, b: 1, h: 1, k: 2 });
    expect(vertice(g)).toEqual({ x: 1, y: 2 });
    expect(s.complete_when.metric).toBe("parametros_testados");
    expect(s.complete_when.gte).toBe(2);
  });

  it("refletir-escalar: slider a inverte a concavidade quando a ≤ −1", () => {
    const s = step("refletir-escalar");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.controls[0].id).toBe("a");
    const g = quad(1, 0, 0, { a: -2, b: 1, h: 0, k: 0 });
    expect(avaliar(g, 1)).toBe(-2);
    expect(s.complete_when.metric).toBe("a");
    expect(s.complete_when.lte).toBe(-1);
  });

  it("desafio-fronteira: vértice de −(x−1)²+2 é (1; 2)", () => {
    const s = step("desafio-fronteira");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("(1;2)");
    expect(s.options.find((o) => !o.correct)!.label).toBe("(−1;−2)");
    expect(s.options).toHaveLength(4);
    const v = (h: number, k: number) => {
      const p = vertice(quad(1, 0, 0, { a: -1, b: 1, h, k }))!;
      return `(${p.x};${p.y})`.replace(/-/g, "−");
    };
    expect(v(1, 2)).toBe("(1;2)");
    expect(v(-1, -2)).toBe("(−1;−2)"); // os dois sentidos trocados
    expect(v(1, -2)).toBe("(1;−2)"); // refletiu também o +2: −(f(x − 1) + 2)
    expect(v(-1, 2)).toBe("(−1;2)"); // x − 1 lido como 1 à esquerda
    expect(s.options.map((o) => o.label)).toEqual(["(1;2)", "(−1;−2)", "(1;−2)", "(−1;2)"]);
    expect(new Set(s.options.map((o) => o.label)).size).toBe(4);
  });

  it("fechamento: cada letra tem significado no glossário", () => {
    const s = step("fechamento");
    if (s.type !== "concept_lock") throw new Error();
    for (const t of s.formula) {
      if (t.ref) expect(L.glossario?.[t.ref], t.text).toBeDefined();
    }
  });
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    // F1: f + 2 desloca 2 para cima
    expect(certa("f1-transformacoes-graficos-de-funcoes")).toBe("2 para cima");

    // F2: f(x - 3) desloca 3 à direita
    expect(certa("f2-transformacoes-graficos-de-funcoes")).toBe("3 à direita");

    // F3: -f(x) é reflexão no eixo x
    expect(certa("f3-transformacoes-graficos-de-funcoes")).toBe("Reflexão no eixo x");

    // F4: vértice de f(x - 2) + 1 é (2; 1)
    expect(certa("f4-transformacoes-graficos-de-funcoes")).toBe("(2;1)");
  });

  it("médias", () => {
    // M1: f(-x) reflete no eixo y
    expect(certa("m1-transformacoes-graficos-de-funcoes")).toBe("Reflete no eixo y");

    // M2: 2f dobra as alturas
    expect(certa("m2-transformacoes-graficos-de-funcoes")).toBe("Alturas dobram");

    // M3: vértice de (x - 1)² + 3 é (1; 3)
    expect(certa("m3-transformacoes-graficos-de-funcoes")).toBe("(1;3)");
  });

  it("desafios", () => {
    // D1: -f(x) leva (2; 5) para (2; -5)
    expect(certa("d1-transformacoes-graficos-de-funcoes")).toBe("(2;−5)");

    // D2: f(x - 2) em x = 3 dá 1² = 1
    expect(Number(certa("d2-transformacoes-graficos-de-funcoes"))).toBe(1);

    // D3: f(2x) fica horizontalmente mais estreita
    expect(certa("d3-transformacoes-graficos-de-funcoes")).toBe("mais estreita");

    // D4: -2(1) + 3 = 1
    expect(Number(certa("d4-transformacoes-graficos-de-funcoes"))).toBe(1);

    // D5: -(x - 2)² + 4 tem vértice (2; 4) e abre para baixo
    expect(certa("d5-transformacoes-graficos-de-funcoes")).toBe("(2;4), para baixo");
  });

  it("vestibular pendente fica vazio", () => {
    expect(L.treino.vestibular).toEqual([]);
  });
});

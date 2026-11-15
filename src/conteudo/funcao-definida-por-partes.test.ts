// Função definida por partes · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { alturaDoPonto, avaliar, type CurvaResolvida } from "../widgets/common/plot2d";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/algebra/funcoes/funcao-definida-por-partes/aula-01.json",
      ),
      "utf8",
    ),
  ),
);

const afim = (
  a: number,
  b: number,
  dom?: { de: number | null; ate: number | null; abreDe: boolean; abreAte: boolean },
): CurvaResolvida => ({
  tipo: "afim",
  a,
  b,
  c: 0,
  ...(dom ? { dom } : {}),
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
      expect(["ponto_x", "trechos_visitados", "na_raiz", "quadrantes"]).toContain(metric);
    }
  });

  it("regra-unica: y = x vale para todo x e atinge x ≥ 1", () => {
    const s = step("regra-unica");
    if (s.type !== "interactive_canvas") throw new Error();
    const c = afim(1, 0);
    expect(avaliar(c, -1)).toBe(-1);
    expect(avaliar(c, 1)).toBe(1);
    expect(s.complete_when.metric).toBe("ponto_x");
    expect(s.complete_when.gte).toBe(1);
  });

  it("trocar-trecho: x para x < 0 e 2x para x ≥ 0", () => {
    const s = step("trocar-trecho");
    if (s.type !== "interactive_canvas") throw new Error();
    const c0 = afim(1, 0, { de: null, ate: 0, abreDe: false, abreAte: true });
    const c1 = afim(2, 0, { de: 0, ate: null, abreDe: false, abreAte: false });
    const curvas = [c0, c1];
    expect(alturaDoPonto(curvas, [0, 1], -1)).toEqual({ y: -1, curva: 0 });
    expect(alturaDoPonto(curvas, [0, 1], 1)).toEqual({ y: 2, curva: 1 });
    expect(s.complete_when.metric).toBe("trechos_visitados");
    expect(s.complete_when.gte).toBe(2);
  });

  it("ponto-fronteira: em x = 0 a regra válida é 2x, que inclui 0", () => {
    const s = step("ponto-fronteira");
    if (s.type !== "interactive_canvas") throw new Error();
    const c0 = afim(1, 0, { de: null, ate: 0, abreDe: false, abreAte: true });
    const c1 = afim(2, 0, { de: 0, ate: null, abreDe: false, abreAte: false });
    const curvas = [c0, c1];
    expect(alturaDoPonto(curvas, [0, 1], 0)).toEqual({ y: 0, curva: 1 });
    expect(s.complete_when.metric).toBe("ponto_x");
    expect(s.complete_when.gte).toBe(0);
  });

  it("desafio-fronteira: f(−2) usa trecho x < 0, logo f(−2) = −2", () => {
    const s = step("desafio-fronteira");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("−2");
    expect(s.options.find((o) => !o.correct)!.label).toBe("−4");
    expect(s.options).toHaveLength(4);
    const lab = (n: number) => String(n).replace("-", "−");
    const x = -2;
    expect(lab(x)).toBe("−2"); // −2 < 0: trecho f(x) = x
    expect(lab(2 * x)).toBe("−4"); // usou a regra 2x, do trecho x ≥ 0
    expect(lab(x + 2 * x)).toBe("−6"); // somou as duas regras: x + 2x
    expect(lab(2 * 0)).toBe("0"); // saída na fronteira x = 0, não na entrada −2
    expect(s.options.map((o) => o.label)).toEqual(["−2", "−4", "−6", "0"]);
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
    // F1: f(x) = x => f(2) = 2
    expect(certa("f1-funcao-definida-por-partes")).toBe("2");

    // F2: f(1) com x >= 0 => 2(1) = 2
    expect(certa("f2-funcao-definida-por-partes")).toBe("2");

    // F3: f(-2) com x < 0 => -2
    expect(certa("f3-funcao-definida-por-partes")).toBe("−2");

    // F4: em x = 0 com condição x >= 0 vale a sentença x >= 0
    expect(certa("f4-funcao-definida-por-partes")).toBe("x≥0");
  });

  it("médias", () => {
    // M1: f(1) com x >= 1 => 5
    expect(certa("m1-funcao-definida-por-partes")).toBe("5");

    // M2: f(2) com x <= 2 => 2 + 1 = 3
    expect(certa("m2-funcao-definida-por-partes")).toBe("3");

    // M3: f(0) com x >= 0 => 2(0) = 0
    expect(certa("m3-funcao-definida-por-partes")).toBe("0");
  });

  it("desafios", () => {
    // D1: f(-3) com x < 0 => (-3)² = 9
    expect(certa("d1-funcao-definida-por-partes")).toBe("9");

    // D2: f(2) com x >= 0 => 2 + 2 = 4
    expect(certa("d2-funcao-definida-por-partes")).toBe("4");

    // D3: em x = 0 quantos trechos valem? Um
    expect(certa("d3-funcao-definida-por-partes")).toBe("Um");

    // D4: f(1) com x <= 1 => 2(1) = 2
    expect(certa("d4-funcao-definida-por-partes")).toBe("2");

    // D5: f(2) com x >= 2 => 3(2) - 1 = 5
    expect(certa("d5-funcao-definida-por-partes")).toBe("5");
  });

  it("vestibular: gabaritos conferidos por conta", () => {
    expect(L.treino.vestibular).toHaveLength(2);
    // V1 ENEM 2016/145: 10 + x >= 0.05*(1200 + x) => x >= 50/0.95 = 52.63 => 53
    expect(Math.ceil(50 / 0.95)).toBe(53);
    expect(certa("enem-2016-cotas")).toBe("53");

    // V2 ENEM 2023/158: lucro(n) = 0.96 * 5 * (300 + 100*(n - 1)) - 900 - 250*n
    const lucro = (n: number) => 0.96 * 5 * (300 + 100 * (n - 1)) - 900 - 250 * n;
    expect(lucro(3)).toBe(750);
    expect(lucro(4)).toBe(980);
    expect(certa("enem-2023-pescador")).toBe("4");
  });
});

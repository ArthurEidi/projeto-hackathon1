// Sistemas lineares, classificação e escalonamento · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { avaliar, type CurvaResolvida } from "../widgets/common/plot2d";
import { classificar, matrizAtual, metricasSistema, substituicao, testarPonto, textoEquacao } from "../widgets/common/escalonado/calc";
import { SistemaEscalonado, SistemaEscalonadoFigura } from "../widgets/common/escalonado/params";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/algebra/matrizes-e-sistemas/sistemas-lineares-e-escalonamento/aula-01.json",
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

/** Params do widget sistema_escalonado de um passo interativo. */
const sistema = (id: string) => {
  const s = step(id);
  if (s.type !== "interactive_canvas" || s.widget !== "sistema_escalonado") throw new Error(id);
  return SistemaEscalonado.parse(s.params);
};
/** Métricas do passo com os sliders dados, incluindo o valor dos próprios sliders (como no InteractiveCanvas). */
const metricas = (id: string, ctl: Record<string, number>) => ({ ...metricasSistema(sistema(id), ctl), ...ctl });

describe("passos da aula: sistemas-lineares-e-escalonamento", () => {
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
        expect(["no_encontro", "zerou", "impossivel"]).toContain(metric);
      }
    }
  });

  it("caso-neutro: retas x+y=3 e 2x+y=4 se cruzam em (1;2)", () => {
    const s = step("caso-neutro");
    if (s.type !== "interactive_canvas") throw new Error();
    const r1 = afim(-1, 3);
    const r2 = afim(-2, 4);
    expect(avaliar(r1, 1)).toBe(2);
    expect(avaliar(r2, 1)).toBe(2);
    expect(s.complete_when).toEqual({ metric: "no_encontro", gte: 1 });
  });

  it("eliminar-linha: L₂ − 2L₁ vira [0, −1; −2] (−y = −2); só k = 2 zera x e a solução (1; 2) não muda", () => {
    const s = step("eliminar-linha");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when).toEqual({ metric: "zerou", gte: 1 });
    expect([0, 1, 2].map((k) => metricas("eliminar-linha", { k }).zerou)).toEqual([0, 0, 1]);
    const m = matrizAtual(sistema("eliminar-linha"), { k: 2 });
    expect(m[1]).toEqual([0, -1, -2]);
    expect(textoEquacao(m[1], ["x", "y"])).toBe("−y = −2");
    for (const k of [0, 1, 2]) expect(classificar(matrizAtual(sistema("eliminar-linha"), { k })).solucao).toEqual([1, 2]);
    // y = 2 passa por (1; 2)
    expect(avaliar(afim(0, 2), 1)).toBe(2);
  });

  it("subir-tres-linhas: z = 1 gera y = 2 − 1 = 1 e x = 3 − 1 − 1 = 1", () => {
    const s = step("subir-tres-linhas");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when).toEqual({ metric: "t", gte: 1 });
    const sub = (t: number) => substituicao(matrizAtual(sistema("subir-tres-linhas"), { t }), ["x", "y", "z"]);
    expect(sub(0).map((l) => l.valor)).toEqual([1, 2, 0]);
    expect(sub(1).map((l) => l.formula)).toEqual(["x = 3 − y − z", "y = 2 − z", "z = 1"]);
    expect(sub(1).map((l) => l.valor)).toEqual([1, 1, 1]);
    // dúvida: com 0 = 0 na última linha, z fica livre e x = 3 − (2 − z) − z = 1
    expect(classificar([[1, 1, 1, 3], [0, 1, 1, 2], [0, 0, 0, 0]])).toMatchObject({ tipo: "infinitas", livres: 1 });
  });

  it("classificar-linha: t = 0 dá 0 = 0 (infinitas); t = 1 dá 0 = 1 (impossível)", () => {
    const s = step("classificar-linha");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when).toEqual({ metric: "impossivel", gte: 1 });
    const m0 = matrizAtual(sistema("classificar-linha"), { t: 0 });
    expect(textoEquacao(m0[1], ["x", "y"])).toBe("0 = 0");
    expect(classificar(m0).tipo).toBe("infinitas");
    expect(metricas("classificar-linha", { t: 0 }).impossivel).toBe(0);
    const m1 = matrizAtual(sistema("classificar-linha"), { t: 1 });
    expect(textoEquacao(m1[1], ["x", "y"])).toBe("0 = 1");
    expect(metricas("classificar-linha", { t: 1 }).impossivel).toBe(1);
  });

  it("conferir-previsao: micro_challenge acerta nenhuma solução", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("Nenhuma");
    expect(s.options.find((o) => !o.correct)!.label).toBe("Infinitas");
    expect(s.options).toHaveLength(4);
    // x + y = 2 e 2x + 2y = 5: L₂ − 2L₁ dá 0x + 0y = 5 − 2·2 = 1
    expect(5 - 2 * 2).toBe(1);
    // "Infinitas" exigiria 0 = 0, isto é, 2x + 2y = 4 (4 − 2·2 = 0)
    expect(4 - 2 * 2).toBe(0);
    // "Uma": duas equações e duas incógnitas, mas o determinante 1·2 − 1·2 é 0, então não há solução única
    expect(1 * 2 - 1 * 2).toBe(0);
    // "Duas": contou uma solução por equação; (1; 1) cumpre L₁ (1 + 1 = 2), mas não L₂ (2 + 2 = 4 ≠ 5)
    expect(1 + 1).toBe(2);
    expect(2 * 1 + 2 * 1).not.toBe(5);
    // as retas nunca se encontram: a distância vertical é sempre 0,5
    for (const x of [-2, 0, 1, 2, 5]) expect(avaliar(afim(-1, 2.5), x) - avaliar(afim(-1, 2), x)).toBe(0.5);
    // a figura (sistema_escalonado_figura) mostra a linha 0 = 1, mas a classificação só aparece no acerto
    if (s.figure.widget !== "sistema_escalonado_figura") throw new Error();
    const base = SistemaEscalonadoFigura.parse(s.figure.params);
    expect(base.mostrar.classificacao).toBe(false);
    const m = matrizAtual(base, {});
    expect(textoEquacao(m[1], ["x", "y"])).toBe("0 = 1");
    expect(classificar(m).tipo).toBe("impossivel");
    const fig = (id: string) => SistemaEscalonadoFigura.parse({ ...s.figure.params, ...s.options.find((o) => o.id === id)!.figure });
    expect(fig("micro-acerto").mostrar.classificacao).toBe(true);
    // "Infinitas" mostra o caso 2x + 2y = 4: 0 = 0
    expect(classificar(matrizAtual(fig("micro-erro"), {})).tipo).toBe("infinitas");
    // "Uma" e "Duas": o ponto testado vale em L₁ e falha em 0 = 1
    for (const id of ["contou-equacoes", "uma-por-reta"]) {
      const f = fig(id);
      expect(testarPonto(matrizAtual(f, {}), f.ponto!).map((t) => t.vale)).toEqual([id === "uma-por-reta", false]);
    }
    expect(s.options.map((o) => o.label)).toEqual(["Infinitas", "Uma", "Nenhuma", "Duas"]);
  });

  it("fechamento: referências da fórmula existem no glossário", () => {
    const s = step("fechamento");
    if (s.type !== "concept_lock") throw new Error();
    for (const t of s.formula) {
      if (t.ref) expect(L.glossario?.[t.ref], t.text).toBeDefined();
    }
    expect(s.definitions).toHaveLength(3);
    // 0 = 0 é a linha nula (livre): o impossível exige c ≠ 0
    expect(s.formula.map((t) => t.text).join("")).toContain("0 = c ≠ 0: impossível");
    if (s.figure.widget !== "sistema_escalonado_figura") throw new Error();
    const m = matrizAtual(SistemaEscalonadoFigura.parse(s.figure.params), {});
    expect(m[1]).toEqual([0, -1, -2]);
    expect(classificar(m).solucao).toEqual([1, 2]);
  });
});

describe("gabaritos do treino: sistemas-lineares-e-escalonamento", () => {
  it("fáceis", () => {
    // F1: 0=1 indica impossibilidade (0 != 1)
    expect(certa("f1-sistemas-lineares-e-escalonamento")).toBe("Impossibilidade");

    // F2: 0=0 não restringe soluções
    expect(certa("f2-sistemas-lineares-e-escalonamento")).toBe("Não");

    // F3: multiplicar linha por zero não é reversível
    expect(certa("f3-sistemas-lineares-e-escalonamento")).toBe("Não");

    // F4: trocar a ordem das equações não altera o conjunto solução
    expect(certa("f4-sistemas-lineares-e-escalonamento")).toBe("Não");
  });

  it("médias", () => {
    // M1: x+y=3 e 2x+y=4 => x=1, y=2
    expect(certa("m1-sistemas-lineares-e-escalonamento")).toBe("(1;2)");

    // M2: x+y=2 e 2x+2y=4 => L2 - 2L1: 0=0 => infinitas soluções
    expect(certa("m2-sistemas-lineares-e-escalonamento")).toBe("Infinitas");

    // M3: x+y=2 e 2x+2y=5 => L2 - 2L1: 0=1 => nenhuma solução
    expect(certa("m3-sistemas-lineares-e-escalonamento")).toBe("Nenhuma");
  });

  it("desafios", () => {
    // D1: 2x+y=2 e y=1 => 2x=1 => x=0.5, y=1
    expect(certa("d1-sistemas-lineares-e-escalonamento")).toBe("(0,5;1)");

    // D2: x+y+z=3 e y+z=2 => x=1; z é livre e determina y=2-z
    expect(certa("d2-sistemas-lineares-e-escalonamento")).toBe("z");

    // D3: z=1 => y=2-1=1 => x=3-1-1=1 => (1;1;1)
    expect(certa("d3-sistemas-lineares-e-escalonamento")).toBe("(1;1;1)");

    // D4: 2x+ky=4 com x+y=2 => L2-2L1: (k-2)y=0 => k=2 gera infinitas soluções
    expect(certa("d4-sistemas-lineares-e-escalonamento")).toBe("2");

    // D5: x+y+z=3, y-z=0, 0=0 => z=t => y=t => x=3-2t => (3-2t; t; t)
    expect(certa("d5-sistemas-lineares-e-escalonamento")).toBe("(3−2t;t;t), t∈R");
  });

  it("vestibular: gabaritos conferidos por conta", () => {
    expect(L.treino.vestibular).toHaveLength(3);
    // V1 ENEM 2023/175: 2a + v = 3.60, a = 2v + 0.05 => 5v = 3.50 => v = 0.70 => 9v = 6.30
    const v = 3.5 / 5;
    expect(9 * v).toBeCloseTo(6.3, 10);
    expect(certa("enem-2023-tiquetes")).toBe("6,30");

    // V2 ENEM 2022/146: M = 400, m = 300; 4x + 3y = 50 => x = 2, y = 14 => 16
    expect(400 * 2 + 300 * 14).toBe(5000);
    expect(certa("enem-2022-circuitos")).toBe("16");

    // V3 ENEM 2018/178: 4x - 3y = 90, 4x - y = 158 => y = 34, x = 48
    const y = (158 - 90) / 2;
    const x = (158 + y) / 4;
    expect(y).toBe(34);
    expect(x).toBe(48);
    expect(certa("enem-2018-rifa")).toBe("48");
  });
});

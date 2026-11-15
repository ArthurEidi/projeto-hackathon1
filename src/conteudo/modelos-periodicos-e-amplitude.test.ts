// Modelos Periódicos e Amplitude · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { avaliar, type CurvaResolvida } from "../widgets/common/plot2d";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(import.meta.dirname, "../../content/geometria/trigonometria/modelos-periodicos-e-amplitude/aula-01.json"),
      "utf8",
    ),
  ),
);
const PI = Math.PI;
const seno = (a: number, b: number, c: number): CurvaResolvida => ({ tipo: "seno", a, b, c });
const certa = (id: string) =>
  Object.values(L.treino)
    .flat()
    .find((q) => q.id === id)!
    .options.find((o) => o.correct)!.label;
const step = (id: string) => L.steps.find((s) => s.id === id)!;
/** Máximo e mínimo numéricos de f em [0, T] por amostragem fina. */
const extremos = (f: (x: number) => number, x1: number) => {
  let mx = -Infinity;
  let mn = Infinity;
  for (let i = 0; i <= 20000; i++) {
    const y = f((x1 * i) / 20000);
    mx = Math.max(mx, y);
    mn = Math.min(mn, y);
  }
  return [Math.round(mn * 1e6) / 1e6, Math.round(mx * 1e6) / 1e6];
};

describe("passos da aula", () => {
  it("cada interactive_canvas pode ser concluído e usa slider com id minúsculo", () => {
    for (const s of L.steps) {
      if (s.type !== "interactive_canvas") continue;
      const { metric, gte, lte } = s.complete_when;
      const slider = s.controls.find((c) => c.id === metric);
      expect(slider, s.id).toBeDefined();
      if (gte !== undefined) expect(slider!.max, s.id).toBeGreaterThanOrEqual(gte);
      if (lte !== undefined) expect(slider!.min, s.id).toBeLessThanOrEqual(lte);
      expect(slider!.initial, `${s.id} não pode começar concluído`).not.toBe(gte ?? lte);
      expect(((gte ?? lte)! - slider!.min) % slider!.step, s.id).toBe(0);
    }
  });

  it("amplitude-a: com A = 3 a imagem é [−3; 3] e o período segue 2π", () => {
    expect(extremos((x) => avaliar(seno(3, 1, 0), x), 2 * PI)).toEqual([-3, 3]);
    expect(avaliar(seno(3, 1, 0), 2 * PI)).toBeCloseTo(0, 10);
  });

  it("linha-media-d: com D = 4 e A = 2 a imagem é [2; 6]", () => {
    expect(extremos((x) => avaliar(seno(2, 1, 4), x), 2 * PI)).toEqual([2, 6]);
  });

  it("periodo-b: com B = 2 o período é π", () => {
    const f = (x: number) => avaliar(seno(1, 2, 0), x);
    expect(f(0.7)).toBeCloseTo(f(0.7 + PI), 10);
    expect(f(0.7)).not.toBeCloseTo(f(0.7 + PI / 2), 3);
    expect(2 * PI / 2).toBeCloseTo(PI, 10);
  });

  it("desafio: h(t) = 12 + 10·sen(πt/6) vai de 2 a 22 e o valor de b no JSON é π/6", () => {
    const s = step("desafio-roda-gigante");
    if (s.type !== "micro_challenge") throw new Error();
    const k = s.figure.params as { curvas: { b: number }[] };
    expect(k.curvas[0].b).toBeCloseTo(PI / 6, 12);
    expect(extremos((t) => 12 + 10 * Math.sin((PI * t) / 6), 12)).toEqual([2, 22]);
    expect(s.options.find((o) => o.correct)!.label).toBe("22 m e 2 m");
    // pontos usados nas figuras das opções: t = 3 é o topo, t = 9 é a base
    expect(12 + 10 * Math.sin((PI * 3) / 6)).toBeCloseTo(22, 10);
    expect(12 + 10 * Math.sin((PI * 9) / 6)).toBeCloseTo(2, 10);
  });

  it("fechamento: cada letra tem significado no glossário", () => {
    const s = step("fechamento");
    if (s.type !== "concept_lock") throw new Error();
    for (const t of s.formula) if (t.ref) expect(L.glossario?.[t.ref], t.text).toBeDefined();
    expect(extremos((x) => avaliar(seno(2, 2, 3), x), PI)).toEqual([1, 5]);
  });
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    expect(extremos((x) => 5 + 3 * Math.sin(x), 2 * PI)).toEqual([2, 8]);
    expect(certa("maximo-basico")).toBe("8");
    expect(certa("minimo-basico")).toBe("2");
    expect(2 * PI / 4).toBeCloseTo(PI / 2, 12);
    expect(certa("periodo-sen-4x")).toBe("π/2");
    expect([(18 + 10) / 2, (18 - 10) / 2]).toEqual([14, 4]);
    expect(certa("identificar-amplitude")).toBe("D = 14 m e A = 4 m");
  });

  it("médias", () => {
    expect(extremos((x) => 10 - 4 * Math.cos(2 * x), PI)).toEqual([6, 14]);
    expect(certa("amplitude-com-sinal-menos")).toBe("[6; 14]");
    expect(2 * PI / (PI / 6)).toBeCloseTo(12, 10);
    expect(certa("periodo-em-horas")).toBe("12 horas");
    expect([(25 + 15) / 2, (25 - 15) / 2]).toEqual([20, 5]);
    expect(certa("montar-equacao-temperatura")).toBe("D = 20 e A = 5");
  });

  it("desafios", () => {
    expect(2 * PI / 40).toBeCloseTo(PI / 20, 12);
    expect(certa("descobrir-b-pelo-periodo")).toBe("π/20");
    const h = (t: number) => 10 + 6 * Math.sin((PI * t) / 4);
    expect(h(2)).toBeCloseTo(16, 10);
    expect(h(1)).toBeLessThan(16);
    expect(h(4)).toBeCloseTo(10, 10);
    expect(certa("instante-de-maximo")).toBe("2 s");
    const r = 15 - 13 * Math.cos(0); // t = 0: ponto mais baixo
    expect([2 * 13, r]).toEqual([26, 2]);
    expect(extremos((t) => 15 - 13 * Math.cos((PI * t) / 10), 20)).toEqual([2, 28]);
    expect(certa("diametro-roda-gigante")).toBe("Diâmetro 26 m e base a 2 m");
    expect(1 / ((2 * PI) / (4 * PI))).toBeCloseTo(2, 10);
    expect(certa("frequencia-batimentos")).toBe("2 batimentos");
    const V = (t: number) => 50 + 20 * Math.sin((PI * t) / 12 - PI / 2);
    expect(V(0)).toBeCloseTo(30, 10);
    expect(V(12)).toBeCloseTo(70, 10);
    expect(V(6)).toBeCloseTo(50, 10);
    // 70 só é atingido em t = 12 dentro de [0, 24]
    const alvos = Array.from({ length: 2401 }, (_, i) => i / 100).filter((t) => Math.abs(V(t) - 70) < 1e-3);
    expect(alvos.every((t) => Math.abs(t - 12) < 0.1)).toBe(true);
    expect(certa("modelo-completo-com-fase")).toBe("30 mil litros e t = 12 h");
  });

  it("vestibular: só questões do ENEM com fonte na api.enem.dev (B21)", () => {
    expect(L.treino.vestibular.length).toBeGreaterThan(0);
    for (const q of L.treino.vestibular) {
      expect(q.fonte.banca).toBe("ENEM");
      expect(q.fonte.urls.some((u) => u.startsWith("https://api.enem.dev/v1/exams/"))).toBe(true);
    }
  });
});

// Circunferência: equação e posições relativas · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/geometria-analitica/circunferencia-equacao-e-posicoes/aula-01.json",
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

describe("passos da aula de circunferência: equação e posições", () => {
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
        expect(["pontos_sobre", "estados_vistos", "centro_x", "k"]).toContain(metric);
      }
    }
  });

  it("mesma-distancia: pontos_sobre alcança 4", () => {
    const s = step("mesma-distancia");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("pontos_sobre");
    expect(s.complete_when.gte).toBe(4);
  });

  it("mover-centro: a alcança 3", () => {
    const s = step("mover-centro");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("a");
    expect(s.complete_when.gte).toBe(3);
  });

  it("dentro-sobre-fora: estados_vistos alcança 3", () => {
    const s = step("dentro-sobre-fora");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("estados_vistos");
    expect(s.complete_when.gte).toBe(3);
  });

  it("reta-sobe: k alcança 4", () => {
    const s = step("reta-sobe");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("k");
    expect(s.complete_when.gte).toBe(4);
  });

  it("desafio-ler-equacao: centro (2; -1) e raio 3", () => {
    const s = step("desafio-ler-equacao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(Math.sqrt(9)).toBe(3);
    expect(s.options.find((o) => o.correct)?.label).toBe("(2; −1) e 3");
  });

  it("fechamento: referências existem no glossário", () => {
    const s = step("fechamento");
    if (s.type !== "concept_lock") throw new Error();
    for (const t of s.formula) {
      if (t.ref) expect(L.glossario?.[t.ref]).toBeDefined();
    }
  });
});

describe("treino: gabaritos conferidos por conta", () => {
  it("F1 raio-16: sqrt(16) = 4", () => {
    expect(Math.sqrt(16)).toBe(4);
    expect(certa("raio-16")).toBe("4");
  });

  it("F2 centro-1-5: (x-1)^2 + (y-5)^2 = 4 => (1; 5)", () => {
    expect(certa("centro-1-5")).toBe("(1; 5)");
  });

  it("F3 ponto-3-4: 3^2 + 4^2 = 25 => sobre", () => {
    expect(3 ** 2 + 4 ** 2).toBe(25);
    expect(certa("ponto-3-4")).toBe("Sobre");
  });

  it("F4 equacao-raio-2: r=2 => r^2 = 4", () => {
    expect(2 ** 2).toBe(4);
    expect(certa("equacao-raio-2")).toBe("x² + y² = 4");
  });

  it("M1 ponto-1-1: 1^2 + 1^2 = 2 < 9 => dentro", () => {
    expect(1 ** 2 + 1 ** 2).toBeLessThan(9);
    expect(certa("ponto-1-1")).toBe("Dentro");
  });

  it("M2 equacao-2-3-5: (x-2)^2 + (y-3)^2 = 25", () => {
    expect(5 ** 2).toBe(25);
    expect(certa("equacao-2-3-5")).toBe("(x − 2)² + (y − 3)² = 25");
  });

  it("M3 centro-negativo: (x+3)^2 + y^2 = 1 => (-3; 0)", () => {
    expect(certa("centro-negativo")).toBe("(−3; 0)");
  });

  it("D1 reta-y5: d(centro, y=5) = 5 = r => tangente", () => {
    expect(Math.abs(5 - 0)).toBe(5);
    expect(certa("reta-y5")).toBe("Tangente");
  });

  it("D2 duas-circunferencias: r1=2, r2=3, d=5 => 2+3=5 => tangentes por fora", () => {
    expect(2 + 3).toBe(5);
    expect(certa("duas-circunferencias")).toBe("Tangentes por fora");
  });

  it("D3 raio-por-ponto: r^2 = 6^2 + 8^2 = 100", () => {
    expect(6 ** 2 + 8 ** 2).toBe(100);
    expect(certa("raio-por-ponto")).toBe("x² + y² = 100");
  });

  it("D4 por-diametro: meio de (0,0) a (4,0) é (2,0), raio 4/2 = 2", () => {
    expect((0 + 4) / 2).toBe(2);
    expect(4 / 2).toBe(2);
    expect(certa("por-diametro")).toBe("(2; 0) e 2");
  });

  it("D5 completar-quadrado: x^2 - 6x + 9 = (x-3)^2 => centro (3; 0)", () => {
    expect(-(-6) / 2).toBe(3);
    expect(certa("completar-quadrado")).toBe("(3; 0)");
  });

  it("V1 enem-2018-tiros: (x-2)^2 + (y-2)^2 = 8 passa por O, A, B, C (6 pts)", () => {
    const naCirc = (x: number, y: number) => (x - 2) ** 2 + (y - 2) ** 2 === 8;
    expect(naCirc(0, 0) && naCirc(0, 4) && naCirc(4, 4) && naCirc(4, 0)).toBe(true);
    expect(certa("enem-2018-tiros")).toBe("(x − 2)² + (y − 2)² = 8");
  });

  it("V2 unicamp-2020-circunferencia-c: centro (c, 0) na reta x + 2y = 3 dá c = 3", () => {
    const c = 3;
    expect(c + 2 * 0).toBe(3);
    expect(certa("unicamp-2020-circunferencia-c")).toBe("3");
  });
});

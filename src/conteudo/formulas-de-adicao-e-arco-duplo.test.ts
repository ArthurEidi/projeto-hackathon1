// Fórmulas de adição e arco duplo · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/trigonometria/formulas-de-adicao-e-arco-duplo/aula-01.json",
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

describe("passos da aula de fórmulas de adição e arco duplo", () => {
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
        expect(["angulo", "rad", "x_rad", "voltas", "seno", "cosseno", "tangente", "sen_soma", "soma_senos"]).toContain(metric);
      }
    }
  });

  it("ilusao-da-soma: beta alcança 60", () => {
    const s = step("ilusao-da-soma");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("beta");
    expect(s.complete_when.gte).toBe(60);
  });

  it("blocos-da-adicao: mostrar_blocos alcança 1", () => {
    const s = step("blocos-da-adicao");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("mostrar_blocos");
    expect(s.complete_when.gte).toBe(1);
  });

  it("arco-duplo: alfa alcança 45", () => {
    const s = step("arco-duplo");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("alfa");
    expect(s.complete_when.gte).toBe(45);
  });

  it("desafio-arco-duplo: 2 · (3/5) · (4/5) = 24/25", () => {
    const s = step("desafio-arco-duplo");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)?.label).toBe("24/25");
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
  it("F1 reconhecer-seno-soma: sen(20° + 10°) = sen 30° = 0,5", () => {
    expect(certa("reconhecer-seno-soma")).toBe("sen 30° = 0,5");
  });

  it("F2 reconhecer-cosseno-soma: cos(40° + 20°) = cos 60° = 0,5", () => {
    expect(certa("reconhecer-cosseno-soma")).toBe("cos 60° = 0,5");
  });

  it("F3 arco-duplo-30: 2·sen 15°·cos 15° = sen 30° = 0,5", () => {
    expect(certa("arco-duplo-30")).toBe("sen 30° = 0,5");
  });

  it("F4 cos-2a-identidade: cos(2α) = cos²α − sen²α", () => {
    expect(certa("cos-2a-identidade")).toBe("cos²α − sen²α");
  });

  it("M1 calcular-cos-2a: (3/5)² - (4/5)² = -7/25", () => {
    expect(9 / 25 - 16 / 25).toBeCloseTo(-7 / 25, 5);
    expect(certa("calcular-cos-2a")).toBe("−7/25");
  });

  it("M2 calcular-sen-15: sen(45° - 30°) = (√6 − √2) / 4", () => {
    expect(certa("calcular-sen-15")).toBe("(√6 − √2) / 4");
  });

  it("M3 cosseno-complementar-soma: cos(π/2 - x) = sen x", () => {
    expect(certa("cosseno-complementar-soma")).toBe("sen x");
  });

  it("D1 cos-2a-so-com-seno: 1 - 2*(1/9) = 7/9", () => {
    expect(1 - 2 * (1 / 9)).toBeCloseTo(7 / 9, 5);
    expect(certa("cos-2a-so-com-seno")).toBe("7/9");
  });

  it("D2 soma-de-dois-arcos: (3/5)*(12/13) + (5/13)*(4/5) = 56/65", () => {
    expect(36 / 65 + 20 / 65).toBeCloseTo(56 / 65, 5);
    expect(certa("soma-de-dois-arcos")).toBe("56/65");
  });

  it("D3 tangente-da-soma: (1/2 + 1/3) / (1 - 1/6) = 1", () => {
    expect((1 / 2 + 1 / 3) / (1 - 1 / 6)).toBeCloseTo(1, 5);
    expect(certa("tangente-da-soma")).toBe("1");
  });

  it("D4 simplificar-sen2x-sobre-cosx: (2*sen x*cos x) / (2*cos x) = sen x", () => {
    expect(certa("simplificar-sen2x-sobre-cosx")).toBe("sen x");
  });

  it("D5 periodo-produto-seno-cosseno: 6*sen x*cos x = 3*sen(2x)", () => {
    expect(certa("periodo-produto-seno-cosseno")).toBe("f(x) = 3·sen(2x); Im = [−3; 3] e T = π");
  });

  it("vestibular (B45a): UFPR 2025 Q08 (cos 2x = 7/25) e UFRGS 2022 Q51 (sen 2α = 24/25)", () => {
    const sen = 3 / 5;
    const cos = Math.sqrt(1 - sen * sen);
    expect(1 - 2 * sen * sen).toBeCloseTo(7 / 25, 10);
    expect(certa("ufpr-2025-cos-2x")).toBe("7/25");
    expect(2 * sen * cos).toBeCloseTo(24 / 25, 10);
    expect(certa("ufrgs-2022-sen-2a")).toBe("24/25");
  });
});

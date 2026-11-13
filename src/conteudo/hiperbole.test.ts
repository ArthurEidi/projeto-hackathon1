// Hipérbole como lugar geométrico · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/geometria-analitica/hiperbole/aula-01.json",
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

describe("passos da aula de hipérbole como lugar geométrico", () => {
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
        expect(["pontos_vistos", "pontos_sobre", "topo_tocado", "triangulo_ligado", "igualou", "vertice_achado"]).toContain(metric);
      }
    }
  });

  it("diferenca-zero: diferenca alcança 6", () => {
    const s = step("diferenca-zero");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("diferenca");
    expect(s.complete_when.gte).toBe(6);
  });

  it("diferenca-fixa: pontos_vistos alcança 3", () => {
    const s = step("diferenca-fixa");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("pontos_vistos");
    expect(s.complete_when.gte).toBe(3);
  });

  it("triangulo-invertido: triangulo_ligado alcança 1", () => {
    const s = step("triangulo-invertido");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("triangulo_ligado");
    expect(s.complete_when.gte).toBe(1);
  });

  it("assintotas: zoom alcança 4", () => {
    const s = step("assintotas");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("zoom");
    expect(s.complete_when.gte).toBe(4);
  });

  it("desafio-focos: c² = 9 + 16 = 25 => (±5; 0)", () => {
    const s = step("desafio-focos");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)?.label).toBe("(±5; 0)");
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
  it("F1 definicao: |PF₁ − PF₂| = 2a", () => {
    expect(certa("definicao")).toBe("A diferença das distâncias aos focos");
  });

  it("F2 vertices: a² = 9 => a = 3", () => {
    expect(Math.sqrt(9)).toBe(3);
    expect(certa("vertices")).toBe("(±3; 0)");
  });

  it("F3 ramos: hipérbole tem 2 ramos", () => {
    expect(certa("ramos")).toBe("2");
  });

  it("F4 um-sobre-x: y = 1/x é hipérbole equilátera", () => {
    expect(certa("um-sobre-x")).toBe("Hipérbole");
  });

  it("M1 c-3-4: c = sqrt(9 + 16) = 5", () => {
    expect(Math.sqrt(3 * 3 + 4 * 4)).toBe(5);
    expect(certa("c-3-4")).toBe("5");
  });

  it("M2 assintotas-4-9: b/a = 3/2 => y = ±(3/2)x", () => {
    expect(Math.sqrt(9) / Math.sqrt(4)).toBe(1.5);
    expect(certa("assintotas-4-9")).toBe("y = ±(3/2)x");
  });

  it("M3 diferenca-16-9: a = 4 => 2a = 8", () => {
    expect(2 * Math.sqrt(16)).toBe(8);
    expect(certa("diferenca-16-9")).toBe("8");
  });

  it("D1 montar-equacao: b² = 25 - 16 = 9 => x²/16 − y²/9 = 1", () => {
    expect(25 - 16).toBe(9);
    expect(certa("montar-equacao")).toBe("x²/16 − y²/9 = 1");
  });

  it("D2 vertical: y² positivo => focos em (0; ±5)", () => {
    expect(Math.sqrt(9 + 16)).toBe(5);
    expect(certa("vertical")).toBe("(0; ±5)");
  });

  it("D3 diferenca-zero: PF₁ = PF₂ forma mediatriz", () => {
    expect(certa("diferenca-zero")).toBe("A reta mediatriz entre os focos");
  });

  it("D4 qual-e-hiperbole: sinais opostos x² − y² = 1", () => {
    expect(certa("qual-e-hiperbole")).toBe("x² − y² = 1");
  });

  it("D5 equilatera: a = b => b/a = 1 => y = ±x", () => {
    expect(certa("equilatera")).toBe("y = ±x");
  });

  it("V1 enem-2017-hill: produto constante gera ramo de hipérbole", () => {
    expect(certa("enem-2017-hill")).toBe("Ramo de hipérbole");
  });
});

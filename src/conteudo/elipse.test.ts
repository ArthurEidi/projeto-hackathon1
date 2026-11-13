// Elipse como lugar geométrico · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/geometria-analitica/elipse/aula-01.json",
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

describe("passos da aula de elipse como lugar geométrico", () => {
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

  it("focos-juntos: c alcança 3", () => {
    const s = step("focos-juntos");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("c");
    expect(s.complete_when.gte).toBe(3);
  });

  it("barbante: pontos_sobre alcança 4", () => {
    const s = step("barbante");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("pontos_sobre");
    expect(s.complete_when.gte).toBe(4);
  });

  it("topo-e-pitagoras: topo_tocado alcança 1", () => {
    const s = step("topo-e-pitagoras");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("topo_tocado");
    expect(s.complete_when.gte).toBe(1);
  });

  it("achatar: c alcança 4", () => {
    const s = step("achatar");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("c");
    expect(s.complete_when.gte).toBe(4);
  });

  it("desafio-focos: c² = 25 − 9 = 16 => (±4; 0)", () => {
    const s = step("desafio-focos");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)?.label).toBe("(±4; 0)");
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
  it("F1 definicao: PF₁ + PF₂ = 2a", () => {
    expect(certa("definicao")).toBe("A soma das distâncias aos focos");
  });

  it("F2 semieixo-maior: a² = 25 => a = 5", () => {
    expect(Math.sqrt(25)).toBe(5);
    expect(certa("semieixo-maior")).toBe("5");
  });

  it("F3 focos-juntos: c = 0 => circunferência", () => {
    expect(certa("focos-juntos")).toBe("Uma circunferência");
  });

  it("F4 soma-x2-9: a² = 9 => 2a = 6", () => {
    expect(2 * Math.sqrt(9)).toBe(6);
    expect(certa("soma-x2-9")).toBe("6");
  });

  it("M1 c-de-25-16: c = sqrt(25 - 16) = 3", () => {
    expect(Math.sqrt(25 - 16)).toBe(3);
    expect(certa("c-de-25-16")).toBe("3");
  });

  it("M2 vertices: a = sqrt(16) = 4", () => {
    expect(Math.sqrt(16)).toBe(4);
    expect(certa("vertices")).toBe("(±4; 0)");
  });

  it("M3 b-por-pitagoras: b = sqrt(100 - 36) = 8", () => {
    expect(Math.sqrt(100 - 36)).toBe(8);
    expect(certa("b-por-pitagoras")).toBe("8");
  });

  it("D1 montar-equacao: b² = 25 - 16 = 9 => x²/25 + y²/9 = 1", () => {
    expect(25 - 16).toBe(9);
    expect(certa("montar-equacao")).toBe("x²/25 + y²/9 = 1");
  });

  it("D2 vertical: a² = 25 sob y² => (0; ±4)", () => {
    expect(Math.sqrt(25 - 9)).toBe(4);
    expect(certa("vertical")).toBe("(0; ±4)");
  });

  it("D3 forma-inteira: 144/9 = 16 => a = 4", () => {
    expect(Math.sqrt(144 / 9)).toBe(4);
    expect(certa("forma-inteira")).toBe("4");
  });

  it("D4 mais-achatada: c = 4 tem menor b = 3", () => {
    expect(Math.sqrt(25 - 16)).toBe(3);
    expect(Math.sqrt(25 - 1)).toBeGreaterThan(3);
    expect(certa("mais-achatada")).toBe("A de c = 4");
  });

  it("D5 orbita: menor distância = a - c = 5 - 3 = 2", () => {
    expect(5 - 3).toBe(2);
    expect(certa("orbita")).toBe("2");
  });
});

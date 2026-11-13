// Circunferência, arcos e ângulos · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/geometria-plana/circunferencia-arcos-e-angulos/aula-01.json",
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

describe("passos da aula de circunferência, arcos e ângulos", () => {
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
        expect(["alfa", "central", "arco", "inscrito", "pos_v"]).toContain(metric);
      }
    }
  });

  it("arco-e-central: alfa alcança 80", () => {
    const s = step("arco-e-central");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("alfa");
    expect(s.complete_when.gte).toBe(80);
  });

  it("angulo-inscrito-metade: alfa alcança 120", () => {
    const s = step("angulo-inscrito-metade");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("alfa");
    expect(s.complete_when.gte).toBe(120);
  });

  it("passeio-na-borda: pos_v varia até 260", () => {
    const s = step("passeio-na-borda");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("pos_v");
    expect(s.complete_when.gte).toBe(260);
  });

  it("semicircunferencia-90: alfa alcança 180", () => {
    const s = step("semicircunferencia-90");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("alfa");
    expect(s.complete_when.gte).toBe(180);
  });

  it("desafio-inscrito: inscrito 35° => central 70°", () => {
    const s = step("desafio-inscrito");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)?.label).toBe("70°");
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
  it("F1 central-para-inscrito: 80° / 2 = 40°", () => {
    expect(80 / 2).toBe(40);
    expect(certa("central-para-inscrito")).toBe("40°");
  });

  it("F2 inscrito-para-arco: 2 * 25° = 50°", () => {
    expect(2 * 25).toBe(50);
    expect(certa("inscrito-para-arco")).toBe("50°");
  });

  it("F3 diametro-e-raio: 2 * 6 cm = 12 cm", () => {
    expect(2 * 6).toBe(12);
    expect(certa("diametro-e-raio")).toBe("12 cm");
  });

  it("F4 triangulo-no-diametro: 180° / 2 = 90°", () => {
    expect(180 / 2).toBe(90);
    expect(certa("triangulo-no-diametro")).toBe("90°");
  });

  it("M1 dois-inscritos-mesmo-arco: ambos medem 42°", () => {
    expect(certa("dois-inscritos-mesmo-arco")).toBe("42°");
  });

  it("M2 triangulo-semicirculo-angulos: 180° - 90° - 30° = 60°", () => {
    expect(180 - 90 - 30).toBe(60);
    expect(certa("triangulo-semicirculo-angulos")).toBe("60°");
  });

  it("M3 poligono-regular-arco: arco 360°/6 = 60°, inscrito 30°", () => {
    expect(360 / 6).toBe(60);
    expect(60 / 2).toBe(30);
    expect(certa("poligono-regular-arco")).toBe("Arco 60° e inscrito 30°");
  });

  it("D1 triangulo-isosceles-raios: (180° - 100°) / 2 = 40°", () => {
    expect((180 - 100) / 2).toBe(40);
    expect(certa("triangulo-isosceles-raios")).toBe("40°");
  });

  it("D2 quadrilatero-inscrito-fronteira: (360° - 110°) / 2 = 125°", () => {
    expect((360 - 110) / 2).toBe(125);
    expect(certa("quadrilatero-inscrito-fronteira")).toBe("125°");
  });

  it("D3 soma-central-e-inscrito: 3β = 105° => β = 35°", () => {
    expect(105 / 3).toBe(35);
    expect(certa("soma-central-e-inscrito")).toBe("35°");
  });

  it("D4 arco-nao-inteiro: (360° / 8) / 2 = 22.5°", () => {
    expect(360 / 8 / 2).toBe(22.5);
    expect(certa("arco-nao-inteiro")).toBe("22,5°");
  });

  it("D5 cruzamento-diametro-inscrito: 90° + (110° / 2) = 145°", () => {
    expect(90 + 110 / 2).toBe(145);
    expect(certa("cruzamento-diametro-inscrito")).toBe("145°");
  });
});

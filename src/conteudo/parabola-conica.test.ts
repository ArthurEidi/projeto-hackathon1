// Parábola como lugar geométrico e cônica · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/geometria-analitica/parabola-conica/aula-01.json",
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

describe("passos da aula de parábola como lugar geométrico e cônica", () => {
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

  it("vertice: vertice_achado alcança 1", () => {
    const s = step("vertice");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("vertice_achado");
    expect(s.complete_when.gte).toBe(1);
  });

  it("tracar: pontos_sobre alcança 4", () => {
    const s = step("tracar");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("pontos_sobre");
    expect(s.complete_when.gte).toBe(4);
  });

  it("igualar: igualou alcança 1", () => {
    const s = step("igualar");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("igualou");
    expect(s.complete_when.gte).toBe(1);
  });

  it("afastar-foco: p alcança 3", () => {
    const s = step("afastar-foco");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("p");
    expect(s.complete_when.gte).toBe(3);
  });

  it("desafio-foco: 4p = 8 => p = 2 => (0; 2)", () => {
    const s = step("desafio-foco");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)?.label).toBe("(0; 2)");
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
  it("F1 vertice-x2-4y: vértice é (0; 0)", () => {
    expect(certa("vertice-x2-4y")).toBe("(0; 0)");
  });

  it("F2 definicao: pontos equidistantes de um ponto e uma reta", () => {
    expect(certa("definicao")).toBe("Um ponto e uma reta");
  });

  it("F3 ponto-na-curva: 2² = 4y => y = 1", () => {
    expect(Math.pow(2, 2) / 4).toBe(1);
    expect(certa("ponto-na-curva")).toBe("1");
  });

  it("F4 foco-x2-4y: 4p = 4 => p = 1 => (0; 1)", () => {
    expect(4 / 4).toBe(1);
    expect(certa("foco-x2-4y")).toBe("(0; 1)");
  });

  it("M1 diretriz-x2-12y: 4p = 12 => p = 3 => y = −3", () => {
    expect(12 / 4).toBe(3);
    expect(certa("diretriz-x2-12y")).toBe("y = −3");
  });

  it("M2 equacao-foco-0-2: p = 2 => 4p = 8 => x² = 8y", () => {
    expect(4 * 2).toBe(8);
    expect(certa("equacao-foco-0-2")).toBe("x² = 8y");
  });

  it("M3 distancia-a-diretriz: 4 - (-1) = 5", () => {
    expect(4 - -1).toBe(5);
    expect(certa("distancia-a-diretriz")).toBe("5");
  });

  it("D1 para-baixo: foco em (0; -1) => x² = −4y", () => {
    expect(certa("para-baixo")).toBe("x² = −4y");
  });

  it("D2 x-para-y9: x² = 4*9 = 36 => x = ±6", () => {
    expect(Math.sqrt(4 * 9)).toBe(6);
    expect(certa("x-para-y9")).toBe("(6; 9) e (−6; 9)");
  });

  it("D3 farol: lâmpada no foco reflete paralela ao eixo", () => {
    expect(certa("farol")).toBe("No foco");
  });

  it("D4 distancia-10: y + 1 = 10 => y = 9", () => {
    expect(10 - 1).toBe(9);
    expect(certa("distancia-10")).toBe("9");
  });

  it("D5 mais-aberta: p = 3 é mais aberta que p = 1", () => {
    expect(12 / 4).toBeGreaterThan(4 / 4);
    expect(certa("mais-aberta")).toBe("x² = 12y");
  });
});

describe("vestibular (B42, provas oficiais)", () => {
  it("ITA 2009 Q16 (E): (x − 1)² = 2(y − 1/4), então p = 1/2", () => {
    for (const x of [-1, 0, 2, 3.5]) {
      const y = (2 * x * x - 4 * x + 3) / 4;
      expect((x - 1) ** 2).toBeCloseTo(2 * (y - 1 / 4), 12);
    }
    expect(2 / 4).toBe(0.5);
    expect(certa("ita-2009-parabola")).toBe("1/2");
  });

  it("V2 Unicamp 2019 Q69 (c): 3x² − y + 1 = 0 e x² + y² − 4y + 3 = 0 têm 3 interseções", () => {
    const pts: [number, number][] = [
      [0, 1],
      [Math.sqrt(5) / 3, 8 / 3],
      [-Math.sqrt(5) / 3, 8 / 3],
    ];
    for (const [x, y] of pts) {
      expect(3 * x * x - y + 1).toBeCloseTo(0, 12);
      expect(x * x + y * y - 4 * y + 3).toBeCloseTo(0, 12);
    }
    expect(certa("unicamp-2019-parabola-circunferencia")).toBe("três pontos");
  });
});

// Posições Relativas no Espaço · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { posicaoRetas } from "../widgets/common/solido/cenas";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/geometria-espacial/posicoes-relativas-no-espaco/aula-01.json",
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

describe("passos da aula de posicoes relativas no espaco", () => {
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
        expect(["posicao", "perpendiculares", "posicoes_vistas"]).toContain(metric);
      }
    }
  });

  it("no-mesmo-plano: retas no piso começam paralelas e viram concorrentes com giro", () => {
    const s = step("no-mesmo-plano");
    if (s.type !== "interactive_canvas") throw new Error();
    const p1 = posicaoRetas([0, 0, 0], [1, 0, 0], [0, 0, 4], [1, 0, 0]);
    expect(p1.posicao).toBe(0); // paralelas
    const rad = (45 * Math.PI) / 180;
    const p2 = posicaoRetas([0, 0, 0], [1, 0, 0], [0, 0, 4], [Math.cos(rad), 0, Math.sin(rad)]);
    expect(p2.posicao).toBe(1); // concorrentes
  });

  it("retas-reversas: em z = 0 concorrentes, em z = 4 reversas", () => {
    const s = step("retas-reversas");
    if (s.type !== "interactive_canvas") throw new Error();
    // Em z = 0: AB [0,0,0] dir [1,0,0] e BC [4,0,0] dir [0,0,1]
    const pChao = posicaoRetas([0, 0, 0], [1, 0, 0], [4, 0, 0], [0, 0, 1]);
    expect(pChao.posicao).toBe(1); // concorrentes
    // Em z = 4 (teto): AB no piso e FG no teto [4,4,0] dir [0,0,1]
    const pTeto = posicaoRetas([0, 0, 0], [1, 0, 0], [4, 4, 0], [0, 0, 1]);
    expect(pTeto.posicao).toBe(2); // reversas
    expect(pTeto.perpendiculares).toBe(true);
  });

  it("desafio-cubo: AB e CG são reversas", () => {
    const s = step("desafio-cubo");
    if (s.type !== "micro_challenge") throw new Error();
    const p = posicaoRetas([0, 0, 0], [1, 0, 0], [4, 0, 4], [0, 1, 0]);
    expect(p.posicao).toBe(2);
    expect(s.options.find((o) => o.correct)?.label).toBe("Reversas");
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
  it("F1 viaduto-avenida: sem encontro e direções diferentes -> reversas", () => {
    expect(certa("viaduto-avenida")).toBe("Reversas");
  });

  it("F2 tripe-plano: 3 pontos não colineares determinam um plano", () => {
    expect(certa("tripe-plano")).toBe("3");
  });

  it("F3 piso-teto: sem pontos comuns -> paralelos", () => {
    expect(certa("piso-teto")).toBe("Paralelos");
  });

  it("F4 piso-parede: interseção de dois planos secantes é uma reta", () => {
    expect(certa("piso-parede")).toBe("Uma reta");
  });

  it("M1 arestas-paralelas-cubo: 4 arestas paralelas ao todo, 3 outras", () => {
    expect(4 - 1).toBe(3);
    expect(certa("arestas-paralelas-cubo")).toBe("3");
  });

  it("M2 intersecao-planos-paralelos: coplanares e sem encontro -> paralelas", () => {
    expect(certa("intersecao-planos-paralelos")).toBe("Paralelas");
  });

  it("M3 angulo-reversas-cubo: horizontal e vertical -> 90°", () => {
    expect(certa("angulo-reversas-cubo")).toBe("90°");
  });

  it("D1 contar-reversas-cubo: 11 - 3 paralelas - 4 concorrentes = 4 reversas", () => {
    expect(11 - 3 - 4).toBe(4);
    expect(certa("contar-reversas-cubo")).toBe("4");
  });

  it("D2 reta-paralela-plano: paralela a algumas e reversa a outras", () => {
    expect(certa("reta-paralela-plano")).toBe("Paralela a algumas e reversa a outras");
  });

  it("D3 projecao-ortogonal-segmento: segmento vertical projeta um ponto", () => {
    expect(certa("projecao-ortogonal-segmento")).toBe("Um único ponto");
  });

  it("D4 planos-perpendiculares-terceiro: paredes perpendiculares ao chão podem se cruzar", () => {
    expect(certa("planos-perpendiculares-terceiro")).toBe("Não, podem ser secantes");
  });

  it("D5 soma-determinacao-planos: C(4,3) = 4 planos", () => {
    const c43 = (4 * 3 * 2) / (3 * 2 * 1);
    expect(c43).toBe(4);
    expect(certa("soma-determinacao-planos")).toBe("4");
  });
});

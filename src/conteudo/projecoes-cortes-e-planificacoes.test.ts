// Projeções, Cortes e Planificações · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { casco, moldeDado, secao } from "../widgets/common/solido/cenas";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/geometria-espacial/projecoes-cortes-e-planificacoes/aula-01.json",
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

describe("passos da aula de projecoes cortes e planificacoes", () => {
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
        expect(["vistas_vistas", "solidos_vistos", "fechado", "lados_secao"]).toContain(metric);
      }
    }
  });

  it("plano-de-corte: corte horizontal na pirâmide dá 4 lados, vertical dá 3 lados", () => {
    const s = step("plano-de-corte");
    if (s.type !== "interactive_canvas") throw new Error();
    const piramideMalha = casco([[-1, 0, -1], [1, 0, -1], [1, 0, 1], [-1, 0, 1], [0, 2, 0]]);
    const secH = secao(piramideMalha, [0, 1, 0], 1);
    expect(secH).toHaveLength(4);
    const secV = secao(piramideMalha, [1, 0, 0], 0);
    expect(secV).toHaveLength(3);
  });

  it("abrir-e-fechar-molde: moldeDado gera 6 faces", () => {
    const s = step("abrir-e-fechar-molde");
    if (s.type !== "interactive_canvas") throw new Error();
    const aberto = moldeDado(0);
    expect(aberto).toHaveLength(6);
    const fechado = moldeDado(1);
    expect(fechado).toHaveLength(6);
  });

  it("desafio-face-oposta: face 1 é oposta à face 6 (6 presa à 5 no moldeDado)", () => {
    const s = step("desafio-face-oposta");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)?.label).toBe("Face 6");
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
  it("F1 vista-superior-cilindro: projeção da base circular é um círculo", () => {
    expect(certa("vista-superior-cilindro")).toBe("Um círculo");
  });

  it("F2 vista-frontal-cone: perfil é um triângulo", () => {
    expect(certa("vista-frontal-cone")).toBe("Um triângulo");
  });

  it("F3 molde-piramide-quadrada: 1 quadrado e 4 triângulos", () => {
    expect(certa("molde-piramide-quadrada")).toBe("1 quadrado e 4 triângulos");
  });

  it("F4 corte-esfera: corte plano na esfera é sempre um círculo", () => {
    expect(certa("corte-esfera")).toBe("Um círculo");
  });

  it("M1 oposta-no-dado: na fila A-B-C-D, B é oposto a D", () => {
    expect(certa("oposta-no-dado")).toBe("D");
  });

  it("M2 corte-vertical-cilindro: diâmetro 2*3 = 6 e altura 8 -> retângulo 6 cm × 8 cm", () => {
    expect(2 * 3).toBe(6);
    expect(certa("corte-vertical-cilindro")).toBe("Retângulo 6 cm × 8 cm");
  });

  it("M3 molde-prisma-hexagonal: 6 faces laterais + 2 bases = 6 retângulos e 2 hexágonos", () => {
    expect(certa("molde-prisma-hexagonal")).toBe("6 retângulos e 2 hexágonos");
  });

  it("D1 dado-soma-7: 7 - 2 = 5 e 7 - 4 = 3", () => {
    expect([7 - 2, 7 - 4]).toEqual([5, 3]);
    expect(certa("dado-soma-7")).toBe("x = 5 e y = 3");
  });

  it("D2 corte-tres-pontas-cubo: cortando 3 arestas de uma quina gera um triângulo", () => {
    expect(certa("corte-tres-pontas-cubo")).toBe("Um triângulo");
  });

  it("D3 empilhamento-blocos-vistas: 4 colunas * 2 andares = 8", () => {
    expect(4 * 2).toBe(8);
    expect(certa("empilhamento-blocos-vistas")).toBe("8");
  });

  it("D4 molde-invalido-abas: abas do mesmo lado se sobrepõem", () => {
    expect(certa("molde-invalido-abas")).toBe("Duas faces se sobrepõem e falta uma tampa");
  });

  it("D5 caminho-formiga-planificacao: hipotenusa de 6 por 3 = sqrt(6^2 + 3^2) = sqrt(45)", () => {
    expect(Math.hypot(6, 3) ** 2).toBeCloseTo(45, 9);
    expect(certa("caminho-formiga-planificacao")).toBe("√45");
  });
});

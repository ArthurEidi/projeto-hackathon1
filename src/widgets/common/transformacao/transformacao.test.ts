import { describe, expect, it } from "vitest";
import { aplicar, det2, metricasTransformacao, multiplicar, orientacao, resolverMatriz } from "./calc";
import { desenharTransformacao } from "./desenho";
import { Transformacao, TransformacaoFigura } from "./params";

describe("transformacao_plano: matemática", () => {
  it("identidade preserva vetores, tem det = 1 e orientação positiva", () => {
    const p = Transformacao.parse({ vetor: [2, 1] });
    const A = resolverMatriz(p.matriz, {});
    expect(aplicar(A, { x: 2, y: 1 })).toEqual({ x: 2, y: 1 });
    expect(det2(A)).toBe(1);
    expect(metricasTransformacao(p, {})).toEqual({ det: 1, area: 1, orientacao: 1, v_x: 2, v_y: 1 });
  });

  it("escala horizontal por $a dobra área em a = 2, inverte orientação em a = -1 e colapsa em a = 0", () => {
    const p = Transformacao.parse({
      matriz: [
        ["$a", 0],
        [0, 1],
      ],
      vetor: [1, 1],
    });
    expect(metricasTransformacao(p, { a: 2 })).toMatchObject({ det: 2, area: 2, orientacao: 1 });
    expect(metricasTransformacao(p, { a: -1 })).toMatchObject({ det: -1, area: 1, orientacao: -1 });
    expect(metricasTransformacao(p, { a: 0 })).toMatchObject({ det: 0, area: 0, orientacao: 0 });
    expect(orientacao(-0.5)).toBe(-1);
  });

  it("composição B depois A: B=[[1,1],[0,1]], A=diag(2,1) leva (1,1) a (4,1)", () => {
    const p = Transformacao.parse({
      matriz: [
        [1, 1],
        [0, 1],
      ],
      depois: [
        ["$a", 0],
        [0, 1],
      ],
      vetor: [1, 1],
    });
    const B = resolverMatriz(p.matriz, {});
    const A = resolverMatriz(p.depois!, { a: 2 });
    const comp = multiplicar(A, B);
    expect(aplicar(comp, { x: 1, y: 1 })).toEqual({ x: 4, y: 1 });
    expect(metricasTransformacao(p, { a: 2 }).det).toBe(2);
  });

  it("figura recusa $slider e janela inválida é rejeitada", () => {
    expect(
      TransformacaoFigura.safeParse({
        matriz: [
          ["$a", 0],
          [0, 1],
        ],
      }).success,
    ).toBe(false);
    expect(Transformacao.safeParse({ janela: [4, -1] }).success).toBe(false);
  });
});

describe("desenharTransformacao", () => {
  const ctx = new Proxy({} as Record<string, unknown>, {
    get: (_, k) => (k === "measureText" ? () => ({ width: 32 }) : () => undefined),
    set: () => true,
  }) as unknown as CanvasRenderingContext2D;

  it("desenha painel único (normal, invertido, colapsado) e três painéis sem erro", () => {
    const p1 = Transformacao.parse({ matriz: [[2, 0], [0, 1]], vetor: [1, 3], highlight: ["c4"] });
    desenharTransformacao(ctx, 400, 368, [], p1, {});

    const pInv = Transformacao.parse({ matriz: [[-1, 0], [0, 1]], vetor: [1, 1] });
    desenharTransformacao(ctx, 400, 368, [], pInv, {});

    const pZero = Transformacao.parse({ matriz: [[0, 0], [0, 1]], vetores: [[1, 1], [2, 1]] });
    desenharTransformacao(ctx, 400, 368, [], pZero, {});

    const pComp = Transformacao.parse({
      matriz: [[1, 1], [0, 1]],
      depois: [[2, 0], [0, 1]],
      vetor: [1, 1],
    });
    desenharTransformacao(ctx, 400, 224, [], pComp, {});
  });
});

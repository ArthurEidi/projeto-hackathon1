import { describe, expect, it } from "vitest";
import type { Hit } from "../../canvas";
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

  it("afasta etiquetas quando A = I e esconde coordenada da imagem com mostrar.imagem=false", () => {
    const pId = Transformacao.parse({ matriz: [[1, 0], [0, 1]], vetor: [1, 1] });
    const hitsId: Hit[] = [];
    desenharTransformacao(ctx, 336, 310, hitsId, pId, {});
    const vHits = hitsId.filter((h) => h.key === "c1" || h.key === "c3");
    expect(vHits).toHaveLength(2);
    const [a, b] = vHits;
    const intersecta = a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
    expect(intersecta).toBe(false);

    const pSemImg = Transformacao.parse({ matriz: [[2, 0], [0, 1]], vetor: [1, 3], mostrar: { imagem: false } });
    const hitsSemImg: Hit[] = [];
    desenharTransformacao(ctx, 336, 310, hitsSemImg, pSemImg, {});
    expect(hitsSemImg.some((h) => h.key === "c3")).toBe(false);
    expect(hitsSemImg.some((h) => h.key === "c1")).toBe(true);
  });
});

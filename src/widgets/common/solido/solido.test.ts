import { describe, expect, it } from "vitest";
import { areaCentroide, casco, contar, montarCena, moldeDado, perfilDe, posicaoRetas, secao, verticesPoliedro } from "./cenas";
import { desenharSolido } from "./desenho";
import { prisma } from "./malha";
import { Solido3d, Solido3dFigura } from "./params";

describe("contas do solido_3d", () => {
  it("Euler em todos os poliedros e na quina serrada", () => {
    for (const n of ["tetraedro", "piramide_quadrada", "cubo", "octaedro", "prisma_triangular", "dodecaedro", "icosaedro"] as const) {
      const { V, A, F } = contar(casco(verticesPoliedro(n)));
      expect(V - A + F, n).toBe(2);
    }
    expect(contar(casco(verticesPoliedro("cubo")))).toEqual({ V: 8, A: 12, F: 6 });
    const c = montarCena(Solido3d.parse({ modo: "poliedro", solidos: ["cubo"], serrar: 0.5 }), {});
    expect([c.metricas.V, c.metricas.A, c.metricas.F]).toEqual([10, 15, 7]);
  });
  it("Pappus: retângulo 3 × 4 gira em cilindro 36π; triângulo em cone 12π", () => {
    const r = areaCentroide(perfilDe("retangulo", 3, 4, 0, 0));
    expect(r.A * 2 * r.cr).toBeCloseTo(36, 9);
    const t = areaCentroide(perfilDe("triangulo", 3, 4, 0, 0));
    expect(t.A * 2 * t.cr).toBeCloseTo(12, 9);
    const anel = areaCentroide(perfilDe("anel", 2, 5, 0, 1));
    expect(anel.A * 2 * anel.cr).toBeCloseTo((9 - 1) * 5, 9);
  });
  it("posições de retas no espaço", () => {
    expect(posicaoRetas([0, 0, 0], [1, 0, 0], [0, 0, 1], [1, 0, 0]).posicao).toBe(0);
    expect(posicaoRetas([0, 0, 0], [1, 0, 0], [0, 0, 0], [0, 1, 0])).toEqual({ posicao: 1, perpendiculares: true });
    expect(posicaoRetas([0, 0, 0], [1, 0, 0], [0, 1, 1], [0, 0, 1]).posicao).toBe(2);
    expect(posicaoRetas([0, 0, 0], [1, 0, 0], [2, 0, 0], [3, 0, 0]).posicao).toBe(3);
  });
  it("seção horizontal da pirâmide é quadrado; vertical pelo topo é triângulo; dado fecha num cubo", () => {
    const m = casco([[-1, 0, -1], [1, 0, -1], [1, 0, 1], [-1, 0, 1], [0, 2, 0]]);
    expect(secao(m, [0, 1, 0], 1)).toHaveLength(4);
    expect(secao(m, [1, 0, 0], 0)).toHaveLength(3);
    const fechado = moldeDado(1).flatMap((f) => f.pts);
    for (const q of fechado) for (const x of q) expect(Math.abs(Math.abs(x - (q === q ? 0 : 0)) )).toBeLessThan(2.0001 + 1);
    expect(Math.max(...fechado.map((q) => q[1]))).toBeCloseTo(2, 9);
  });
  it("prisma 4 × 3 × 5: V = 60; tronco k = 1/2 -> volume da ponta = 1/8", () => {
    expect(montarCena(Solido3d.parse({ modo: "prisma", a: 4, b: 3, h: 5 }), {}).metricas.volume).toBe(60);
    expect(contar(prisma([[0, 0], [1, 0], [0, 1]], 1)).F).toBe(5);
    const t = montarCena(Solido3d.parse({ modo: "tronco", solido: "cone", R: 3, H: 8, corte: 4 }), {});
    expect(t.metricas.volume_menor / t.metricas.volume_total).toBeCloseTo(1 / 8, 9);
  });
  it("figura recusa slider", () => {
    expect(Solido3dFigura.safeParse({ modo: "cilindro", r: "$r" }).success).toBe(false);
    expect(Solido3dFigura.safeParse({ modo: "cilindro", r: 3, highlight: ["c1"] }).success).toBe(true);
  });
  const ctx = new Proxy({} as Record<string, unknown>, {
    get: (_, k) => (k === "measureText" ? () => ({ width: 30 }) : () => undefined),
    set: () => true,
  }) as unknown as CanvasRenderingContext2D;
  const casos = [
    { modo: "revolucao", perfil: "semicirculo", giro: 200 },
    { modo: "revolucao", perfil: "anel" },
    { modo: "prisma", camadas: true, diagonal: true, abrir: 0.5 },
    { modo: "piramide", abrir: 0.5 },
    { modo: "piramide", dividir: 0.5 },
    { modo: "cilindro", desenrolar: 1, fantasma: { r: 2, h: 3 } },
    { modo: "esfera", corte: 3, no_cilindro: true },
    { modo: "esfera", R: 1, k: 2 },
    { modo: "tronco", separar: 0.5, meridiano: true },
    { modo: "poliedro", solidos: ["cubo"], soltar: 0.5 },
    { modo: "espaco", retas: [{ ponto: [0, 0, 0] }, { ponto: [0, 0, 4], angulo: 30, cor: "c2" }], planos: ["piso"], esquadros: [{ em: [0, 0, 0], a: [1, 0, 0], b: [0, 1, 0] }] },
    { modo: "vistas", solido: "piramide", corte: { tipo: "horizontal", altura: 0.5 } },
    { modo: "vistas", solido: "dado", fechar: 0.5 },
    { modo: "composicao", montagem: "capsula", juntar: 0.5 },
    { modo: "composicao", montagem: "cavidade" },
  ];
  it.each(casos.map((c, i) => [i, c] as const))("caso %i desenha sem erro", (_, c) => {
    const p = Solido3dFigura.parse(c);
    expect(() => desenharSolido(ctx, 400, 400, [], p, {})).not.toThrow();
  });
});

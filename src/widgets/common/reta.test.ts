import { describe, expect, it } from "vitest";
import type { Hit } from "../canvas";
import { aspectoReta, dentroDoTrecho, desenharReta, operarTrechos, resolverModoOperacao } from "./desenhoReta";
import { RetaFigura, RetaNumerica, type Trecho } from "./params";

const t = (de: number | null, ate: number | null, abreDe = false, abreAte = false): Trecho => ({
  de,
  ate,
  abreDe,
  abreAte,
  cor: "c1",
});

describe("reta_numerica: operacao de conjuntos", () => {
  it("calcula união com sobreposição, toque e intervalos disjuntos", () => {
    expect(operarTrechos(t(0, 3, false, true), t(3, 5), "uniao")).toEqual([
      { de: 0, ate: 5, abreDe: false, abreAte: false, cor: "c4", rotulo: undefined },
    ]);

    // [0, 3) ∪ (3, 5] continua disjunto porque falta o 3
    const disj = operarTrechos(t(0, 3, false, true), t(3, 5, true, false), "uniao");
    expect(disj).toHaveLength(2);
    expect(disj.some((x) => dentroDoTrecho(x, 3))).toBe(false);
    expect(disj.some((x) => dentroDoTrecho(x, 2))).toBe(true);
    expect(disj.some((x) => dentroDoTrecho(x, 4))).toBe(true);
  });

  it("calcula interseção respeitando extremos abertos, fechados e ponto único", () => {
    expect(operarTrechos(t(-2, 4, true, false), t(1, 6, false, true), "intersecao")).toEqual([
      { de: 1, ate: 4, abreDe: false, abreAte: false, cor: "c4", rotulo: undefined },
    ]);
    expect(operarTrechos(t(0, 2, false, true), t(2, 4), "intersecao")).toEqual([]);
    expect(operarTrechos(t(0, 2), t(2, 4), "intersecao")).toEqual([
      { de: 2, ate: 2, abreDe: false, abreAte: false, cor: "c4", rotulo: undefined },
    ]);
  });

  it("calcula diferença A \\ B dividindo intervalos e invertendo extremos", () => {
    const dif = operarTrechos(t(0, 5), t(2, 3, false, true), "diferenca");
    // [0, 5] \ [2, 3) = [0, 2) ∪ [3, 5]
    expect(dif).toEqual([
      { de: 0, ate: 2, abreDe: false, abreAte: true, cor: "c4", rotulo: undefined },
      { de: 3, ate: 5, abreDe: false, abreAte: false, cor: "c4", rotulo: undefined },
    ]);
    expect(dif.some((x) => dentroDoTrecho(x, 2))).toBe(false);
    expect(dif.some((x) => dentroDoTrecho(x, 3))).toBe(true);

    // (-∞, 4] \ (1, +∞) = (-∞, 1]
    expect(operarTrechos(t(null, 4), t(1, null, true, false), "diferenca")).toEqual([
      { de: null, ate: 1, abreDe: false, abreAte: false, cor: "c4", rotulo: undefined },
    ]);
  });

  it("resolve modo por slider e valida schemas de RetaNumerica e RetaFigura", () => {
    expect(resolverModoOperacao("$op", { op: 0 })).toBe("uniao");
    expect(resolverModoOperacao("$op", { op: 1 })).toBe("intersecao");
    expect(resolverModoOperacao("$op", { op: 2 })).toBe("diferenca");

    const parsed = RetaNumerica.parse({
      operacao: { a: { de: -2, ate: 2 }, b: { de: 0, ate: 4, abreDe: true }, modo: "$op" },
      ponto: { x: 1, centro: "$h", vertice: true },
    });
    expect(parsed.ponto?.centro).toBe("$h");
    expect(parsed.ponto?.vertice).toBe(true);

    expect(
      RetaFigura.safeParse({
        operacao: { a: { de: 0, ate: 2 }, b: { de: 1, ate: 3 }, modo: "$op" },
      }).success,
    ).toBe(false);
    expect(
      RetaFigura.safeParse({
        ponto: { x: 1, centro: "$h" },
      }).success,
    ).toBe(false);
    expect(
      RetaFigura.safeParse({
        operacao: { a: { de: 0, ate: 2 }, b: { de: 1, ate: 3 }, modo: "intersecao" },
        ponto: { x: 1, centro: 2, vertice: true },
      }).success,
    ).toBe(true);
  });

  it("etiquetas de distância e pontos abaixo do eixo cabem no canvas sem recorte", () => {
    const ctx = new Proxy({ measureText: (s: string) => ({ width: s.length * 9 }) }, {
      get: (o, k) => (k in o ? Reflect.get(o, k) : () => {}),
      set: (o, k, v) => Reflect.set(o, k, v),
    }) as unknown as CanvasRenderingContext2D;
    const p = RetaNumerica.parse({
      intervalo: [-4, 4],
      pontos: [{ x: 0, cor: "c4", rotulo: "0" }],
      ponto: { x: 1, distanciaZero: true, cor: "ink", corDistancia: "c3" },
    });
    const w = 336;
    const h = Math.round(w * aspectoReta(p));
    const hits: Hit[] = [];
    desenharReta(ctx, w, h, hits, p, 1);
    expect(hits.length).toBeGreaterThanOrEqual(2);
    for (const a of hits) {
      expect(a.y).toBeGreaterThanOrEqual(0);
      expect(a.y + a.h).toBeLessThanOrEqual(h);
    }
  });

  it("empilha trilhas de operação, distribui pontos em faixas e separa centro sem sobreposição", () => {
    const ctx = new Proxy({ measureText: (s: string) => ({ width: s.length * 8 }) }, {
      get: (o, k) => (k in o ? Reflect.get(o, k) : () => {}),
      set: (o, k, v) => Reflect.set(o, k, v),
    }) as unknown as CanvasRenderingContext2D;
    const w = 336;
    const semSobreposicao = (hits: Hit[], h: number) => {
      for (const [i, a] of hits.entries()) {
        expect(a.x).toBeGreaterThanOrEqual(0);
        expect(a.x + a.w).toBeLessThanOrEqual(w);
        expect(a.y).toBeGreaterThanOrEqual(0);
        expect(a.y + a.h).toBeLessThanOrEqual(h);
        for (const b of hits.slice(i + 1)) {
          const intersecta = a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
          expect(intersecta).toBe(false);
        }
      }
    };

    const pOp = RetaNumerica.parse({
      intervalo: [-4, 5],
      operacao: { a: { de: -2, ate: 3, rotulo: "A = [-2; 3]" }, b: { de: 1, ate: 4, rotulo: "B = [1; 4]" }, modo: "uniao" },
      ponto: { x: 2, cor: "c3" },
    });
    const hitsOp: Hit[] = [];
    const hOp = Math.round(w * aspectoReta(pOp));
    desenharReta(ctx, w, hOp, hitsOp, pOp, 2, { modoOp: "uniao" });
    expect(hitsOp.length).toBeGreaterThanOrEqual(4);
    semSobreposicao(hitsOp, hOp);

    const pPts = RetaNumerica.parse({
      intervalo: [-5, 5],
      pontos: [
        { x: -2, cor: "c1", rotulo: "2·10⁻²" },
        { x: -1, cor: "c1", rotulo: "2·10⁻¹" },
        { x: 0, cor: "c2", rotulo: "n = 0" },
        { x: 1, cor: "c1", rotulo: "2·10¹" },
        { x: 2, cor: "c1", rotulo: "2·10²" },
      ],
    });
    const hitsPts: Hit[] = [];
    const hPts = Math.round(w * aspectoReta(pPts));
    desenharReta(ctx, w, hPts, hitsPts, pPts);
    expect(hitsPts).toHaveLength(5);
    semSobreposicao(hitsPts, hPts);

    const pCentro = RetaNumerica.parse({
      intervalo: [-4, 4],
      pontos: [
        { x: -2, cor: "c1", rotulo: "x = -2" },
        { x: 1, cor: "c2", rotulo: "c = 1" },
      ],
      ponto: { x: -2, centro: 1, cor: "c1" },
    });
    const hitsCentro: Hit[] = [];
    const hCentro = Math.round(w * aspectoReta(pCentro));
    desenharReta(ctx, w, hCentro, hitsCentro, pCentro, -2, { centro: 1 });
    expect(hitsCentro.length).toBeGreaterThanOrEqual(4);
    semSobreposicao(hitsCentro, hCentro);

    const pSemDist = RetaNumerica.parse({
      intervalo: [-4, 4],
      pontos: [
        { x: -2, cor: "c1", rotulo: "x = -2" },
        { x: 1, cor: "c2", rotulo: "c = 1" },
      ],
      ponto: { x: -2, centro: 1, cor: "c1" },
      mostrar: { distancia: false },
    });
    const hitsSemDist: Hit[] = [];
    const hSemDist = Math.round(w * aspectoReta(pSemDist));
    desenharReta(ctx, w, hSemDist, hitsSemDist, pSemDist, -2, { centro: 1 });
    expect(hitsSemDist.length).toBe(hitsCentro.length - 1);
    semSobreposicao(hitsSemDist, hSemDist);
  });
});

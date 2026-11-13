import { expect, it } from "vitest";
import { calcular } from "./calc";
import { Areas, AreasFigura } from "./params";
it("produto e retirada conferem quatro parcelas, inclusive lado zero", () => { for (const retirar of [false, true]) for (const b of [0, 1, 2]) { const d = calcular(Areas.parse({ modo: "produto", a: 2, b, retirar }), {}); expect(d.area).toBe(4 + (retirar ? -4 : 4) * b + b * b); expect(d.valido).toBe(true); } });
it("raiz é o lado não negativo e área negativa é inválida", () => { for (const A of [0, 1, 8, 9]) { const d = calcular(Areas.parse({ modo: "raiz", A }), {}); expect(d.lado ** 2).toBeCloseTo(A); expect(d.lado).toBeGreaterThanOrEqual(0); } expect(calcular(Areas.parse({ modo: "raiz", A: -1 }), {}).valido).toBe(false); });
it("escala altera área pelo quadrado e unidade não muda comprimento", () => { for (const e of [0, 1, 2]) { const d = calcular(Areas.parse({ modo: "escala", L: 2, k: 3, e }), {}); expect(d.area).toBe(36); expect(d.razao_area).toBe(9); expect(d.a * 10 ** d.e).toBe([2, 20, 200][e]); } });
it("resolve sliders e figura não aceita referências", () => { expect(calcular(Areas.parse({ modo: "raiz", A: "$area" }), { area: 9 }).lado).toBe(3); expect(AreasFigura.safeParse({ modo: "produto", b: "$b" }).success).toBe(false); });

import { desenhar, vistaAreas } from "./desenho";
import type { Hit } from "../../canvas";

it("centraliza a figura e conserva a escala ao variar o slider, inclusive b zero", () => {
  const p = Areas.parse({ modo: "produto", a: 2, b: "$b", limite: 8 });
  const escalas = [0, 1, 4, 6].map(b => {
    const v = vistaAreas(400, 400, p, { b });
    expect(v.p((2 + b) / 2, (2 + b) / 2).x).toBeCloseTo(200);
    expect(v.p((2 + b) / 2, (2 + b) / 2).y).toBeCloseTo(158);
    expect(v.inv(v.p(2, b))).toEqual(expect.objectContaining({ x: expect.closeTo(2), y: expect.closeTo(b) }));
    return v.k;
  });
  expect(new Set(escalas).size).toBe(1);
});

it("figuras numéricas ocupam 80% da dimensão útil, sem depender do limite padrão", () => {
  for (const raw of [{ modo: "produto", a: 2, b: 0 }, { modo: "raiz", A: 9 }, { modo: "escala", L: 2, k: 2 }]) {
    const p = Areas.parse(raw), d = calcular(p, {}), v = vistaAreas(400, 400, p, {});
    expect(d.lado * v.k).toBeCloseTo((400 - 140) * 0.8);
  }
});

it("chips não se sobrepõem em 400 px, inclusive em peças nulas ou estreitas", () => {
  const ctx = new Proxy({ measureText: (s: string) => ({ width: s.length * 9 }) }, {
    get: (o, k) => k in o ? Reflect.get(o, k) : () => {},
    set: (o, k, value) => Reflect.set(o, k, value),
  }) as unknown as CanvasRenderingContext2D;
  for (const retirar of [false, true]) for (const b of [0, 0.1, 1, 2]) {
    const hits: Hit[] = [];
    desenhar(ctx, 400, 400, hits, Areas.parse({ modo: "produto", a: 2, b, retirar }), {});
    expect(hits).toHaveLength(6);
    for (const [i, a] of hits.entries()) {
      expect(a.x).toBeGreaterThanOrEqual(0);
      expect(a.x + a.w).toBeLessThanOrEqual(400);
      for (const b of hits.slice(i + 1)) {
        const intersecta = a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
        expect(intersecta).toBe(false);
      }
    }
  }
});

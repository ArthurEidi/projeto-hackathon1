import { expect, it } from "vitest";
import { medidas, mover, quadrado } from "./calc";
import { cortarRetaNaCaixa } from "./desenho";
import { PontosFigura, PontosParams } from "./params";
it("distância, sinais e ponto médio", () => { const m = medidas({ x: 1, y: 2 }, { x: 5, y: 5 }); expect(m.distancia).toBe(5); expect(m.medio).toEqual({ x: 3, y: 3.5 }); expect(medidas({ x: 5, y: 5 }, { x: 1, y: 2 }).distancia).toBe(5); });
it("reta vertical e pontos coincidentes não dividem por zero", () => { expect(medidas({ x: 1, y: 1 }, { x: 1, y: 3 }).m).toBeNull(); expect(medidas({ x: 1, y: 1 }, { x: 1, y: 1 }).distancia).toBe(0); });
it("encaixa e preserva a reta original no arraste", () => { const p = PontosParams.parse({ modo: "reta", a: [0, 1], b: [2, 5], prender_na_reta: true }); for (const x of [-3, 0, 3]) expect(mover(p, {}, { x, y: 99 })).toEqual({ x, y: 2 * x + 1 }); });
it("quadrado sobre segmento tem área igual ao comprimento ao quadrado", () => { const q = quadrado({ x: 1, y: 2 }, { x: 5, y: 5 }, { x: 5, y: 2 }); const area = Math.abs(q.reduce((s, a, i) => { const b = q[(i + 1) % 4]; return s + a.x * b.y - a.y * b.x; }, 0)) / 2; expect(area).toBe(25); });
it("figura recusa sliders; modo padrão permite roteiros sem modo", () => { expect(PontosParams.parse({}).modo).toBe("segmento"); expect(PontosFigura.safeParse({ a: ["$x", 0] }).success).toBe(false); });
it("mostrar.distancia e rotulos têm padrões atuais e aceitam configuração", () => {
  const padrao = PontosParams.parse({});
  expect(padrao.mostrar.distancia).toBe(true);
  expect(padrao.rotulos).toEqual(["A", "B"]);
  const custom = PontosFigura.parse({ mostrar: { distancia: false }, rotulos: ["O", "P"] });
  expect(custom.mostrar.distancia).toBe(false);
  expect(custom.rotulos).toEqual(["O", "P"]);
});
it("corta a reta na borda da malha sem sair da caixa", () => {
  const seg = cortarRetaNaCaixa({ x: 0, y: 1 }, 2, 1, { x0: -6, x1: 8, y0: -4, y1: 8 });
  expect(seg).not.toBeNull();
  for (const pt of seg!) {
    expect(pt.x).toBeGreaterThanOrEqual(-6 - 1e-9);
    expect(pt.x).toBeLessThanOrEqual(8 + 1e-9);
    expect(pt.y).toBeGreaterThanOrEqual(-4 - 1e-9);
    expect(pt.y).toBeLessThanOrEqual(8 + 1e-9);
  }
});

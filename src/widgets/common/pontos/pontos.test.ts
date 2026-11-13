import { expect, it } from "vitest";
import { medidas, mover, quadrado } from "./calc";
import { PontosFigura, PontosParams } from "./params";
it("distância, sinais e ponto médio", () => { const m = medidas({ x: 1, y: 2 }, { x: 5, y: 5 }); expect(m.distancia).toBe(5); expect(m.medio).toEqual({ x: 3, y: 3.5 }); expect(medidas({ x: 5, y: 5 }, { x: 1, y: 2 }).distancia).toBe(5); });
it("reta vertical e pontos coincidentes não dividem por zero", () => { expect(medidas({ x: 1, y: 1 }, { x: 1, y: 3 }).m).toBeNull(); expect(medidas({ x: 1, y: 1 }, { x: 1, y: 1 }).distancia).toBe(0); });
it("encaixa e preserva a reta original no arraste", () => { const p = PontosParams.parse({ modo: "reta", a: [0, 1], b: [2, 5], prender_na_reta: true }); for (const x of [-3, 0, 3]) expect(mover(p, {}, { x, y: 99 })).toEqual({ x, y: 2 * x + 1 }); });
it("quadrado sobre segmento tem área igual ao comprimento ao quadrado", () => { const q = quadrado({ x: 1, y: 2 }, { x: 5, y: 5 }, { x: 5, y: 2 }); const area = Math.abs(q.reduce((s, a, i) => { const b = q[(i + 1) % 4]; return s + a.x * b.y - a.y * b.x; }, 0)) / 2; expect(area).toBe(25); });
it("figura recusa sliders; modo padrão permite roteiros sem modo", () => { expect(PontosParams.parse({}).modo).toBe("segmento"); expect(PontosFigura.safeParse({ a: ["$x", 0] }).success).toBe(false); });

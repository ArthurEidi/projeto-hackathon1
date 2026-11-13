import { expect, it } from "vitest";
import { intersecoes, posicao, relativas, visitar, type Visitas } from "./calc";
import { CircunferenciaFigura } from "./params";
it("completa quatro pontos distintos e três posições", () => { let s: Visitas = { estados: [], pontos: [] }; const c = { x: 0, y: 0 }; for (const q of [{ x: 5, y: 0 }, { x: 3, y: 4 }, { x: 0, y: 5 }, { x: -3, y: 4 }, { x: -3, y: 4 }, { x: 0, y: 0 }, { x: 6, y: 0 }]) s = visitar(c, 5, q, s); expect(s.pontos).toHaveLength(4); expect(s.estados).toHaveLength(3); });
it("interseções secante, tangente e exterior com centro deslocado", () => { const c = { x: 2, y: -1 }; expect(intersecoes(c, 3, -1)).toEqual([{ x: -1, y: -1 }, { x: 5, y: -1 }]); expect(intersecoes(c, 3, 2)).toEqual([{ x: 2, y: 2 }]); expect(intersecoes(c, 3, 3)).toEqual([]); });
it("classifica duas circunferências", () => { const c = { x: 0, y: 0 }; expect(relativas(c, 3, c, 3)).toBe("coincidentes"); expect(relativas(c, 3, { x: 6, y: 0 }, 3)).toBe("tangentes externas"); expect(relativas(c, 3, { x: 2, y: 0 }, 1)).toBe("tangentes internas"); expect(relativas(c, 3, { x: 4, y: 0 }, 3)).toBe("secantes"); });
it("translação preserva distância e figura recusa slider", () => { expect(posicao({ x: 2, y: -1 }, 5, { x: 5, y: 3 }).estado).toBe("sobre"); expect(CircunferenciaFigura.safeParse({ raio: "$r" }).success).toBe(false); });

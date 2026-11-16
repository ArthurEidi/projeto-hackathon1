import { expect, it } from "vitest";
import { intersecoes, posicao, relativas, visitar, type Visitas } from "./calc";
import { desenhar, posicoesRotulosCP } from "./desenho";
import { Circunferencia, CircunferenciaFigura } from "./params";
it("completa quatro pontos distintos e três posições", () => { let s: Visitas = { estados: [], pontos: [] }; const c = { x: 0, y: 0 }; for (const q of [{ x: 5, y: 0 }, { x: 3, y: 4 }, { x: 0, y: 5 }, { x: -3, y: 4 }, { x: -3, y: 4 }, { x: 0, y: 0 }, { x: 6, y: 0 }]) s = visitar(c, 5, q, s); expect(s.pontos).toHaveLength(4); expect(s.estados).toHaveLength(3); });
it("interseções secante, tangente e exterior com centro deslocado", () => { const c = { x: 2, y: -1 }; expect(intersecoes(c, 3, -1)).toEqual([{ x: -1, y: -1 }, { x: 5, y: -1 }]); expect(intersecoes(c, 3, 2)).toEqual([{ x: 2, y: 2 }]); expect(intersecoes(c, 3, 3)).toEqual([]); });
it("classifica duas circunferências", () => { const c = { x: 0, y: 0 }; expect(relativas(c, 3, c, 3)).toBe("coincidentes"); expect(relativas(c, 3, { x: 6, y: 0 }, 3)).toBe("tangentes externas"); expect(relativas(c, 3, { x: 2, y: 0 }, 1)).toBe("tangentes internas"); expect(relativas(c, 3, { x: 4, y: 0 }, 3)).toBe("secantes"); });
it("translação preserva distância e figura recusa slider", () => { expect(posicao({ x: 2, y: -1 }, 5, { x: 5, y: 3 }).estado).toBe("sobre"); expect(CircunferenciaFigura.safeParse({ raio: "$r" }).success).toBe(false); });
it("afasta os rótulos C e P quando os pontos estão próximos ou alinhados", () => {
  const iguais = posicoesRotulosCP({ x: 150, y: 150 }, { x: 150, y: 150 });
  expect(Math.hypot(iguais.c.x - iguais.p.x, iguais.c.y - iguais.p.y)).toBeGreaterThanOrEqual(46);
  const pAcima = posicoesRotulosCP({ x: 150, y: 150 }, { x: 170, y: 130 });
  expect(pAcima.p.y).toBeLessThan(130);
  expect(pAcima.c.y).toBeGreaterThan(150);
});
it("mostrar.ponto começa true e false oculta P e o chip de distância", () => {
  const padrao = Circunferencia.parse({});
  expect(padrao.mostrar.ponto).toBe(true);
  const texts: string[] = [];
  const ctx = new Proxy({} as Record<string, unknown>, {
    get: (_, k) => {
      if (k === "measureText") return () => ({ width: 20 });
      if (k === "fillText") return (t: string) => texts.push(String(t));
      return () => undefined;
    },
    set: () => true,
  }) as unknown as CanvasRenderingContext2D;
  const semPonto = Circunferencia.parse({ raio: 3, reta_y: 0, mostrar: { ponto: false } });
  const r = desenhar(ctx, 400, 360, [], semPonto, {}, { x: 0, y: 0 }, { x: 2, y: -3 }, []);
  expect(r.alvos.some((a) => a.id === "ponto")).toBe(false);
  expect(texts).toContain("C");
  expect(texts).not.toContain("P");
  expect(texts.some((t) => t.startsWith("d = "))).toBe(false);
});

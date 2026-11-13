import { describe, expect, it } from "vitest";
import { dimensoes, distancias, inicial, metricas, projetar, visitar } from "./calc";
import { Lugar, LugarFigura } from "./params";

describe("lugares geométricos", () => {
  it("conserva a soma 2a na elipse e inclui circunferência com focos juntos", () => {
    for (const c of [0, 3, 4]) {
      const p = Lugar.parse({ modo: "elipse", a: 5, c, prender_na_curva: true });
      for (const q of [{ x: 5, y: 0 }, { x: 0, y: 4 }, { x: -3, y: -4 }]) {
        expect(distancias(p, {}, projetar(p, {}, q)).valor).toBeCloseTo(10);
      }
      expect(dimensoes(p).b ** 2 + c ** 2).toBeCloseTo(25);
    }
  });
  it("conserva a diferença nos dois ramos e trata a mediatriz", () => {
    for (const diferenca of [0, 2, 6]) {
      const p = Lugar.parse({ modo: "hiperbole", c: 5, diferenca, prender_na_curva: true });
      for (const x of [-5, 5]) for (const y of [-4, 0, 4]) expect(distancias(p, {}, projetar(p, {}, { x, y })).valor).toBeCloseTo(diferenca);
    }
  });
  it("iguala foco e diretriz, inclusive com p negativo", () => {
    for (const pp of [-2, 1, 3]) {
      const p = Lugar.parse({ modo: "parabola", p: pp, prender_na_curva: true });
      for (const x of [-4, -2, 0, 2, 4]) expect(distancias(p, {}, projetar(p, {}, { x, y: 9 })).sobre).toBe(true);
    }
  });
  it("não conta o estado inicial nem visitas repetidas e completa as descobertas", () => {
    const p = Lugar.parse({ modo: "parabola", p: 1 });
    let s = inicial();
    expect(metricas(p, {}, s).pontos_sobre).toBe(0);
    for (const x of [-4, -2, 0, 2]) s = visitar(p, {}, s, { x, y: x * x / 4 });
    s = visitar(p, {}, s, { x: 2, y: 1 });
    expect(metricas(p, {}, s).pontos_sobre).toBe(4);
    expect(metricas(p, {}, visitar(p, {}, s, { x: 0, y: 0 })).vertice_achado).toBe(1);
    const e = Lugar.parse({ modo: "elipse", a: 5, c: 3, prender_na_curva: true });
    expect(metricas(e, {}, visitar(e, {}, inicial(), { x: 0, y: 4 })).topo_tocado).toBe(1);
    const h = Lugar.parse({ modo: "hiperbole", prender_na_curva: true });
    let sh = inicial();
    for (const y of [0, 2, 4]) sh = visitar(h, {}, sh, { x: 3, y });
    expect(metricas(h, {}, sh).pontos_vistos).toBe(3);
  });
  it("resolve sliders e rejeita figuras dinâmicas e dimensões degeneradas", () => {
    expect(dimensoes(Lugar.parse({ modo: "elipse", c: "$c" }), { c: 3 }).b).toBe(4);
    expect(LugarFigura.safeParse({ modo: "elipse", c: "$c" }).success).toBe(false);
    expect(dimensoes(Lugar.parse({ modo: "elipse", a: 3, c: 4 })).valido).toBe(false);
    expect(dimensoes(Lugar.parse({ modo: "parabola", p: 0 })).valido).toBe(false);
  });
});

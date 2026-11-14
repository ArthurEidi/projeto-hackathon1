import { describe, expect, it } from "vitest";
import { alcanceVetores } from "./desenho";
import { girarI, metricas, multiplicar, resolverVetores } from "./calc";
import { VetoresFigura, VetoresParams } from "./params";
it("transportar a cauda preserva componentes e atualiza ponta presa", () => { const p = VetoresParams.parse({ vetores: [{ id: "u", comp: [3, 1], arrastavel: "cauda" }, { id: "v", comp: [2, 0], preso_em: "u" }] }); const v = resolverVetores(p, {}, { u: { cauda: { x: 2, y: -1 } } }); expect(v[0].comp).toEqual({ x: 3, y: 1 }); expect(v[1].cauda).toEqual({ x: 5, y: 0 }); expect(v[1].ponta).toEqual({ x: 7, y: 0 }); expect(metricas(p, {}, v, 3, true).v_comprimento).toBe(2); });
it("escalar negativo inverte; zero é vetor nulo", () => { for (const k of [-2, 0, 3]) { const p = VetoresParams.parse({ vetores: [{ id: "u", comp: [3, 4] }], escalar: "$k" }); expect(metricas(p, { k }, resolverVetores(p, { k }), 0, false).modulo).toBe(Math.abs(k) * 5); } });
it("potências de i repetem a cada quatro giros, inclusive negativos", () => { expect(girarI({ x: 1, y: 0 }, 2)).toEqual({ x: -1, y: -0 }); expect(girarI({ x: 3, y: 4 }, 4)).toEqual({ x: 3, y: 4 }); expect(girarI({ x: 1, y: 0 }, -1).y).toBe(-1); });
it("soma e conjugado preservam as relações complexas", () => { expect(multiplicar({ x: 3, y: 4 }, { x: 3, y: -4 })).toEqual({ x: 25, y: 0 }); const p = VetoresParams.parse({ modo: "complexo", z: [2, 1], w: [1, -1] }); expect(resolverVetores(p, {})[1].ponta).toEqual({ x: 3, y: 0 }); });
it("recusa ciclos e figuras com sliders", () => { expect(VetoresParams.safeParse({ vetores: [{ id: "u", comp: [1, 0], preso_em: "u" }] }).success).toBe(false); expect(VetoresFigura.safeParse({ modo: "complexo", z: ["$a", 1] }).success).toBe(false); });

describe("escala da vista", () => {
  it("complexo: z = 2 + i e w = t − i com t de 0 a 1 cabem num plano de −4 a 4, sem mudar com t", () => {
    const p = VetoresParams.parse({ modo: "complexo", z: [2, 1], w: ["$t", -1], mostrar: { soma: true } });
    const faixas = { t: { min: 0, max: 1 } };
    const a = [0, 1].map((t) => alcanceVetores(p, { t }, resolverVetores(p, { t }), faixas));
    expect(a).toEqual([4, 4]);
  });
  it("modo vetores (arraste) mantém pelo menos 6 de cada lado", () => {
    const p = VetoresParams.parse({ modo: "vetores", vetores: [{ id: "u", comp: [1, 1] }] });
    expect(alcanceVetores(p, {}, resolverVetores(p, {}))).toBe(7);
  });
});

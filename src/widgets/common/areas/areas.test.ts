import { expect, it } from "vitest";
import { calcular } from "./calc";
import { Areas, AreasFigura } from "./params";
it("produto e retirada conferem quatro parcelas, inclusive lado zero", () => { for (const retirar of [false, true]) for (const b of [0, 1, 2]) { const d = calcular(Areas.parse({ modo: "produto", a: 2, b, retirar }), {}); expect(d.area).toBe(4 + (retirar ? -4 : 4) * b + b * b); expect(d.valido).toBe(true); } });
it("raiz é o lado não negativo e área negativa é inválida", () => { for (const A of [0, 1, 8, 9]) { const d = calcular(Areas.parse({ modo: "raiz", A }), {}); expect(d.lado ** 2).toBeCloseTo(A); expect(d.lado).toBeGreaterThanOrEqual(0); } expect(calcular(Areas.parse({ modo: "raiz", A: -1 }), {}).valido).toBe(false); });
it("escala altera área pelo quadrado e unidade não muda comprimento", () => { for (const e of [0, 1, 2]) { const d = calcular(Areas.parse({ modo: "escala", L: 2, k: 3, e }), {}); expect(d.area).toBe(36); expect(d.razao_area).toBe(9); expect(d.a * 10 ** d.e).toBe([2, 20, 200][e]); } });
it("resolve sliders e figura não aceita referências", () => { expect(calcular(Areas.parse({ modo: "raiz", A: "$area" }), { area: 9 }).lado).toBe(3); expect(AreasFigura.safeParse({ modo: "produto", b: "$b" }).success).toBe(false); });

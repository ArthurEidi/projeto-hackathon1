import { avaliarExpr } from "../expr";
import type { Areas } from "./params";
export function calcular(p: Areas, ctl: Record<string, number>) {
  const v = (x: number | string) => avaliarExpr(x, ctl);
  if (p.modo === "produto") { const a = v(p.a), b = v(p.b), lado = p.retirar ? a - b : a + b; return { lado, area: lado ** 2, referencia: a, a, b, k: 1, e: 0, pecas: 4, razao_area: a ? lado ** 2 / a ** 2 : 0, valido: a >= 0 && b >= 0 && lado >= 0, parcelas: [a ** 2, a * b, a * b, b ** 2] }; }
  if (p.modo === "raiz") { const area = v(p.A); return { lado: Math.sqrt(Math.max(0, area)), area, referencia: 1, a: 0, b: 0, k: 1, e: 0, pecas: 1, razao_area: area, valido: area >= 0, parcelas: [area] }; }
  const L = v(p.L), k = v(p.k), e = v(p.e), lado = L * k;
  return { lado, area: lado ** 2, referencia: L, a: L, b: 0, k, e, pecas: 1, razao_area: k ** 2, valido: L >= 0 && k >= 0 && Number.isInteger(e) && e >= 0 && e <= 2, parcelas: [lado ** 2] };
}

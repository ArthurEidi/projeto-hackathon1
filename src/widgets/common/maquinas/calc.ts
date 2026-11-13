import { avaliarExpr } from "../expr";
import type { Maquinas } from "./params";
export function contagens(n: number, ligacoes: [number, number][]) { return Array.from({ length: n }, (_, i) => new Set(ligacoes.filter(([a]) => a === i).map(([, b]) => b)).size); }
export function alternar(ligacoes: [number, number][], a: number, b: number): [number, number][] { return ligacoes.some(l => l[0] === a && l[1] === b) ? ligacoes.filter(l => l[0] !== a || l[1] !== b) : [...ligacoes, [a, b]]; }
export function cadeia(p: Extract<Maquinas, { modo: "maquinas" }>, ctl: Record<string, number>, x: number, ordem = p.ordem_invertida, inversa = p.inversa) {
  const maquinas = p.maquinas.map(m => ({ nome: m.nome, a: avaliarExpr(m.a, ctl), b: avaliarExpr(m.b, ctl) }));
  if (ordem) maquinas.reverse();
  const direta = [x]; for (const m of maquinas) direta.push(m.a * direta[direta.length - 1] + m.b);
  const invertivel = maquinas.every(m => m.a !== 0 && Number.isFinite(m.a) && Number.isFinite(m.b));
  if (!inversa) return { valores: direta, maquinas, invertivel };
  if (!invertivel) return { valores: [], maquinas, invertivel };
  const invertidas = [...maquinas].reverse().map(m => ({ nome: m.nome + "⁻¹", a: 1 / m.a, b: -m.b / m.a }));
  const valores = [direta[direta.length - 1]];
  for (const m of invertidas) valores.push(m.a * valores[valores.length - 1] + m.b);
  return { valores, maquinas: invertidas, invertivel };
}

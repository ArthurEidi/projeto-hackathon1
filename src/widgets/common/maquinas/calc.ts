// Matemática pura e métricas do maquinas_funcao. Sem React.
import { avaliarExpr } from "../expr";
import { fmt, quase } from "../geo/base";
import type { Maquinas, MaquinasDe } from "./params";

export type Ligacao = [number, number];

export interface EstadoMaquinas {
  ligacoes: Ligacao[];
  entradaAtiva: number;
  x: number | null;
  ordem: boolean;
  inversa: boolean;
  testadas: ReadonlySet<number>;
  ordens: ReadonlySet<boolean>;
  inversaTestada: boolean;
}

export function estadoInicial(p: Maquinas): EstadoMaquinas {
  return {
    ligacoes: p.modo === "flechas" ? p.ligacoes.map(([a, b]) => [a, b]) : [],
    entradaAtiva: 0,
    x: null,
    ordem: p.modo === "maquinas" ? p.ordem_invertida : false,
    inversa: p.modo === "maquinas" ? p.inversa : false,
    testadas: new Set(),
    ordens: new Set(),
    inversaTestada: false,
  };
}

/** Quantas saídas distintas saem de cada entrada (índice 0..n-1). */
export function contagens(nEntradas: number, ligacoes: readonly Ligacao[]): number[] {
  return Array.from(
    { length: nEntradas },
    (_, i) => new Set(ligacoes.filter(([a]) => a === i).map(([, b]) => b)).size,
  );
}

/** Índices das saídas alcançadas por pelo menos uma seta. */
export function imagem(ligacoes: readonly Ligacao[]): Set<number> {
  return new Set(ligacoes.map(([, b]) => b));
}

/** Verdadeiro quando toda entrada tem exatamente uma saída. */
export function ehFuncao(nEntradas: number, ligacoes: readonly Ligacao[]): boolean {
  return contagens(nEntradas, ligacoes).every((n) => n === 1);
}

/** Liga ou desliga a seta (a -> b). */
export function alternar(ligacoes: readonly Ligacao[], a: number, b: number): Ligacao[] {
  const existe = ligacoes.some(([ea, eb]) => ea === a && eb === b);
  return existe ? ligacoes.filter(([ea, eb]) => ea !== a || eb !== b) : [...ligacoes, [a, b]];
}

export interface MaquinaResolvida {
  nome: string;
  a: number;
  b: number;
}

export interface ResultadoCadeia {
  valores: number[];
  maquinas: MaquinaResolvida[];
  invertivel: boolean;
}

/** Formata f(x) = ax + b sem termos redundantes (+ 0, 1x). */
export function formatarRegra(nome: string, a: number, b: number): string {
  if (quase(a, 0)) return `${nome}(x) = ${fmt(b)}`;
  const termoX = quase(a, 1) ? "x" : quase(a, -1) ? "−x" : `${fmt(a)}x`;
  if (quase(b, 0)) return `${nome}(x) = ${termoX}`;
  const sinal = b > 0 ? " + " : " − ";
  return `${nome}(x) = ${termoX}${sinal}${fmt(Math.abs(b))}`;
}

/** Calcula a sequência de saídas pela cadeia de máquinas (direta ou inversa). */
export function cadeia(
  p: MaquinasDe<"maquinas">,
  ctl: Record<string, number>,
  x: number,
  ordem = p.ordem_invertida,
  inversa = p.inversa,
): ResultadoCadeia {
  const maquinas = p.maquinas.map((m) => ({
    nome: m.nome,
    a: avaliarExpr(m.a, ctl),
    b: avaliarExpr(m.b, ctl),
  }));
  if (ordem) maquinas.reverse();
  const direta = [x];
  for (const m of maquinas) {
    direta.push(m.a * direta[direta.length - 1] + m.b);
  }
  const invertivel = maquinas.every((m) => !quase(m.a, 0) && Number.isFinite(m.a) && Number.isFinite(m.b));
  if (!inversa) return { valores: direta, maquinas, invertivel };
  if (!invertivel) return { valores: [], maquinas, invertivel };

  const invertidas = [...maquinas].reverse().map((m) => ({
    nome: m.nome.endsWith("⁻¹") ? m.nome : `${m.nome}⁻¹`,
    a: 1 / m.a,
    b: -m.b / m.a,
  }));
  const valores = [direta[direta.length - 1]];
  for (const m of invertidas) {
    valores.push(m.a * valores[valores.length - 1] + m.b);
  }
  return { valores, maquinas: invertidas, invertivel };
}

/** Métricas emitidas para complete_when. */
export function metricasMaquinas(
  p: Maquinas,
  _ctl: Record<string, number>,
  e: EstadoMaquinas,
): Record<string, number> {
  if (p.modo === "flechas") {
    const c = contagens(p.entradas.length, e.ligacoes);
    return {
      entradas_com_uma_saida: c.filter((n) => n === 1).length,
      entradas_testadas: 0,
      ordens_testadas: 0,
      inversa_testada: 0,
    };
  }
  return {
    entradas_com_uma_saida: 0,
    entradas_testadas: e.testadas.size,
    ordens_testadas: e.ordens.size,
    inversa_testada: Number(e.inversaTestada),
  };
}

// Contas puras do sistema_escalonado: operação entre linhas, pivôs, classificação e substituição. Sem React.
import { avaliarExpr, usaSlider } from "../expr";
import { fmt, quase } from "../geo/base";
import type { SistemaEscalonado } from "./params";

export type Matriz = number[][];
export type Tipo = "unica" | "infinitas" | "impossivel";

const EPS = 1e-9;
const zero = (v: number) => Math.abs(v) < EPS;
/** Arredonda resíduos de ponto flutuante (0,1 + 0,2), para a tela e os testes. */
const limpo = (v: number) => {
  const r = Math.round(v * 1e9) / 1e9;
  return Object.is(r, -0) ? 0 : r;
};

export const nomesDe = (p: SistemaEscalonado): string[] => p.incognitas ?? ["x", "y", "z"].slice(0, p.linhas[0].length - 1);

/** Matriz aumentada com os sliders já substituídos. */
export function resolverLinhas(p: SistemaEscalonado, ctl: Record<string, number>): Matriz {
  return p.linhas.map((l) => l.map((e) => limpo(avaliarExpr(e, ctl))));
}

/** Multiplicador k da operação (0 no modo substituir). */
export function multiplicador(p: SistemaEscalonado, ctl: Record<string, number>): number {
  return p.modo === "eliminar" ? limpo(avaliarExpr(p.operacao.k, ctl)) : 0;
}

/** Lᵢ ← Lᵢ − k·Lⱼ (devolve uma matriz nova). */
export function aplicarOperacao(m: Matriz, alvo: number, base: number, k: number): Matriz {
  return m.map((l, i) => (i === alvo ? l.map((v, j) => limpo(v - k * m[base][j])) : [...l]));
}

/** Matriz que o aluno vê: a original no modo substituir, a operada no modo eliminar. */
export function matrizAtual(p: SistemaEscalonado, ctl: Record<string, number>): Matriz {
  const m = resolverLinhas(p, ctl);
  if (p.modo !== "eliminar") return m;
  return aplicarOperacao(m, p.operacao.alvo, p.operacao.base, multiplicador(p, ctl));
}

/** Coluna do pivô (primeiro coeficiente não nulo); −1 se todos os coeficientes são 0. */
export function pivo(linha: readonly number[]): number {
  for (let j = 0; j < linha.length - 1; j++) if (!zero(linha[j])) return j;
  return -1;
}

/** Forma escalonada: cada pivô à direita do de cima e linhas nulas embaixo. */
export function escalonada(m: Matriz): boolean {
  let ultimo = -1;
  let viuNula = false;
  for (const l of m) {
    const c = pivo(l);
    if (c === -1) {
      viuNula = true;
      continue;
    }
    if (viuNula || c <= ultimo) return false;
    ultimo = c;
  }
  return true;
}

export interface Classificacao {
  tipo: Tipo;
  /** Posto da matriz dos coeficientes. */
  posto: number;
  /** Incógnitas sem pivô (0 se impossível). */
  livres: number;
  /** Solução quando é única. */
  solucao: number[] | null;
}

/** Classifica pelo posto (eliminação de Gauss com pivô parcial), qualquer que seja a forma exibida. */
export function classificar(m: Matriz): Classificacao {
  const a = m.map((l) => [...l]);
  const n = a[0].length - 1;
  const colPivo: number[] = [];
  let r = 0;
  for (let c = 0; c < n && r < a.length; c++) {
    let melhor = r;
    for (let i = r + 1; i < a.length; i++) if (Math.abs(a[i][c]) > Math.abs(a[melhor][c])) melhor = i;
    if (zero(a[melhor][c])) continue;
    [a[r], a[melhor]] = [a[melhor], a[r]];
    for (let i = 0; i < a.length; i++) {
      if (i === r) continue;
      const f = a[i][c] / a[r][c];
      for (let j = c; j <= n; j++) a[i][j] -= f * a[r][j];
    }
    colPivo.push(c);
    r++;
  }
  const impossivel = a.some((l) => pivo(l.map((v) => (zero(v) ? 0 : v))) === -1 && !zero(l[n]));
  if (impossivel) return { tipo: "impossivel", posto: r, livres: 0, solucao: null };
  if (r < n) return { tipo: "infinitas", posto: r, livres: n - r, solucao: null };
  const solucao = new Array<number>(n).fill(0);
  colPivo.forEach((c, i) => (solucao[c] = limpo(a[i][n] / a[i][c])));
  return { tipo: "unica", posto: r, livres: 0, solucao };
}

/** Polinômio de 1º grau escrito no formato do app: "x + y", "−y", "2x − 3z"; "0" se tudo zera. */
export function textoMembro(coef: readonly number[], nomes: readonly string[]): string {
  let s = "";
  coef.forEach((a, j) => {
    if (zero(a)) return;
    const abs = Math.abs(a);
    const termo = `${quase(abs, 1) ? "" : fmt(abs)}${nomes[j]}`;
    if (s === "") s = a < 0 ? `−${termo}` : termo;
    else s += a < 0 ? ` − ${termo}` : ` + ${termo}`;
  });
  return s === "" ? "0" : s;
}

/** "x + y = 3", "−y = −2", "0 = 1". */
export function textoEquacao(linha: readonly number[], nomes: readonly string[]): string {
  const n = linha.length - 1;
  return `${textoMembro(linha.slice(0, n), nomes)} = ${fmt(linha[n])}`;
}

export interface LinhaSubstituicao {
  /** Incógnita isolada nesta linha (ou livre). */
  variavel: string;
  /** "y = 2 − z" (fórmula), "z livre" ou "0 = 1". */
  formula: string;
  /** "2 − 1" (conta com os valores já achados), vazio se não houver o que substituir. */
  conta: string;
  valor: number | null;
  /** Quando o valor depende de incógnita livre: "2 − z", "3 − 2z" (senão null). */
  expressao: string | null;
  /** Linha 0 = c com c ≠ 0. */
  contradicao: boolean;
}

const parenteses = (v: number) => (v < 0 ? `(${fmt(v)})` : fmt(v));

/** Valor afim c + Σ tⱼ·(livre j): o que cada incógnita vale em função das livres. */
interface Afim {
  c: number;
  t: number[];
}
const temLivre = (a: Afim) => a.t.some((v) => !zero(v));

/** "2 − z", "3 − 2z", "−z", "0". */
function textoAfim(a: Afim, nomes: readonly string[]): string {
  let s = zero(a.c) ? "" : fmt(a.c);
  a.t.forEach((v, j) => {
    if (zero(v)) return;
    const abs = Math.abs(v);
    const termo = `${quase(abs, 1) ? "" : fmt(abs)}${nomes[j]}`;
    if (s === "") s = v < 0 ? `−${termo}` : termo;
    else s += v < 0 ? ` − ${termo}` : ` + ${termo}`;
  });
  return s === "" ? "0" : s;
}

/**
 * Substituição de baixo para cima num sistema escalonado. Cada pivô isola a sua incógnita:
 * xₚ = (b − Σ aⱼxⱼ)/aₚ. Incógnita sem pivô fica livre; o que depende dela vira expressão afim nas livres,
 * propagada para cima (com 0 = 0 em x + y + z = 3, y + z = 2: y = 2 − z e x = 3 − (2 − z) − z = 1).
 */
export function substituicao(m: Matriz, nomes: readonly string[]): LinhaSubstituicao[] {
  const n = m[0].length - 1;
  const comPivo = new Set(m.map(pivo).filter((c) => c >= 0));
  const unidade = (j: number): Afim => ({ c: 0, t: Array.from({ length: n }, (_, i) => (i === j ? 1 : 0)) });
  const valores: (Afim | null)[] = Array.from({ length: n }, (_, j) => (comPivo.has(j) ? null : unidade(j)));
  const out: LinhaSubstituicao[] = [];
  for (let i = m.length - 1; i >= 0; i--) {
    const l = m[i];
    const c = pivo(l);
    if (c === -1) {
      const contradicao = !zero(l[n]);
      out.unshift({ variavel: "", formula: `0 = ${fmt(l[n])}`, conta: "", valor: null, expressao: null, contradicao });
      continue;
    }
    // x_c = l[n]/a_c + Σ (−a_j/a_c)·x_j
    const c0 = limpo(l[n] / l[c]);
    const termos = [] as { coef: number; j: number }[];
    for (let j = c + 1; j < n; j++) if (!zero(l[j])) termos.push({ coef: limpo(-l[j] / l[c]), j });
    let formula = `${nomes[c]} = `;
    let conta = "";
    let substituiu = false;
    const mostrarC0 = !zero(c0) || termos.length === 0;
    if (mostrarC0) {
      formula += fmt(c0);
      conta += fmt(c0);
    }
    let acc: Afim | null = { c: c0, t: new Array<number>(n).fill(0) };
    termos.forEach(({ coef, j }, k) => {
      const abs = Math.abs(coef);
      const primeiro = !mostrarC0 && k === 0;
      const sinal = primeiro ? (coef < 0 ? "−" : "") : coef < 0 ? " − " : " + ";
      const fator = quase(abs, 1) ? "" : `${fmt(abs)}·`;
      formula += `${sinal}${quase(abs, 1) ? "" : fmt(abs)}${nomes[j]}`;
      const vj = valores[j];
      // livre: fica o nome; valor conhecido: o número; expressão nas livres: entre parênteses
      let peca = nomes[j];
      if (vj && comPivo.has(j)) {
        const e = textoAfim(vj, nomes);
        peca = !temLivre(vj) ? parenteses(vj.c) : /^−| /.test(e) ? `(${e})` : e;
        substituiu = true;
      }
      conta += `${sinal}${fator}${peca}`;
      acc = acc === null || vj === null ? null : { c: acc.c + coef * vj.c, t: acc.t.map((v, i) => v + coef * vj.t[i]) };
    });
    const fim: Afim | null = acc === null ? null : { c: limpo(acc.c), t: acc.t.map(limpo) };
    valores[c] = fim;
    out.unshift({
      variavel: nomes[c],
      formula,
      conta: substituiu ? conta : "",
      valor: fim && !temLivre(fim) ? fim.c : null,
      expressao: fim && temLivre(fim) ? textoAfim(fim, nomes) : null,
      contradicao: false,
    });
  }
  // Incógnitas sem pivô: livres (no fim da tabela, na ordem das colunas).
  for (let j = 0; j < n; j++) {
    if (!comPivo.has(j)) {
      out.push({ variavel: nomes[j], formula: `${nomes[j]} livre`, conta: "", valor: null, expressao: null, contradicao: false });
    }
  }
  return out;
}

/**
 * Quantas linhas a tabela do modo substituir pode ter (a altura do canvas não muda com o slider).
 * Coeficientes fixos (slider só no termo independente, como na aula): exato, equações + livres, ou 1 (aviso
 * "Escalone antes de substituir"). Slider num coeficiente: pior caso, equações + incógnitas.
 */
export function linhasDaTabela(p: SistemaEscalonado): number {
  const n = p.linhas[0].length - 1;
  const coefs = p.linhas.map((l) => l.slice(0, n));
  if (coefs.some((l) => l.some(usaSlider))) return p.linhas.length + n;
  const m = coefs.map((l) => [...l.map((e) => avaliarExpr(e, {})), 0]);
  if (!escalonada(m)) return 1;
  return p.linhas.length + n - new Set(m.map(pivo).filter((c) => c >= 0)).size;
}

export interface TesteLinha {
  /** Valor do 1º membro no ponto. */
  valor: number;
  rhs: number;
  vale: boolean;
}

/** Substitui o ponto em cada linha da matriz. */
export function testarPonto(m: Matriz, pt: readonly number[]): TesteLinha[] {
  return m.map((l) => {
    const n = l.length - 1;
    const valor = limpo(l.slice(0, n).reduce((s, a, j) => s + a * pt[j], 0));
    return { valor, rhs: l[n], vale: quase(valor, l[n], 1e-9) };
  });
}

/** Métricas emitidas para complete_when. */
export function metricasSistema(p: SistemaEscalonado, ctl: Record<string, number>): Record<string, number> {
  const m = matrizAtual(p, ctl);
  const cl = classificar(m);
  let zerou = 0;
  if (p.modo === "eliminar") {
    const col = pivo(resolverLinhas(p, ctl)[p.operacao.base]);
    zerou = Number(col >= 0 && zero(m[p.operacao.alvo][col]));
  }
  return {
    k: multiplicador(p, ctl),
    zerou,
    escalonada: Number(escalonada(m)),
    unica: Number(cl.tipo === "unica"),
    impossivel: Number(cl.tipo === "impossivel"),
    livres: cl.livres,
  };
}

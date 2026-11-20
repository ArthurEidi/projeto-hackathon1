// Desenho do widget grade_resultados, compartilhado pelo widget e pela figura estática.
// Cada modo devolve os alvos tocáveis (o widget decide o que o toque faz).
import { corDoTraco, ehMarca, type CorTraco } from "../../../ui/marcas";
import { palette as c } from "../../../ui/palette";
import { chip, dot, polyline, seg, text, type Hit, type Pt, type Rect } from "../../canvas";
import { avaliarExpr, type Controles } from "../expr";
import { num } from "../plot2d";
import {
  arranjo,
  arranjosPorGrupo,
  binomial,
  caixasDaSequencia,
  comb,
  distribuicoes,
  fatorial,
  fracao,
  gerarCasas,
  linhaPascal,
  permutacoes,
  pertence,
  sequenciaInicial,
  type Casa,
  type CriterioConjunto,
} from "./calc";
import type { Conjunto, Galho, Grade, GradeDe } from "./params";

export interface Alvo {
  tipo: string;
  id: string;
  r: Rect;
}

export interface GeoGrade {
  alvos: Alvo[];
  /** Bolinhas e barras: x de cada posição da fileira e a faixa vertical. */
  slotsX?: number[];
  yFileira?: number;
}

/** Estado vivo (a figura passa só o que o JSON pede). */
export interface EstadoGrade {
  acesas?: ReadonlySet<string>;
  repetir?: boolean;
  ordem?: boolean;
  ou?: boolean;
  pista?: boolean;
  uniao?: boolean;
  semRepetidas?: boolean;
  complemento?: boolean;
  intersecao?: boolean;
  botao?: number;
  pistaLinha?: number;
  pistaColuna?: number;
  pontas?: ReadonlySet<number>;
  um?: boolean;
  colocados?: readonly number[];
  montadas?: readonly string[];
  iguais?: boolean;
  preso?: boolean;
  tocada?: readonly [number, number];
  sequencia?: readonly boolean[];
  vistas?: number;
  minimo?: boolean;
  distribuicao?: number;
}

const FONTE = (px: number) => `900 ${px}px Nunito, system-ui, sans-serif`;

function etiqueta(ctx: CanvasRenderingContext2D, hits: Hit[], p: Pt, s: string, cor: CorTraco): Rect {
  const k = corDoTraco(cor);
  const area = chip(ctx, p, s, k.main, k.dark);
  if (ehMarca(cor)) hits.push({ key: cor, ...area });
  return area;
}

function caixa(ctx: CanvasRenderingContext2D, r: Rect, fill: string, stroke: string, lw = 2, raio = 7) {
  ctx.beginPath();
  ctx.roundRect(r.x, r.y, r.w, r.h, raio);
  ctx.fillStyle = fill;
  ctx.fill();
  if (lw > 0) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lw;
    ctx.stroke();
  }
}

/** Listras diagonais dentro do retângulo (interseção contada duas vezes). */
function listras(ctx: CanvasRenderingContext2D, r: Rect, cor: string) {
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(r.x, r.y, r.w, r.h, 7);
  ctx.clip();
  ctx.strokeStyle = cor;
  ctx.lineWidth = 3;
  for (let d = -r.h; d < r.w; d += 9) {
    ctx.beginPath();
    ctx.moveTo(r.x + d, r.y + r.h);
    ctx.lineTo(r.x + d + r.h, r.y);
    ctx.stroke();
  }
  ctx.restore();
}

/** Texto que cabe na largura: diminui a fonte até caber (mínimo `min` px). */
function textoCabe(ctx: CanvasRenderingContext2D, p: Pt, s: string, cor: string, largura: number, max = 15, min = 9) {
  let px = max;
  ctx.font = FONTE(px);
  while (px > min && ctx.measureText(s).width > largura) ctx.font = FONTE(--px);
  text(ctx, p, s, cor, px);
}

export const rotulosDe = (r: readonly string[] | number) => (typeof r === "number" ? Array.from({ length: r }, (_, i) => String(i + 1)) : [...r]);

export function criterio(cj: Conjunto, ctl: Controles): CriterioConjunto {
  return {
    casas: cj.casas,
    linhas: cj.linhas,
    colunas: cj.colunas,
    soma: cj.soma,
    diagonal: cj.diagonal,
    intervalo: cj.intervalo ? { de: avaliarExpr(cj.intervalo.de, ctl), ate: avaliarExpr(cj.intervalo.ate, ctl) } : undefined,
  };
}

/** Régua 0–1 com marcas de frações. */
function regua(ctx: CanvasRenderingContext2D, hits: Hit[], x0: number, x1: number, y: number, marcas: { v: number; s: string; cor: CorTraco; contorno?: boolean }[]) {
  seg(ctx, { x: x0, y }, { x: x1, y }, c.axis, 2);
  for (const [v, s] of [
    [0, "0"],
    [0.5, "1/2"],
    [1, "1"],
  ] as const) {
    seg(ctx, { x: x0 + (x1 - x0) * v, y: y - 5 }, { x: x0 + (x1 - x0) * v, y: y + 5 }, c.axis, 2);
    text(ctx, { x: x0 + (x1 - x0) * v, y: y + 16 }, s, c.muted, 11);
  }
  marcas.forEach((m, i) => {
    const x = x0 + (x1 - x0) * Math.max(0, Math.min(1, m.v));
    const k = corDoTraco(m.cor);
    dot(ctx, { x, y }, 8, k.main);
    if (m.contorno) {
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, Math.PI * 2);
      ctx.strokeStyle = corDoTraco("c4").main;
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    etiqueta(ctx, hits, { x, y: y - 20 - i * 28 }, m.s, m.cor);
  });
}

// ---------- casas ----------

export interface ModeloCasas {
  linhas: string[];
  colunas?: string[];
  casas: Casa[];
  /** A casa vale (não foi apagada pelas chaves "repetir", "ordem")? */
  valida: (k: Casa) => boolean;
  /** Fora da pista (cinza). */
  fora: (k: Casa) => boolean;
  emA: (k: Casa) => boolean;
  emB: (k: Casa) => boolean;
  emEvento: (k: Casa) => boolean;
  ou: boolean;
}

export function modeloCasas(p: GradeDe<"casas">, ctl: Controles, e: EstadoGrade): ModeloCasas {
  const todasL = rotulosDe(p.linhas);
  const linhas = todasL.slice(0, p.n_linhas !== undefined ? Math.max(1, Math.round(avaliarExpr(p.n_linhas, ctl))) : undefined);
  const etapas = Math.round(avaliarExpr(p.etapas, ctl));
  const todasC = p.colunas === undefined ? undefined : p.colunas === "linhas" ? todasL : rotulosDe(p.colunas);
  const colunas = etapas >= 2 && todasC ? todasC.slice(0, p.n_colunas !== undefined ? Math.max(1, Math.round(avaliarExpr(p.n_colunas, ctl))) : undefined) : undefined;
  const ou = Boolean(e.ou ?? p.ou) && colunas !== undefined;
  const casas = ou ? [...linhas, ...colunas!].map((l, i) => ({ chave: l, linha: l, i, j: 0 })) : gerarCasas(linhas, colunas);
  const repetir = e.repetir ?? p.repetir;
  const ordem = e.ordem ?? p.ordem;
  const pista = e.pista ?? p.pista;
  const sem = (cj?: Conjunto) => (cj ? criterio(cj, ctl) : null);
  const ca = sem(p.a);
  const cb = sem(p.b);
  const cev = sem(e.botao !== undefined ? p.botoes_evento[e.botao]?.conjunto : p.evento);
  const valida = (k: Casa) => {
    if (k.coluna === undefined || ou) return true;
    if (!repetir && k.linha === k.coluna) return false;
    if (!ordem && k.i < k.j) return false;
    return true;
  };
  return {
    linhas,
    colunas: ou ? undefined : colunas,
    casas,
    valida,
    fora: (k) => pista && !!cb && !pertence(k, cb),
    emA: (k) => !!ca && pertence(k, ca),
    emB: (k) => !!cb && pertence(k, cb),
    emEvento: (k) => !!cev && pertence(k, cev),
    ou,
  };
}

function conteudoCasa(p: GradeDe<"casas">, k: Casa, acesa: boolean, ordem: boolean): string {
  if (p.conteudo === "vazio" || (p.conteudo === "soma_ao_tocar" && !acesa)) return "";
  if (k.coluna === undefined) return k.linha;
  if (p.conteudo === "soma" || p.conteudo === "soma_ao_tocar") return String(Number(k.linha) + Number(k.coluna));
  const s = k.linha.length === 1 && k.coluna.length === 1 ? `${k.linha}${k.coluna}` : `${k.linha},${k.coluna}`;
  // Ordem desligada: o par vale pelos dois (AB = BA).
  return ordem ? s : `{${k.linha},${k.coluna}}`;
}

function desenharCasas(ctx: CanvasRenderingContext2D, w: number, h: number, hits: Hit[], p: GradeDe<"casas">, ctl: Controles, e: EstadoGrade): GeoGrade {
  const m = modeloCasas(p, ctl, e);
  const acesas = e.acesas ?? new Set(p.acesas);
  const mostrar = {
    uniao: e.uniao ?? p.mostrar.uniao,
    sem: e.semRepetidas ?? p.mostrar.sem_repetidas,
    comp: e.complemento ?? p.mostrar.complemento,
    inter: e.intersecao ?? p.mostrar.intersecao,
  };
  const ordem = e.ordem ?? p.ordem;
  const pista = e.pista ?? p.pista;
  const cor = (x: CorTraco) => corDoTraco(x);
  const alvos: Alvo[] = [];
  const temRegua = p.regua;
  const baixo = (temRegua ? 74 : 0) + (p.contador ? 36 : 0) + 6;
  const gradeVinte = !m.colunas && m.casas.length === 20 && Math.round(avaliarExpr(p.etapas, ctl)) === 1;
  const nLins = m.colunas ? m.linhas.length : gradeVinte ? 4 : m.casas.length > 10 ? 2 : 1;
  const nCols = m.colunas?.length ?? Math.ceil(m.casas.length / nLins);
  const esq = m.colunas ? 40 : 12;
  const temInterBorda = mostrar.inter && m.colunas && p.a && p.b;
  const dir = temInterBorda ? 44 : 12;
  const topo = m.colunas ? 46 : 30;
  const s = Math.min(58, (w - esq - dir) / nCols, (h - topo - baixo) / nLins);
  const gx = esq + (w - esq - dir - s * nCols) / 2;
  const gy = topo;

  // Rótulos das etapas.
  if (m.colunas) {
    m.colunas.forEach((col, j) => textoCabe(ctx, { x: gx + s * (j + 0.5), y: gy - 12 }, col, cor(p.cores.colunas).dark, s - 2, 14));
    m.linhas.forEach((lin, i) => textoCabe(ctx, { x: gx - 18, y: gy + s * (i + 0.5) }, lin, cor(p.cores.linhas).dark, 34, 14));
    if (p.titulos.colunas) text(ctx, { x: gx + (s * nCols) / 2, y: 13 }, p.titulos.colunas, cor(p.cores.colunas).main, p.titulos.colunas.length <= 4 ? 18 : 13);
    if (p.titulos.linhas) {
      // Título curto (ex.: "n₁") na horizontal, à esquerda dos rótulos, se couber; senão, girado.
      // Antes ficava sempre girado em 13 px e "n₁" mal se lia.
      const t = p.titulos.linhas;
      const yt = gy + (s * nLins) / 2;
      ctx.font = "900 16px Nunito, system-ui, sans-serif";
      const tw = ctx.measureText(t).width;
      if (tw <= 40 && gx - 40 - tw / 2 >= 4) text(ctx, { x: gx - 40, y: yt }, t, cor(p.cores.linhas).main, 18);
      else {
        ctx.save();
        ctx.translate(11, yt);
        ctx.rotate(-Math.PI / 2);
        text(ctx, { x: 0, y: 0 }, t, cor(p.cores.linhas).main, 15);
        ctx.restore();
      }
    }
  } else if (p.titulos.linhas) text(ctx, { x: w / 2, y: 12 }, p.titulos.linhas, cor(p.cores.linhas).main, 13);

  const listradas: { r: Rect; texto: string; tinta: string; y: number }[] = [];
  m.casas.forEach((k, idx) => {
    const i = m.colunas ? k.i : Math.floor(idx / nCols);
    const j = m.colunas ? k.j : idx % nCols;
    const r = { x: gx + s * j + 2, y: gy + s * i + 2, w: s - 4, h: s - 4 };
    const valida = m.valida(k);
    const fora = m.fora(k);
    const acesa = acesas.has(k.chave);
    const a = m.emA(k);
    const b = m.emB(k);
    let fill: string = c.bg;
    let stroke: string = c.lineDark;
    let tinta: string = c.ink;
    let lw = 2;
    if (m.ou) {
      // Em "ou", cada opção é uma casa; as das linhas e das colunas guardam a cor da etapa.
      const k2 = idx < m.linhas.length ? cor(p.cores.linhas) : cor(p.cores.colunas);
      fill = k2.tint;
      stroke = k2.main;
    }
    if (a && b) {
      fill = cor(p.cores.intersecao).tint;
      stroke = cor(p.cores.intersecao).main;
    } else if (a) {
      fill = cor(p.cores.a).tint;
      stroke = cor(p.cores.a).main;
    } else if (b) {
      fill = cor(p.cores.b).tint;
      stroke = cor(p.cores.b).main;
    }
    if (mostrar.inter && a && b) {
      fill = cor(p.cores.intersecao).main;
      tinta = c.bg;
    }
    if (mostrar.uniao && (a || b)) lw = 3.5;
    if (mostrar.comp && !a) {
      fill = cor(p.cores.fora).main;
      stroke = cor(p.cores.fora).dark;
      tinta = c.bg;
    }
    if (acesa) {
      fill = cor(p.cores.casa).main;
      stroke = cor(p.cores.casa).dark;
      tinta = c.bg;
    }
    if (!valida || fora) {
      fill = c.surface;
      stroke = c.line;
      tinta = c.lineDark;
    }
    caixa(ctx, r, fill, stroke, lw);
    const listrada = a && b && !mostrar.inter && !acesa && valida && !fora;
    // Casa contada duas vezes: o texto sobe e o "×2" vai para a borda de baixo (antes cobria o "K6").
    const comX2 = listrada && mostrar.uniao && !mostrar.sem;
    const yTexto = r.y + (comX2 ? r.h * 0.32 : r.h / 2 + 1);
    if (listrada) listradas.push({ r, texto: conteudoCasa(p, k, acesa, ordem), tinta, y: yTexto });
    textoCabe(ctx, { x: r.x + r.w / 2, y: yTexto }, conteudoCasa(p, k, acesa, ordem), tinta, r.w - 6, Math.min(17, s * 0.36));
    if (!valida) {
      // Casa apagada pela chave: um × na cor de "fora".
      const k4 = cor(p.cores.fora).main;
      seg(ctx, { x: r.x + 8, y: r.y + 8 }, { x: r.x + r.w - 8, y: r.y + r.h - 8 }, k4, 2.5);
      seg(ctx, { x: r.x + r.w - 8, y: r.y + 8 }, { x: r.x + 8, y: r.y + r.h - 8 }, k4, 2.5);
    } else if (fora) seg(ctx, { x: r.x + 6, y: r.y + r.h - 6 }, { x: r.x + r.w - 6, y: r.y + 6 }, cor(p.cores.fora).main, 2);
    if (valida && !fora) alvos.push({ tipo: "casa", id: k.chave, r });
  });
  for (const { r, texto, tinta, y } of listradas) {
    listras(ctx, r, cor(p.cores.intersecao).main);
    // O texto volta por cima das listras, para não ficar riscado.
    textoCabe(ctx, { x: r.x + r.w / 2, y }, texto, tinta, r.w - 6, Math.min(17, s * 0.36));
    if (mostrar.uniao && !mostrar.sem) chip(ctx, { x: r.x + r.w / 2, y: r.y + r.h - 11 }, "×2", cor(p.cores.intersecao).main, cor(p.cores.intersecao).dark);
  }
  // Interseção: frações nas bordas.
  if (temInterBorda) {
    const nl = m.linhas.filter((l) => m.casas.some((k) => k.linha === l && m.emA(k))).length;
    const nc = m.colunas!.filter((col) => m.casas.some((k) => k.coluna === col && m.emB(k))).length;
    etiqueta(ctx, hits, { x: gx + s * nCols + 22, y: gy + s * 0.5 }, fracao(nc, m.colunas!.length), p.cores.b);
    etiqueta(ctx, hits, { x: gx - 18, y: gy + s * nLins + 18 }, fracao(nl, m.linhas.length), p.cores.a);
  }

  // Contagem e régua.
  const validas = m.casas.filter((k) => m.valida(k) && !m.fora(k));
  const N = validas.length;
  let y = gy + s * nLins + 18;
  if (p.contador) {
    const nA = validas.filter(m.emA).length;
    const nB = validas.filter(m.emB).length;
    const nAB = validas.filter((k) => m.emA(k) && m.emB(k)).length;
    let txt: string;
    if (mostrar.uniao) txt = mostrar.sem ? `${nA} + ${nB} − ${nAB} = ${nA + nB - nAB}` : `${nA} + ${nB} = ${nA + nB}`;
    else if (m.ou) txt = `${m.linhas.length} + ${m.casas.length - m.linhas.length} = ${N}`;
    else if (m.colunas && (e.repetir ?? p.repetir) && ordem && !pista) txt = `${m.linhas.length} × ${m.colunas.length} = ${N}`;
    else txt = `${N} casas`;
    etiqueta(ctx, hits, { x: w / 2, y: y + 6 }, txt, p.cores.casa);
    y += 36;
  }
  if (p.mostrar.razao_partes) {
    // Parte contra parte (acesas : as outras), sem o total: compara 2 vermelhas com 3 azuis.
    const a = validas.filter((k) => acesas.has(k.chave)).length;
    etiqueta(ctx, hits, { x: w / 2, y: y + 6 }, `${a} : ${N - a}`, p.cores.casa);
    text(ctx, { x: w / 2, y: y + 30 }, "acesas : outras", c.muted, 12);
    y += 52;
  }
  if (temRegua) {
    const marcas: { v: number; s: string; cor: CorTraco; contorno?: boolean }[] = [];
    const conta = (f: (k: Casa) => boolean, base: Casa[]) => [base.filter(f).length, base.length] as const;
    if (mostrar.uniao) {
      const [a, n] = conta((k) => m.emA(k) || m.emB(k), validas);
      marcas.push({ v: a / n, s: `${fracao(a, n)}`, cor: p.cores.regua });
    } else if (pista && p.a) {
      const todas = m.casas.filter((k) => m.valida(k));
      const [a0, n0] = conta(m.emA, todas);
      const [a1, n1] = conta(m.emA, validas);
      marcas.push({ v: a0 / n0, s: `${p.rotulos_eventos.a}: ${fracao(a0, n0)}`, cor: p.cores.a });
      marcas.push({ v: a1 / n1, s: `com a pista: ${fracao(a1, n1)}`, cor: p.cores.b, contorno: a0 * n1 !== a1 * n0 });
    } else if (mostrar.comp && p.a) {
      const [a, n] = conta((k) => !m.emA(k), validas);
      marcas.push({ v: a / n, s: fracao(a, n), cor: p.cores.fora });
    } else if (e.botao !== undefined) {
      const [a, n] = conta(m.emEvento, validas);
      marcas.push({ v: a / n, s: fracao(a, n), cor: p.cores.regua });
    } else if (p.a) {
      const [a, n] = conta(m.emA, validas);
      marcas.push({ v: a / n, s: fracao(a, n), cor: p.cores.regua });
    } else {
      const [a, n] = conta((k) => acesas.has(k.chave), validas);
      marcas.push({ v: a / n, s: fracao(a, n), cor: p.cores.regua });
    }
    regua(ctx, hits, 30, w - 30, Math.min(h - 22, y + 44), marcas);
  }
  return { alvos };
}

// ---------- tabela ----------

function desenharTabela(ctx: CanvasRenderingContext2D, w: number, h: number, hits: Hit[], p: GradeDe<"tabela">, _ctl: Controles, e: EstadoGrade): GeoGrade {
  const pl = e.pistaLinha ?? p.pista_linha;
  const pc = e.pistaColuna ?? p.pista_coluna;
  const nC = p.colunas.length + 1;
  const cw0 = Math.min(110, w * 0.28);
  const cw = (w - 16 - cw0) / nC;
  const lh = Math.min(46, (h - 20) / (p.linhas.length + 2));
  const x0 = 8;
  const y0 = 10;
  const totLinha = p.linhas.map((l) => l.valores.reduce((s, v) => s + v, 0));
  const totCol = p.colunas.map((_, j) => p.linhas.reduce((s, l) => s + l.valores[j], 0));
  const total = totLinha.reduce((s, v) => s + v, 0);
  const kp = corDoTraco(p.cores.pista);
  const alvos: Alvo[] = [];
  const naPista = (i: number | null, j: number | null) => {
    if (pl !== undefined) return i === pl;
    if (pc !== undefined) return j === pc;
    return true;
  };
  const temPista = pl !== undefined || pc !== undefined;
  const celula = (r: Rect, s: string, dentro: boolean, cabecalho: boolean, sub?: string) => {
    const fill = !dentro ? c.surface : temPista ? kp.tint : cabecalho ? c.surface : c.bg;
    caixa(ctx, r, fill, temPista && dentro ? kp.main : c.line, temPista && dentro ? 2.5 : 1.5, 4);
    textoCabe(ctx, { x: r.x + r.w / 2, y: r.y + r.h / 2 + (sub ? -7 : 1) }, s, dentro ? c.ink : c.lineDark, r.w - 6, 14);
    if (sub) textoCabe(ctx, { x: r.x + r.w / 2, y: r.y + r.h / 2 + 10 }, sub, kp.dark, r.w - 6, 12);
  };
  // Cabeçalho.
  celula({ x: x0, y: y0, w: cw0, h: lh }, "", true, true);
  p.colunas.forEach((col, j) => {
    const r = { x: x0 + cw0 + j * cw, y: y0, w: cw, h: lh };
    celula(r, col, naPista(null, j) || pl !== undefined, true);
    alvos.push({ tipo: "coluna", id: String(j), r });
  });
  celula({ x: x0 + cw0 + p.colunas.length * cw, y: y0, w: cw, h: lh }, "total", true, true);
  p.linhas.forEach((l, i) => {
    const y = y0 + lh * (i + 1);
    const rl = { x: x0, y, w: cw0, h: lh };
    celula(rl, l.rotulo, naPista(i, null) || pc !== undefined, true);
    alvos.push({ tipo: "linha", id: String(i), r: rl });
    l.valores.forEach((v, j) => {
      const dentro = naPista(i, j);
      const base = pl !== undefined ? totLinha[pl] : pc !== undefined ? totCol[pc] : 0;
      celula({ x: x0 + cw0 + j * cw, y, w: cw, h: lh }, String(v), dentro, false, temPista && dentro ? fracao(v, base) : undefined);
    });
    celula({ x: x0 + cw0 + p.colunas.length * cw, y, w: cw, h: lh }, String(totLinha[i]), pl === undefined || pl === i, false);
  });
  const yT = y0 + lh * (p.linhas.length + 1);
  celula({ x: x0, y: yT, w: cw0, h: lh }, "total", true, true);
  totCol.forEach((v, j) => celula({ x: x0 + cw0 + j * cw, y: yT, w: cw, h: lh }, String(v), pc === undefined || pc === j, false));
  celula({ x: x0 + cw0 + p.colunas.length * cw, y: yT, w: cw, h: lh }, String(total), !temPista, false);
  if (temPista && p.evento_coluna !== undefined && pl !== undefined) {
    const v = p.linhas[pl].valores[p.evento_coluna];
    etiqueta(ctx, hits, { x: w / 2, y: Math.min(h - 16, yT + lh + 22) }, `${fracao(v, totLinha[pl])}`, p.cores.evento);
  }
  return { alvos };
}

// ---------- árvore ----------

export interface ModeloArvore {
  niveis: { titulo?: string; galhos: Galho[] }[];
  caminhos: number[][];
  sucessos: (cam: readonly number[]) => number;
  prob: (cam: readonly number[]) => number | null;
}

export function modeloArvore(p: GradeDe<"arvore">, ctl: Controles): ModeloArvore {
  const n = Math.max(1, Math.min(6, Math.round(avaliarExpr(p.n, ctl))));
  const niveis = p.niveis ?? Array.from({ length: n }, () => ({ galhos: p.galhos! }));
  let caminhos: number[][] = [[]];
  for (const nv of niveis) caminhos = caminhos.flatMap((cam) => nv.galhos.map((_, g) => [...cam, g]));
  const sucessos = (cam: readonly number[]) => cam.reduce((s, g, i) => s + (niveis[i].galhos[g].sucesso ? 1 : 0), 0);
  const prob = (cam: readonly number[]) => {
    let r = 1;
    for (let i = 0; i < cam.length; i++) {
      const pp = niveis[i].galhos[cam[i]].p;
      if (pp === undefined) return null;
      r *= pp;
    }
    return r;
  };
  return { niveis, caminhos, sucessos, prob };
}

/** Fração "bonita" para uma chance (1/2, 1/6, 5/6…), com denominador até 36. */
export function fracaoDe(p: number): string {
  for (let d = 1; d <= 36; d++) {
    const n = Math.round(p * d);
    if (Math.abs(n / d - p) < 1e-9) return fracao(n, d);
  }
  return num(p, 3);
}

function desenharArvore(ctx: CanvasRenderingContext2D, w: number, h: number, hits: Hit[], p: GradeDe<"arvore">, ctl: Controles, e: EstadoGrade): GeoGrade {
  const m = modeloArvore(p, ctl);
  const L = m.caminhos.length;
  const nN = m.niveis.length;
  const pontas = e.pontas ?? new Set(p.acesas);
  const um = e.um ?? false;
  const temRodape = um || p.mostrar_produto || p.caminho === "sucessos";
  const yBase = p.agrupar ? h * 0.56 : temRodape ? h - 56 : h - 46;
  const dy = (yBase - 26) / nN;
  const temTitulos = m.niveis.some((nv) => Boolean(nv.titulo));
  const dir = temTitulos ? 64 : 10;
  const esp = (w - 10 - dir) / L;
  const xPonta = (i: number) => 10 + esp * (i + 0.5);
  // Posição de cada nó: média das pontas abaixo dele.
  const posNo = (nivel: number, prefixo: readonly number[]) => {
    const idx = m.caminhos.map((cam, i) => [cam, i] as const).filter(([cam]) => prefixo.every((g, j) => cam[j] === g));
    const xs = idx.map(([, i]) => xPonta(i));
    return { x: (Math.min(...xs) + Math.max(...xs)) / 2, y: 26 + dy * nivel };
  };
  const sucessoK = p.acender_k;
  const acesoCam = (cam: readonly number[], i: number) =>
    pontas.has(i) || (p.caminho === "sucessos" && m.sucessos(cam) === nN) || (sucessoK !== undefined && m.sucessos(cam) === sucessoK);
  const kp = corDoTraco(p.cor_ponta);
  // Galhos, do mais raso ao mais fundo; caminhos acesos por cima.
  const desenharGalhos = (soAcesos: boolean) => {
    m.caminhos.forEach((cam, i) => {
      const aceso = acesoCam(cam, i);
      if (soAcesos !== aceso) return;
      for (let nv = 0; nv < nN; nv++) {
        // Galho já desenhado por outro caminho com o mesmo prefixo: só o primeiro desenha.
        const pre = cam.slice(0, nv + 1);
        const primeiro = m.caminhos.findIndex((c2, j) => (soAcesos ? acesoCam(c2, j) : !acesoCam(c2, j)) && pre.every((g, k) => c2[k] === g));
        if (primeiro !== i) continue;
        const a = posNo(nv, cam.slice(0, nv));
        const b = posNo(nv + 1, pre);
        const g = m.niveis[nv].galhos[cam[nv]];
        const kg = corDoTraco(g.cor);
        seg(ctx, a, b, aceso ? kg.main : g.cor === "ink" ? c.lineDark : kg.tint, aceso ? 4 : 2.5);
        const nosNoNivel = m.niveis.slice(0, nv + 1).reduce((s, x) => s * x.galhos.length, 1);
        if ((w - 20) / nosNoNivel > 26) {
          const meio = { x: (a.x + b.x) / 2 + (b.x > a.x ? 8 : b.x < a.x ? -8 : 10), y: (a.y + b.y) / 2 };
          ctx.font = FONTE(12);
          const tw = ctx.measureText(g.rotulo).width + 8;
          caixa(ctx, { x: meio.x - tw / 2, y: meio.y - 9, w: tw, h: 18 }, aceso ? kg.main : c.bg, aceso ? kg.dark : g.cor === "ink" ? c.lineDark : kg.main, 1.5, 6);
          text(ctx, { x: meio.x, y: meio.y + 1 }, g.rotulo, aceso ? c.bg : g.cor === "ink" ? c.ink2 : kg.dark, 12);
        }
      }
    });
  };
  desenharGalhos(false);
  desenharGalhos(true);
  dot(ctx, posNo(0, []), 7, c.ink2);
  m.niveis.forEach((nv, i) => {
    if (!nv.titulo) return;
    ctx.save();
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.font = FONTE(11);
    ctx.fillStyle = c.muted;
    ctx.fillText(nv.titulo, w - 8, 26 + dy * (i + 0.5));
    ctx.restore();
  });

  const alvos: Alvo[] = [];
  const r0 = Math.max(4, Math.min(10, esp / 2.6));
  const produto: string[] = [];
  m.caminhos.forEach((cam, i) => {
    const P = { x: xPonta(i), y: yBase };
    const aceso = acesoCam(cam, i);
    dot(ctx, P, r0, aceso ? kp.main : c.bg);
    ctx.beginPath();
    ctx.arc(P.x, P.y, r0, 0, Math.PI * 2);
    ctx.strokeStyle = aceso ? kp.dark : c.lineDark;
    ctx.lineWidth = 2;
    ctx.stroke();
    const rot = um ? "1" : cam.map((g, nv) => m.niveis[nv].galhos[g].rotulo).join("");
    if (esp >= 22 || um) textoCabe(ctx, { x: P.x, y: P.y + r0 + 11 }, rot, aceso ? kp.dark : c.ink2, esp - 2, 12, 7);
    alvos.push({ tipo: "ponta", id: String(i), r: { x: P.x - Math.max(esp / 2, 10), y: P.y - 18, w: Math.max(esp, 20), h: 40 } });
    if (pontas.has(i) && p.mostrar_produto) {
      const pr = cam.map((g, nv) => m.niveis[nv].galhos[g].p);
      if (pr.every((x) => x !== undefined)) produto.push(`${pr.map((x) => fracaoDe(x!)).join(" · ")} = ${fracaoDe(m.prob(cam)!)}`);
    }
  });
  if (um) etiqueta(ctx, hits, { x: w / 2, y: yBase + 38 }, `soma = ${L}`, p.cor_ponta);
  if (produto.length) chip(ctx, { x: w / 2, y: yBase + 38 }, produto[produto.length - 1], c.ink2, c.ink);
  if (p.caminho === "sucessos") {
    const pr = m.prob(m.caminhos.find((cam) => m.sucessos(cam) === nN) ?? []);
    etiqueta(ctx, hits, { x: w / 2, y: yBase + 38 }, pr !== null ? fracaoDe(pr) : fracao(1, L), p.cor_ponta);
  }

  if (p.agrupar) {
    // Barras por número de sucessos: contagem (coeficientes) ou soma das chances.
    const grupos = Array.from({ length: nN + 1 }, (_, k) => m.caminhos.filter((cam) => m.sucessos(cam) === k));
    const temP = m.prob(m.caminhos[0]) !== null;
    const vals = grupos.map((g) => (temP ? g.reduce((s, cam) => s + m.prob(cam)!, 0) : g.length));
    const max = Math.max(...vals);
    const y0 = yBase + 64;
    const hb = h - y0 - 30;
    const slot = (w - 40) / (nN + 1);
    vals.forEach((v, k) => {
      const x = 20 + slot * (k + 0.5);
      const bh = max ? (v / max) * hb : 0;
      const acesoG = grupos[k].some((cam) => pontas.has(m.caminhos.indexOf(cam)));
      caixa(ctx, { x: x - slot * 0.3, y: y0 + hb - bh, w: slot * 0.6, h: bh }, acesoG ? kp.main : kp.tint, kp.main, 2, 3);
      text(ctx, { x, y: y0 + hb - bh - 10 }, temP ? fracaoDe(v) : String(v), kp.dark, 13);
      text(ctx, { x, y: h - 14 }, `k = ${k}`, c.muted, 11);
    });
  }
  return { alvos };
}

// ---------- fila (permutações) ----------

export function ordensFila(p: GradeDe<"fila">, preso: boolean): number[][] {
  const L = p.lugares ?? p.itens.length;
  const idx = p.itens.map((_, i) => i);
  let ordens = permutacoes(idx).map((o) => o.slice(0, L));
  const vistos = new Set<string>();
  ordens = ordens.filter((o) => {
    const k = o.join(",");
    if (vistos.has(k)) return false;
    vistos.add(k);
    return true;
  });
  if (preso && p.prender) ordens = ordens.filter((o) => o[p.prender!.lugar] === p.prender!.item);
  return ordens;
}

/** Texto da ordem; com `iguais`, os itens iguais viram o mesmo rótulo (sem índice). */
export function textoOrdem(p: GradeDe<"fila">, o: readonly number[], iguais: boolean): string {
  return o.map((i) => (iguais && p.iguais?.includes(i) ? p.itens[i].replace(/[₀-₉0-9]+$/, "") : p.itens[i])).join(" ");
}

function desenharFila(ctx: CanvasRenderingContext2D, w: number, h: number, hits: Hit[], p: GradeDe<"fila">, _ctl: Controles, e: EstadoGrade): GeoGrade {
  const L = p.lugares ?? p.itens.length;
  const n = p.itens.length;
  const preso = (e.preso ?? p.preso) && !!p.prender;
  const iguais = e.iguais ?? p.iguais_ligado;
  const colocados = e.colocados ?? p.montada ?? Array<number>(L).fill(-1);
  const alvos: Alvo[] = [];
  const lw = Math.min(70, (w - 20) / L - 8);
  const x0 = w / 2 - (L * (lw + 8) - 8) / 2;
  const yL = 18;
  // Quantas escolhas cada lugar tem: o lugar preso tem 1; os outros, o que sobra.
  const escolhas: number[] = [];
  let sobram = n - (preso ? 1 : 0);
  for (let i = 0; i < L; i++) {
    if (preso && p.prender!.lugar === i) escolhas.push(1);
    else escolhas.push(sobram--);
  }
  for (let i = 0; i < L; i++) {
    const r = { x: x0 + i * (lw + 8), y: yL, w: lw, h: 44 };
    const it = preso && p.prender!.lugar === i ? p.prender!.item : colocados[i];
    caixa(ctx, r, it >= 0 ? c.ink2 : c.bg, it >= 0 ? c.ink : c.lineDark, 2);
    if (it >= 0) textoCabe(ctx, { x: r.x + r.w / 2, y: r.y + 23 }, p.itens[it], c.bg, r.w - 6, 16);
    if (preso && p.prender!.lugar === i) {
      // Cadeado.
      const kk = corDoTraco(p.cores.cadeado);
      caixa(ctx, { x: r.x + r.w - 16, y: r.y - 8, w: 16, h: 13 }, kk.main, kk.dark, 1.5, 3);
      ctx.beginPath();
      ctx.arc(r.x + r.w - 8, r.y - 8, 5, Math.PI, 0);
      ctx.strokeStyle = kk.dark;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    if (p.escada) etiqueta(ctx, hits, { x: r.x + r.w / 2, y: r.y + 64 }, String(escolhas[i]), p.cores.cabem);
    alvos.push({ tipo: "lugar", id: String(i), r });
  }
  let y = yL + 92;
  if (p.escada) {
    const total = escolhas.reduce((s, v) => s * v, 1);
    etiqueta(ctx, hits, { x: w / 2, y }, `${escolhas.join(" × ")} = ${total}`, p.cores.produto);
    y += 34;
  }
  // Fichas soltas.
  const usados = new Set([...colocados.filter((i) => i >= 0), ...(preso ? [p.prender!.item] : [])]);
  const soltos = p.itens.map((_, i) => i).filter((i) => !usados.has(i));
  if (!p.montada) {
    const fw = Math.min(64, (w - 20) / Math.max(1, n) - 8);
    const xs = w / 2 - (soltos.length * (fw + 8) - 8) / 2;
    soltos.forEach((i, j) => {
      const r = { x: xs + j * (fw + 8), y, w: fw, h: 34 };
      caixa(ctx, { ...r, y: r.y + 3 }, c.ink, c.ink, 0);
      caixa(ctx, r, c.ink2, c.ink2, 0);
      textoCabe(ctx, { x: r.x + r.w / 2, y: r.y + 18 }, p.itens[i], c.bg, r.w - 6, 15);
      alvos.push({ tipo: "ficha", id: String(i), r });
    });
    y += 50;
  }
  // Lista de ordens: todas (listar) ou as já montadas.
  const ordens = p.listar ? ordensFila(p, preso).map((o) => textoOrdem(p, o, false)) : [...(e.montadas ?? [])];
  if (ordens.length) {
    const grupos = new Map<string, string[]>();
    const lista = p.listar ? ordensFila(p, preso) : [];
    if (p.listar) for (const o of lista) {
      const k = textoOrdem(p, o, iguais);
      grupos.set(k, [...(grupos.get(k) ?? []), textoOrdem(p, o, false)]);
    }
    const itensLista = p.listar ? [...grupos.values()] : ordens.map((o) => [o]);
    const cols = Math.min(itensLista.length, Math.max(1, Math.floor((w - 16) / 120)));
    const cwid = (w - 16) / cols;
    const linhasPorItem = Math.max(...itensLista.map((g) => g.length));
    const rh = 20;
    const ki = corDoTraco(p.cores.igual);
    itensLista.forEach((g, i) => {
      const cx = 8 + (i % cols) * cwid;
      const cy = y + Math.floor(i / cols) * (rh * linhasPorItem + 10);
      if (cy + rh * g.length > h) return;
      const r = { x: cx + 4, y: cy, w: cwid - 8, h: rh * g.length + 4 };
      if (g.length > 1) caixa(ctx, r, ki.tint, ki.main, 2, 6);
      g.forEach((s, j) => textoCabe(ctx, { x: cx + cwid / 2, y: cy + rh * (j + 0.5) + 2 }, s, c.ink, cwid - 14, 13));
    });
  }
  return { alvos };
}

// ---------- escada ----------

export function degraus(p: GradeDe<"escada">, ctl: Controles): number[] {
  const n = Math.max(0, Math.round(avaliarExpr(p.n, ctl)));
  const k = p.k === undefined ? n : Math.max(0, Math.min(n, Math.round(avaliarExpr(p.k, ctl))));
  return Array.from({ length: k }, (_, i) => (p.iguais ? n : n - i));
}

function desenharEscada(ctx: CanvasRenderingContext2D, w: number, h: number, hits: Hit[], p: GradeDe<"escada">, ctl: Controles): GeoGrade {
  const d = degraus(p, ctl);
  const n = Math.max(1, d[0] ?? 1);
  const area = { x: 24, y: 24, w: w - 48, h: h - 90 };
  const slot = area.w / Math.max(d.length, 4);
  const kd = corDoTraco(p.cores.degrau);
  d.forEach((v, i) => {
    const bh = (v / Math.max(n, 6)) * area.h;
    const x = area.x + slot * i + slot * 0.15;
    caixa(ctx, { x, y: area.y + area.h - bh, w: slot * 0.7, h: bh }, kd.main, kd.dark, 2, 4);
    text(ctx, { x: x + slot * 0.35, y: area.y + area.h - bh - 12 }, String(v), kd.dark, 15);
  });
  seg(ctx, { x: area.x, y: area.y + area.h }, { x: area.x + area.w, y: area.y + area.h }, c.axis, 2);
  if (p.contador) {
    const ehSoma = p.operacao === "soma";
    const total = d.reduce((s, v) => (ehSoma ? s + v : s * v), ehSoma ? 0 : 1);
    const sep = ehSoma ? " + " : " × ";
    etiqueta(ctx, hits, { x: w / 2, y: h - 30 }, d.length ? `${d.join(sep)} = ${total}` : ehSoma ? "0" : "1", p.cores.produto);
  }
  return { alvos: [] };
}

// ---------- lista ----------

function desenharLista(ctx: CanvasRenderingContext2D, w: number, h: number, hits: Hit[], p: GradeDe<"lista">, ctl: Controles, e: EstadoGrade): GeoGrade {
  const k = Math.max(1, Math.min(p.itens.length, Math.round(avaliarExpr(p.k, ctl))));
  const ordem = e.ordem ?? p.ordem;
  const grupos = arranjosPorGrupo(p.itens, k);
  const G = grupos.length;
  const cols = Math.min(G, 6);
  const cw = (w - 16) / cols;
  const linhasG = Math.ceil(G / cols);
  const porGrupo = ordem ? fatorial(k) : 1;
  const rh = Math.min(22, (h - 60) / (linhasG * porGrupo) - 2);
  const kg = corDoTraco(p.cores.grupo);
  grupos.forEach((g, i) => {
    const x = 8 + (i % cols) * cw;
    const y = 10 + Math.floor(i / cols) * (porGrupo * rh + 12);
    const lista = ordem ? g : [g[0]];
    caixa(ctx, { x: x + 3, y, w: cw - 6, h: lista.length * rh + 6 }, kg.tint, kg.main, 2, 6);
    lista.forEach((o, j) => textoCabe(ctx, { x: x + cw / 2, y: y + 3 + rh * (j + 0.5) }, ordem ? o.join("") : `{${o.join(", ")}}`, c.ink, cw - 12, 14));
  });
  const A = arranjo(p.itens.length, k);
  etiqueta(ctx, hits, { x: w / 2, y: h - 18 }, ordem ? `${G} × ${fatorial(k)} = ${A}` : `${A} ÷ ${fatorial(k)} = ${G}`, p.cores.grupo);
  return { alvos: [] };
}

// ---------- barras (C(n, k) ou binomial) ----------

export function valoresBarras(p: GradeDe<"barras">, ctl: Controles) {
  const n = Math.max(0, Math.round(avaliarExpr(p.n, ctl)));
  const pp = p.p !== undefined ? avaliarExpr(p.p, ctl) / 100 : null;
  const vals = Array.from({ length: n + 1 }, (_, k) => (pp === null ? comb(n, k) : binomial(n, k, pp)));
  const k = p.k !== undefined ? Math.max(0, Math.min(n, Math.round(avaliarExpr(p.k, ctl)))) : null;
  return { n, pp, vals, k };
}

function desenharBarrasK(ctx: CanvasRenderingContext2D, w: number, h: number, hits: Hit[], p: GradeDe<"barras">, ctl: Controles): GeoGrade {
  const { n, pp, vals, k } = valoresBarras(p, ctl);
  const max = pp === null ? Math.max(...vals) : Math.max(1e-9, ...vals);
  const temItens = p.itens && k !== null;
  // Com a pílula "C(n, k) = …" no alto, as barras descem: o número da barra mais alta ficava sob ela.
  const topo = k !== null ? 52 : 30;
  const area = { x: 20, y: topo, w: w - 40, h: h - (temItens ? 120 : 70) - (topo - 30) };
  const slot = area.w / (n + 1);
  const kb = corDoTraco(p.cores.barra);
  const ka = corDoTraco(p.cores.acesa);
  vals.forEach((v, j) => {
    const bh = (v / max) * area.h;
    const x = area.x + slot * j + slot * 0.18;
    const acesa = j === k;
    caixa(ctx, { x, y: area.y + area.h - bh, w: slot * 0.64, h: Math.max(1, bh) }, acesa ? ka.main : kb.tint, acesa ? ka.dark : kb.main, 2, 4);
    const s = pp === null ? String(v) : `${num(v * 100, 1)}%`;
    textoCabe(ctx, { x: x + slot * 0.32, y: area.y + area.h - bh - 11 }, s, acesa ? ka.dark : kb.dark, slot, 13);
    text(ctx, { x: x + slot * 0.32, y: area.y + area.h + 14 }, String(j), c.muted, 12);
  });
  seg(ctx, { x: area.x, y: area.y + area.h }, { x: area.x + area.w, y: area.y + area.h }, c.axis, 2);
  text(ctx, { x: area.x + area.w - 6, y: area.y + area.h + 30 }, "k", c.ink2, 12);
  if (k !== null) {
    const s = pp === null ? `C(${n}, ${k}) = ${vals[k]}` : `P(${k}) = ${num(vals[k] * 100, 1)}%`;
    etiqueta(ctx, hits, { x: w / 2, y: 14 }, s, p.cores.acesa);
  }
  if (temItens) {
    const its = p.itens!;
    const fw = Math.min(56, (w - 20) / its.length - 6);
    const x0 = w / 2 - (its.length * (fw + 6) - 6) / 2;
    its.forEach((it, i) => {
      const dentro = i < k!;
      const r = { x: x0 + i * (fw + 6), y: h - 56, w: fw, h: 30 };
      caixa(ctx, r, dentro ? ka.main : c.surface, dentro ? ka.dark : c.lineDark, 2);
      textoCabe(ctx, { x: r.x + r.w / 2, y: r.y + 16 }, it, dentro ? c.bg : c.muted, r.w - 4, 14);
    });
  }
  return { alvos: [] };
}

// ---------- Pascal ----------

function desenharPascal(ctx: CanvasRenderingContext2D, w: number, h: number, hits: Hit[], p: GradeDe<"pascal">, ctl: Controles, e: EstadoGrade): GeoGrade {
  const n = Math.max(0, Math.min(10, Math.round(avaliarExpr(p.n, ctl))));
  const tocada = e.tocada ?? p.tocada;
  const lh = Math.min(48, (h - 30) / (n + 1));
  const cw = Math.min(54, (w - 10) / (n + 1));
  const pos = (lin: number, k: number) => ({ x: w / 2 + (k - lin / 2) * cw, y: 22 + lin * lh });
  const kn = corDoTraco(p.cores.numero);
  const ks = corDoTraco(p.cores.seta);
  const alvos: Alvo[] = [];
  for (let lin = 0; lin <= n; lin++) {
    linhaPascal(lin).forEach((v, k) => {
      const P = pos(lin, k);
      const t = tocada && tocada[0] === lin && tocada[1] === k;
      const area = chip(ctx, P, String(v), t ? kn.dark : kn.main, kn.dark);
      if (t && ehMarca(p.cores.numero)) hits.push({ key: p.cores.numero, ...area });
      alvos.push({ tipo: "numero", id: `${lin},${k}`, r: { x: P.x - cw / 2, y: P.y - lh / 2, w: cw, h: lh } });
    });
  }
  if (tocada && tocada[0] > 0 && tocada[0] <= n) {
    const [lin, k] = tocada;
    const P = pos(lin, k);
    for (const kk of [k - 1, k]) {
      if (kk < 0 || kk > lin - 1) continue;
      const Q = pos(lin - 1, kk);
      const u = { x: P.x - Q.x, y: P.y - Q.y };
      const d = Math.hypot(u.x, u.y);
      const a = { x: Q.x + (u.x / d) * 15, y: Q.y + (u.y / d) * 15 };
      const b = { x: P.x - (u.x / d) * 16, y: P.y - (u.y / d) * 16 };
      seg(ctx, a, b, ks.main, 3);
      const ang = Math.atan2(u.y, u.x);
      polyline(ctx, [{ x: b.x - 8 * Math.cos(ang - 0.5), y: b.y - 8 * Math.sin(ang - 0.5) }, b, { x: b.x - 8 * Math.cos(ang + 0.5), y: b.y - 8 * Math.sin(ang + 0.5) }], ks.main, 3);
    }
    const s = k === 0 || k === lin ? "1" : `${comb(lin - 1, k - 1)} + ${comb(lin - 1, k)} = ${comb(lin, k)}`;
    etiqueta(ctx, hits, { x: w / 2, y: h - 14 }, s, p.cores.seta);
  }
  return { alvos };
}

// ---------- bolinhas e barras ----------

export function sequenciaDe(p: GradeDe<"bolinhas_e_barras">): boolean[] {
  return p.sequencia ? [...p.sequencia].map((ch) => ch === "|") : sequenciaInicial(p.bolinhas, p.barras);
}

function desenharBolinhas(ctx: CanvasRenderingContext2D, w: number, h: number, hits: Hit[], p: GradeDe<"bolinhas_e_barras">, _ctl: Controles, e: EstadoGrade): GeoGrade {
  const seq = e.sequencia ?? sequenciaDe(p);
  const cont = caixasDaSequencia(seq);
  const nCx = p.barras + 1;
  const kb = corDoTraco(p.cores.bolinha);
  const kr = corDoTraco(p.cores.barra);
  // Caixas em cima, com a contagem.
  const cxw = Math.min(90, (w - 20) / nCx - 10);
  const x0 = w / 2 - (nCx * (cxw + 10) - 10) / 2;
  cont.forEach((v, i) => {
    const r = { x: x0 + i * (cxw + 10), y: 16, w: cxw, h: 54 };
    caixa(ctx, r, c.bg, c.lineDark, 2);
    text(ctx, { x: r.x + r.w / 2, y: r.y + 20 }, String(v), c.ink, 20);
    text(ctx, { x: r.x + r.w / 2, y: r.y + 42 }, p.caixas?.[i] ?? `caixa ${i + 1}`, c.muted, 11);
  });
  // Fileira.
  const T = seq.length;
  const sw = Math.min(46, (w - 20) / T);
  const xs0 = w / 2 - (T * sw) / 2;
  const yF = h * 0.55;
  const slotsX: number[] = [];
  const alvos: Alvo[] = [];
  let bolaIdx = 0;
  seq.forEach((barra, i) => {
    const x = xs0 + sw * (i + 0.5);
    slotsX.push(x);
    if (barra) {
      caixa(ctx, { x: x - 5, y: yF - 26, w: 10, h: 52 }, kr.main, kr.dark, 2, 3);
      alvos.push({ tipo: "barra", id: String(i), r: { x: x - sw / 2, y: yF - 34, w: sw, h: 68 } });
    } else {
      bolaIdx += 1;
      dot(ctx, { x, y: yF + 3 }, sw * 0.32, kb.dark);
      dot(ctx, { x, y: yF }, sw * 0.32, kb.main);
      if (p.numeradas) text(ctx, { x, y: yF }, String(bolaIdx), "#FFFFFF", Math.min(13, sw * 0.36));
    }
  });
  if (e.vistas !== undefined) text(ctx, { x: w / 2, y: yF + 50 }, `${e.vistas} fileira${e.vistas === 1 ? "" : "s"} diferente${e.vistas === 1 ? "" : "s"}`, c.ink2, 13);
  if ((e.vistas ?? 0) >= p.contador_apos) {
    const n = p.bolinhas + p.barras;
    etiqueta(ctx, hits, { x: w / 2, y: h - 22 }, `C(${n}, ${p.barras}) = ${comb(n, p.barras)}`, p.cores.total);
  }
  return { alvos, slotsX, yFileira: yF };
}

// ---------- caixas ----------

export function distribuicoesCaixas(p: GradeDe<"caixas">, ctl: Controles, minimo: boolean): number[][] {
  const n = Math.max(1, Math.round(avaliarExpr(p.n, ctl)));
  return distribuicoes(p.itens, n, minimo ? 1 : 0);
}

function desenharCaixas(ctx: CanvasRenderingContext2D, w: number, h: number, hits: Hit[], p: GradeDe<"caixas">, ctl: Controles, e: EstadoGrade): GeoGrade {
  const minimo = e.minimo ?? p.minimo;
  const lista = distribuicoesCaixas(p, ctl, minimo);
  const n = Math.max(1, Math.round(avaliarExpr(p.n, ctl)));
  const atual = lista[Math.min(e.distribuicao ?? 0, lista.length - 1)] ?? Array<number>(n).fill(0);
  const ki = corDoTraco(p.cores.item);
  const km = corDoTraco(p.cores.minimo);
  const duasCols = lista.length > 10;
  const cxw = Math.min(96, (w * (duasCols ? 0.52 : 0.62)) / n - 10);
  const alvos: Alvo[] = [];
  atual.forEach((v, i) => {
    const r = { x: 10 + i * (cxw + 10), y: 30, w: cxw, h: 110 };
    caixa(ctx, r, c.bg, c.lineDark, 2);
    text(ctx, { x: r.x + r.w / 2, y: r.y + r.h + 14 }, p.rotulos?.[i] ?? `${i + 1}`, c.ink2, 13);
    for (let j = 0; j < v; j++) {
      const P = { x: r.x + 16 + (j % 3) * ((r.w - 32) / 2), y: r.y + r.h - 16 - Math.floor(j / 3) * 24 };
      const k = minimo && j === 0 ? km : ki;
      dot(ctx, { x: P.x, y: P.y + 2 }, 9, k.dark);
      dot(ctx, P, 9, k.main);
    }
  });
  // Lista das distribuições à direita.
  const xl = duasCols ? w * 0.56 : w * 0.66;
  const cols = duasCols ? 2 : 1;
  const rows = Math.ceil(lista.length / cols);
  const rh = Math.min(22, Math.max(15, (h - 52) / Math.max(1, rows)));
  const cw = (w - xl - 8 - (duasCols ? 4 : 0)) / cols;
  lista.forEach((d, i) => {
    const col = duasCols ? i % 2 : 0;
    const row = duasCols ? Math.floor(i / 2) : i;
    const r = { x: xl + col * (cw + 4), y: 12 + row * rh, w: cw, h: rh - 2 };
    if (r.y + r.h > h - 36) return;
    const sel = i === (e.distribuicao ?? 0);
    caixa(ctx, r, sel ? ki.tint : c.bg, sel ? ki.main : c.line, 1.5, 4);
    textoCabe(ctx, { x: r.x + r.w / 2, y: r.y + r.h / 2 + 1 }, `(${d.join(", ")})`, c.ink, r.w - 4, Math.min(13, r.h - 3), 7);
    alvos.push({ tipo: "distribuicao", id: String(i), r });
  });
  etiqueta(ctx, hits, { x: w * (duasCols ? 0.28 : 0.33), y: h - 20 }, `${lista.length} maneira${lista.length === 1 ? "" : "s"}`, p.cores.total);
  return { alvos };
}

// ---------- colunas ----------

function desenharColunas(ctx: CanvasRenderingContext2D, w: number, h: number, hits: Hit[], p: GradeDe<"colunas">, _ctl: Controles, e: EstadoGrade): GeoGrade {
  const ou = e.ou ?? p.ou;
  const n = p.colunas.length;
  const cw = (w - 16) / n;
  const maxItens = Math.max(...p.colunas.map((col) => col.itens.length));
  const rh = Math.min(38, (h - 90) / maxItens);
  p.colunas.forEach((col, i) => {
    const k = corDoTraco(col.cor);
    const x = 8 + cw * i;
    text(ctx, { x: x + cw / 2, y: 16 }, col.titulo, col.cor === "ink" ? c.ink2 : k.dark, 14);
    col.itens.forEach((it, j) => {
      const r = { x: x + 6, y: 32 + j * rh, w: cw - 12, h: rh - 6 };
      caixa(ctx, r, col.cor === "ink" ? c.surface : k.tint, col.cor === "ink" ? c.lineDark : k.main, 2);
      textoCabe(ctx, { x: r.x + r.w / 2, y: r.y + r.h / 2 + 1 }, it, c.ink, r.w - 6, 14);
    });
  });
  if (p.contador) {
    const ns = p.colunas.map((col) => col.itens.length);
    const total = ou ? ns.reduce((s, v) => s + v, 0) : ns.reduce((s, v) => s * v, 1);
    etiqueta(ctx, hits, { x: w / 2, y: h - 22 }, `${ns.join(ou ? " + " : " × ")} = ${total}`, p.cor_total);
  }
  return { alvos: [] };
}

// ---------- urna ----------

export function totalUrna(p: GradeDe<"urna">, ctl: Controles): { inicial: number; retiradas: number; restante: number } {
  const inicial = p.bolas.reduce((s, g) => s + g.quantidade, 0);
  const retiradas = Math.max(0, Math.min(inicial, Math.round(avaliarExpr(p.retiradas, ctl))));
  return { inicial, retiradas, restante: Math.max(0, inicial - retiradas) };
}

function desenharUrna(ctx: CanvasRenderingContext2D, w: number, h: number, hits: Hit[], p: GradeDe<"urna">, ctl: Controles): GeoGrade {
  const { inicial, retiradas, restante } = totalUrna(p, ctl);
  const itens: { cor: CorTraco; rotulo?: string }[] = [];
  for (const g of p.bolas) {
    for (let i = 0; i < g.quantidade; i++) itens.push({ cor: g.cor, rotulo: g.rotulo });
  }
  const box = { x: 24, y: 18, w: w - 48, h: h - 76 };
  caixa(ctx, box, c.surface, c.lineDark, 2, 12);

  const cols = Math.max(1, Math.min(itens.length, Math.ceil(Math.sqrt(Math.max(1, itens.length) * 1.4))));
  const rows = Math.max(1, Math.ceil(itens.length / cols));
  const cw = (box.w - 24) / cols;
  const ch = (box.h - 24) / rows;
  const r = Math.max(8, Math.min(20, Math.min(cw, ch) * 0.36));

  itens.forEach((b, idx) => {
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    const x = box.x + 12 + cw * (col + 0.5);
    const y = box.y + 12 + ch * (row + 0.5);
    const riscada = idx >= itens.length - retiradas;
    const k = corDoTraco(b.cor);
    if (riscada) {
      dot(ctx, { x, y }, r, c.line);
      seg(ctx, { x: x - r * 0.85, y: y + r * 0.85 }, { x: x + r * 0.85, y: y - r * 0.85 }, c.muted, 2.5);
    } else {
      dot(ctx, { x, y: y + 2 }, r, k.dark);
      dot(ctx, { x, y }, r, k.main);
      if (b.rotulo) text(ctx, { x, y }, b.rotulo, "#FFFFFF", Math.min(13, r * 0.95));
    }
  });

  const fav = p.destaque !== undefined ? p.bolas[p.destaque]?.quantidade ?? 0 : undefined;
  const rotTotal = retiradas > 0 ? `total: ${inicial}̶ → ${restante}` : `total: ${inicial}`;
  const texto = fav !== undefined ? `${fav}/${restante} (${rotTotal})` : rotTotal;
  const corTag: CorTraco = p.destaque !== undefined ? p.bolas[p.destaque]?.cor ?? "c3" : "c3";
  etiqueta(ctx, hits, { x: w / 2, y: h - 24 }, texto, corTag);
  return { alvos: [] };
}

export function desenharGrade(ctx: CanvasRenderingContext2D, w: number, h: number, hits: Hit[], p: Grade, ctl: Controles, e: EstadoGrade = {}): GeoGrade {
  switch (p.modo) {
    case "casas":
      return desenharCasas(ctx, w, h, hits, p, ctl, e);
    case "tabela":
      return desenharTabela(ctx, w, h, hits, p, ctl, e);
    case "arvore":
      return desenharArvore(ctx, w, h, hits, p, ctl, e);
    case "fila":
      return desenharFila(ctx, w, h, hits, p, ctl, e);
    case "escada":
      return desenharEscada(ctx, w, h, hits, p, ctl);
    case "lista":
      return desenharLista(ctx, w, h, hits, p, ctl, e);
    case "barras":
      return desenharBarrasK(ctx, w, h, hits, p, ctl);
    case "pascal":
      return desenharPascal(ctx, w, h, hits, p, ctl, e);
    case "bolinhas_e_barras":
      return desenharBolinhas(ctx, w, h, hits, p, ctl, e);
    case "caixas":
      return desenharCaixas(ctx, w, h, hits, p, ctl, e);
    case "colunas":
      return desenharColunas(ctx, w, h, hits, p, ctl, e);
    case "urna":
      return desenharUrna(ctx, w, h, hits, p, ctl);
  }
}

export function aspectoGrade(p: Grade): number {
  switch (p.modo) {
    case "casas":
      return p.colunas !== undefined ? 1 : 0.6;
    case "arvore":
      return p.agrupar ? 1.05 : 0.85;
    case "fila":
      return p.listar ? 1 : 0.8;
    case "tabela":
      return 0.6;
    case "lista":
      return 0.9;
    default:
      return 0.75;
  }
}

// Desenho em canvas do sistema_escalonado e da sistema_escalonado_figura. Legível em 400 px; cores pelas marcas c1..c4.
// Sem animação: tudo muda só quando o slider muda (nada a reduzir com prefers-reduced-motion).
import { dot, seg, text, type Hit, type Pt } from "../../canvas";
import type { CorTraco, Marca } from "../../../ui/marcas";
import { palette } from "../../../ui/palette";
import { etiqueta, fmt, nota, notaEsq, tinta, tintaClara, tintaEscura } from "../geo/base";
import { criarVista, marcas, passoDeMarcas } from "../plot2d";
import { caixaDoCentro, candidatosAoRedor, colideComAlgum, dentroDosLimites, escolherPosicao, type Caixa, type Obstaculo } from "../rotulosPlano";
import {
  classificar,
  escalonada,
  linhasDaTabela,
  matrizAtual,
  multiplicador,
  nomesDe,
  pivo,
  resolverLinhas,
  substituicao,
  testarPonto,
  textoEquacao,
  type Matriz,
} from "./calc";
import type { SistemaEscalonado } from "./params";

const LINHA = 36;
const TOPO = 8;
const FAIXA_TEXTO = 30;
const LINHA_TABELA = 34;
const SUB = ["₁", "₂", "₃"];

const alturaMatriz = (n: number) => TOPO + n * LINHA + 4;

function rodapes(p: SistemaEscalonado): number {
  let n = 0;
  if (p.mostrar.equacoes && p.modo === "eliminar") n++;
  if (p.mostrar.classificacao) n++;
  if (p.ponto) n++;
  return n;
}

/** Altura/largura do canvas (largura de referência 360 px, a de um celular de 400 px). */
export function aspectoSistema(p: SistemaEscalonado): number {
  const base = alturaMatriz(p.linhas.length) + rodapes(p) * FAIXA_TEXTO + 8;
  if (p.modo === "substituir") return (base + linhasDaTabela(p) * LINHA_TABELA + 6) / 360;
  if (p.plano) return (base + 230) / 360;
  return base / 360;
}

function largura(hl: readonly Marca[], m: CorTraco, b: number): number {
  if (hl.length === 0 || m === "ink" || m === "muted") return b;
  return hl.includes(m) ? b + 1.5 : Math.max(1.2, b - 1);
}

const corDaLinha = (p: SistemaEscalonado, i: number): CorTraco => p.cores[i] ?? "ink";

/** Matriz aumentada com chips Lᵢ, colchetes, barra antes do termo independente e anéis nos pivôs. */
function desenharMatriz(ctx: CanvasRenderingContext2D, w: number, hits: Hit[], p: SistemaEscalonado, m: Matriz, k: number) {
  const n = m[0].length - 1;
  const col = n === 2 ? 46 : 42;
  const x0 = 50;
  const xc = (j: number) => x0 + 14 + col / 2 + j * col + (j === n ? 10 : 0);
  const xFim = xc(n) + col / 2 + 4;
  const y0 = TOPO;
  const yBaixo = y0 + m.length * LINHA;
  // colchetes e barra
  const tr = palette.ink2;
  seg(ctx, { x: x0 + 6, y: y0 + 2 }, { x: x0, y: y0 + 2 }, tr, 2);
  seg(ctx, { x: x0, y: y0 + 2 }, { x: x0, y: yBaixo - 2 }, tr, 2);
  seg(ctx, { x: x0, y: yBaixo - 2 }, { x: x0 + 6, y: yBaixo - 2 }, tr, 2);
  seg(ctx, { x: xFim - 6, y: y0 + 2 }, { x: xFim, y: y0 + 2 }, tr, 2);
  seg(ctx, { x: xFim, y: y0 + 2 }, { x: xFim, y: yBaixo - 2 }, tr, 2);
  seg(ctx, { x: xFim, y: yBaixo - 2 }, { x: xFim - 6, y: yBaixo - 2 }, tr, 2);
  const xBarra = (xc(n - 1) + xc(n)) / 2;
  seg(ctx, { x: xBarra, y: y0 + 6 }, { x: xBarra, y: yBaixo - 6 }, palette.muted, 1.5, [4, 4]);

  const alvo = p.modo === "eliminar" ? p.operacao.alvo : -1;
  m.forEach((l, i) => {
    const y = y0 + LINHA * i + LINHA / 2;
    const nova = i === alvo && k !== 0 && pivo(l) !== -1 && p.modo === "eliminar";
    etiqueta(ctx, hits, { x: 22, y }, `L${SUB[i]}`, nova ? p.cor_nova : corDaLinha(p, i));
    const cp = pivo(l);
    l.forEach((v, j) => {
      const c: Pt = { x: xc(j), y };
      if (j === cp && p.mostrar.pivos) {
        const lw = largura(p.highlight, "c4", 2.5);
        ctx.beginPath();
        ctx.arc(c.x, c.y, 15, 0, Math.PI * 2);
        ctx.fillStyle = tintaClara("c4");
        ctx.fill();
        ctx.strokeStyle = tinta("c4");
        ctx.lineWidth = lw;
        ctx.stroke();
        hits.push({ key: "c4", x: c.x - 15, y: c.y - 15, w: 30, h: 30 });
      }
      const contradicao = cp === -1 && j === n && v !== 0;
      text(ctx, c, fmt(v), contradicao ? tintaEscura("c4") : palette.ink, 16);
    });
    if (i === alvo && p.modo === "eliminar") {
      const rotulo = `← L${SUB[alvo]} − ${fmt(k)}·L${SUB[p.operacao.base]}`;
      ctx.font = `900 16px Nunito, system-ui, sans-serif`;
      const larg = ctx.measureText(rotulo).width + 16;
      const cx = Math.min(w - larg / 2 - 4, xFim + 12 + larg / 2);
      etiqueta(ctx, hits, { x: cx, y }, rotulo, "c2");
    }
  });
}

/** Linha de texto centrada, que encolhe a fonte se não couber. */
function linhaCentrada(ctx: CanvasRenderingContext2D, w: number, y: number, s: string, c: CorTraco, size = 15) {
  let t = size;
  ctx.font = `900 ${t}px Nunito, system-ui, sans-serif`;
  while (t > 11 && ctx.measureText(s).width > w - 16) {
    t--;
    ctx.font = `900 ${t}px Nunito, system-ui, sans-serif`;
  }
  nota(ctx, { x: w / 2, y }, s, c, t);
}

function textoClassificacao(p: SistemaEscalonado, m: Matriz): { s: string; c: CorTraco; chip: boolean } {
  const nomes = nomesDe(p);
  if (!escalonada(m)) {
    const cols = m.map(pivo);
    const rep = cols.find((c, i) => c >= 0 && cols.indexOf(c) !== i);
    return { s: rep !== undefined ? `Dois pivôs na coluna de ${nomes[rep]}` : "Ainda não está escalonada", c: "muted", chip: false };
  }
  const cl = classificar(m);
  if (cl.tipo === "impossivel") {
    const l = m.find((r) => pivo(r) === -1 && r[r.length - 1] !== 0)!;
    return { s: `0 = ${fmt(l[l.length - 1])}: impossível`, c: "c4", chip: true };
  }
  if (cl.tipo === "infinitas") {
    const livres = nomes.filter((_, j) => !m.some((r) => pivo(r) === j));
    const nula = m.some((r) => pivo(r) === -1);
    return { s: `${nula ? "0 = 0: " : ""}${livres.join(" e ")} livre, infinitas`, c: "c4", chip: true };
  }
  const sol = p.mostrar.solucao && cl.solucao ? ` (${cl.solucao.map((v) => fmt(v)).join("; ")})` : "";
  return { s: `Um pivô por incógnita: única${sol}`, c: "c4", chip: true };
}

function desenharRodapes(ctx: CanvasRenderingContext2D, w: number, hits: Hit[], p: SistemaEscalonado, m: Matriz, y0: number): number {
  let y = y0 + FAIXA_TEXTO / 2;
  const nomes = nomesDe(p);
  if (p.mostrar.equacoes && p.modo === "eliminar") {
    linhaCentrada(ctx, w, y, m.map((l) => textoEquacao(l, nomes)).join("   ;   "), "c3");
    hits.push({ key: "c3", x: 8, y: y - 10, w: w - 16, h: 20 });
    y += FAIXA_TEXTO;
  }
  if (p.ponto) {
    const t = testarPonto(m, p.ponto);
    const partes = t.map((r, i) => `L${SUB[i]} dá ${fmt(r.valor)} ${r.vale ? "=" : "≠"} ${fmt(r.rhs)}`);
    linhaCentrada(ctx, w, y, `Em (${p.ponto.map((v) => fmt(v)).join("; ")}): ${partes.join("; ")}`, "c1", 14);
    y += FAIXA_TEXTO;
  }
  if (p.mostrar.classificacao) {
    const c = textoClassificacao(p, m);
    if (c.chip) {
      ctx.font = `900 16px Nunito, system-ui, sans-serif`;
      const s = ctx.measureText(c.s).width + 16 > w - 8 ? c.s.replace("Um pivô por incógnita: ", "") : c.s;
      etiqueta(ctx, hits, { x: w / 2, y }, s, c.c);
    } else linhaCentrada(ctx, w, y, c.s, c.c, 14);
    y += FAIXA_TEXTO;
  }
  return y - FAIXA_TEXTO / 2;
}

/** O segmento passa pela caixa (amostrado a cada ~2 px, com 2 px de folga)? */
function cruzaCaixa([a, b]: [Pt, Pt], c: Caixa): boolean {
  const n = Math.max(2, Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / 2));
  for (let i = 0; i <= n; i++) {
    const x = a.x + ((b.x - a.x) * i) / n;
    const y = a.y + ((b.y - a.y) * i) / n;
    if (x >= c.x - 2 && x <= c.x + c.w + 2 && y >= c.y - 2 && y <= c.y + c.h + 2) return true;
  }
  return false;
}

/** Retas ax + by = c no plano: linha original fantasma depois da operação, linha nova em cor_nova, solução em c1. */
function desenharPlano(
  ctx: CanvasRenderingContext2D,
  hits: Hit[],
  p: Extract<SistemaEscalonado, { modo: "eliminar" }>,
  original: Matriz,
  atual: Matriz,
  k: number,
  reg: Caixa,
) {
  if (!p.plano) return;
  const [x0, x1] = p.plano.x;
  const [y0, y1] = p.plano.y;
  const v = criarVista(p.plano.x, p.plano.y, reg, 16);
  const A = v.area;
  const passo = passoDeMarcas(Math.min(x0, y0), Math.max(x1, y1));
  ctx.save();
  ctx.beginPath();
  ctx.rect(A.x, A.y, A.w, A.h);
  ctx.clip();
  for (const x of marcas(x0, x1, passo)) seg(ctx, { x: v.X(x), y: A.y }, { x: v.X(x), y: A.y + A.h }, palette.line, 1);
  for (const y of marcas(y0, y1, passo)) seg(ctx, { x: A.x, y: v.Y(y) }, { x: A.x + A.w, y: v.Y(y) }, palette.line, 1);
  ctx.restore();
  const eixoY = y0 <= 0 && y1 >= 0 ? v.Y(0) : A.y + A.h;
  const eixoX = x0 <= 0 && x1 >= 0 ? v.X(0) : A.x;
  seg(ctx, { x: A.x - 4, y: eixoY }, { x: A.x + A.w + 4, y: eixoY }, palette.ink2, 2);
  seg(ctx, { x: eixoX, y: A.y + A.h + 4 }, { x: eixoX, y: A.y - 4 }, palette.ink2, 2);
  for (const x of marcas(x0, x1, passo)) if (x !== 0 && x !== x1) text(ctx, { x: v.X(x), y: eixoY + 12 }, fmt(x), palette.muted, 11);
  for (const y of marcas(y0, y1, passo)) if (y !== 0 && y !== y1) text(ctx, { x: eixoX - 11, y: v.Y(y) }, fmt(y), palette.muted, 11);

  // Segmento visível de ax + by = c (null se a linha não é reta).
  const trecho = (l: readonly number[]): [Pt, Pt] | null => {
    const [a, b, c] = l;
    if (Math.abs(a) < 1e-9 && Math.abs(b) < 1e-9) return null;
    if (Math.abs(b) < 1e-9) {
      const x = c / a;
      return x < x0 || x > x1 ? null : [{ x, y: y0 }, { x, y: y1 }];
    }
    return [{ x: x0, y: (c - a * x0) / b }, { x: x1, y: (c - a * x1) / b }];
  };
  const alvo = p.operacao.alvo;
  const mudou = Math.abs(k) > 1e-9;
  // Eixos e seus números também são obstáculos para os rótulos.
  const ocupados: Obstaculo[] = [
    { caixa: { x: A.x - 4, y: eixoY + 5, w: A.w + 8, h: 16 }, folgaY: 2 },
    { caixa: { x: eixoX - 20, y: A.y - 4, w: 16, h: A.h + 8 }, folgaX: 2 },
  ];
  const rotulos: { seg: [Pt, Pt]; txt: string; cor: CorTraco }[] = [];
  const tracar = (l: readonly number[], cor: CorTraco, lw: number, dash?: number[], txt?: string) => {
    const t = trecho(l);
    if (!t) return;
    const a = { x: v.X(t[0].x), y: v.Y(t[0].y) };
    const b = { x: v.X(t[1].x), y: v.Y(t[1].y) };
    ctx.save();
    ctx.beginPath();
    ctx.rect(A.x, A.y, A.w, A.h);
    ctx.clip();
    seg(ctx, a, b, tinta(cor), lw, dash);
    ctx.restore();
    if (txt) rotulos.push({ seg: [a, b], txt, cor });
  };
  // A linha original fica fantasma (embaixo) quando a nova ainda é reta. Se a nova virou 0 = c (sem reta),
  // a original é desenhada tracejada na própria cor, por cima: assim retas coincidentes continuam visíveis.
  const novaSemReta = pivo(atual[alvo]) === -1;
  if (mudou && !novaSemReta) tracar(original[alvo], "muted", 2.4, [7, 6], `L${SUB[alvo]} antes`);
  atual.forEach((l, i) => {
    const cor = i === alvo && mudou ? p.cor_nova : corDaLinha(p, i);
    tracar(l, cor, largura(p.highlight, cor, 3), undefined, `L${SUB[i]}`);
  });
  if (mudou && novaSemReta) tracar(original[alvo], corDaLinha(p, alvo), 3, [9, 7], `L${SUB[alvo]} antes`);

  // Solução (ponto c1) quando é única.
  const cl = classificar(atual);
  let solPx: Pt | null = null;
  // Com mostrar.solucao = false o ponto também some: senão ele marcaria a resposta sem a legenda.
  if (cl.tipo === "unica" && cl.solucao && p.mostrar.solucao) {
    const [sx, sy] = cl.solucao;
    if (sx >= x0 && sx <= x1 && sy >= y0 && sy <= y1) {
      solPx = { x: v.X(sx), y: v.Y(sy) };
      dot(ctx, solPx, largura(p.highlight, "c1", 6.5), tinta("c1"));
      ocupados.push({ caixa: caixaDoCentro(solPx, 18, 18) });
    }
  }
  if (p.ponto) {
    const q = { x: v.X(p.ponto[0]), y: v.Y(p.ponto[1]) };
    dot(ctx, q, 6, palette.bg);
    ctx.beginPath();
    ctx.arc(q.x, q.y, 6, 0, Math.PI * 2);
    ctx.strokeStyle = tinta("c1");
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ocupados.push({ caixa: caixaDoCentro(q, 18, 18) });
  }
  const limites: Caixa = { x: A.x, y: A.y, w: A.w, h: A.h };
  if (solPx && cl.solucao && p.mostrar.solucao) {
    const txt = `(${cl.solucao.map((s) => fmt(s)).join("; ")})`;
    ctx.font = `900 16px Nunito, system-ui, sans-serif`;
    const cw = ctx.measureText(txt).width + 16;
    const esc = escolherPosicao(candidatosAoRedor(solPx, { x: solPx.x + cw / 2 + 12, y: solPx.y - 20 }, cw, 29), cw, 29, ocupados, limites);
    etiqueta(ctx, hits, esc.pos, txt, "c1");
    ocupados.push({ caixa: esc.caixa });
  }
  const retas = rotulos.map((r) => r.seg);
  for (const r of rotulos) {
    const antes = r.txt.endsWith("antes");
    ctx.font = `900 ${antes ? 13 : 16}px Nunito, system-ui, sans-serif`;
    const cw = Math.max(28, ctx.measureText(r.txt).width + (antes ? 8 : 16));
    const ch = antes ? 18 : 29;
    const [a, b] = r.seg;
    const cands = [0.88, 0.12, 0.78, 0.22, 0.68, 0.32, 0.58, 0.42, 0.95, 0.05].map((f) => ({ x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f }));
    const dentro = cands.filter((q) => q.x >= A.x && q.x <= A.x + A.w && q.y >= A.y && q.y <= A.y + A.h);
    if (dentro.length === 0) continue;
    // A caixa inteira fica dentro do quadro: sem isso o "L₂ antes" escapava pela esquerda ou pousava na borda.
    const prender = (q: Pt): Pt => ({
      x: Math.min(Math.max(q.x, A.x + cw / 2 + 2), A.x + A.w - cw / 2 - 2),
      y: Math.min(Math.max(q.y, A.y + ch / 2 + 2), A.y + A.h - ch / 2 - 2),
    });
    const cand = dentro.flatMap((q) => [{ x: q.x + cw / 2 + 4, y: q.y - ch / 2 - 4 }, { x: q.x - cw / 2 - 4, y: q.y + ch / 2 + 4 }, q]);
    // Rótulo "antes" (fundo opaco): caixa inteira no quadro, de menor custo (o fundo apaga o trecho de reta que cobre);
    // na ordem dos candidatos, o empate fica com o primeiro. Os chips Lᵢ seguem a escolha de sempre.
    // Custo: bater em rótulo pesa mais; cruzar outra reta pesa 2 e a própria reta 1 (rótulo sobre a reta que nomeia).
    const custo = (caixa: Caixa) =>
      (colideComAlgum(caixa, ocupados) ? 100 : 0) + retas.reduce((s, sg) => s + (cruzaCaixa(sg, caixa) ? (sg === r.seg ? 1 : 2) : 0), 0);
    const limpa = !antes
      ? undefined
      : [...cand.filter((q) => dentroDosLimites(caixaDoCentro(q, cw, ch), limites)), ...cand.map(prender)]
          .map((q) => ({ pos: q, caixa: caixaDoCentro(q, cw, ch), livre: true }))
          .reduce<{ pos: Pt; caixa: Caixa; livre: boolean; c: number } | undefined>((m, o) => {
            const c = custo(o.caixa);
            return m === undefined || c < m.c ? { ...o, c } : m;
          }, undefined);
    const esc = limpa ?? escolherPosicao(cand, cw, ch, ocupados, limites);
    if (antes) {
      ctx.fillStyle = palette.bg;
      ctx.fillRect(esc.pos.x - cw / 2, esc.pos.y - ch / 2, cw, ch);
      text(ctx, esc.pos, r.txt, r.cor === "muted" ? palette.muted : tintaEscura(r.cor), 13);
    } else etiqueta(ctx, hits, esc.pos, r.txt, r.cor);
    ocupados.push({ caixa: esc.caixa });
  }
}

/** Tabela da substituição de baixo para cima: fórmula (c3), conta (muted) e valor (chip c1). */
function desenharSubstituicao(ctx: CanvasRenderingContext2D, w: number, hits: Hit[], p: SistemaEscalonado, m: Matriz, y0: number): number {
  let y = y0 + LINHA_TABELA / 2;
  if (!escalonada(m)) {
    // Com slider num coeficiente, a matriz pode sair da escada: não há substituição a fazer.
    notaEsq(ctx, { x: 16, y }, "Escalone antes de substituir", palette.muted, 15);
    return y;
  }
  const linhas = substituicao(m, nomesDe(p));
  // Ordem de leitura: de baixo para cima (a última linha da matriz vem primeiro).
  const ordem = [...linhas].reverse();
  for (const l of ordem) {
    const cor = l.contradicao ? tintaEscura("c4") : tintaEscura("c3");
    notaEsq(ctx, { x: 16, y }, l.formula, cor, 15);
    ctx.font = `900 15px Nunito, system-ui, sans-serif`;
    const fw = ctx.measureText(l.formula).width;
    if (l.conta) notaEsq(ctx, { x: 16 + fw + 8, y }, `= ${l.conta}`, palette.muted, 15);
    if (l.variavel && l.valor !== null) {
      const txt = p.mostrar.solucao ? `${l.variavel} = ${fmt(l.valor)}` : `${l.variavel} = ?`;
      ctx.font = `900 16px Nunito, system-ui, sans-serif`;
      const cw = ctx.measureText(txt).width + 16;
      etiqueta(ctx, hits, { x: w - 8 - cw / 2, y }, txt, "c1");
    }
    hits.push({ key: "c3", x: 12, y: y - 10, w: fw + 8, h: 20 });
    y += LINHA_TABELA;
  }
  return y - LINHA_TABELA / 2;
}

export function desenharSistema(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  hits: Hit[],
  p: SistemaEscalonado,
  ctl: Record<string, number>,
) {
  const original = resolverLinhas(p, ctl);
  const atual = matrizAtual(p, ctl);
  const k = multiplicador(p, ctl);
  desenharMatriz(ctx, w, hits, p, atual, k);
  let y = alturaMatriz(atual.length);
  if (p.modo === "substituir") y = desenharSubstituicao(ctx, w, hits, p, atual, y) + 6;
  y = desenharRodapes(ctx, w, hits, p, atual, y);
  if (p.modo === "eliminar" && p.plano) {
    desenharPlano(ctx, hits, p, original, atual, k, { x: 0, y: y + 4, w, h: Math.max(80, h - y - 4) });
  }
}

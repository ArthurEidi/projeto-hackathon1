// Desenho do plano cartesiano em canvas, compartilhado pelo widget e pela figura estática.
import { corDoTraco, ehMarca, type CorTraco } from "../../ui/marcas";
import { palette as c } from "../../ui/palette";
import { chip, dot, poly, polyline, seg, text, type Hit, type Pt } from "../canvas";
import type { PlanoCartesiano } from "./params";
import {
  caixaDoCentro,
  candidatosAoRedor,
  colideComAlgum,
  dentroDosLimites,
  escolherPosicao,
  type Obstaculo,
} from "./rotulosPlano";
import {
  alturaDoPonto,
  anguloEntreRetas,
  assintotas,
  avaliar,
  avaliarSemFuro,
  coincidentes,
  criarVista,
  encontros,
  fatorPorPasso,
  marcas,
  num,
  passoDeMarcas,
  periodo,
  perpendiculares,
  raizes,
  resolver,
  resolverCurva,
  todaRaiz,
  vertice,
  type Controles,
  type CurvaResolvida,
  type Vista,
} from "./plot2d";

export interface EstadoPlano {
  /** x atual do ponto (já encaixado). */
  pontoX?: number;
  /** Posições já visitadas pelo ponto. */
  rastro?: number[];
  /** Quadrantes já visitados (1..4), tingidos de leve. */
  visitados?: ReadonlySet<number>;
  /**
   * O aluno ainda precisa levar o ponto até lá (ponto arrastável no widget): a coordenada do
   * encontro só aparece quando o ponto chega, para não entregar a resposta antes do arraste.
   */
  arrasteAteEncontro?: boolean;
}

/**
 * Mostra a etiqueta "(x; y)" do encontro em xe? Na figura, sempre. Com ponto arrastável, só quando
 * o ponto está no encontro, e só se o próprio ponto não mostra as coordenadas (evita etiqueta dupla).
 */
export function revelaEncontro(estado: EstadoPlano, xe: number, pontoComCoordenadas: boolean): boolean {
  if (!estado.arrasteAteEncontro) return true;
  if (pontoComCoordenadas) return false;
  return estado.pontoX !== undefined && Math.abs(estado.pontoX - xe) < 1e-6;
}

/** Vista e onde ficaram os marcadores tocáveis. */
export type VistaPlano = Vista & { intercepto?: Pt };

const espessura = (cor: CorTraco, base: number, destaque: readonly string[]) => {
  if (destaque.length === 0) return base;
  return destaque.includes(cor) ? base * 1.5 : base * 0.6;
};

/** Etiqueta colorida; se a cor é uma marca, entra na lista de alvos da dica. */
function etiqueta(ctx: CanvasRenderingContext2D, hits: Hit[], p: Pt, s: string, cor: CorTraco) {
  const k = corDoTraco(cor);
  const area = chip(ctx, p, s, k.main, k.dark);
  if (ehMarca(cor)) hits.push({ key: cor, ...area });
}

function caminhoDaCurva(v: Vista, k: CurvaResolvida, x0: number, x1: number, y0: number, y1: number): Pt[][] {
  const partes: Pt[][] = [];
  let atual: Pt[] = [];
  const n = 600;
  const folga = (y1 - y0) * 2;
  let yAnt = NaN;
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n;
    const y = avaliar(k, x);
    // Salto grande entre vizinhos (assíntota vertical): quebra o traço.
    if (!Number.isFinite(y) || y < y0 - folga || y > y1 + folga) {
      if (atual.length > 1) partes.push(atual);
      atual = [];
      yAnt = NaN;
      continue;
    }
    if (Number.isFinite(yAnt) && Math.abs(y - yAnt) > (y1 - y0) * 1.5) {
      if (atual.length > 1) partes.push(atual);
      atual = [];
    }
    atual.push({ x: v.X(x), y: v.Y(y) });
    yAnt = y;
  }
  if (atual.length > 1) partes.push(atual);
  return partes;
}

function bolinha(ctx: CanvasRenderingContext2D, p: Pt, cor: string, aberta: boolean) {
  dot(ctx, p, 6.5, cor);
  if (aberta) dot(ctx, p, 3.5, c.bg);
}

export function desenharPlano(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  hits: Hit[],
  p: PlanoCartesiano,
  controles: Controles,
  estado: EstadoPlano = {},
): VistaPlano {
  const [x0, x1] = p.x;
  const [y0, y1] = p.y;
  const v: VistaPlano = criarVista(p.x, p.y, { x: 0, y: 0, w, h });
  const A = v.area;
  const curvas = p.curvas.map((cv) => resolverCurva(cv, controles));
  const hl = p.highlight;
  const dentroY = (y: number) => y >= y0 && y <= y1;
  const dentroX = (x: number) => x >= x0 && x <= x1;

  // Quadrantes visitados e grade.
  ctx.save();
  ctx.beginPath();
  ctx.rect(A.x, A.y, A.w, A.h);
  ctx.clip();
  if (p.marcar.quadrantes && estado.visitados) {
    const ox = v.X(0);
    const oy = v.Y(0);
    const rects: Record<number, [number, number, number, number]> = {
      1: [ox, A.y, A.x + A.w - ox, oy - A.y],
      2: [A.x, A.y, ox - A.x, oy - A.y],
      3: [A.x, oy, ox - A.x, A.y + A.h - oy],
      4: [ox, oy, A.x + A.w - ox, A.y + A.h - oy],
    };
    ctx.fillStyle = c.greenTint;
    for (const q of estado.visitados) ctx.fillRect(...rects[q]);
  }
  const passo = passoDeMarcas(Math.min(x0, y0), Math.max(x1, y1));
  if (p.grade) {
    for (const x of marcas(x0, x1, passo)) seg(ctx, { x: v.X(x), y: A.y }, { x: v.X(x), y: A.y + A.h }, c.line, 1);
    for (const y of marcas(y0, y1, passo)) seg(ctx, { x: A.x, y: v.Y(y) }, { x: A.x + A.w, y: v.Y(y) }, c.line, 1);
  }
  ctx.restore();

  // Eixos com seta e números.
  const temX = y0 <= 0 && y1 >= 0;
  const temY = x0 <= 0 && x1 >= 0;
  const eixoY = temX ? v.Y(0) : A.y + A.h;
  const eixoX = temY ? v.X(0) : A.x;
  seg(ctx, { x: A.x - 6, y: eixoY }, { x: A.x + A.w + 6, y: eixoY }, c.axis, 2);
  seg(ctx, { x: eixoX, y: A.y + A.h + 6 }, { x: eixoX, y: A.y - 6 }, c.axis, 2);
  polyline(ctx, [{ x: A.x + A.w - 2, y: eixoY - 5 }, { x: A.x + A.w + 6, y: eixoY }, { x: A.x + A.w - 2, y: eixoY + 5 }], c.axis, 2);
  polyline(ctx, [{ x: eixoX - 5, y: A.y + 2 }, { x: eixoX, y: A.y - 6 }, { x: eixoX + 5, y: A.y + 2 }], c.axis, 2);
  // Onde fica a alça do ponto arrastável: o número do eixo que ela cobriria não é escrito
  // (a pílula do ponto já mostra a coordenada; antes a alça ficava sobre o "−1" do eixo y).
  const alca = ((): Pt | null => {
    if (!p.ponto || estado.pontoX === undefined) return null;
    const yp = p.ponto.curva === null ? 0 : alturaDoPonto(curvas, p.ponto.curva, estado.pontoX).y;
    return Number.isFinite(yp) ? { x: v.X(estado.pontoX), y: p.ponto.curva === null ? eixoY : v.Y(yp) } : null;
  })();
  const sobAlca = (q: Pt) => alca !== null && Math.abs(q.x - alca.x) < 22 && Math.abs(q.y - alca.y) < 18;
  for (const x of marcas(x0, x1, passo)) {
    if (x === 0 || x === x1) continue;
    seg(ctx, { x: v.X(x), y: eixoY - 4 }, { x: v.X(x), y: eixoY + 4 }, c.axis, 2);
    const q = { x: v.X(x), y: eixoY + 14 };
    if (!sobAlca(q)) text(ctx, q, num(x), c.muted, 11);
  }
  for (const y of marcas(y0, y1, passo)) {
    if (y === 0 || y === y1) continue;
    seg(ctx, { x: eixoX - 4, y: v.Y(y) }, { x: eixoX + 4, y: v.Y(y) }, c.axis, 2);
    const q = { x: eixoX - 13, y: v.Y(y) };
    if (!sobAlca(q)) text(ctx, q, num(y), c.muted, 11);
  }

  if (p.marcar.quadrantes) {
    const nomes: [string, number, number][] = [
      // Fora dos cantos, para não ficarem sob a diagonal y = x.
      ["I", A.x + A.w * 0.78, A.y + 16],
      ["II", A.x + A.w * 0.22, A.y + 16],
      ["III", A.x + A.w * 0.22, A.y + A.h - 16],
      ["IV", A.x + A.w * 0.78, A.y + A.h - 16],
    ];
    for (const [s, x, y] of nomes) text(ctx, { x, y }, s, c.lineDark, 14);
  }

  const principal = curvas.findIndex((_, i) => !p.curvas[i].fantasma);
  const kp = principal >= 0 ? curvas[principal] : null;
  const limites = { x: 4, y: 4, w: w - 8, h: h - 8 };
  const ocupados: Obstaculo[] = [];
  type RotuloPendente = {
    prioridade: number;
    candidatos: Pt[];
    w: number;
    h: number;
    draw: (pos: Pt) => void;
  };
  const pendentes: RotuloPendente[] = [];
  // Letras dos eixos: desenhadas aqui e reservadas, para nenhum rótulo cair por cima.
  const letraX = { x: A.x + A.w - 2, y: eixoY - 14 };
  const letraY = { x: eixoX + 13, y: A.y + 4 };
  text(ctx, letraX, "x", c.ink2, 14);
  text(ctx, letraY, "y", c.ink2, 14);
  ocupados.push({ caixa: caixaDoCentro(letraX, 12, 16), folgaX: 2, folgaY: 2 });
  ocupados.push({ caixa: caixaDoCentro(letraY, 12, 16), folgaX: 2, folgaY: 2 });
  // Linha do eixo x: chip nenhum fica atravessado nela (a pílula "(0; −1)" encostava no eixo).
  if (temX) ocupados.push({ caixa: { x: A.x, y: eixoY - 1, w: A.w, h: 2 }, folgaX: 0, folgaY: 3 });
  const registrarPonto = (pt: Pt, raio: number) => {
    ocupados.push({ caixa: caixaDoCentro(pt, raio * 2, raio * 2), folgaX: 1, folgaY: 1 });
  };
  const medirChip = (s: string) => {
    ctx.font = "900 16px Nunito, system-ui, sans-serif";
    return { w: Math.max(28, ctx.measureText(s).width + 16), h: 29 };
  };
  const medirTexto = (s: string, size = 12) => {
    ctx.font = `900 ${size}px Nunito, system-ui, sans-serif`;
    return { w: Math.max(16, ctx.measureText(s).width + 6), h: size + 4 };
  };
  const agendarChip = (ancora: Pt, preferido: Pt, s: string, cor: CorTraco, prioridade = 1) => {
    const { w: cw, h: ch } = medirChip(s);
    pendentes.push({
      prioridade,
      candidatos: candidatosAoRedor(ancora, preferido, cw, ch),
      w: cw,
      h: ch,
      draw: (pos) => etiqueta(ctx, hits, pos, s, cor),
    });
  };

  // Guias, faixa da senoide e assíntotas: por baixo das curvas.
  ctx.save();
  ctx.beginPath();
  ctx.rect(A.x - 2, A.y - 2, A.w + 4, A.h + 4);
  ctx.clip();
  const guiaH = (y: number, cor: string, rotulo?: string, lw = 2) => {
    if (!dentroY(y)) return;
    const py = v.Y(y);
    seg(ctx, { x: A.x, y: py }, { x: A.x + A.w, y: py }, cor, lw, [3, 5]);
    if (rotulo) {
      const { w: tw, h: th } = medirTexto(rotulo, 12);
      pendentes.push({
        prioridade: 2,
        candidatos: [
          { x: A.x + 26, y: py - 10 },
          { x: A.x + A.w - 28, y: py - 10 },
          { x: A.x + 26, y: py + 12 },
          { x: A.x + A.w - 28, y: py + 12 },
          { x: A.x + A.w * 0.5, y: py - 10 },
        ],
        w: tw,
        h: th,
        draw: (pos) => text(ctx, pos, rotulo, c.ink2, 12),
      });
    }
  };
  const guiaV = (x: number, cor: string, rotulo?: string, lw = 2) => {
    if (!dentroX(x)) return;
    const px = v.X(x);
    seg(ctx, { x: px, y: A.y }, { x: px, y: A.y + A.h }, cor, lw, [3, 5]);
    if (rotulo) {
      const { w: tw, h: th } = medirTexto(rotulo, 12);
      const dx = 4 + 3.5 * rotulo.length;
      pendentes.push({
        prioridade: 2,
        candidatos: [
          { x: px + dx, y: A.y + 12 },
          { x: px - dx, y: A.y + 12 },
          { x: px + dx, y: A.y + A.h - 12 },
          { x: px - dx, y: A.y + A.h - 12 },
        ],
        w: tw,
        h: th,
        draw: (pos) => text(ctx, pos, rotulo, c.ink2, 12),
      });
    }
  };
  if (p.guias.diagonal) {
    const a = Math.max(x0, y0);
    const b = Math.min(x1, y1);
    seg(ctx, { x: v.X(a), y: v.Y(a) }, { x: v.X(b), y: v.Y(b) }, c.lineDark, 2, [3, 5]);
    const { w: tw, h: th } = medirTexto("y = x", 12);
    const xb = v.X(b);
    const yb = v.Y(b);
    const xa = v.X(a);
    const ya = v.Y(a);
    pendentes.push({
      prioridade: 2,
      candidatos: [
        { x: xb - 22, y: yb + 10 },
        { x: xb - 22 - 0.14 * (xb - xa), y: yb + 10 + 0.14 * (ya - yb) },
        { x: xb - 22 - 0.3 * (xb - xa), y: yb + 10 + 0.3 * (ya - yb) },
        { x: xb - 22 - 0.72 * (xb - xa), y: yb + 10 + 0.72 * (ya - yb) },
        { x: xb - 22, y: yb - 12 },
      ],
      w: tw,
      h: th,
      draw: (pos) => text(ctx, pos, "y = x", c.muted, 12),
    });
  }
  for (const g of p.guias.horizontais) guiaH(g.v, corDoTraco(g.cor).main, g.rotulo);
  for (const g of p.guias.verticais) guiaV(g.v, corDoTraco(g.cor).main, g.rotulo);
  if (kp && p.marcar.faixa && (kp.tipo === "seno" || kp.tipo === "cosseno")) {
    const ta = kp.t?.a ?? 1;
    const media = ta * kp.c + (kp.t?.k ?? 0);
    const amp = Math.abs(ta * kp.a);
    guiaH(media, c.ink2, "linha média");
    guiaH(media + amp, c.lineDark, "topo");
    guiaH(media - amp, c.lineDark, "fundo");
  }
  const ass = kp && p.marcar.assintota ? assintotas(kp) : {};
  for (const x of [...(ass.x !== undefined ? [ass.x] : []), ...p.assintotas.x]) guiaV(x, c.ink2, `x = ${num(x)}`, 2.5);
  for (const y of [...(ass.y !== undefined ? [ass.y] : []), ...p.assintotas.y]) guiaH(y, c.ink2, `y = ${num(y)}`, 2.5);
  ctx.restore();

  // Curvas: fantasmas por baixo. A curva 1 igual à 0 (coincidentes) vira tracejada por cima.
  ctx.save();
  ctx.beginPath();
  ctx.rect(A.x - 2, A.y - 2, A.w + 4, A.h + 4);
  ctx.clip();
  const iguais = curvas.length >= 2 && coincidentes(curvas[0], curvas[1]);
  const ordem = p.curvas.map((cv, i) => ({ cv, i })).sort((a, b) => Number(b.cv.fantasma) - Number(a.cv.fantasma));
  for (const { cv, i } of ordem) {
    const k = curvas[i];
    const partes = todaRaiz(k) ? [[{ x: A.x, y: v.Y(0) }, { x: A.x + A.w, y: v.Y(0) }]] : caminhoDaCurva(v, k, x0, x1, y0, y1);
    for (const parte of partes) {
      if (cv.fantasma) polyline(ctx, parte, c.lineDark, 3, [8, 7]);
      else if (iguais && i === 1) polyline(ctx, parte, corDoTraco(cv.cor).main, espessura(cv.cor, 4.5, hl), [10, 9]);
      else polyline(ctx, parte, corDoTraco(cv.cor).main, espessura(cv.cor, 4.5, hl));
    }
  }
  ctx.restore();

  // Extremos de domínio (por partes) e furos.
  p.curvas.forEach((cv, i) => {
    if (cv.fantasma) return;
    const k = curvas[i];
    const cor = corDoTraco(cv.cor).main;
    const d = cv.dominio;
    if (d) {
      for (const [xe, aberta] of [
        [d.de, d.abreDe],
        [d.ate, d.abreAte],
      ] as const) {
        if (xe === null || !dentroX(xe)) continue;
        const y = avaliar({ ...k, dom: undefined }, xe);
        if (Number.isFinite(y) && dentroY(y)) bolinha(ctx, { x: v.X(xe), y: v.Y(y) }, cor, aberta);
      }
    }
    for (const f of cv.furos) {
      const y = avaliarSemFuro(k, f);
      if (dentroX(f) && Number.isFinite(y) && dentroY(y)) bolinha(ctx, { x: v.X(f), y: v.Y(y) }, cor, true);
    }
  });

  // Triângulo "anda 1, sobe a" (ou "anda 1, ×b").
  let triRotulos: (() => void) | null = null;
  if (p.triangulo) {
    const t = p.triangulo;
    const k = curvas[t.curva];
    const xt = resolver(t.x, controles);
    const ya = avaliar(k, xt);
    const yb = avaliar(k, xt + 1);
    if (Number.isFinite(ya) && Number.isFinite(yb)) {
      const P = { x: v.X(xt), y: v.Y(ya) };
      const Q = { x: v.X(xt + 1), y: v.Y(ya) };
      const R = { x: v.X(xt + 1), y: v.Y(yb) };
      const cor = corDoTraco(t.cor);
      poly(ctx, [P, Q, R], cor.tint);
      seg(ctx, P, Q, c.ink2, 3);
      seg(ctx, Q, R, cor.main, espessura(t.cor, 4.5, hl));
      const sobe = yb - ya;
      triRotulos = () => {
        // Na fila, com prioridade alta: "1" sob o degrau e o "+a" ao lado da subida, desviando
        // dos chips de ponto (antes o "1" ficava colado em "(0; 1)" e na raiz "−0,5").
        const abaixo = sobe >= 0 ? 16 : -16;
        const meio = (P.x + Q.x) / 2;
        const { w: w1, h: h1 } = medirChip("1");
        pendentes.push({
          prioridade: 0,
          candidatos: [{ x: meio, y: P.y + abaixo }, { x: meio, y: P.y - abaixo }, { x: meio + 14, y: P.y + abaixo + 6 }],
          w: w1,
          h: h1,
          draw: (pos) => chip(ctx, pos, "1", c.ink2, c.ink),
        });
        const s = t.modo === "fator" ? `×${num(fatorPorPasso(k, xt))}` : sobe > 0 ? `+${num(sobe)}` : num(sobe);
        agendarChip({ x: Q.x, y: (Q.y + R.y) / 2 }, { x: Q.x + 22 + 4 * s.length, y: (Q.y + R.y) / 2 }, s, t.cor, 0);
      };
    }
  }

  // Marcas especiais sobre as curvas.
  if (kp && p.marcar.interceptoY && temY) {
    const y = avaliar(kp, 0);
    if (Number.isFinite(y) && dentroY(y)) {
      const cor = p.cores.interceptoY;
      v.intercepto = { x: v.X(0), y: v.Y(y) };
      dot(ctx, v.intercepto, espessura(cor, 7, hl), corDoTraco(cor).main);
      registrarPonto(v.intercepto, 7);
      agendarChip(v.intercepto, { x: v.X(0) - 26, y: v.Y(y) - 16 }, num(y), cor, 1);
    }
  }
  if (kp && p.marcar.raizes && temX && !todaRaiz(kp)) {
    const cor = p.cores.raiz;
    for (const r of raizes(kp, x0, x1)) {
      const pr = { x: v.X(r), y: v.Y(0) };
      dot(ctx, pr, espessura(cor, 7, hl), corDoTraco(cor).main);
      registrarPonto(pr, 7);
      agendarChip(pr, { x: pr.x + 4, y: pr.y + 22 }, num(r), cor, 1);
    }
  }
  if (p.marcar.encontro && curvas.length >= 2 && !iguais) {
    const cor = p.cores.encontro;
    for (const x of encontros(curvas[0], curvas[1], x0, x1)) {
      const y = avaliar(curvas[0], x);
      if (!dentroY(y)) continue;
      const pe = { x: v.X(x), y: v.Y(y) };
      dot(ctx, pe, espessura(cor, 7, hl), corDoTraco(cor).main);
      registrarPonto(pe, 7);
      if (revelaEncontro(estado, x, p.ponto?.coordenadas ?? false)) {
        agendarChip(pe, { x: pe.x + 44, y: pe.y + 18 }, `(${num(x)}; ${num(y)})`, cor, 1);
      }
    }
  }
  if (p.marcar.angulo && curvas.length >= 2 && curvas[0].tipo === "afim" && curvas[1].tipo === "afim" && !iguais) {
    const [k0, k1] = curvas;
    const xs = encontros(k0, k1, x0, x1);
    if (xs.length) {
      const O = { x: v.X(xs[0]), y: v.Y(avaliar(k0, xs[0])) };
      const cor = corDoTraco(p.cores.angulo);
      // Direções na tela (y para baixo): (1, −m), normalizadas.
      const dir = (m: number) => {
        const n = Math.hypot(1, m);
        return { x: 1 / n, y: -m / n };
      };
      const u = dir(k0.a);
      let w2 = dir(k1.a);
      // Pega o ângulo agudo (ou reto) entre as retas.
      if (u.x * w2.x + u.y * w2.y < 0) w2 = { x: -w2.x, y: -w2.y };
      const R = 24;
      if (perpendiculares(k0, k1)) {
        const p1 = { x: O.x + u.x * 14, y: O.y + u.y * 14 };
        const p3 = { x: O.x + w2.x * 14, y: O.y + w2.y * 14 };
        const p2 = { x: p1.x + w2.x * 14, y: p1.y + w2.y * 14 };
        poly(ctx, [O, p1, p2, p3], cor.tint, cor.main, espessura(p.cores.angulo, 2.5, hl));
      } else {
        let a0 = Math.atan2(u.y, u.x);
        let a1 = Math.atan2(w2.y, w2.x);
        if (((a1 - a0 + 3 * Math.PI) % (2 * Math.PI)) - Math.PI < 0) [a0, a1] = [a1, a0];
        ctx.beginPath();
        ctx.moveTo(O.x, O.y);
        ctx.arc(O.x, O.y, R, a0, a1);
        ctx.closePath();
        ctx.fillStyle = cor.tint;
        ctx.fill();
        ctx.strokeStyle = cor.main;
        ctx.lineWidth = espessura(p.cores.angulo, 2.5, hl);
        ctx.stroke();
      }
      const ang = anguloEntreRetas(k0.a, k1.a);
      agendarChip(O, { x: O.x - 40, y: O.y - 26 }, `${num(ang, 1)}°`, p.cores.angulo, 1);
    }
  }
  const vq = kp && (p.marcar.vertice || p.marcar.eixo) ? vertice(kp) : null;
  if (vq) {
    const cor = p.cores.vertice;
    if (p.marcar.eixo && dentroX(vq.x)) {
      seg(ctx, { x: v.X(vq.x), y: A.y }, { x: v.X(vq.x), y: A.y + A.h }, corDoTraco(cor).main, espessura(cor, 2.5, hl), [7, 6]);
      agendarChip({ x: v.X(vq.x), y: A.y + 14 }, { x: v.X(vq.x) + 34, y: A.y + 14 }, `x = ${num(vq.x)}`, cor, 1);
    }
    if (p.marcar.vertice && dentroX(vq.x) && dentroY(vq.y)) {
      const pv = { x: v.X(vq.x), y: v.Y(vq.y) };
      dot(ctx, pv, espessura(cor, 7.5, hl), corDoTraco(cor).main);
      registrarPonto(pv, 7.5);
      const abaixo = (kp!.a ?? 1) * (kp!.t?.a ?? 1) > 0 ? 24 : -24;
      agendarChip(pv, { x: pv.x, y: pv.y + abaixo }, `(${num(vq.x)}; ${num(vq.y)})`, cor, 1);
    }
  }
  if (kp && p.marcar.base && (kp.tipo === "exponencial" || kp.tipo === "logaritmo")) {
    agendarChip({ x: A.x + 44, y: A.y + 16 }, { x: A.x + 44, y: A.y + 16 }, `base ${num(kp.b)}`, p.cores.base, 1);
  }
  if (kp && (kp.tipo === "seno" || kp.tipo === "cosseno") && (p.marcar.fase || p.marcar.periodo)) {
    const ta = kp.t?.a ?? 1;
    const media = ta * kp.c + (kp.t?.k ?? 0);
    const topo = media + Math.abs(ta * kp.a);
    const inicio = (kp.fase ?? 0) / (kp.t?.b ?? 1) + (kp.t?.h ?? 0);
    if (p.marcar.fase && Math.abs(inicio) > 1e-9 && dentroY(media)) {
      const cor = corDoTraco(p.cores.fase);
      const y = v.Y(media);
      seg(ctx, { x: v.X(0), y }, { x: v.X(inicio), y }, cor.main, espessura(p.cores.fase, 4, hl));
      const s = Math.sign(inicio);
      polyline(ctx, [{ x: v.X(inicio) - s * 8, y: y - 6 }, { x: v.X(inicio), y }, { x: v.X(inicio) - s * 8, y: y + 6 }], cor.main, 3);
      const pf = { x: (v.X(0) + v.X(inicio)) / 2, y };
      agendarChip(pf, { x: pf.x, y: y + 20 }, `fase ${num(inicio)}`, p.cores.fase, 1);
    }
    const T = periodo(kp);
    if (p.marcar.periodo && Number.isFinite(T)) {
      const cor = corDoTraco(p.cores.periodo);
      const y = Math.max(A.y + 30, v.Y(topo) - 14);
      const xa = v.X(inicio);
      const xb = v.X(inicio + T);
      seg(ctx, { x: xa, y }, { x: xb, y }, cor.main, espessura(p.cores.periodo, 3, hl));
      seg(ctx, { x: xa, y: y - 7 }, { x: xa, y: y + 7 }, cor.main, 3);
      seg(ctx, { x: xb, y: y - 7 }, { x: xb, y: y + 7 }, cor.main, 3);
      const ptT = { x: (xa + xb) / 2, y };
      agendarChip(ptT, { x: ptT.x, y: y - 18 }, `T = ${num(T)}`, p.cores.periodo, 1);
    }
  }

  // Ponto que percorre a curva (ou cursor solto no eixo x), com projeções nos eixos.
  if (p.ponto && estado.pontoX !== undefined) {
    const pt = p.ponto;
    const sel = pt.curva;
    for (const xr of pt.rastro && sel !== null ? (estado.rastro ?? []) : []) {
      const yr = alturaDoPonto(curvas, sel, xr).y;
      if (Number.isFinite(yr) && dentroY(yr)) dot(ctx, { x: v.X(xr), y: v.Y(yr) }, 3.5, c.lineDark);
    }
    const x = estado.pontoX;
    const cor = corDoTraco(pt.cor);
    if (sel === null) {
      // Cursor independente: linha vertical e a altura de cada curva nesse x.
      const px = v.X(x);
      seg(ctx, { x: px, y: A.y }, { x: px, y: A.y + A.h }, c.muted, 2, [4, 5]);
      p.curvas.forEach((cv, i) => {
        if (cv.fantasma) return;
        const y = avaliar(curvas[i], x);
        if (!Number.isFinite(y) || !dentroY(y)) return;
        const k = corDoTraco(cv.cor);
        seg(ctx, { x: px, y: eixoY }, { x: px, y: v.Y(y) }, k.main, 3);
        const py = v.Y(y);
        dot(ctx, { x: px, y: py }, 7, k.main);
        registrarPonto({ x: px, y: py }, 7);
        agendarChip({ x: px, y: py }, { x: px + (px > A.x + A.w * 0.7 ? -34 : 34), y: py }, num(y), cv.cor, 0);
      });
      dot(ctx, { x: px, y: eixoY + 3 }, 11, cor.dark);
      dot(ctx, { x: px, y: eixoY }, 11, cor.main);
      dot(ctx, { x: px, y: eixoY }, 5, c.bg);
      registrarPonto({ x: px, y: eixoY }, 12);
      if (pt.coordenadas) {
        agendarChip({ x: px, y: eixoY }, { x: px, y: eixoY + 26 }, `x = ${num(x)}`, pt.cor, 0);
      }
    } else {
      const y = alturaDoPonto(curvas, sel, x).y;
      if (Number.isFinite(y) && y >= y0 - 0.01 && y <= y1 + 0.01) {
        const P = { x: v.X(x), y: v.Y(y) };
        if (pt.retangulo) {
          const k = corDoTraco(pt.corRetangulo);
          const O = { x: v.X(0), y: v.Y(0) };
          poly(ctx, [O, { x: P.x, y: O.y }, P, { x: O.x, y: P.y }], k.tint, k.main, espessura(pt.corRetangulo, 2.5, hl));
          const pm = { x: (O.x + P.x) / 2, y: (O.y + P.y) / 2 };
          agendarChip(pm, pm, `${num(x)} · ${num(y)} = ${num(x * y)}`, pt.corRetangulo, 1);
        }
        seg(ctx, P, { x: P.x, y: eixoY }, c.muted, 2, [4, 5]);
        seg(ctx, P, { x: eixoX, y: P.y }, c.muted, 2, [4, 5]);
        if (pt.espelho && dentroX(y) && dentroY(x)) {
          // Reflexo em y = x: troca as coordenadas; o segmento entre os dois é perpendicular à diagonal.
          const E = { x: v.X(y), y: v.Y(x) };
          seg(ctx, P, E, c.lineDark, 2, [4, 5]);
          dot(ctx, E, 10, cor.tint);
          dot(ctx, E, 10, cor.main);
          dot(ctx, E, 6, c.bg);
          registrarPonto(E, 10);
          agendarChip(E, { x: E.x + 46, y: E.y + 18 }, `(${num(y)}; ${num(x)})`, pt.cor, 0);
        }
        dot(ctx, { x: P.x, y: P.y + 3 }, 11, cor.dark);
        dot(ctx, P, 11, cor.main);
        dot(ctx, P, 5, c.bg);
        registrarPonto(P, 12);
        if (pt.coordenadas) {
          const s = `(${num(x)}; ${num(y)})`;
          const dx = P.x > A.x + A.w * 0.7 ? -46 - 3 * s.length : 46 + 3 * s.length;
          agendarChip(P, { x: P.x + dx, y: P.y - 18 }, s, pt.cor, 0);
        }
      }
    }
  }

  // Rótulos por cima de tudo: primeiro os ancorados (pontos, raízes, vértices, guias),
  // registrando cada caixa em `ocupados`; por fim, os rótulos das curvas nos espaços livres.
  triRotulos?.();
  pendentes.sort((a, b) => a.prioridade - b.prioridade);
  for (const item of pendentes) {
    const res = escolherPosicao(item.candidatos, item.w, item.h, ocupados, limites);
    ocupados.push({ caixa: res.caixa });
    item.draw(res.pos);
  }
  ctx.font = "900 16px Nunito, system-ui, sans-serif";
  p.curvas.forEach((cv, i) => {
    if (!cv.rotulo) return;
    const k = curvas[i];
    const { w: lw, h: lh } = medirChip(cv.rotulo);
    // 3 tentativas, cada uma mais tolerante: longe dos eixos; fora da faixa de 10% das bordas;
    // qualquer altura (ex.: a reta y = 1 com y de 0 a 17, que antes ficava sem rótulo).
    for (const modo of ["exigente", "normal", "livre"] as const) {
      const deslocamentos = modo === "exigente" ? [-22] : [-22, 22];
      for (const dy of deslocamentos) {
        for (let j = 0; j <= 60; j++) {
          const x = x1 - (x1 - x0) * (0.16 + j / 80);
          const y = avaliar(k, x);
          if (!Number.isFinite(y) || y < y0 || y > y1) continue;
          if (modo !== "livre" && (y < y0 + (y1 - y0) * 0.1 || y > y1 - (y1 - y0) * 0.1)) continue;
          if (modo === "exigente" && (Math.abs(y) < (y1 - y0) * 0.2 || Math.abs(x) < (x1 - x0) * 0.08)) continue;
          const pos = { x: v.X(x), y: v.Y(y) + dy };
          const r = caixaDoCentro(pos, lw, lh);
          if (!dentroDosLimites(r, limites) || colideComAlgum(r, ocupados)) continue;
          ocupados.push({ caixa: r });
          if (cv.fantasma) chip(ctx, pos, cv.rotulo, c.lineDark, c.muted, c.ink2);
          else etiqueta(ctx, hits, pos, cv.rotulo, cv.cor);
          return;
        }
      }
    }
  });
  return v;
}

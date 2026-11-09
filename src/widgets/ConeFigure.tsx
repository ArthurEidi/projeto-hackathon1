// Figura estática do desafio e do fechamento: cone com o triângulo interno, o corte em verdadeira
// grandeza, ou os dois lado a lado. Destaques e quadrados sobre os lados vêm do JSON.
import { apex, origin, rim, DEG } from "../math3d/revolve";
import { Dica } from "../ui/Dica";
import { palette as c } from "../ui/palette";
import { chip, dot, labelPos, poly, rightAngle, seg, text, useCanvas, type Hit, type Pt } from "./canvas";
import { drawAxis, drawLateral, drawRim, makeView } from "./coneScene";
import type { ConeFigureState, Magnitude } from "./params";

type Region = { x: number; y: number; w: number; h: number };

const col = {
  h: { main: c.h, dark: c.hDark, tint: c.hTint },
  r: { main: c.r, dark: c.rDark, tint: c.rTint },
  g: { main: c.g, dark: c.gDark, tint: c.gTint },
} as const;

function widthFor(k: Magnitude, highlight: Magnitude[]) {
  if (highlight.length === 0) return 5;
  return highlight.includes(k) ? 7.5 : 3;
}

function drawCone(ctx: CanvasRenderingContext2D, s: ConeFigureState, reg: Region, hits: Hit[]) {
  const v = makeView(s.h, s.r, 0, 20 * DEG, reg, 1.22);
  drawLateral(ctx, v, 2 * Math.PI, { back: c.gTintStrong, front: c.gTint });
  drawRim(ctx, v, 2 * Math.PI, c.ink2, 2.5);
  drawAxis(ctx, v);
  const A = v.P(apex(s.h));
  const O = v.P(origin);
  const B = v.P(rim(s.r, 0));
  poly(ctx, [O, A, B], c.bg);
  rightAngle(ctx, O, A, B, 10);
  const order: Magnitude[] = ["h", "r", "g"].sort(
    (a, b) => Number(s.highlight.includes(a as Magnitude)) - Number(s.highlight.includes(b as Magnitude)),
  ) as Magnitude[];
  const ends: Record<Magnitude, [Pt, Pt]> = { h: [O, A], r: [O, B], g: [A, B] };
  for (const k of order) seg(ctx, ends[k][0], ends[k][1], col[k].main, widthFor(k, s.highlight));
  dot(ctx, A, 4, c.ink);
  dot(ctx, O, 4, c.ink);
  dot(ctx, B, 4, c.ink);
  const cen = { x: (O.x + A.x + B.x) / 3, y: (O.y + A.y + B.y) / 3 };
  hits.push({ key: "h", ...chip(ctx, labelPos(O, A, cen, 22), s.labels.h, c.h, c.hDark) });
  hits.push({ key: "r", ...chip(ctx, labelPos(O, B, cen, 20), s.labels.r, c.r, c.rDark) });
  hits.push({ key: "g", ...chip(ctx, labelPos(A, B, cen, 24), s.labels.g, c.g, c.gDark) });
}

/** Triângulo do corte em verdadeira grandeza: O no canto reto, A em cima, B à direita. */
function drawSection(ctx: CanvasRenderingContext2D, s: ConeFigureState, reg: Region, hits: Hit[]) {
  const { h, r } = s;
  const g = Math.hypot(h, r);
  const O = { x: 0, y: 0 };
  const A = { x: 0, y: h };
  const B = { x: r, y: 0 };
  const n = { x: h / g, y: r / g }; // normal de AB apontando para fora
  const squares: Record<Magnitude, Pt[]> = {
    h: [O, A, { x: -h, y: h }, { x: -h, y: 0 }],
    r: [O, B, { x: r, y: -r }, { x: 0, y: -r }],
    g: [A, B, { x: B.x + n.x * g, y: B.y + n.y * g }, { x: A.x + n.x * g, y: A.y + n.y * g }],
  };

  // Enquadra triângulo + quadrados visíveis.
  const all: Pt[] = [O, A, B, ...s.squares.flatMap((k) => squares[k])];
  const minX = Math.min(...all.map((p) => p.x));
  const maxX = Math.max(...all.map((p) => p.x));
  const minY = Math.min(...all.map((p) => p.y));
  const maxY = Math.max(...all.map((p) => p.y));
  const pad = 34;
  const k = Math.min((reg.w - 2 * pad) / (maxX - minX), (reg.h - 2 * pad) / (maxY - minY));
  const ox = reg.x + reg.w / 2 - ((minX + maxX) / 2) * k;
  const oy = reg.y + reg.h / 2 + ((minY + maxY) / 2) * k;
  const S = (p: Pt): Pt => ({ x: ox + p.x * k, y: oy - p.y * k });

  for (const m of s.squares) {
    const pts = squares[m].map(S);
    poly(ctx, pts, col[m].tint, col[m].main, 3);
    const cx = pts.reduce((a, p) => a + p.x, 0) / 4;
    const cy = pts.reduce((a, p) => a + p.y, 0) / 4;
    const area = s.areas[m];
    if (area) text(ctx, { x: cx, y: cy }, area, col[m].dark, 22);
  }

  const o = S(O);
  const a = S(A);
  const b = S(B);
  poly(ctx, [o, a, b], c.bg);
  rightAngle(ctx, o, a, b, 12);
  const ends: Record<Magnitude, [Pt, Pt]> = { h: [o, a], r: [o, b], g: [a, b] };
  for (const m of ["h", "r", "g"] as Magnitude[]) seg(ctx, ends[m][0], ends[m][1], col[m].main, widthFor(m, s.highlight));
  const cen = { x: (o.x + a.x + b.x) / 3, y: (o.y + a.y + b.y) / 3 };
  for (const m of ["h", "r", "g"] as Magnitude[]) {
    if (s.squares.includes(m)) continue; // o quadrado já identifica o lado
    const area = chip(ctx, labelPos(ends[m][0], ends[m][1], cen, m === "g" ? 24 : 20), s.labels[m], col[m].main, col[m].dark);
    hits.push({ key: m, ...area });
  }
}

export function ConeFigure({ state }: { state: ConeFigureState }) {
  const { ref, size, hover } = useCanvas(0.8, (ctx, w, H, hits) => {
    const full = { x: 0, y: 0, w, h: H };
    if (state.view === "cone") drawCone(ctx, state, full, hits);
    else if (state.view === "section") drawSection(ctx, state, full, hits);
    else {
      const half = w * 0.5;
      drawCone(ctx, state, { x: 0, y: 0, w: half, h: H }, hits);
      seg(ctx, { x: half, y: 24 }, { x: half, y: H - 24 }, c.line, 2);
      drawSection(ctx, state, { x: half, y: 0, w: half, h: H }, hits);
    }
  });
  return (
    <>
      <canvas ref={ref} aria-label="Cone e o triângulo retângulo do corte, com altura, raio e geratriz" />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    </>
  );
}

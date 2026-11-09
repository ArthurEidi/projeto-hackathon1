// Tela 2: o aluno arrasta um ponto pela borda da base; o segmento até o vértice nunca muda de tamanho.
import { useEffect, useRef, useState } from "react";
import { apex, generatrixLength, rim, wrapAngle, DEG } from "../math3d/revolve";
import { Dica } from "../ui/Dica";
import { palette as c } from "../ui/palette";
import { chip, dot, seg, useCanvas, type Pt } from "./canvas";
import { drawAxis, drawLateral, drawRim, makeView, rimIsBack, type ConeView } from "./coneScene";
import { widgetParams } from "./params";
import type { WidgetProps } from "./types";

const BIN = 5 * DEG;
const BINS = Math.round((2 * Math.PI) / BIN);
const YAW = -18 * DEG;
const PITCH = 24 * DEG;

const binOf = (t: number) => Math.floor(wrapAngle(t) / BIN) % BINS;

function nearestRimAngle(v: ConeView, p: Pt): number {
  let best = 0;
  let bestD = Infinity;
  const scan = (from: number, to: number, step: number) => {
    for (let t = from; t <= to; t += step) {
      const q = v.P(rim(v.r, t));
      const d = (q.x - p.x) ** 2 + (q.y - p.y) ** 2;
      if (d < bestD) {
        bestD = d;
        best = t;
      }
    }
  };
  scan(0, 2 * Math.PI, 3 * DEG);
  scan(best - 3 * DEG, best + 3 * DEG, 0.25 * DEG);
  return wrapAngle(best);
}

export function GeneratrixWidget({ params, onMetric, onInteract, done }: WidgetProps) {
  const { h, r } = widgetParams.generatrix.parse(params);
  const g = generatrixLength(h, r);
  const [t, setT] = useState(62 * DEG);
  const [visited, setVisited] = useState<Set<number>>(() => new Set([binOf(62 * DEG)]));
  const [touched, setTouched] = useState(false);
  const [pulse, setPulse] = useState(0);
  const tRef = useRef(62 * DEG);
  const dragging = useRef(false);
  const viewRef = useRef<ConeView | null>(null);

  useEffect(() => {
    onMetric("arc", visited.size * 5);
  }, [visited, onMetric]);

  // Anel pulsante no ponto até a primeira interação.
  useEffect(() => {
    if (touched) return;
    let raf = 0;
    const loop = (ms: number) => {
      setPulse((ms / 900) % 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [touched]);

  const { ref, size, hover } = useCanvas(0.86, (ctx, w, H, hits) => {
    const v = makeView(h, r, YAW, PITCH, { x: 0, y: 0, w, h: H });
    viewRef.current = v;
    const A = v.P(apex(h));

    drawLateral(ctx, v, 2 * Math.PI, { back: c.gTintStrong, front: c.gTint });

    // Rastro: posições já visitadas, atrás tracejadas.
    for (const b of visited) {
      const tb = (b + 0.5) * BIN;
      const back = rimIsBack(v, tb);
      seg(ctx, A, v.P(rim(r, tb)), c.gTintStrong, 2, back ? [4, 5] : undefined);
    }
    drawRim(ctx, v, 2 * Math.PI, c.ink2, 2.5);
    drawAxis(ctx, v);

    const P = v.P(rim(r, t));
    const back = rimIsBack(v, t);
    seg(ctx, A, P, c.g, 5, back ? [10, 7] : undefined);
    dot(ctx, A, 5, c.ink);

    if (!touched) {
      ctx.beginPath();
      ctx.arc(P.x, P.y, 14 + pulse * 14, 0, Math.PI * 2);
      ctx.strokeStyle = pulse < 0.7 ? c.gTintStrong : c.gTint;
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    dot(ctx, { x: P.x, y: P.y + 3 }, 14, c.gDark);
    dot(ctx, P, 14, c.g);
    dot(ctx, P, 7, c.bg);

    const len = g.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    // Etiqueta ao lado do segmento, pela perpendicular que aponta para fora do eixo.
    const m = { x: (A.x + P.x) / 2, y: (A.y + P.y) / 2 };
    const dx = P.x - A.x;
    const dy = P.y - A.y;
    const n = Math.hypot(dx, dy) || 1;
    let nx = -dy / n;
    let ny = dx / n;
    const axisX = v.P([0, h / 2, 0]).x;
    if ((m.x - axisX) * nx < 0 || (Math.abs(m.x - axisX) < 4 && nx < 0)) {
      nx = -nx;
      ny = -ny;
    }
    const label = done ? `g = ${len}` : len;
    ctx.font = "900 16px Nunito, system-ui, sans-serif";
    const off = ctx.measureText(label).width / 2 + 22;
    hits.push({ key: "g", ...chip(ctx, { x: m.x + nx * off, y: m.y + ny * off }, label, c.g, c.gDark) });
  });

  const moveTo = (clientX: number, clientY: number, el: HTMLCanvasElement) => {
    const v = viewRef.current;
    if (!v) return;
    const rect = el.getBoundingClientRect();
    const nt = nearestRimAngle(v, { x: clientX - rect.left, y: clientY - rect.top });
    // Marca todas as faixas entre a posição anterior e a nova, pelo caminho mais curto.
    const prev = tRef.current;
    let d = wrapAngle(nt - prev);
    if (d > Math.PI) d -= 2 * Math.PI;
    const steps = Math.ceil(Math.abs(d) / BIN);
    setVisited((old) => {
      const s = new Set(old);
      for (let i = 0; i <= steps; i++) s.add(binOf(prev + (d * i) / Math.max(steps, 1)));
      return s.size === old.size ? old : s;
    });
    tRef.current = nt;
    setT(nt);
  };

  return (
    <>
      <canvas
        ref={ref}
        aria-label="Cone com um ponto arrastável na borda da base"
        style={{ cursor: "grab" }}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          dragging.current = true;
          if (!touched) {
            setTouched(true);
            onInteract();
          }
          moveTo(e.clientX, e.clientY, e.currentTarget);
        }}
        onPointerMove={(e) => dragging.current && moveTo(e.clientX, e.clientY, e.currentTarget)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    </>
  );
}

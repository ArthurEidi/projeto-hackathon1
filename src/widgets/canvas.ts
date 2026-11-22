// Hook de canvas com nitidez em telas de alta densidade e primitivas de desenho chapado.
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { palette as c } from "../ui/palette";
import type { Marca } from "../ui/marcas";

export type Pt = { x: number; y: number };
export type Rect = { x: number; y: number; w: number; h: number };
/** Área de um rótulo desenhado no canvas, para a dica ao passar o mouse. */
export type Hit = Rect & { key: Marca };
export type DrawFn = (ctx: CanvasRenderingContext2D, w: number, h: number, hits: Hit[]) => void;

const TOQUE_MS = 2600;

const dentro = (r: Rect, x: number, y: number, folga = 4) =>
  x >= r.x - folga && x <= r.x + r.w + folga && y >= r.y - folga && y <= r.y + r.h + folga;
const mesmoHit = (a: Hit | null, b: Hit | null) =>
  a === b || (!!a && !!b && a.key === b.key && a.x === b.x && a.y === b.y && a.w === b.w);

export function useCanvas(aspect: number, draw: DrawFn) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const hits = useRef<Hit[]>([]);
  const [hover, setHover] = useState<Hit | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Informa a proporção à coluna visual da aula (layout de duas colunas): o CSS limita a largura do palco
    // para o desenho caber na altura da tela. O desenho continua dimensionado pela largura, então
    // coordenadas, rótulos e áreas de toque não mudam. Fica a maior proporção entre os canvas do palco.
    const coluna = el.closest<HTMLElement>(".step__visual");
    if (coluna) {
      const atual = Number(coluna.style.getPropertyValue("--aspecto")) || 0;
      if (aspect > atual) coluna.style.setProperty("--aspecto", String(aspect));
    }
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width);
      setSize((s) => (s.w === w ? s : { w, h: Math.round(w * aspect) }));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [aspect]);

  useEffect(() => {
    const el = ref.current;
    if (!el || size.w === 0) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    const W = Math.round(size.w * dpr);
    const H = Math.round(size.h * dpr);
    if (el.width !== W || el.height !== H) {
      el.width = W;
      el.height = H;
      el.style.height = `${size.h}px`;
    }
    const ctx = el.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size.w, size.h);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    const list: Hit[] = [];
    draw(ctx, size.w, size.h, list);
    hits.current = list;
    // O rótulo pode andar (giro, arraste): a dica acompanha.
    setHover((cur) => {
      if (!cur) return cur;
      const now = list.find((h) => h.key === cur.key) ?? null;
      return mesmoHit(cur, now) ? cur : now;
    });
  });

  // Mouse: dica enquanto o ponteiro está sobre o rótulo. Toque: um toque no rótulo mostra a dica por um tempo.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer = 0;
    let down: Pt | null = null;
    const local = (e: PointerEvent): Pt => {
      const b = el.getBoundingClientRect();
      return { x: e.clientX - b.left, y: e.clientY - b.top };
    };
    // O último desenhado fica por cima, então tem prioridade.
    const achar = (p: Pt) => [...hits.current].reverse().find((h) => dentro(h, p.x, p.y)) ?? null;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const found = achar(local(e));
      setHover((cur) => (mesmoHit(cur, found) ? cur : found));
    };
    const onLeave = (e: PointerEvent) => e.pointerType === "mouse" && setHover(null);
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") down = local(e);
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType === "mouse" || !down) return;
      const p = local(e);
      const tap = Math.hypot(p.x - down.x, p.y - down.y) < 10;
      down = null;
      if (!tap) return;
      const found = achar(p);
      setHover(found);
      clearTimeout(timer);
      if (found) timer = window.setTimeout(() => setHover(null), TOQUE_MS);
    };
    el.addEventListener("pointerover", onMove);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    return () => {
      clearTimeout(timer);
      el.removeEventListener("pointerover", onMove);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
    };
  }, []);

  return { ref, size, hover };
}

export function poly(ctx: CanvasRenderingContext2D, pts: Pt[], fill?: string, stroke?: string, lw = 2) {
  if (pts.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lw;
    ctx.stroke();
  }
}

/** Preenche sem fresta entre retalhos vizinhos: contorna com a mesma cor. */
export function patch(ctx: CanvasRenderingContext2D, pts: Pt[], fill: string) {
  poly(ctx, pts, fill, fill, 1.2);
}

export function seg(ctx: CanvasRenderingContext2D, a: Pt, b: Pt, color: string, lw: number, dash?: number[]) {
  ctx.beginPath();
  ctx.setLineDash(dash ?? []);
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.strokeStyle = color;
  ctx.lineWidth = lw;
  ctx.stroke();
  ctx.setLineDash([]);
}

export function polyline(ctx: CanvasRenderingContext2D, pts: Pt[], color: string, lw: number, dash?: number[]) {
  if (pts.length < 2) return;
  ctx.beginPath();
  ctx.setLineDash(dash ?? []);
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
  ctx.strokeStyle = color;
  ctx.lineWidth = lw;
  ctx.stroke();
  ctx.setLineDash([]);
}

export function dot(ctx: CanvasRenderingContext2D, p: Pt, r: number, fill: string) {
  ctx.beginPath();
  ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
}

/** Sombra curta das etiquetas e marcadores (a mesma do botão principal da landing page). */
export const SOMBRA = "rgba(20, 33, 55, 0.16)";

/**
 * Marcador de ponto arrastável: sombra curta, preenchimento e contorno fino na tinta. O ponto neutro (sem cor
 * de marca) usa o amarelo do "ponto atual" das ilustrações da landing. O raio é o mesmo de antes.
 */
export function marcador(ctx: CanvasRenderingContext2D, p: Pt, r: number, fill: string, neutro: boolean) {
  dot(ctx, { x: p.x, y: p.y + 3 }, r, SOMBRA);
  dot(ctx, p, r, neutro ? c.yellow : fill);
  ctx.beginPath();
  ctx.arc(p.x, p.y, r - 1, 0, Math.PI * 2);
  ctx.lineWidth = 2;
  ctx.strokeStyle = c.ink;
  ctx.stroke();
}

/** Etiqueta: retângulo arredondado com sombra curta. Devolve a área ocupada. */
export function chip(ctx: CanvasRenderingContext2D, p: Pt, text: string, bg: string, dark: string, fg = "#FFFFFF"): Rect {
  ctx.font = `900 16px Nunito, system-ui, sans-serif`;
  const tw = ctx.measureText(text).width;
  const w = Math.max(28, tw + 16);
  const h = 26;
  const x = p.x - w / 2;
  const y = p.y - h / 2;
  // Sombra curta e suave (a do botão da landing, tinta a 16%) no lugar do antigo degrau sólido no tom escuro.
  // Tamanho, posição e área devolvida não mudam: as dicas e os rótulos calibrados seguem no mesmo lugar.
  void dark;
  ctx.beginPath();
  ctx.roundRect(x, y + 3, w, h, 9);
  ctx.fillStyle = SOMBRA;
  ctx.fill();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 9);
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.fillStyle = fg;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, p.x, p.y + 1);
  return { x, y, w, h: h + 3 };
}

export function text(ctx: CanvasRenderingContext2D, p: Pt, s: string, color: string, size = 18) {
  ctx.font = `900 ${size}px Nunito, system-ui, sans-serif`;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(s, p.x, p.y);
}

/** Marca de ângulo reto no vértice o, entre as direções de o→a e o→b (em tela). */
export function rightAngle(ctx: CanvasRenderingContext2D, o: Pt, a: Pt, b: Pt, size = 12) {
  const ua = unit(o, a);
  const ub = unit(o, b);
  if (!ua || !ub) return;
  const p1 = { x: o.x + ua.x * size, y: o.y + ua.y * size };
  const p2 = { x: p1.x + ub.x * size, y: p1.y + ub.y * size };
  const p3 = { x: o.x + ub.x * size, y: o.y + ub.y * size };
  polyline(ctx, [p1, p2, p3], c.ink2, 2);
}

export function unit(a: Pt, b: Pt): Pt | null {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const n = Math.hypot(dx, dy);
  return n < 1e-6 ? null : { x: dx / n, y: dy / n };
}

export function mid(a: Pt, b: Pt): Pt {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

/** Ponto deslocado `d` px a partir do meio de a-b, para longe de `away`. */
export function labelPos(a: Pt, b: Pt, away: Pt, d = 22): Pt {
  const m = mid(a, b);
  const u = unit(away, m) ?? { x: 0, y: -1 };
  return { x: m.x + u.x * d, y: m.y + u.y * d };
}

// Peças de desenho do cone reutilizadas pelos widgets. Ordem de pintura:
// base -> superfície de trás (vista por dentro) -> superfície da frente -> linhas por cima.
import { fitScale, project, screenArea, toView, type Camera, type Projected, type Vec3 } from "../math3d/project";
import { apex, boundingRadius, origin, rim, sweepAngles, DEG } from "../math3d/revolve";
import { palette as c } from "../ui/palette";
import { patch, polyline, seg, type Pt } from "./canvas";

export interface ConeView {
  cam: Camera;
  h: number;
  r: number;
  P: (v: Vec3) => Projected;
}

export function makeView(
  h: number,
  r: number,
  yaw: number,
  pitch: number,
  region: { x: number; y: number; w: number; h: number },
  margin = 1.18,
): ConeView {
  const R = boundingRadius(h, r);
  const cam: Camera = {
    yaw,
    pitch,
    scale: fitScale(region.w, region.h, R, margin),
    cx: region.x + region.w / 2,
    cy: region.y + region.h / 2,
    target: [0, h / 2, 0],
  };
  return { cam, h, r, P: (v) => project(v, cam) };
}

/** O retalho (vértice, aro(t), aro(t+dt)) está de frente para a câmera? */
export function frontAt(v: ConeView, t: number): boolean {
  const dt = 2 * DEG;
  return screenArea(v.P(apex(v.h)), v.P(rim(v.r, t)), v.P(rim(v.r, t + dt))) > 0;
}

/** O ponto do aro está do lado de trás (mais longe que o centro)? */
export function rimIsBack(v: ConeView, t: number): boolean {
  return toView(rim(v.r, t), v.cam.yaw, v.cam.pitch, v.cam.target)[2] < toView(origin, v.cam.yaw, v.cam.pitch, v.cam.target)[2];
}

export function drawBaseSector(ctx: CanvasRenderingContext2D, v: ConeView, to: number, fill: string) {
  if (to <= 0) return;
  const pts = [v.P(origin), ...sweepAngles(to, 4 * DEG).map((t) => v.P(rim(v.r, t)))];
  patch(ctx, pts, fill);
}

/** Pinta a superfície lateral de 0 até `to`, em duas passadas (trás e frente). */
export function drawLateral(
  ctx: CanvasRenderingContext2D,
  v: ConeView,
  to: number,
  colors: { back: string; front: string },
  between?: () => void,
) {
  const A = v.P(apex(v.h));
  const angles = sweepAngles(to, 4 * DEG);
  const front: Pt[][] = [];
  for (let i = 0; i < angles.length - 1; i++) {
    const b = v.P(rim(v.r, angles[i]));
    const d = v.P(rim(v.r, angles[i + 1]));
    const tri = [A, b, d];
    if (screenArea(A, b, d) > 0) front.push(tri);
    else patch(ctx, tri, colors.back);
  }
  between?.();
  for (const tri of front) patch(ctx, tri, colors.front);
}

/** Aro de 0 até `to`: parte da frente sólida, parte de trás tracejada (convenção de aresta oculta). */
export function drawRim(ctx: CanvasRenderingContext2D, v: ConeView, to: number, color: string, lw = 3) {
  const angles = sweepAngles(to, 3 * DEG);
  let run: Pt[] = [];
  let runBack = rimIsBack(v, angles[0]);
  const flush = () => {
    if (run.length > 1) polyline(ctx, run, color, runBack ? lw * 0.7 : lw, runBack ? [5, 6] : undefined);
  };
  for (const t of angles) {
    const back = rimIsBack(v, t);
    const p = v.P(rim(v.r, t));
    if (back !== runBack) {
      run.push(p);
      flush();
      run = [p];
      runBack = back;
    } else run.push(p);
  }
  flush();
}

export function drawAxis(ctx: CanvasRenderingContext2D, v: ConeView) {
  seg(ctx, v.P([0, -0.45, 0]), v.P([0, v.h + 0.75, 0]), c.axis, 2, [6, 6]);
}

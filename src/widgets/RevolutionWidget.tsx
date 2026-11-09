// Tela 1: o triângulo retângulo gira em torno do eixo e deixa para trás a superfície do cone.
import { useRef, useState } from "react";
import { apex, origin, rim, DEG } from "../math3d/revolve";
import { Dica } from "../ui/Dica";
import { palette as c } from "../ui/palette";
import { chip, dot, labelPos, poly, rightAngle, seg, type Pt } from "./canvas";
import { useCanvas } from "./canvas";
import { drawAxis, drawBaseSector, drawLateral, drawRim, frontAt, makeView } from "./coneScene";
import { widgetParams } from "./params";
import type { WidgetProps } from "./types";

const TRACE_EVERY = 15 * DEG;
const FINAL_PITCH = 22 * DEG;

const easeOut = (x: number) => 1 - (1 - x) * (1 - x);

export function RevolutionWidget({ params, controls, done }: WidgetProps) {
  const { h, r } = widgetParams.revolution.parse(params);
  const theta = (controls.theta ?? 0) * DEG;
  const [orbit, setOrbit] = useState({ yaw: 0, pitch: FINAL_PITCH });
  const drag = useRef<{ x: number; y: number } | null>(null);

  // Começa como figura plana (pitch 0) e ganha profundidade nos primeiros 40° de giro.
  const autoPitch = easeOut(Math.min(theta / (40 * DEG), 1)) * FINAL_PITCH;
  const yaw = done ? orbit.yaw : 0;
  const pitch = done ? orbit.pitch : autoPitch;

  const { ref, size, hover } = useCanvas(0.86, (ctx, w, H, hits) => {
    const v = makeView(h, r, yaw, pitch, { x: 0, y: 0, w, h: H });
    const A = v.P(apex(h));
    const O = v.P(origin);
    const B = v.P(rim(r, theta));
    const tri: Pt[] = [O, A, B];

    drawBaseSector(ctx, v, theta, c.rTint);
    drawLateral(ctx, v, theta, { back: c.gTintStrong, front: c.gTint }, () => {
      for (let t = 0; t <= theta + 1e-6; t += TRACE_EVERY) {
        if (!frontAt(v, t)) seg(ctx, A, v.P(rim(r, t)), c.gTint, 1.5);
      }
      // O interior do triângulo fica sob a superfície da frente (oclusão real);
      // as arestas são desenhadas por cima mais adiante.
      poly(ctx, tri, c.bg);
    });
    for (let t = 0; t <= theta + 1e-6; t += TRACE_EVERY) {
      if (frontAt(v, t)) seg(ctx, A, v.P(rim(r, t)), c.gTintStrong, 2);
    }
    drawRim(ctx, v, theta, c.r, 3);
    drawAxis(ctx, v);

    // Arestas do triângulo gerador na posição atual, sempre visíveis por cima.
    rightAngle(ctx, O, A, B, 11);
    seg(ctx, O, A, c.h, 5);
    seg(ctx, O, B, c.r, 5);
    seg(ctx, A, B, c.g, 5);
    dot(ctx, A, 4.5, c.ink);
    dot(ctx, O, 4.5, c.ink);
    dot(ctx, B, 7, c.rDark);
    dot(ctx, B, 4.5, c.r);

    const cen = { x: (O.x + A.x + B.x) / 3, y: (O.y + A.y + B.y) / 3 };
    hits.push({ key: "h", ...chip(ctx, labelPos(O, A, cen, 24), "h", c.h, c.hDark) });
    hits.push({ key: "r", ...chip(ctx, labelPos(O, B, cen, 22), "r", c.r, c.rDark) });
    hits.push({ key: "g", ...chip(ctx, labelPos(A, B, cen, 24), "g", c.g, c.gDark) });
  });

  // Depois da volta completa, arrastar a figura gira a câmera.
  return (
    <>
      <canvas
        ref={ref}
        aria-label="Triângulo retângulo girando em torno do eixo vertical"
        style={{ cursor: done ? "grab" : "default" }}
        onPointerDown={(e) => {
          if (!done) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          drag.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          const dx = e.clientX - drag.current.x;
          const dy = e.clientY - drag.current.y;
          drag.current = { x: e.clientX, y: e.clientY };
          setOrbit((o) => ({
            yaw: o.yaw - dx * 0.012,
            pitch: Math.max(6 * DEG, Math.min(60 * DEG, o.pitch + dy * 0.008)),
          }));
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
      />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    </>
  );
}

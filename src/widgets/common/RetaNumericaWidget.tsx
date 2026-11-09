// Reta numérica viva: o aluno arrasta um ponto e vê se ele está dentro dos trechos marcados.
// Métricas: ponto_x, dentro (1 se o ponto está em algum trecho), faixa_x (largura percorrida).
import { useEffect, useMemo, useRef, useState } from "react";
import { Dica } from "../../ui/Dica";
import { useCanvas } from "../canvas";
import type { WidgetProps } from "../types";
import { dentroDoTrecho, desenharReta, type VistaReta } from "./desenhoReta";
import { RetaNumerica } from "./params";
import { encaixar, resolver } from "./plot2d";

export function RetaNumericaWidget({ params, controls, onMetric, onInteract }: WidgetProps) {
  const p = useMemo(() => RetaNumerica.parse(params), [params]);
  const pm = p.ponto;
  const segueSlider = pm ? typeof pm.x === "string" : false;
  const xInicial = pm ? resolver(pm.x, controls) : 0;
  const [xArrastado, setXArrastado] = useState(xInicial);
  const pontoX = pm ? (segueSlider ? xInicial : xArrastado) : undefined;
  const [faixa, setFaixa] = useState<[number, number] | null>(null);
  const [tocou, setTocou] = useState(false);
  const vista = useRef<VistaReta | null>(null);
  const arrastando = useRef(false);

  useEffect(() => {
    if (pontoX === undefined) return;
    onMetric("ponto_x", pontoX);
    onMetric("dentro", p.trechos.some((t) => dentroDoTrecho(t, pontoX)) ? 1 : 0);
    setFaixa((f) => (f ? [Math.min(f[0], pontoX), Math.max(f[1], pontoX)] : [pontoX, pontoX]));
  }, [pontoX, p.trechos, onMetric]);
  useEffect(() => onMetric("faixa_x", faixa ? faixa[1] - faixa[0] : 0), [faixa, onMetric]);

  const { ref, size, hover } = useCanvas(0.42, (ctx, w, h, hits) => {
    vista.current = desenharReta(ctx, w, h, hits, p, pontoX);
  });

  const arrastavel = Boolean(pm && pm.arrastavel && !segueSlider);
  const mover = (clientX: number, el: HTMLCanvasElement) => {
    const v = vista.current;
    if (!v || !pm) return;
    const x = v.xDe(clientX - el.getBoundingClientRect().left);
    setXArrastado(encaixar(x, pm.passo, p.intervalo[0], p.intervalo[1]));
  };

  return (
    <>
      <canvas
        ref={ref}
        aria-label="Reta numérica"
        style={{ cursor: arrastavel ? "grab" : "default", touchAction: arrastavel ? "none" : undefined }}
        onPointerDown={(e) => {
          if (!arrastavel) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          arrastando.current = true;
          if (!tocou) {
            setTocou(true);
            onInteract();
          }
          mover(e.clientX, e.currentTarget);
        }}
        onPointerMove={(e) => arrastando.current && mover(e.clientX, e.currentTarget)}
        onPointerUp={() => (arrastando.current = false)}
        onPointerCancel={() => (arrastando.current = false)}
      />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    </>
  );
}

export function RetaFigura({ state }: { state: RetaNumerica }) {
  const pontoX = state.ponto ? resolver(state.ponto.x, {}) : undefined;
  const { ref, size, hover } = useCanvas(0.42, (ctx, w, h, hits) => {
    desenharReta(ctx, w, h, hits, state, pontoX);
  });
  return (
    <>
      <canvas ref={ref} aria-label="Reta numérica" />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    </>
  );
}

// Widget escala_decimal. Métricas emitidas: n, a, valor, normalizado, ordem_exp.
import { useEffect, useMemo } from "react";
import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import type { WidgetProps } from "../../types";
import { metricasEscala } from "./calc";
import { aspectoEscala, desenharEscala } from "./desenho";
import { EscalaDecimal } from "./params";

export function EscalaWidget({ params, controls, onMetric }: WidgetProps) {
  const p = useMemo(() => EscalaDecimal.parse(params), [params]);

  const { ref, hover, size } = useCanvas(aspectoEscala(p), (ctx, w, h, hits) => {
    desenharEscala(ctx, w, h, hits, p, controls);
  });

  useEffect(() => {
    const m = metricasEscala(p, controls);
    for (const [k, v] of Object.entries(m)) onMetric(k, Number.isFinite(v) ? v : 0);
  }, [p, controls, onMetric]);

  return (
    <>
      <canvas ref={ref} aria-label="Escala decimal e notação científica" />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    </>
  );
}

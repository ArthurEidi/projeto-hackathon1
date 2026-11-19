// Widget divisao_polinomial. Métricas por modo:
//   constante  d, resto
//   chave      etapa, resto
import { useEffect, useMemo } from "react";
import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import type { WidgetProps } from "../../types";
import { metricasDivisao } from "./calc";
import { aspectoDivisao, desenharDivisao } from "./desenho";
import { DivisaoPolinomial } from "./params";

export function DivisaoWidget({ params, controls, onMetric }: WidgetProps) {
  const p = useMemo(() => DivisaoPolinomial.parse(params), [params]);

  const { ref, hover, size } = useCanvas(aspectoDivisao(p), (ctx, w, h, hits) => {
    desenharDivisao(ctx, w, h, hits, p, controls);
  });

  useEffect(() => {
    const m = metricasDivisao(p, controls);
    for (const [k, v] of Object.entries(m)) onMetric(k, Number.isFinite(v) ? v : 0);
  }, [p, controls, onMetric]);

  return (
    <>
      <canvas ref={ref} aria-label="Divisão de polinômios" />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    </>
  );
}

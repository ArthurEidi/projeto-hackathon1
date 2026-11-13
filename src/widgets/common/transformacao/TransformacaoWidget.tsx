// Widget transformacao_plano. Métricas: det, area, orientacao, v_x, v_y (sliders entram pelo motor).
import { useEffect, useMemo } from "react";
import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import type { WidgetProps } from "../../types";
import { metricasTransformacao } from "./calc";
import { aspectoTransformacao, desenharTransformacao } from "./desenho";
import { Transformacao } from "./params";

export function TransformacaoWidget({ params, controls, onMetric }: WidgetProps) {
  const p = useMemo(() => Transformacao.parse(params), [params]);

  const { ref, size, hover } = useCanvas(aspectoTransformacao(p), (ctx, w, h, hits) => {
    desenharTransformacao(ctx, w, h, hits, p, controls);
  });

  useEffect(() => {
    const m = metricasTransformacao(p, controls);
    for (const [k, v] of Object.entries(m)) onMetric(k, Number.isFinite(v) ? v : 0);
  }, [p, controls, onMetric]);

  return (
    <>
      <canvas ref={ref} aria-label="Transformação linear no plano" />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    </>
  );
}

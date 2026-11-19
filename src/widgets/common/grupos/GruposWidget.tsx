// Widget grupos_inteiros. Métricas: n, d, q, resto, m (e resto_a, resto_b no modo mmc).
import { useEffect, useMemo } from "react";
import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import type { WidgetProps } from "../../types";
import { metricasGrupos } from "./calc";
import { aspectoGrupos, desenharGrupos } from "./desenho";
import { Grupos } from "./params";

export function GruposWidget({ params, controls, onMetric }: WidgetProps) {
  const p = useMemo(() => Grupos.parse(params), [params]);

  const { ref, hover, size } = useCanvas(aspectoGrupos(p), (ctx, w, h, hits) => {
    desenharGrupos(ctx, w, h, hits, p, controls);
  });

  useEffect(() => {
    const m = metricasGrupos(p, controls);
    for (const [k, v] of Object.entries(m)) onMetric(k, Number.isFinite(v) ? v : 0);
  }, [p, controls, onMetric]);

  return (
    <>
      <canvas ref={ref} aria-label="Agrupamento de inteiros e divisibilidade" />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    </>
  );
}

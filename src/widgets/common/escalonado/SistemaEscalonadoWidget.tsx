// Widget sistema_escalonado. Métricas: k, zerou, escalonada, unica, impossivel, livres
// (o valor de z, t etc. vem do próprio slider). Só sliders: não há toque no canvas além da dica.
import { useEffect, useMemo } from "react";
import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import type { WidgetProps } from "../../types";
import { metricasSistema } from "./calc";
import { aspectoSistema, desenharSistema } from "./desenho";
import { SistemaEscalonado } from "./params";

export function SistemaEscalonadoWidget({ params, controls, onMetric }: WidgetProps) {
  const p = useMemo(() => SistemaEscalonado.parse(params), [params]);

  const { ref, hover, size } = useCanvas(aspectoSistema(p), (ctx, w, h, hits) => {
    desenharSistema(ctx, w, h, hits, p, controls);
  });

  useEffect(() => {
    for (const [k, v] of Object.entries(metricasSistema(p, controls))) onMetric(k, Number.isFinite(v) ? v : 0);
  }, [p, controls, onMetric]);

  return (
    <>
      <canvas ref={ref} aria-label="Sistema linear em matriz aumentada" />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    </>
  );
}

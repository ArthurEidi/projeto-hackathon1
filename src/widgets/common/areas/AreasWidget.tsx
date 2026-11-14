import { useEffect, useMemo } from "react";
import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import type { WidgetProps } from "../../types";
import { calcular } from "./calc";
import { desenhar } from "./desenho";
import { Areas } from "./params";
export function AreasWidget({ params, controls, faixas, onMetric, onInteract }: WidgetProps) {
  const p = useMemo(() => Areas.parse(params), [params]);
  const { ref, hover, size } = useCanvas(1, (ctx, w, h, hits) => desenhar(ctx, w, h, hits, p, controls, faixas));
  useEffect(() => { const d = calcular(p, controls); for (const k of ["lado", "area", "pecas", "razao_area"] as const) onMetric(k, d.valido && Number.isFinite(d[k]) ? d[k] : 0); }, [p, controls, onMetric]);
  return <><canvas ref={ref} aria-label="Áreas, raízes e escala" onPointerDown={onInteract} />{hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}</>;
}

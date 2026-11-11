// Widget geometria_circulo. Métricas por modo (os sliders entram sozinhos, pelo id):
//   arcos    alfa, central, arco, inscrito, pos_v, razao_central_inscrito, reto (0/1), arco_visto
//   roda     giro, d, voltas, rastro (distância rolada), comprimento (C = πd), razao_c_d, arco (L), alfa, percurso (voltas · C)
//   fatias   n, area (πr²), razao_base (base / πr), area_setor, fracao, coef_setor (área em π), area_coroa, coef_coroa, furo
import { useEffect, useMemo, useRef, useState } from "react";
import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import type { WidgetProps } from "../../types";
import { arred, graus } from "../geo/base";
import { useArrasto } from "../geo/Controles";
import { estadoInicial, metricasCirculo, type EstadoCirc } from "./calc";
import { aspectoCirculo, desenharCirculo, type GeoCirc } from "./desenho";
import { GeometriaCirculo } from "./params";

export function GeometriaCirculoWidget({ params, controls, onMetric, onInteract }: WidgetProps) {
  const p = useMemo(() => GeometriaCirculo.parse(params), [params]);
  const [alfa, setAlfa] = useState<number | null>(null);
  const [posV, setPosV] = useState<number | null>(null);
  const geo = useRef<GeoCirc | null>(null);
  const base = estadoInicial();
  const estado: EstadoCirc = { ...base, alfa, posV };

  const { ref, size, hover } = useCanvas(aspectoCirculo(p), (ctx, w, h, hits) => {
    geo.current = desenharCirculo(ctx, w, h, hits, p, controls, estado);
  });

  useEffect(() => {
    const m = metricasCirculo(p, controls, { alfa, posV, vistos: base.vistos });
    for (const [k, v] of Object.entries(m)) onMetric(k, Number.isFinite(v) ? v : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p, controls, alfa, posV, onMetric]);

  const arrasto = useArrasto({
    alvos: () => geo.current?.alvos ?? [],
    onInteract,
    onMove: (id, q) => {
      const g = geo.current;
      if (!g || p.modo !== "arcos") return;
      const m = g.vista.inv(q);
      const ang = graus(Math.atan2(m.y, m.x));
      if (id === "B") {
        // B anda de 0 a 360° a partir de A; o ângulo encaixa em múltiplos de `passo`.
        const a = arred(((ang - p.inicio) % 360 + 360) % 360, p.passo);
        setAlfa(Math.min(360, a));
      } else if (id === "V") {
        setPosV((((arred(ang, p.passo) % 360) + 360) % 360));
      }
    },
  });

  const arrastavel = p.modo === "arcos" && p.arrastaveis.length > 0;
  return (
    <>
      <canvas ref={ref} aria-label="Circunferência" style={{ touchAction: arrastavel ? "none" : undefined, cursor: arrastavel ? "grab" : undefined }} {...arrasto} />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    </>
  );
}

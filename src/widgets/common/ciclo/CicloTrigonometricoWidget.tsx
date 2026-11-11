// Widget ciclo_trigonometrico. Métricas (os sliders entram sozinhos, pelo id):
//   angulo (graus), rad, x_rad (= rad), voltas, quadrantes (visitados, 0..4), quad (quadrante atual),
//   seno, cosseno, tangente, dentro (0/1: dentro do arco solução), no_alvo (0/1: P sobre um encontro da reta-alvo),
//   solucoes_marcadas (encontros tocados), sen_soma e soma_senos (com `soma`)
import { useEffect, useMemo, useRef, useState } from "react";
import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import type { WidgetProps } from "../../types";
import { arred, graus } from "../geo/base";
import { useArrasto } from "../geo/Controles";
import { estadoInicial, metricasCiclo, modeloCiclo, type EstadoCiclo } from "./calc";
import { aspectoCiclo, desenharCiclo, type GeoCiclo } from "./desenho";
import { CicloTrigonometrico } from "./params";

export function CicloTrigonometricoWidget({ params, controls, onMetric, onInteract }: WidgetProps) {
  const p = useMemo(() => CicloTrigonometrico.parse(params), [params]);
  const inicial = useMemo(() => estadoInicial(p), [p]);
  const [arrastado, setArrastado] = useState<number | null>(null);
  const [quadrantes, setQuadrantes] = useState<ReadonlySet<number>>(new Set());
  const [marcadas, setMarcadas] = useState<ReadonlySet<number>>(inicial.marcadas);
  const geo = useRef<GeoCiclo | null>(null);
  const estado: EstadoCiclo = { angulo: arrastado, quadrantes, marcadas };

  const { ref, size, hover } = useCanvas(aspectoCiclo(p), (ctx, w, h, hits) => {
    geo.current = desenharCiclo(ctx, w, h, hits, p, controls, estado);
  });

  // Quadrantes visitados: cada posição do ponto entra na conta.
  const quad = modeloCiclo(p, controls, { angulo: arrastado, quadrantes, marcadas }).quadrante;
  useEffect(() => {
    setQuadrantes((s) => (s.has(quad) ? s : new Set(s).add(quad)));
  }, [quad]);

  useEffect(() => {
    const m = metricasCiclo(p, controls, { angulo: arrastado, quadrantes, marcadas });
    for (const [k, v] of Object.entries(m)) onMetric(k, Number.isFinite(v) ? v : 0);
  }, [p, controls, arrastado, quadrantes, marcadas, onMetric]);

  const arrasto = useArrasto({
    alvos: () => geo.current?.alvos ?? [],
    onInteract,
    onMove: (id, q) => {
      const g = geo.current;
      if (!g) return;
      if (id === "P") {
        const m = g.vista.inv(q);
        const a = arred(graus(Math.atan2(m.y, m.x)), p.passo);
        setArrastado(((a % 360) + 360) % 360);
      } else if (id.startsWith("sol-")) {
        const i = Number(id.slice(4));
        setMarcadas((s) => (s.has(i) ? s : new Set(s).add(i)));
      }
    },
  });

  return (
    <>
      <canvas ref={ref} aria-label="Ciclo trigonométrico" style={{ touchAction: p.arrastavel ? "none" : undefined, cursor: p.arrastavel || p.alvo ? "pointer" : undefined }} {...arrasto} />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    </>
  );
}

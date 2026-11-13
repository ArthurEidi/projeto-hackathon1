import { useEffect, useMemo, useRef, useState } from "react";
import { Dica } from "../../../ui/Dica";
import { useCanvas, type Pt } from "../../canvas";
import type { WidgetProps } from "../../types";
import { avaliarExpr } from "../expr";
import { arred } from "../geo/base";
import { useArrasto } from "../geo/Controles";
import { resolver } from "../pontos/calc";
import { visitar, type Visitas } from "./calc";
import { desenhar } from "./desenho";
import { Circunferencia } from "./params";
export function CircunferenciaWidget({ params, controls, onMetric, onInteract }: WidgetProps) {
  const p = useMemo(() => Circunferencia.parse(params), [params]);
  const [s, setS] = useState<Visitas & { centro?: Pt; ponto?: Pt }>({ estados: [], pontos: [] });
  const c = s.centro ?? resolver(p.centro, controls), q = s.ponto ?? resolver(p.ponto, controls), r = avaliarExpr(p.raio, controls);
  const geo = useRef<ReturnType<typeof desenhar> | null>(null);
  const { ref, hover, size } = useCanvas(1.05, (ctx, w, h, hits) => { geo.current = desenhar(ctx, w, h, hits, p, controls, c, q, s.pontos); });
  useEffect(() => { onMetric("pontos_sobre", s.pontos.length); onMetric("estados_vistos", s.estados.length); onMetric("centro_x", c.x); if (p.reta_y !== undefined) onMetric("k", avaliarExpr(p.reta_y, controls)); }, [s, c.x, p.reta_y, controls, onMetric]);
  const mover = (id: string, pt: Pt) => { if (!geo.current) return; const raw = geo.current.vista.inv(pt), n = { x: arred(raw.x, p.passo), y: arred(raw.y, p.passo) }; setS(old => id === "centro" ? { ...old, centro: n, pontos: [], estados: [] } : { ...old, ...visitar(c, r, n, old), ponto: n }); };
  const arrasto = useArrasto({ alvos: () => geo.current?.alvos ?? [], onInteract, onMove: mover, onToque: pt => { if (p.ponto_arrastavel) mover("ponto", pt); } });
  return <><canvas ref={ref} aria-label="Circunferência no plano" style={{ touchAction: "none" }} {...arrasto} />{hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}</>;
}

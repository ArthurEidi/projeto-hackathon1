import { useEffect, useMemo, useRef, useState } from "react";
import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import type { WidgetProps } from "../../types";
import { Chave, linhaDeChaves, useArrasto } from "../geo/Controles";
import { dimensoes, inicial, metricas, visitar } from "./calc";
import { desenhar } from "./desenho";
import { Lugar } from "./params";

export function LugarWidget({ params, controls, onMetric, onInteract }: WidgetProps) {
  const p = useMemo(() => Lugar.parse(params), [params]);
  const [s, setS] = useState(inicial);
  const geo = useRef<ReturnType<typeof desenhar> | null>(null);
  const { ref, size, hover } = useCanvas(1.1, (ctx, w, h, hits) => { geo.current = desenhar(ctx, w, h, hits, p, controls, s); });
  useEffect(() => { for (const [k, v] of Object.entries(metricas(p, controls, s))) onMetric(k, v); }, [p, controls, s, onMetric]);
  const arrasto = useArrasto({ alvos: () => geo.current?.alvos ?? [], onInteract, onMove: (id, q) => {
    if (!geo.current) return;
    if (id === "topo") { setS(old => visitar(p, controls, old, { x: 0, y: dimensoes(p, controls).b })); return; }
    setS(old => visitar(p, controls, old, geo.current!.vista.inv(q)));
  }, onToque: q => { if (geo.current) setS(old => visitar(p, controls, old, geo.current!.vista.inv(q))); } });
  return <>
    <canvas ref={ref} aria-label={`Lugar geométrico: ${p.modo}`} style={{ touchAction: "none" }} {...arrasto} />
    {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    <div style={linhaDeChaves}>
      {p.modo === "parabola" ? <Chave ligada={s.igualou} onClick={() => { onInteract(); setS(old => ({ ...old, igualou: true })); }}>Igualar distâncias</Chave> : <Chave ligada={s.triangulo} onClick={() => { onInteract(); setS(old => ({ ...old, triangulo: !old.triangulo })); }}>{p.modo === "elipse" ? "Triângulo" : "Retângulo e triângulo"}</Chave>}
    </div>
    {s.igualou && p.modo === "parabola" && <p style={{ textAlign: "center" }}>PF = Pd<br />x² + (y − p)² = (y + p)²<br />x² = 4py</p>}
  </>;
}

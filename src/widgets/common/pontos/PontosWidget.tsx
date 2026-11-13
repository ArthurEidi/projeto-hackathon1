import { useEffect, useMemo, useRef, useState } from "react";
import { Dica } from "../../../ui/Dica";
import { useCanvas, type Pt } from "../../canvas";
import type { WidgetProps } from "../../types";
import { Chave, linhaDeChaves, useArrasto } from "../geo/Controles";
import { medidas, mover, resolver } from "./calc";
import { desenhar } from "./desenho";
import { PontosParams } from "./params";
export function PontosWidget({ params, controls, onMetric, onInteract }: WidgetProps) {
  const p = useMemo(() => PontosParams.parse(params), [params]);
  const [s, setS] = useState<{ a?: Pt; b?: Pt; vistos: string[]; quadrados: boolean; medio: boolean }>({ vistos: [], quadrados: p.mostrar.quadrados, medio: p.mostrar.medio });
  const a = s.a ?? resolver(p.a, controls), b = s.b ?? resolver(p.b, controls);
  const geo = useRef<ReturnType<typeof desenhar> | null>(null);
  const { ref, hover, size } = useCanvas(1.15, (ctx, w, h, hits) => { geo.current = desenhar(ctx, w, h, hits, p, controls, a, b, s.quadrados, s.medio); });
  const m = medidas(a, b);
  useEffect(() => { const metricas = { dx: m.dx, dy: m.dy, distancia: m.distancia, dx_zero: Number(m.dx === 0 && m.dy !== 0), quadrados_ligados: Number(s.quadrados), medio_ligado: Number(s.medio), pontos_vistos: s.vistos.length }; for (const [k, v] of Object.entries(metricas)) onMetric(k, v); }, [m.dx, m.dy, m.distancia, s, onMetric]);
  const arrasto = useArrasto({ alvos: () => geo.current?.alvos ?? [], onInteract, onMove: (id, q) => { if (!geo.current) return; const pt = mover(p, controls, geo.current.vista.inv(q)); const key = `${id}:${pt.x}:${pt.y}`; setS(old => ({ ...old, [id]: pt, vistos: old.vistos.includes(key) ? old.vistos : [...old.vistos, key] })); } });
  return <><canvas ref={ref} aria-label="Pontos no plano" style={{ touchAction: "none" }} {...arrasto} />{hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}<div style={linhaDeChaves}>{(["quadrados", "medio"] as const).map(key => <Chave key={key} ligada={s[key]} onClick={() => { onInteract(); setS(old => ({ ...old, [key]: !old[key] })); }}>{key === "medio" ? "Ponto médio" : "Quadrados"}</Chave>)}</div></>;
}

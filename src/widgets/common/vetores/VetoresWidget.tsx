import { useEffect, useMemo, useRef, useState } from "react";
import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import type { WidgetProps } from "../../types";
import { avaliarExpr } from "../expr";
import { arred } from "../geo/base";
import { Chave, linhaDeChaves, useArrasto } from "../geo/Controles";
import { metricas, resolverVetores, type Mudancas } from "./calc";
import { desenhar } from "./desenho";
import { VetoresParams } from "./params";
export function VetoresWidget({ params, controls, faixas, onMetric, onInteract }: WidgetProps) {
  const p = useMemo(() => VetoresParams.parse(params), [params]);
  const [s, setS] = useState<{ mud: Mudancas; origens: string[]; modulo: boolean }>({ mud: {}, origens: [], modulo: p.mostrar.modulo });
  const vs = useMemo(() => resolverVetores(p, controls, s.mud), [p, controls, s.mud]);
  const geo = useRef<ReturnType<typeof desenhar> | null>(null);
  const { ref, hover, size } = useCanvas(1.05, (ctx, w, h, hits) => { geo.current = desenhar(ctx, w, h, hits, p, controls, vs, s.modulo, faixas); });
  useEffect(() => { for (const [k, v] of Object.entries(metricas(p, controls, vs, s.origens.length, s.modulo))) onMetric(k, v); }, [p, controls, vs, s.origens.length, s.modulo, onMetric]);
  const arrasto = useArrasto({ alvos: () => geo.current?.alvos ?? [], onInteract, onMove: (id, point) => {
    if (!geo.current || p.modo !== "vetores") return;
    const vetor = vs.find(v => v.id === id)!; const raw = geo.current.vista.inv(point), q = { x: arred(raw.x, p.passo), y: arred(raw.y, p.passo) };
    const k = p.escalar === undefined ? 1 : avaliarExpr(p.escalar, controls); if (k === 0 && vetor.arrastavel === "ponta") return;
    const key = `${id}:${q.x}:${q.y}`;
    setS(old => ({ ...old, mud: { ...old.mud, [id]: { ...old.mud[id], ...(vetor.arrastavel === "cauda" ? { cauda: q } : { comp: { x: (q.x - vetor.cauda.x) / k, y: (q.y - vetor.cauda.y) / k } }) } }, origens: vetor.arrastavel === "cauda" && !old.origens.includes(key) ? [...old.origens, key] : old.origens }));
  } });
  return <><canvas ref={ref} aria-label="Vetores e complexos no plano" style={{ touchAction: "none" }} {...arrasto} />{hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}<div style={linhaDeChaves}><Chave ligada={s.modulo} onClick={() => { onInteract(); setS(old => ({ ...old, modulo: !old.modulo })); }}>Módulo</Chave></div></>;
}

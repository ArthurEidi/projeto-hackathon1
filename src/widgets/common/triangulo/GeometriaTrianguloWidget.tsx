// Widget geometria_triangulo. Métricas por modo (os sliders entram sozinhos, pelo id):
//   pitagoras    a, area_b2, area_c2, area_a2, deslizou_pecas (0/1), testou_diagonal (0/1)
//   razoes       razao_sen, razao_cos, razao_tg, k, angulo, co, ca, hip
//   metricas     a, m, n, h, b, area_b2, area_am, apoio
//   cossenos     a, a2, termo_cos, ang_a         senos  a, razao_a_sen, dois_R, ang_a
//   angulos      soma_angulos, vertices_movidos, fecha (0/1), alfa, beta, gama, externo
//   desigualdade se_cruzam (0/1), a, b, c        congruencia  testou_congruencia, congruentes_vistas
//   notaveis     l, d, h, cortou (0/1), raio, se_cruzam (0/1)
//   semelhanca   k, razao, giro, entortou_corte (0/1), sobrepos_triangulos (0/1), x, h_poste
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Dica } from "../../../ui/Dica";
import { useCanvas, type Pt } from "../../canvas";
import type { WidgetProps } from "../../types";
import { arred } from "../geo/base";
import { Chave, linhaDeChaves, useArrasto } from "../geo/Controles";
import { estadoInicial, metricasTriangulo, type EstadoTri } from "./calc";
import { aspectoTriangulo, desenharTriangulo, type GeoTri } from "./desenho";
import { GeometriaTriangulo } from "./params";

export function GeometriaTrianguloWidget({ params, controls, onMetric, onInteract }: WidgetProps) {
  const p = useMemo(() => GeometriaTriangulo.parse(params), [params]);
  const inicial = useMemo(() => estadoInicial(p), [p]);
  const [vertice, setVertice] = useState<Pt>(inicial.vertice);
  const [visitados, setVisitados] = useState<ReadonlySet<string>>(new Set());
  const [chaves, setChaves] = useState<ReadonlySet<string>>(inicial.chaves);
  const [vistos, setVistos] = useState<ReadonlySet<string>>(inicial.vistos);
  const geo = useRef<GeoTri | null>(null);
  const estado: EstadoTri = { vertice, movidos: visitados.size, chaves, vistos };

  const { ref, size, hover } = useCanvas(aspectoTriangulo(p), (ctx, w, h, hits) => {
    geo.current = desenharTriangulo(ctx, w, h, hits, p, controls, estado);
  });

  useEffect(() => {
    const m = metricasTriangulo(p, controls, { vertice, movidos: visitados.size, chaves, vistos });
    for (const [k, v] of Object.entries(m)) onMetric(k, Number.isFinite(v) ? v : 0);
  }, [p, controls, vertice, visitados, chaves, vistos, onMetric]);

  const arrasto = useArrasto({
    alvos: () => geo.current?.alvos ?? [],
    onInteract,
    onMove: (_id, q) => {
      const g = geo.current;
      if (!g || p.modo !== "angulos") return;
      const m = g.vista.inv(q);
      const x = Math.max(-4, Math.min(4, arred(m.x, p.passo)));
      const y = Math.max(0.5, Math.min(6.5, arred(m.y, p.passo)));
      setVertice((cur) => (cur.x === x && cur.y === y ? cur : { x, y }));
      setVisitados((s) => (s.has(`${x},${y}`) ? s : new Set(s).add(`${x},${y}`)));
    },
  });

  const alternar = (k: string, exclusiva = false) => {
    onInteract();
    setChaves((s) => {
      if (exclusiva) return s.has(k) ? new Set() : new Set([k]);
      const n = new Set(s);
      if (n.has(k)) n.delete(k);
      else n.add(k);
      return n;
    });
    setVistos((s) => (s.has(k) ? s : new Set(s).add(k)));
  };

  const botoes: ReactNode[] = [];
  if (p.modo === "pitagoras") {
    if (p.chaves.includes("deslizar"))
      botoes.push(<Chave key="d" ligada={chaves.has("deslizar")} cor="c3" onClick={() => alternar("deslizar")}>deslizar peças</Chave>);
    if (p.chaves.includes("diagonal"))
      botoes.push(<Chave key="g" ligada={chaves.has("diagonal")} cor="c4" onClick={() => alternar("diagonal")}>quadrado e diagonal</Chave>);
  }
  if (p.modo === "angulos" && p.chaves.includes("fechar"))
    botoes.push(<Chave key="f" ligada={chaves.has("fechar")} cor="c3" onClick={() => alternar("fechar")}>fechar 3 barras</Chave>);
  if (p.modo === "congruencia")
    for (const k of p.chaves)
      botoes.push(<Chave key={k} ligada={chaves.has(k)} cor={k === "AAA" ? "c4" : "c1"} onClick={() => alternar(k, true)}>{k}</Chave>);
  if (p.modo === "semelhanca" && p.chaves.includes("sobrepor"))
    botoes.push(<Chave key="s" ligada={chaves.has("sobrepor")} cor="c3" onClick={() => alternar("sobrepor")}>sobrepor</Chave>);

  return (
    <>
      <canvas ref={ref} aria-label="Triângulo" style={{ touchAction: p.modo === "angulos" ? "none" : undefined, cursor: p.modo === "angulos" ? "grab" : undefined }} {...arrasto} />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
      {botoes.length > 0 && <div style={linhaDeChaves}>{botoes}</div>}
    </>
  );
}

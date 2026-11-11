// Widget geometria_poligono. Métricas por modo (os sliders entram sozinhos, pelo id):
//   malha      area, perimetro, b, h, k, razao_area (k²), encaixado (0/1), duplicado (0/1)
//   poligono   n, triangulos, soma_internos, soma_externos, encolher, diagonais_iguais, diagonais_perpendiculares, lados_iguais
//   regular    n, angulo_central, angulo_externo, angulo_interno, soma_internos, lado, ladrilho_fechado (0/1), fresta, dividido (0/1)
//   isometria  angulo, dx, dy, k, area, area_imagem, perimetro, perimetro_imagem, razao_area, razao_lados, orientacao_trocada, invertido
//   paralelas  alfa, suplementar, inclinou (0/1: α ≠ 90°), desvio_paralela (|Δ|), paralelas (0/1), deslizou_paralela (0/1)
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import type { WidgetProps } from "../../types";
import { Chave, linhaDeChaves } from "../geo/Controles";
import { estadoInicial, metricasPoligono, type EstadoPol } from "./calc";
import { aspectoPoligono, desenharPoligono } from "./desenho";
import { GeometriaPoligono } from "./params";

export function GeometriaPoligonoWidget({ params, controls, onMetric, onInteract }: WidgetProps) {
  const p = useMemo(() => GeometriaPoligono.parse(params), [params]);
  const inicial = useMemo(() => estadoInicial(p), [p]);
  const [chaves, setChaves] = useState<ReadonlySet<string>>(inicial.chaves);
  const [vistos, setVistos] = useState<ReadonlySet<string>>(inicial.vistos);
  const estado: EstadoPol = { chaves, vistos };

  const { ref, size, hover } = useCanvas(aspectoPoligono(p), (ctx, w, h, hits) => {
    desenharPoligono(ctx, w, h, hits, p, controls, estado);
  });

  useEffect(() => {
    const m = metricasPoligono(p, controls, { chaves, vistos });
    for (const [k, v] of Object.entries(m)) onMetric(k, Number.isFinite(v) ? v : 0);
  }, [p, controls, chaves, vistos, onMetric]);

  const alternar = (k: string) => {
    onInteract();
    setChaves((s) => {
      const n = new Set(s);
      if (n.has(k)) n.delete(k);
      else n.add(k);
      return n;
    });
    setVistos((s) => (s.has(k) ? s : new Set(s).add(k)));
  };

  const botoes: ReactNode[] = [];
  if (p.modo === "paralelas" && p.chaves.includes("deslizar"))
    botoes.push(
      <Chave key="d" ligada={chaves.has("deslizar")} cor="c3" onClick={() => alternar("deslizar")}>
        deslizar o cruzamento
      </Chave>,
    );

  return (
    <>
      <canvas ref={ref} aria-label="Figura plana" />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
      {botoes.length > 0 && <div style={linhaDeChaves}>{botoes}</div>}
    </>
  );
}

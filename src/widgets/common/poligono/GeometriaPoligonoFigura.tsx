// Figura estática do geometria_poligono: desafio, fechamento e treino.
import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import { estadoInicial } from "./calc";
import { aspectoPoligono, desenharPoligono } from "./desenho";
import type { Poligonos } from "./params";

export function GeometriaPoligonoFigura({ state }: { state: Poligonos }) {
  const { ref, size, hover } = useCanvas(aspectoPoligono(state), (ctx, w, h, hits) => {
    desenharPoligono(ctx, w, h, hits, state, {}, estadoInicial(state));
  });
  return (
    <>
      <canvas ref={ref} aria-label="Figura plana" />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    </>
  );
}

// Figura estática do geometria_circulo: desafio, fechamento e treino.
import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import { estadoInicial } from "./calc";
import { aspectoCirculo, desenharCirculo } from "./desenho";
import type { Circulos } from "./params";

export function GeometriaCirculoFigura({ state }: { state: Circulos }) {
  const { ref, size, hover } = useCanvas(aspectoCirculo(state), (ctx, w, h, hits) => {
    desenharCirculo(ctx, w, h, hits, state, {}, estadoInicial());
  });
  return (
    <>
      <canvas ref={ref} aria-label="Circunferência" />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    </>
  );
}

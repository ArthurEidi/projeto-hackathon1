// Figura estática do escala_decimal: desafio, fechamento e treino.
import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import { aspectoEscala, desenharEscala } from "./desenho";
import type { EscalaDecimal } from "./params";

export function EscalaFigura({ state }: { state: EscalaDecimal }) {
  const { ref, hover, size } = useCanvas(aspectoEscala(state), (ctx, w, h, hits) => {
    desenharEscala(ctx, w, h, hits, state, {});
  });

  return (
    <>
      <canvas ref={ref} aria-label="Figura de escala decimal e notação científica" />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    </>
  );
}

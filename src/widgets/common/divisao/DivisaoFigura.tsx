// Figura estática do divisao_polinomial: desafio, fechamento e treino.
import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import { aspectoDivisao, desenharDivisao } from "./desenho";
import type { DivisaoPolinomial } from "./params";

export function DivisaoFigura({ state }: { state: DivisaoPolinomial }) {
  const { ref, hover, size } = useCanvas(aspectoDivisao(state), (ctx, w, h, hits) => {
    desenharDivisao(ctx, w, h, hits, state, {});
  });

  return (
    <>
      <canvas ref={ref} aria-label="Figura de divisão de polinômios" />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    </>
  );
}

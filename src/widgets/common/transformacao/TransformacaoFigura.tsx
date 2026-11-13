// Figura estática do transformacao_plano: desafio, fechamento e treino.
import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import { aspectoTransformacao, desenharTransformacao } from "./desenho";
import type { Transformacao } from "./params";

export function TransformacaoFigura({ state }: { state: Transformacao }) {
  const { ref, size, hover } = useCanvas(aspectoTransformacao(state), (ctx, w, h, hits) => {
    desenharTransformacao(ctx, w, h, hits, state, {});
  });

  return (
    <>
      <canvas ref={ref} aria-label="Figura de transformação no plano" />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    </>
  );
}

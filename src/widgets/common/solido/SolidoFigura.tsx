// Figura estática do solido_3d: desafio, fechamento e treino (mesmos campos, só números, e highlight).
import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import { aspectoSolido, desenharSolido } from "./desenho";
import type { Solido } from "./params";

export function SolidoFigura({ state }: { state: Solido }) {
  const { ref, size, hover } = useCanvas(aspectoSolido(state), (ctx, w, h, hits) => {
    desenharSolido(ctx, w, h, hits, state, {});
  });
  return (
    <>
      <canvas ref={ref} aria-label="Sólido geométrico" />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    </>
  );
}

// Figura estática do grupos_inteiros: desafio, fechamento e treino.
import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import { aspectoGrupos, desenharGrupos } from "./desenho";
import type { Grupos } from "./params";

export function GruposFigura({ state }: { state: Grupos }) {
  const { ref, hover, size } = useCanvas(aspectoGrupos(state), (ctx, w, h, hits) => {
    desenharGrupos(ctx, w, h, hits, state, {});
  });

  return (
    <>
      <canvas ref={ref} aria-label="Figura de agrupamento de inteiros" />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    </>
  );
}

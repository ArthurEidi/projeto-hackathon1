// Figura estática do maquinas_funcao: desafio, fechamento e treino.
import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import { avaliarExpr } from "../expr";
import { aspectoMaquinas, desenharMaquinas } from "./desenho";
import type { Maquinas } from "./params";

export function MaquinasFigura({ state }: { state: Maquinas }) {
  const { ref, hover, size } = useCanvas(aspectoMaquinas(state), (ctx, w, h, hits) => {
    desenharMaquinas(
      ctx,
      w,
      h,
      hits,
      state,
      {},
      state.modo === "flechas" ? state.ligacoes : [],
      state.modo === "maquinas" ? avaliarExpr(state.x, {}) : 0,
      state.modo === "maquinas" && state.ordem_invertida,
      state.modo === "maquinas" && state.inversa,
      null,
    );
  });

  return (
    <>
      <canvas ref={ref} aria-label="Figura de função" />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    </>
  );
}

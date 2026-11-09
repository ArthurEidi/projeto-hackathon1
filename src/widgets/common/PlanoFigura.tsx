// Figura estática do plano: desafio, fechamento e treino. Cada opção do desafio pode trocar o estado
// (ligar raiz, triângulo, ponto, destaque) para mostrar onde está o erro.
import { Dica } from "../../ui/Dica";
import { useCanvas } from "../canvas";
import { desenharPlano } from "./desenhoPlano";
import type { PlanoCartesiano } from "./params";
import { resolver } from "./plot2d";

export function PlanoFigura({ state }: { state: PlanoCartesiano }) {
  const pontoX = state.ponto ? resolver(state.ponto.x, {}) : undefined;
  const { ref, size, hover } = useCanvas(0.8, (ctx, w, h, hits) => {
    desenharPlano(ctx, w, h, hits, state, {}, { pontoX });
  });
  return (
    <>
      <canvas ref={ref} aria-label="Gráfico da função no plano cartesiano" />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    </>
  );
}

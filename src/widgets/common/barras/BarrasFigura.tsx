// Figura estática do widget barras: desafio, fechamento e treino. Cada opção do desafio pode trocar
// campos inteiros (acender barras, ligar desvios, desenhar a caixa, trocar n) para mostrar o erro.
import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import { aspectoBarras, desenharBarras } from "./desenho";
import type { Barras } from "./params";

export function BarrasFigura({ state }: { state: Barras }) {
  const { ref, size, hover } = useCanvas(aspectoBarras(state), (ctx, w, h, hits) => {
    desenharBarras(ctx, w, h, hits, state, {}, {
      // Na figura, a fila mostra a caixa e os marcadores fixos já no lugar; o maior valor fica como está.
      ordenada: state.modo === "fila" ? state.ordenada : undefined,
    });
  });
  return (
    <>
      <canvas ref={ref} aria-label="Gráfico" />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    </>
  );
}

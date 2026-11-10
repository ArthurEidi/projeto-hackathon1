// Figura estática do grade_resultados: desafio, fechamento e treino. Cada opção do desafio troca campos
// inteiros (acender casas, ligar a união, mostrar outra árvore) para mostrar o erro.
import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import { aspectoGrade, desenharGrade } from "./desenho";
import type { Grade } from "./params";

export function GradeFigura({ state }: { state: Grade }) {
  const { ref, size, hover } = useCanvas(aspectoGrade(state), (ctx, w, h, hits) => {
    desenharGrade(ctx, w, h, hits, state, {});
  });
  return (
    <>
      <canvas ref={ref} aria-label="Casos possíveis" />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    </>
  );
}

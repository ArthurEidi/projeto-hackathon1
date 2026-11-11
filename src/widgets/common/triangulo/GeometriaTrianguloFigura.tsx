// Figura estática do geometria_triangulo: desafio, fechamento e treino. Cada opção do desafio troca campos inteiros.
import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import { estadoInicial } from "./calc";
import { aspectoTriangulo, desenharTriangulo } from "./desenho";
import type { Triangulo } from "./params";

export function GeometriaTrianguloFigura({ state }: { state: Triangulo }) {
  const { ref, size, hover } = useCanvas(aspectoTriangulo(state), (ctx, w, h, hits) => {
    desenharTriangulo(ctx, w, h, hits, state, {}, estadoInicial(state));
  });
  return (
    <>
      <canvas ref={ref} aria-label="Triângulo" />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    </>
  );
}

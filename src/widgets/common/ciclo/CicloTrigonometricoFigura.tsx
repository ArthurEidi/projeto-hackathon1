// Figura estática do ciclo_trigonometrico: desafio, fechamento e treino.
import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import { estadoInicial } from "./calc";
import { aspectoCiclo, desenharCiclo } from "./desenho";
import type { Ciclo } from "./params";

export function CicloTrigonometricoFigura({ state }: { state: Ciclo }) {
  const { ref, size, hover } = useCanvas(aspectoCiclo(state), (ctx, w, h, hits) => {
    desenharCiclo(ctx, w, h, hits, state, {}, estadoInicial(state));
  });
  return (
    <>
      <canvas ref={ref} aria-label="Ciclo trigonométrico" />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    </>
  );
}

// Figura estática do sistema_escalonado: desafio, fechamento e treino.
import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import { aspectoSistema, desenharSistema } from "./desenho";
import type { SistemaEscalonado } from "./params";

export function SistemaEscalonadoFigura({ state }: { state: SistemaEscalonado }) {
  const { ref, hover, size } = useCanvas(aspectoSistema(state), (ctx, w, h, hits) => {
    desenharSistema(ctx, w, h, hits, state, {});
  });

  return (
    <>
      <canvas ref={ref} aria-label="Figura de sistema linear" />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    </>
  );
}

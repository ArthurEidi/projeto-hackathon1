import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import { resolver } from "./calc";
import { desenhar } from "./desenho";
import type { Pontos } from "./params";
export function PontosFigura({ state }: { state: Pontos }) {
  const { ref, hover, size } = useCanvas(1.15, (ctx, w, h, hits) => { desenhar(ctx, w, h, hits, state, {}, resolver(state.a, {}), resolver(state.b, {}), state.mostrar.quadrados, state.mostrar.medio); });
  return <><canvas ref={ref} aria-label="Distância e ponto médio" />{hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}</>;
}

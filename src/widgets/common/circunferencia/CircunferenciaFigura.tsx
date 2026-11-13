import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import { resolver } from "../pontos/calc";
import { desenhar } from "./desenho";
import type { Circunferencia } from "./params";
export function CircunferenciaFigura({ state }: { state: Circunferencia }) {
  const { ref, hover, size } = useCanvas(1.05, (ctx, w, h, hits) => { desenhar(ctx, w, h, hits, state, {}, resolver(state.centro, {}), resolver(state.ponto, {}), []); });
  return <><canvas ref={ref} aria-label="Equação da circunferência" />{hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}</>;
}

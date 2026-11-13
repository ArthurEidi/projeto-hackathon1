import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import { resolverVetores } from "./calc";
import { desenhar } from "./desenho";
import type { Vetores } from "./params";
export function VetoresFigura({ state }: { state: Vetores }) {
  const { ref, hover, size } = useCanvas(1.05, (ctx, w, h, hits) => { desenhar(ctx, w, h, hits, state, {}, resolverVetores(state, {}), state.mostrar.modulo); });
  return <><canvas ref={ref} aria-label="Figura de vetores" />{hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}</>;
}

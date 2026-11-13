import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import { inicial } from "./calc";
import { desenhar } from "./desenho";
import type { Lugar } from "./params";
export function LugarFigura({ state }: { state: Lugar }) {
  const { ref, size, hover } = useCanvas(1.1, (ctx, w, h, hits) => { desenhar(ctx, w, h, hits, state, {}, inicial()); });
  return <><canvas ref={ref} aria-label={`Figura: ${state.modo}`} />{hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}</>;
}

import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import { desenhar } from "./desenho";
import type { Areas } from "./params";
export function AreasFigura({ state }: { state: Areas }) {
  const { ref, hover, size } = useCanvas(1, (ctx, w, h, hits) => desenhar(ctx, w, h, hits, state, {}));
  return <><canvas ref={ref} aria-label="Figura de áreas" />{hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}</>;
}

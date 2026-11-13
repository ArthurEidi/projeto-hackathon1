import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import { avaliarExpr } from "../expr";
import { desenhar } from "./desenho";
import type { Maquinas } from "./params";
export function MaquinasFigura({ state }: { state: Maquinas }) {
  const { ref, hover, size } = useCanvas(1.05, (ctx, w, h, hits) => desenhar(ctx, w, h, hits, state, {}, state.modo === "flechas" ? state.ligacoes : [], state.modo === "maquinas" ? avaliarExpr(state.x, {}) : 0, state.modo === "maquinas" && state.ordem_invertida, state.modo === "maquinas" && state.inversa));
  return <><canvas ref={ref} aria-label="Figura de função" />{hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}</>;
}

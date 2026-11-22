import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import { resolverLancamento } from "./calc";
import { desenharLancamento } from "./desenho";
import type { LancamentoFigura as Estado } from "./params";

/** Figura estática: as trajetórias pedidas na mesma escala; a primeira recebe as marcas de θ, v0, H e A. */
export function LancamentoFigura({ state }: { state: Estado }) {
  const ls = state.trajetorias.map((t) => ({ angulo: t.angulo, v0: t.v0, g: state.g, h0: state.altura }));
  const rs = ls.map(resolverLancamento);
  const janela = {
    alcance: Math.max(...rs.map((r) => r.alcance), state.alvo ? state.alvo.x + state.alvo.tolerancia * 4 : 0) * 1.1 + 1,
    altura: Math.max(...rs.map((r) => r.alturaMax)) * 1.3 + 1,
  };
  const { ref, hover, size } = useCanvas(0.62, (ctx, w, h, hits) => {
    desenharLancamento(ctx, w, h, hits, {
      tracos: state.trajetorias.map((t, i) => ({ l: ls[i], cor: t.cor, referencia: t.tracejada, rotulo: t.rotulo })),
      principal: ls[0],
      mostrar: state.mostrar,
      alvo: state.alvo,
      janela,
      highlight: state.highlight,
      bola: { t: rs[0].tempo },
      revelar: true,
    });
  });
  return (
    <>
      <canvas ref={ref} role="img" aria-label="Trajetórias de lançamento oblíquo" />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    </>
  );
}

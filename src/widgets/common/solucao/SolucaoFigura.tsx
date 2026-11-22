import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import { desenharBequer } from "./desenho";
import type { SolucaoFigura as Estado } from "./params";

/** Figura estática: béqueres lado a lado, cada um com V e C, para comparar soluções. */
export function SolucaoFigura({ state }: { state: Estado }) {
  const n = state.bequeres.length;
  const { ref, hover, size } = useCanvas(n === 1 ? 0.72 : 0.62, (ctx, w, h, hits) => {
    const bw = w / n;
    state.bequeres.forEach((b, i) =>
      desenharBequer(ctx, { x: i * bw, y: 0, w: bw, h }, {
        massa: b.massa,
        volume: b.volume,
        capacidade: state.capacidade,
        porParticula: state.por_particula,
        solubilidade: state.soluto.solubilidade,
        mostrarParticulas: state.mostrar.particulas,
        rotulo: b.rotulo,
        etiquetas: { volume: true, concentracao: state.mostrar.concentracao },
        highlight: state.highlight,
      }, hits),
    );
  });
  return (
    <>
      <canvas ref={ref} role="img" aria-label={`${n === 1 ? "Béquer" : `${n} béqueres`} com solução`} />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    </>
  );
}

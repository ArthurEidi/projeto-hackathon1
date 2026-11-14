// Fila de chips para widgets em canvas: cada chip lista posições candidatas e é colocado no fim,
// por prioridade, na primeira posição que não cobre outro chip nem uma área reservada
// (pontos, marcos, colunas de barras). Usa a escolha de posição do plano cartesiano (rotulosPlano).
import type { Hit, Pt } from "../../canvas";
import { caixaDoCentro, candidatosAoRedor, escolherPosicao, type Caixa, type Obstaculo } from "../rotulosPlano";
import { etiqueta } from "./base";

type Cor = Parameters<typeof etiqueta>[4];
const FONTE = "900 16px Nunito, system-ui, sans-serif";
const ALT = 29;

export function filaDeRotulos(ctx: CanvasRenderingContext2D, hits: Hit[], limites: Caixa) {
  const ocupados: Obstaculo[] = [];
  const pend: { cand: Pt[]; txt: string; cor: Cor; prio: number }[] = [];
  return {
    /** Área que nenhum chip pode cobrir (centro, largura, altura). */
    reservar: (c: Pt, lw: number, lh: number) => ocupados.push({ caixa: caixaDoCentro(c, lw, lh), folgaX: 1, folgaY: 1 }),
    /** Chip a colocar: a primeira candidata é a preferida; prioridade menor sai antes. */
    agendar: (cand: Pt[], txt: string, cor: Cor, prio = 1) => pend.push({ cand, txt, cor, prio }),
    /** Coloca e desenha os chips agendados; devolve onde cada um ficou (na ordem de colocação). */
    colocar: () => {
      const feitos: { txt: string; caixa: Caixa }[] = [];
      for (const r of [...pend].sort((a, b) => a.prio - b.prio)) {
        ctx.font = FONTE;
        const lw = Math.max(28, ctx.measureText(r.txt).width + 16);
        // Depois das posições pedidas, um anel em volta da primeira, como reserva.
        const cand = [...r.cand, ...candidatosAoRedor(r.cand[0], r.cand[0], lw, ALT).slice(1)];
        const res = escolherPosicao(cand, lw, ALT, ocupados, limites);
        ocupados.push({ caixa: res.caixa, folgaX: 4, folgaY: 2 });
        etiqueta(ctx, hits, res.pos, r.txt, r.cor);
        feitos.push({ txt: r.txt, caixa: res.caixa });
      }
      pend.length = 0;
      return feitos;
    },
  };
}
export type FilaRotulos = ReturnType<typeof filaDeRotulos>;

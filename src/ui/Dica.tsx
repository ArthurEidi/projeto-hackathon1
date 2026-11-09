// Dica discreta com setinha: nome da grandeza e um resumo de uma frase.
// Posicionada em coordenadas do contêiner (que precisa ser position: relative).
import type { Rect } from "../widgets/canvas";
import type { Magnitude } from "../widgets/params";
import { GLOSSARIO } from "./glossario";

const LARGURA = 200;
const MARGEM = 6;
/** Espaço mínimo acima do alvo para a dica caber em cima; senão ela vai para baixo. */
const ESPACO_ACIMA = 74;

interface DicaProps {
  termo: Magnitude;
  alvo: Rect;
  largura: number;
  /** Força o lado; sem isso, fica acima quando há espaço. */
  lado?: "acima" | "abaixo";
}

export function Dica({ termo, alvo, largura, lado }: DicaProps) {
  const { nome, resumo } = GLOSSARIO[termo];
  const w = Math.min(LARGURA, largura - 2 * MARGEM);
  const cx = alvo.x + alvo.w / 2;
  const left = Math.max(MARGEM, Math.min(cx - w / 2, largura - w - MARGEM));
  const acima = lado ? lado === "acima" : alvo.y >= ESPACO_ACIMA;
  const top = acima ? alvo.y - 8 : alvo.y + alvo.h + 8;
  const seta = Math.max(14, Math.min(cx - left, w - 14));

  return (
    <div
      role="tooltip"
      className={`dica dica--${termo} dica--${acima ? "acima" : "abaixo"}`}
      style={{ left, top, width: w, ["--seta" as string]: `${seta}px` }}
    >
      <b className="dica__nome">{nome}</b>
      <span className="dica__resumo">{resumo}</span>
    </div>
  );
}

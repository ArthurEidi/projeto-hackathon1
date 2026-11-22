import { createContext, useContext, type ReactNode } from "react";
import { Conversa, type Fala } from "../characters/Conversa";
import type { PacoHumor } from "../characters/sprites";
import type { Duvida } from "../engine/schema";

interface StepLayoutProps {
  /** Humor do Paco na fala principal do passo. */
  paco: PacoHumor;
  line: string;
  /** Dúvida da Tati já liberada para aparecer (o passo decide quando, conforme `duvida.quando`). */
  duvida?: Duvida | null;
  /**
   * Área visual do passo (widget, figura, vídeo). No celular fica logo abaixo da conversa; em telas largas
   * vira a coluna da direita, com destaque, e o texto e os controles ficam na coluna da esquerda.
   */
  figura?: ReactNode;
  /** Controles, enunciado da pergunta, alternativas, fórmula. */
  children: ReactNode;
  footer: ReactNode;
  footerTone?: "neutral" | "correct" | "wrong";
  /**
   * Outras falas que o Paco pode dizer neste passo (ex.: a de conclusão). O balão já nasce com a
   * altura da mais longa, para o palco não pular quando a fala troca.
   */
  reservar?: readonly string[];
}

/** Conteúdo que acompanha todos os passos da aula (ex.: o enunciado de uma questão real). */
export const TopoDoPasso = createContext<ReactNode>(null);

/** Moldura comum dos tipos de passo: conversa do Paco (de jaleco) e da Tati, área visual e rodapé de ação. */
export function StepLayout({ paco, line, duvida, figura, children, footer, footerTone = "neutral", reservar = [] }: StepLayoutProps) {
  const topo = useContext(TopoDoPasso);
  const footerCls = `step__footer${footerTone !== "neutral" ? ` step__footer--${footerTone}` : ""}`;
  const falas: Fala[] = [{ quem: "paco", texto: line, humor: paco }];
  if (duvida) {
    falas.push({ quem: "tati", texto: duvida.pergunta, humor: "asking" });
    falas.push({ quem: "paco", texto: duvida.resposta, humor: "answering" });
  }
  return (
    <div className={`step${figura ? " step--duo" : ""}`}>
      <div className="step__body">
        {topo && <div className="step__topo">{topo}</div>}
        <div className="step__conversa conversa-reserva">
          <Conversa falas={falas} roupa="jaleco" />
          {reservar
            .filter((t) => t !== line)
            .map((t, i) => (
              <div key={i} className="conversa-reserva__fantasma" aria-hidden="true">
                <Conversa falas={[{ quem: "paco", texto: t, humor: paco }]} roupa="jaleco" />
              </div>
            ))}
        </div>
        {figura && <div className="step__visual">{figura}</div>}
        <div className="step__controles">{children}</div>
      </div>
      <div className={footerCls}>
        <div className="step__footer-inner">{footer}</div>
      </div>
    </div>
  );
}

/** A dúvida aparece no início do passo ou só depois que ele foi concluído. */
export function duvidaLiberada(duvida: Duvida | undefined, concluido: boolean): Duvida | null {
  if (!duvida) return null;
  return duvida.quando === "inicio" || concluido ? duvida : null;
}

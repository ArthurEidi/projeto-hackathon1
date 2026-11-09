import type { ReactNode } from "react";
import { Conversa, type Fala } from "../characters/Conversa";
import type { PacoHumor } from "../characters/sprites";
import type { Duvida } from "../engine/schema";

interface StepLayoutProps {
  /** Humor do Paco na fala principal do passo. */
  paco: PacoHumor;
  line: string;
  /** Dúvida da Tati já liberada para aparecer (o passo decide quando, conforme `duvida.quando`). */
  duvida?: Duvida | null;
  children: ReactNode;
  footer: ReactNode;
  footerTone?: "neutral" | "correct" | "wrong";
}

/** Moldura comum dos 4 tipos de passo: conversa do Paco (de jaleco) e da Tati, palco e rodapé de ação. */
export function StepLayout({ paco, line, duvida, children, footer, footerTone = "neutral" }: StepLayoutProps) {
  const footerCls = `step__footer${footerTone !== "neutral" ? ` step__footer--${footerTone}` : ""}`;
  const falas: Fala[] = [{ quem: "paco", texto: line, humor: paco }];
  if (duvida) {
    falas.push({ quem: "tati", texto: duvida.pergunta, humor: "asking" });
    falas.push({ quem: "paco", texto: duvida.resposta, humor: "answering" });
  }
  return (
    <div className="step">
      <div className="step__body">
        <Conversa falas={falas} roupa="jaleco" />
        {children}
      </div>
      <div className={footerCls}>{footer}</div>
    </div>
  );
}

/** A dúvida aparece no início do passo ou só depois que ele foi concluído. */
export function duvidaLiberada(duvida: Duvida | undefined, concluido: boolean): Duvida | null {
  if (!duvida) return null;
  return duvida.quando === "inicio" || concluido ? duvida : null;
}

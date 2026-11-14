import { useMemo, useState } from "react";
import type { MicroChallengeStep } from "../engine/schema";
import type { PacoHumor } from "../characters/sprites";
import { TactileButton, TactileCard, type CardState } from "../ui/Tactile";
import { figureParams } from "../widgets/params";
import { figures } from "../widgets/registry";
import { duvidaLiberada, StepLayout } from "./StepLayout";
import type { StepProps } from "./types";

type Phase = "choosing" | "correct" | "wrong";

export function MicroChallenge({ step, onNext }: StepProps<MicroChallengeStep>) {
  const Figure = figures[step.figure.widget];
  const [selected, setSelected] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("choosing");
  const [tried, setTried] = useState<Set<string>>(new Set());

  const chosen = step.options.find((o) => o.id === selected) ?? null;
  const showFeedback = phase !== "choosing" && chosen;

  // A figura reage à resposta: cada opção traz o estado visual que explica o erro ou o acerto.
  const figState = useMemo(() => {
    const override = showFeedback ? chosen.figure : {};
    return figureParams[step.figure.widget].parse({ ...step.figure.params, ...override });
  }, [showFeedback, chosen, step.figure]);

  const check = () => {
    if (!chosen) return;
    setPhase(chosen.correct ? "correct" : "wrong");
    navigator.vibrate?.(chosen.correct ? 20 : [30, 40, 30]);
  };
  const retry = () => {
    if (selected) setTried((t) => new Set(t).add(selected));
    setSelected(null);
    setPhase("choosing");
  };

  const cardState = (id: string): CardState => {
    if (id !== selected) return "idle";
    if (phase === "correct") return "correct";
    if (phase === "wrong") return "wrong";
    return "selected";
  };

  const paco: PacoHumor = phase === "correct" ? "happy" : phase === "wrong" ? "encouraging" : selected ? "thinking" : "idle";

  const footer =
    phase === "choosing" ? (
      <TactileButton block disabled={!selected} onClick={check}>
        Verificar
      </TactileButton>
    ) : (
      <>
        <div className="feedback" role="status">
          <span className="feedback__title">{phase === "correct" ? "Correto." : "Ainda não."}</span>
          <span className="feedback__text">{chosen?.feedback}</span>
        </div>
        {phase === "correct" ? (
          <TactileButton block onClick={onNext}>
            Continuar
          </TactileButton>
        ) : (
          <TactileButton block variant="danger" onClick={retry}>
            Tentar de novo
          </TactileButton>
        )}
      </>
    );

  const opcoesDeTexto = step.options.some((o) => [...o.label].length > 4);
  const opcoesLongas = step.options.some((o) => [...o.label].length > 10);

  return (
    <StepLayout
      paco={paco}
      line={step.lines.intro}
      duvida={duvidaLiberada(step.duvida, phase === "correct")}
      footer={footer} footerTone={phase === "choosing" ? "neutral" : phase}>
      <div key={JSON.stringify(figState)} className="stage stage--pop">
        <Figure state={figState} />
      </div>
      <p className="prompt">{step.prompt}</p>
      <div
        className={`options${opcoesDeTexto ? " options--texto" : ""}${opcoesLongas ? " options--lista" : ""}`}
        role="group"
        aria-label="Alternativas"
      >
        {step.options.map((o) => (
          <TactileCard
            key={o.id}
            state={cardState(o.id)}
            disabled={phase !== "choosing" || tried.has(o.id)}
            onClick={() => setSelected(o.id)}
          >
            {o.label}
          </TactileCard>
        ))}
      </div>
    </StepLayout>
  );
}

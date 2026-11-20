import { useEffect, useState } from "react";
import { preloadSprites, spritesDaAula } from "../characters/sprites";
import { ConviteTreino, Treino } from "../treino/Treino";
import { GlossarioProvider } from "../ui/GlossarioContext";
import { IconClose } from "../ui/Icons";
import { ProgressBar } from "../ui/Tactile";
import { markComplete } from "./progress";
import type { Lesson } from "./schema";
import { StepRenderer } from "./StepRenderer";

interface LessonPlayerProps {
  lesson: Lesson;
  aulaKey: string;
  /** Passo em que a aula abre (só usado em desenvolvimento, via "?passo=N"). */
  passoInicial?: number;
  onExit: () => void;
}

export function LessonPlayer({ lesson, aulaKey, passoInicial = 0, onExit }: LessonPlayerProps) {
  const [index, setIndex] = useState(Math.min(passoInicial, lesson.steps.length - 1));
  const [treinando, setTreinando] = useState(false);
  const finished = index >= lesson.steps.length;
  const step = lesson.steps[index];

  useEffect(() => preloadSprites(spritesDaAula()), []);

  const next = () => {
    const n = index + 1;
    if (n >= lesson.steps.length) markComplete(aulaKey);
    setIndex(n);
  };

  // Depois da aula, o Paco convida para o treino; "Agora não" volta direto para a trilha.
  // O glossário da aula vale para as dicas dos passos e das figuras do treino.
  if (treinando) {
    return (
      <GlossarioProvider glossario={lesson.glossario}>
        <Treino treino={lesson.treino} onSair={onExit} />
      </GlossarioProvider>
    );
  }

  return (
    <GlossarioProvider glossario={lesson.glossario}>
      <header className="lesson-header">
        <button type="button" className="icon-btn" aria-label="Sair da aula" onClick={onExit}>
          <IconClose />
        </button>
        <ProgressBar value={index / lesson.steps.length} />
      </header>
      {finished ? (
        <ConviteTreino
          outro={lesson.outro}
          totalBasico={lesson.treino.faceis.length + lesson.treino.medias.length}
          onTreinar={() => setTreinando(true)}
          onSair={onExit}
        />
      ) : (
        <StepRenderer key={step.id} step={step} onNext={next} />
      )}
    </GlossarioProvider>
  );
}

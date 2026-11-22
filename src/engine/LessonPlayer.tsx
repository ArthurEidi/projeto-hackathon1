import { useEffect, useRef, useState } from "react";
import { preloadSprites, spritesDaAula } from "../characters/sprites";
import { TopoDoPasso } from "../steps/StepLayout";
import { ConviteTreino, Treino } from "../treino/Treino";
import { GlossarioProvider } from "../ui/GlossarioContext";
import { IconClose } from "../ui/Icons";
import { ProgressBar } from "../ui/Tactile";
import { materiaPorId, type MateriaId } from "./materias";
import { markComplete } from "./progress";
import type { Lesson, QuestaoDaAula } from "./schema";
import { StepRenderer } from "./StepRenderer";

/** Aula seguinte oferecida na conclusão. */
export interface ProximaAula {
  titulo: string;
  onAbrir: () => void;
}

interface LessonPlayerProps {
  lesson: Lesson;
  aulaKey: string;
  /** Passo em que a aula abre (só usado em desenvolvimento, via "?passo=N"). */
  passoInicial?: number;
  onExit: () => void;
  /** Área da aula, para o cabeçalho (Matemática, Física ou Química). */
  materia?: MateriaId;
  /** Unidade da aula na trilha, para o cabeçalho. */
  unidade?: string;
  proxima?: ProximaAula | null;
}

const NOMES_DOS_PASSOS: Record<string, string> = {
  interactive_canvas: "Explorar",
  manim_video: "Observar",
  micro_challenge: "Desafio",
  concept_lock: "Fechamento",
};

/** Enunciado de uma questão real, visível em todos os passos da aula (recolhível). */
/** Aberto no primeiro passo (o aluno lê e identifica os dados); recolhido depois, a um toque de distância. */
export function PainelQuestao({ questao, aberto = true }: { questao: QuestaoDaAula; aberto?: boolean }) {
  const { banca, ano, edicao, adaptada } = questao.fonte;
  const fonte = [banca, ano, edicao].filter(Boolean).join(" ") + (adaptada ? " (adaptada)" : "");
  return (
    <details className="questao" open={aberto}>
      <summary className="questao__resumo">
        <span className="questao__selo">Questão</span>
        <span className="questao__fonte">{fonte}</span>
      </summary>
      <div className="questao__texto">
        {questao.texto.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      {questao.dados.length > 0 && (
        <dl className="questao__dados" aria-label="Dados do problema">
          {questao.dados.map((d) => (
            <div key={d.rotulo} className="questao__dado">
              <dt>{d.rotulo}</dt>
              <dd>{d.valor}</dd>
            </div>
          ))}
        </dl>
      )}
    </details>
  );
}

export function LessonPlayer({ lesson, aulaKey, passoInicial = 0, onExit, materia, unidade, proxima }: LessonPlayerProps) {
  const [index, setIndex] = useState(Math.min(passoInicial, lesson.steps.length - 1));
  const [treinando, setTreinando] = useState(false);
  const finished = index >= lesson.steps.length;
  const step = lesson.steps[index];
  const area = materia ? materiaPorId(materia) : undefined;

  useEffect(() => preloadSprites(spritesDaAula()), []);

  // Ao entrar na aula, o foco vai para o título da aula (só para leitor de tela, entre o cabeçalho e o passo):
  // o leitor anuncia a aula, o próximo Tab chega ao primeiro controle do passo e Shift+Tab, a "Sair da aula".
  const inicio = useRef<HTMLHeadingElement>(null);
  useEffect(() => inicio.current?.focus({ preventScroll: true }), []);

  const next = () => {
    const n = index + 1;
    if (n >= lesson.steps.length) markComplete(aulaKey);
    setIndex(n);
  };

  // Depois da aula, o Paco convida para o treino; "Agora não" volta para a área da aula.
  // O glossário da aula vale para as dicas dos passos e das figuras do treino.
  if (treinando) {
    return (
      <GlossarioProvider glossario={lesson.glossario}>
        <div className="aula" style={area ? { ["--area" as string]: area.cor, ["--area-tinta" as string]: area.tinta } : undefined}>
          <Treino treino={lesson.treino} onSair={onExit} />
        </div>
      </GlossarioProvider>
    );
  }

  const total = lesson.steps.length;
  return (
    <GlossarioProvider glossario={lesson.glossario}>
      <div className="aula" data-area={materia} style={area ? { ["--area" as string]: area.cor, ["--area-tinta" as string]: area.tinta } : undefined}>
        <header className="lesson-header">
          <button type="button" className="icon-btn" aria-label="Sair da aula" onClick={onExit}>
            <IconClose />
          </button>
          <div className="lesson-header__info">
            <span className="lesson-header__contexto">
              {area && <span className="lesson-header__area">{area.titulo}</span>}
              {unidade && <span className="lesson-header__unidade">{unidade}</span>}
            </span>
            <span className="lesson-header__titulo">{lesson.titulo}</span>
          </div>
          <div className="lesson-header__progresso">
            <span className="lesson-header__passo" aria-hidden="true">
              {finished ? "Concluída" : `${NOMES_DOS_PASSOS[step.type]} · ${index + 1} de ${total}`}
            </span>
            <ProgressBar value={index / total} etapas={total} />
          </div>
        </header>
        <h1 ref={inicio} tabIndex={-1} className="sr-only">
          Aula: {lesson.titulo}
        </h1>
        {finished ? (
          <ConviteTreino
            outro={lesson.outro}
            totalBasico={lesson.treino.faceis.length + lesson.treino.medias.length}
            onTreinar={() => setTreinando(true)}
            onSair={onExit}
            proxima={proxima ?? null}
          />
        ) : (
          <TopoDoPasso.Provider value={lesson.questao ? <PainelQuestao questao={lesson.questao} aberto={index === 0} /> : null}>
            <StepRenderer key={step.id} step={step} onNext={next} />
          </TopoDoPasso.Provider>
        )}
      </div>
    </GlossarioProvider>
  );
}

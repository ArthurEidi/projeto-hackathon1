// Treino pós-aula em três etapas: 7 perguntas para conferir o mínimo, 5 desafios e 4 questões
// de vestibular. Cada etapa termina com o resultado e um convite gentil para a próxima.
import { useMemo, useState } from "react";
import { Conversa, type Fala } from "../characters/Conversa";
import { CORPO, spriteUrl, type PacoHumor } from "../characters/sprites";
import type { Questao, Treino as TreinoData } from "../engine/schema";
import { StepLayout } from "../steps/StepLayout";
import { IconClose } from "../ui/Icons";
import { ProgressBar, TactileButton, TactileCard, type CardState } from "../ui/Tactile";
import { figureParams } from "../widgets/params";
import { figures } from "../widgets/registry";
import {
  BOTAO_PROXIMA,
  CONTADOR,
  CONVITE,
  CONVITE_PROXIMA,
  ETAPAS,
  FALA_PERGUNTA,
  SUBTITULO_RESULTADO,
  falasResultado,
  type Etapa,
} from "./falas";

/** Fim de aula: comemoração casual e o convite para treinar. "Agora não" volta para a trilha. */
export function ConviteTreino({ outro, onTreinar, onSair }: { outro: string; onTreinar: () => void; onSair: () => void }) {
  return (
    <div className="finish">
      <div className="dupla dupla--festa">
        <img className="corpo" src={spriteUrl(CORPO.pacoComemorando)} alt="Paco comemorando" draggable={false} />
        <img className="corpo" src={spriteUrl(CORPO.tatiComemorando)} alt="Tati comemorando" draggable={false} />
      </div>
      <h1 className="finish__title">Aula concluída</h1>
      <p className="finish__text">{outro}</p>
      <div className="finish__conversa">
        <Conversa falas={CONVITE} roupa="casual" />
      </div>
      <div className="finish__acoes">
        <TactileButton block onClick={onTreinar}>
          Quero treinar
        </TactileButton>
        <TactileButton block variant="secondary" onClick={onSair}>
          Agora não
        </TactileButton>
      </div>
    </div>
  );
}

export function questoesDaEtapa(treino: TreinoData, etapa: Etapa): Questao[] {
  if (etapa === "basico") return [...treino.faceis, ...treino.medias];
  if (etapa === "desafio") return treino.desafios;
  return treino.vestibular;
}

/** "UFSC 2004 · adaptada" */
export function rotuloFonte(q: Questao): string | null {
  if (!q.fonte) return null;
  const { banca, ano, adaptada } = q.fonte;
  return [ano ? `${banca} ${ano}` : banca, adaptada ? "adaptada" : null].filter(Boolean).join(" · ");
}

interface TreinoProps {
  treino: TreinoData;
  onSair: () => void;
}

export function Treino({ treino, onSair }: TreinoProps) {
  const [etapa, setEtapa] = useState<Etapa>("basico");
  const [rodada, setRodada] = useState(0); // muda a cada (re)início de etapa para zerar as perguntas
  const [index, setIndex] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [respondida, setRespondida] = useState(false);
  const questoes = useMemo(() => questoesDaEtapa(treino, etapa), [treino, etapa]);
  const fim = index >= questoes.length;
  const proximaEtapa = ETAPAS[ETAPAS.indexOf(etapa) + 1] as Exclude<Etapa, "basico"> | undefined;

  const responder = (certa: boolean) => {
    setRespondida(true);
    if (certa) setAcertos((a) => a + 1);
  };
  const proxima = () => {
    setRespondida(false);
    setIndex((i) => i + 1);
  };
  const iniciar = (e: Etapa) => {
    setEtapa(e);
    setRodada((r) => r + 1);
    setIndex(0);
    setAcertos(0);
    setRespondida(false);
  };

  const progresso = (index + (respondida ? 1 : 0)) / questoes.length;
  const falasPadrao = FALA_PERGUNTA[etapa];

  return (
    <>
      <header className="lesson-header">
        <button type="button" className="icon-btn" aria-label="Sair do treino" onClick={onSair}>
          <IconClose />
        </button>
        <ProgressBar value={fim ? 1 : progresso} />
      </header>
      {fim ? (
        <Resultado
          key={`${rodada}-fim`}
          etapa={etapa}
          acertos={acertos}
          total={questoes.length}
          proxima={proximaEtapa}
          onProxima={() => proximaEtapa && iniciar(proximaEtapa)}
          onSair={onSair}
          onRefazer={() => iniciar(etapa)}
        />
      ) : (
        <Pergunta
          key={`${rodada}-${questoes[index].id}`}
          questao={questoes[index]}
          contador={`${CONTADOR[etapa]} ${index + 1} de ${questoes.length}`}
          ultima={index === questoes.length - 1}
          fala={questoes[index].fala ?? falasPadrao[index] ?? falasPadrao[falasPadrao.length - 1]}
          onResponder={responder}
          onProxima={proxima}
        />
      )}
    </>
  );
}

type Fase = "escolhendo" | "certa" | "errada";

interface PerguntaProps {
  questao: Questao;
  contador: string;
  ultima: boolean;
  fala: string;
  onResponder: (certa: boolean) => void;
  onProxima: () => void;
}

/** Uma pergunta por vez. Sem segunda tentativa: errou, vê a resposta certa e segue em frente. */
function Pergunta({ questao, contador, ultima, fala, onResponder, onProxima }: PerguntaProps) {
  const [selecionada, setSelecionada] = useState<string | null>(null);
  const [fase, setFase] = useState<Fase>("escolhendo");
  const escolhida = questao.options.find((o) => o.id === selecionada) ?? null;
  const Figure = questao.figure ? figures[questao.figure.widget] : null;
  const figState = useMemo(
    () => (questao.figure ? figureParams[questao.figure.widget].parse(questao.figure.params) : null),
    [questao.figure],
  );
  const opcoesDeTexto = questao.options.some((o) => [...o.label].length > 4);
  const fonte = rotuloFonte(questao);

  const verificar = () => {
    if (!escolhida) return;
    setFase(escolhida.correct ? "certa" : "errada");
    onResponder(escolhida.correct);
    navigator.vibrate?.(escolhida.correct ? 20 : [30, 40, 30]);
  };

  const estado = (id: string, correta: boolean): CardState => {
    if (fase === "escolhendo") return id === selecionada ? "selected" : "idle";
    if (correta) return "correct";
    return id === selecionada ? "wrong" : "idle";
  };

  const paco: PacoHumor =
    fase === "certa" ? "happy" : fase === "errada" ? "encouraging" : selecionada ? "thinking" : "idle";

  const footer =
    fase === "escolhendo" ? (
      <TactileButton block disabled={!selecionada} onClick={verificar}>
        Verificar
      </TactileButton>
    ) : (
      <>
        <div className="feedback" role="status">
          <span className="feedback__title">{fase === "certa" ? "Correto." : "Não foi dessa vez."}</span>
          <span className="feedback__text">{escolhida?.feedback}</span>
        </div>
        <TactileButton block onClick={onProxima}>
          {ultima ? "Ver resultado" : "Continuar"}
        </TactileButton>
      </>
    );

  return (
    <StepLayout
      paco={paco}
      line={fala}
      footer={footer}
      footerTone={fase === "escolhendo" ? "neutral" : fase === "certa" ? "correct" : "wrong"}
    >
      <div className="treino__topo">
        <span className="treino__contador">{contador}</span>
        {fonte && <span className="treino__fonte">{fonte}</span>}
      </div>
      {Figure && figState && (
        <div className="stage">
          <Figure state={figState} />
        </div>
      )}
      <p className="prompt">{questao.prompt}</p>
      <div className={`options${opcoesDeTexto ? " options--texto" : ""}`} role="group" aria-label="Alternativas">
        {questao.options.map((o) => (
          <TactileCard
            key={o.id}
            state={estado(o.id, o.correct)}
            disabled={fase !== "escolhendo"}
            onClick={() => setSelecionada(o.id)}
          >
            {o.label}
          </TactileCard>
        ))}
      </div>
    </StepLayout>
  );
}

interface ResultadoProps {
  etapa: Etapa;
  acertos: number;
  total: number;
  proxima?: Exclude<Etapa, "basico">;
  onProxima: () => void;
  onSair: () => void;
  onRefazer: () => void;
}

function Resultado({ etapa, acertos, total, proxima, onProxima, onSair, onRefazer }: ResultadoProps) {
  const tudo = acertos === total;
  // O convite para a próxima etapa vem depois do comentário sobre o resultado, na mesma conversa.
  const falas: Fala[] = [...falasResultado(etapa, acertos, total)];
  if (proxima) falas.push({ quem: "paco", humor: "encouraging", texto: CONVITE_PROXIMA[proxima] });
  const [um, varios] = SUBTITULO_RESULTADO[etapa];

  return (
    <div className="finish">
      <div className={`dupla${tudo ? " dupla--festa" : ""}`}>
        <img
          className="corpo"
          src={spriteUrl(tudo ? CORPO.pacoComemorando : CORPO.pacoAcenando)}
          alt="Paco"
          draggable={false}
        />
        {tudo && <img className="corpo" src={spriteUrl(CORPO.tatiComemorando)} alt="Tati" draggable={false} />}
      </div>
      <h1 className="finish__title">
        {acertos} de {total}
      </h1>
      <p className="finish__text">{acertos === 1 ? um : varios}</p>
      <div className="finish__conversa">
        <Conversa falas={falas} roupa="casual" />
      </div>
      <div className="finish__acoes">
        {proxima && (
          <TactileButton block onClick={onProxima}>
            {BOTAO_PROXIMA[proxima]}
          </TactileButton>
        )}
        <TactileButton block variant={proxima ? "secondary" : "primary"} onClick={onSair}>
          Voltar à trilha
        </TactileButton>
        <button type="button" className="link-btn" onClick={onRefazer}>
          Refazer estas perguntas
        </button>
      </div>
    </div>
  );
}

import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { CORPO, spriteUrl } from "./characters/sprites";
import { carregadorPlayer, iniciarAbertura, usePreCargaPlayer, type ModuloPlayer } from "./engine/abertura";
import { listAulas, type LoadResult } from "./engine/content";
import { lerRota, type Rota } from "./engine/rota";
import { Home, type FocoTrilha } from "./Home";
import { TactileButton } from "./ui/Tactile";

// O player da aula traz todos os widgets, os passos e o treino (a maior parte do JS do app). Fica num chunk
// separado, baixado junto com o JSON ao abrir uma aula, ou antes, na trilha, se a rede permitir.
// Ver src/engine/abertura.ts.

/** Foca o título ao montar: leitor de tela anuncia a tela, e o próximo Tab chega à primeira ação. */
function useFocoNoTitulo() {
  const titulo = useRef<HTMLHeadingElement>(null);
  useEffect(() => titulo.current?.focus(), []);
  return titulo;
}

export function AulaNaoEncontrada({ erro, onVoltar }: { erro?: string; onVoltar: () => void }) {
  const titulo = useFocoNoTitulo();
  return (
    <main className="finish">
      <div className="dupla">
        <img className="corpo" src={spriteUrl(CORPO.pacoAcenando)} alt="Paco acenando" draggable={false} />
      </div>
      <h1 ref={titulo} tabIndex={-1} className="finish__title">{erro ? "Não foi possível abrir a aula" : "Aula não encontrada"}</h1>
      <p className={erro ? "finish__text error-box" : "finish__text"}>
        {erro ?? "Esse endereço não existe na trilha. Volte para escolher uma aula."}
      </p>
      <div className="finish__acoes">
        <TactileButton block onClick={onVoltar}>
          Voltar à trilha
        </TactileButton>
      </div>
    </main>
  );
}

/** Falha que pode passar numa nova tentativa: download do player ou da aula (rede), ou erro ao desenhar a aula. */
export function FalhaAula({ motivo, onTentar, onVoltar }: { motivo: "rede" | "erro"; onTentar: () => void; onVoltar: () => void }) {
  const titulo = useFocoNoTitulo();
  return (
    <main className="finish">
      <div className="dupla">
        <img className="corpo" src={spriteUrl(CORPO.pacoAcenando)} alt="Paco acenando" draggable={false} />
      </div>
      <h1 ref={titulo} tabIndex={-1} className="finish__title">
        Não foi possível abrir a aula
      </h1>
      <p className="finish__text">
        {motivo === "rede"
          ? "A conexão falhou no meio do caminho. Confira a internet e tente de novo."
          : "Algo deu errado ao mostrar esta aula. Tente de novo ou volte à trilha."}
      </p>
      <div className="finish__acoes">
        <TactileButton block onClick={onTentar}>
          Tentar de novo
        </TactileButton>
        <TactileButton block variant="secondary" onClick={onVoltar}>
          Voltar à trilha
        </TactileButton>
      </div>
    </main>
  );
}

/** Espera pelos downloads. O anúncio para leitor de tela fica na região de status persistente do App. */
export function CarregandoAula({ onVoltar }: { onVoltar: () => void }) {
  const texto = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    // O botão da trilha que abriu a aula sumiu: sem isto, o foco cairia no <body>.
    if (!document.activeElement || document.activeElement === document.body) texto.current?.focus();
  }, []);
  return (
    <main className="carregando">
      <p ref={texto} tabIndex={-1} className="carregando__texto">
        Carregando aula…
      </p>
      <TactileButton variant="secondary" className="carregando__voltar" onClick={onVoltar}>
        Voltar à trilha
      </TactileButton>
    </main>
  );
}

/** Erro ao desenhar a aula (ex.: um widget) vira a tela de falha, em vez de derrubar o app inteiro. */
class BarreiraAula extends Component<{ onTentar: () => void; onVoltar: () => void; children: ReactNode }, { erro: boolean }> {
  state = { erro: false };
  static getDerivedStateFromError() {
    return { erro: true };
  }
  render() {
    return this.state.erro ? <FalhaAula motivo="erro" onTentar={this.props.onTentar} onVoltar={this.props.onVoltar} /> : this.props.children;
  }
}

// Rotas por hash: ver src/engine/rota.ts. Só em desenvolvimento, "?passo=N" abre a aula no passo N.
const rotaAtual = (): Rota => lerRota(typeof location === "undefined" ? "" : location.hash, import.meta.env.DEV);

interface Abertura {
  arquivo: string;
  tentativa: number;
  dados: LoadResult | null;
  player: ModuloPlayer | null;
  erroPlayer: boolean;
}

export function App() {
  const [route, setRoute] = useState(rotaAtual);
  // Ao voltar de uma aula, a trilha devolve o foco ao botão da aula de onde o aluno saiu (ou ao título,
  // se a aula não foi aberta pela trilha). Na primeira carga da página, o foco fica onde o navegador pôs.
  const [focoTrilha, setFocoTrilha] = useState<FocoTrilha>(undefined);
  const rotaRef = useRef(route);
  const origemRef = useRef<string | null>(null);
  usePreCargaPlayer(route.tipo === "trilha");

  useEffect(() => {
    const on = () => {
      const nova = rotaAtual();
      const anterior = rotaRef.current;
      if (anterior.tipo === "aula" && nova.tipo === "trilha") {
        setFocoTrilha(anterior.aula !== null && anterior.aula === origemRef.current ? origemRef.current : null);
        origemRef.current = null;
      }
      rotaRef.current = nova;
      setRoute(nova);
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  const aulaKey = route.tipo === "aula" ? route.aula : null;
  const entry = aulaKey === null ? undefined : listAulas().find((a) => a.key === aulaKey);
  const arquivo = entry?.arquivo ?? null;

  // Dados e player pedidos juntos ao confirmar uma rota de aula; "Tentar de novo" incrementa `tentativa`.
  const [tentativa, setTentativa] = useState(0);
  const [abertura, setAbertura] = useState<Abertura | null>(null);
  useEffect(() => {
    if (!arquivo) return;
    let ativo = true;
    const mudar = (parte: Partial<Abertura>) =>
      setAbertura((a) => (ativo && a?.arquivo === arquivo && a.tentativa === tentativa ? { ...a, ...parte } : a));
    setAbertura({ arquivo, tentativa, dados: null, player: carregadorPlayer.pronto(), erroPlayer: false });
    const { player, dados } = iniciarAbertura(arquivo);
    player.then(
      (m) => mudar({ player: m }),
      () => mudar({ erroPlayer: true }),
    );
    void dados.then((r) => mudar({ dados: r }));
    return () => {
      ativo = false;
    };
  }, [arquivo, tentativa]);

  const go = (hash: string) => {
    location.hash = hash;
  };
  const voltar = () => go("#/");
  const tentarDeNovo = () => setTentativa((t) => t + 1);

  let conteudo: ReactNode = null;
  let anuncio = "";
  if (route.tipo === "trilha") {
    conteudo = (
      <Home
        foco={focoTrilha}
        onOpen={(key) => {
          origemRef.current = key;
          go(`#/aula/${key}`);
        }}
      />
    );
  } else {
    const a = abertura && abertura.arquivo === arquivo && abertura.tentativa === tentativa ? abertura : null;
    if (!arquivo || aulaKey === null) {
      conteudo = <AulaNaoEncontrada onVoltar={voltar} />;
    } else if (a?.erroPlayer || (a?.dados && !a.dados.ok && a.dados.rede)) {
      anuncio = "Não foi possível abrir a aula.";
      conteudo = <FalhaAula motivo="rede" onTentar={tentarDeNovo} onVoltar={voltar} />;
    } else if (a?.dados && !a.dados.ok) {
      conteudo = <AulaNaoEncontrada erro={a.dados.error} onVoltar={voltar} />;
    } else if (!a?.dados || !a.player) {
      anuncio = "Carregando aula…";
      conteudo = <CarregandoAula onVoltar={voltar} />;
    } else if (a.dados.ok) {
      const { LessonPlayer } = a.player;
      conteudo = (
        <BarreiraAula key={tentativa} onTentar={tentarDeNovo} onVoltar={voltar}>
          <LessonPlayer key={`${aulaKey}#${route.passo}`} lesson={a.dados.lesson} aulaKey={aulaKey} passoInicial={route.passo} onExit={voltar} />
        </BarreiraAula>
      );
    }
  }

  // A região de status fica montada em todas as telas (mesma posição na árvore): a mensagem muda dentro
  // dela, e leitores de tela anunciam a mudança.
  return (
    <div className="app">
      {conteudo}
      <p role="status" aria-live="polite" className="sr-only">
        {anuncio}
      </p>
    </div>
  );
}

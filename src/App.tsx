import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { CORPO, spriteUrl } from "./characters/sprites";
import { listAulas, loadLesson, type LoadResult } from "./engine/content";
import { lerRota, type Rota } from "./engine/rota";
import { Home, type FocoTrilha } from "./Home";
import { TactileButton } from "./ui/Tactile";

// O player da aula traz todos os widgets, os passos e o treino (a maior parte do JS do app). Fica num chunk
// separado: a trilha abre sem ele; o download começa ao abrir uma aula (junto com o JSON dela) ou, na trilha,
// quando o navegador fica ocioso, para o primeiro toque numa aula não esperar a rede.
const carregarPlayer = () => import("./engine/LessonPlayer");
const LessonPlayer = lazy(() => carregarPlayer().then((m) => ({ default: m.LessonPlayer })));

function useCarregarPlayerOcioso() {
  useEffect(() => {
    const cedo = () => void carregarPlayer().catch(() => {});
    if (typeof requestIdleCallback === "function") {
      const id = requestIdleCallback(cedo, { timeout: 4000 });
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(cedo, 2000);
    return () => clearTimeout(id);
  }, []);
}

const carregandoAula = <p role="status" style={{ padding: "16px" }}>Carregando aula…</p>;

export function AulaNaoEncontrada({ erro, onVoltar }: { erro?: string; onVoltar: () => void }) {
  // O foco vai para o título: leitor de tela anuncia o problema, e o próximo Tab chega ao botão de voltar.
  const titulo = useRef<HTMLHeadingElement>(null);
  useEffect(() => titulo.current?.focus(), []);
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

// Rotas por hash: ver src/engine/rota.ts. Só em desenvolvimento, "?passo=N" abre a aula no passo N.
const rotaAtual = (): Rota => lerRota(typeof location === "undefined" ? "" : location.hash, import.meta.env.DEV);

export function App() {
  const [route, setRoute] = useState(rotaAtual);
  // Ao voltar de uma aula, a trilha devolve o foco ao botão da aula de onde o aluno saiu (ou ao título,
  // se a aula não foi aberta pela trilha). Na primeira carga da página, o foco fica onde o navegador pôs.
  const [focoTrilha, setFocoTrilha] = useState<FocoTrilha>(undefined);
  const rotaRef = useRef(route);
  const origemRef = useRef<string | null>(null);
  useCarregarPlayerOcioso();

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
  const arquivo = entry?.arquivo;
  const [request, setRequest] = useState<{ arquivo: string; result: LoadResult } | null>(null);
  useEffect(() => {
    let active = true;
    setRequest(null);
    if (arquivo) {
      void loadLesson(arquivo).then((result) => {
        if (active) setRequest({ arquivo, result });
      });
    }
    return () => { active = false; };
  }, [arquivo]);
  const loaded = request?.arquivo === arquivo ? request?.result : null;

  const go = (hash: string) => {
    location.hash = hash;
  };

  if (route.tipo === "trilha") {
    return (
      <div className="app">
        <Home
          foco={focoTrilha}
          onOpen={(key) => {
            origemRef.current = key;
            go(`#/aula/${key}`);
          }}
        />
      </div>
    );
  }

  return (
    <div className="app">
      {arquivo && !loaded ? (
        carregandoAula
      ) : loaded?.ok && aulaKey !== null ? (
        <Suspense fallback={carregandoAula}>
          <LessonPlayer key={`${aulaKey}#${route.passo}`} lesson={loaded.lesson} aulaKey={aulaKey} passoInicial={route.passo} onExit={() => go("#/")} />
        </Suspense>
      ) : (
        <AulaNaoEncontrada erro={loaded && !loaded.ok ? loaded.error : undefined} onVoltar={() => go("#/")} />
      )}
    </div>
  );
}

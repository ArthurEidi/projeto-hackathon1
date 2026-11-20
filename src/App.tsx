import { lazy, Suspense, useEffect, useState } from "react";
import { CORPO, spriteUrl } from "./characters/sprites";
import { listAulas, loadLesson, type LoadResult } from "./engine/content";
import { Home } from "./Home";
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
  return (
    <main className="finish">
      <div className="dupla">
        <img className="corpo" src={spriteUrl(CORPO.pacoAcenando)} alt="Paco acenando" draggable={false} />
      </div>
      <h1 className="finish__title">{erro ? "Não foi possível abrir a aula" : "Aula não encontrada"}</h1>
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

// Rotas por hash: "#/" trilha, "#/aula/<pilar>/<setor>/<unidade>/<aula>" aula.
// Só em desenvolvimento: "?passo=N" no fim abre a aula direto no passo N (1 = primeiro), para conferência visual.
const readRoute = () => {
  const m = location.hash.match(/^#\/aula\/([^?]+)(?:\?passo=(\d+))?$/);
  if (!m) return { aula: null, passo: 0 };
  return { aula: decodeURIComponent(m[1]), passo: import.meta.env.DEV && m[2] ? Math.max(0, Number(m[2]) - 1) : 0 };
};

export function App() {
  const [route, setRoute] = useState(readRoute);
  useCarregarPlayerOcioso();

  useEffect(() => {
    const on = () => setRoute(readRoute());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  const entry = listAulas().find((a) => a.key === route.aula);
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

  if (!route.aula) {
    return (
      <div className="app">
        <Home onOpen={(key) => go(`#/aula/${key}`)} />
      </div>
    );
  }


  return (
    <div className="app">
      {arquivo && !loaded ? (
        carregandoAula
      ) : loaded?.ok ? (
        <Suspense fallback={carregandoAula}>
          <LessonPlayer key={`${route.aula}#${route.passo}`} lesson={loaded.lesson} aulaKey={route.aula} passoInicial={route.passo} onExit={() => go("#/")} />
        </Suspense>
      ) : (
        <AulaNaoEncontrada erro={loaded ? loaded.error : undefined} onVoltar={() => go("#/")} />
      )}
    </div>
  );
}

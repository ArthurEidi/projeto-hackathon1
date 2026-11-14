import { useEffect, useState } from "react";
import { listAulas, loadLesson } from "./engine/content";
import { LessonPlayer } from "./engine/LessonPlayer";
import { Home } from "./Home";

// Rotas por hash: "#/" trilha, "#/aula/<pilar>/<setor>/<unidade>/<aula>" aula.
// Só em desenvolvimento: "?passo=N" no fim abre a aula direto no passo N (1 = primeiro), para conferência visual.
const readRoute = () => {
  const m = location.hash.match(/^#\/aula\/([^?]+)(?:\?passo=(\d+))?$/);
  if (!m) return { aula: null, passo: 0 };
  return { aula: decodeURIComponent(m[1]), passo: import.meta.env.DEV && m[2] ? Math.max(0, Number(m[2]) - 1) : 0 };
};

export function App() {
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    const on = () => setRoute(readRoute());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

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

  const entry = listAulas().find((a) => a.key === route.aula);
  const loaded = entry?.arquivo ? loadLesson(entry.arquivo) : null;

  return (
    <div className="app">
      {loaded?.ok ? (
        <LessonPlayer key={`${route.aula}#${route.passo}`} lesson={loaded.lesson} aulaKey={route.aula} passoInicial={route.passo} onExit={() => go("#/")} />
      ) : (
        <>
          <pre className="error-box">{loaded ? loaded.error : `Aula não encontrada: ${route.aula}`}</pre>
          <div style={{ padding: "0 16px" }}>
            <button type="button" className="btn btn--block" onClick={() => go("#/")}>
              Voltar à trilha
            </button>
          </div>
        </>
      )}
    </div>
  );
}

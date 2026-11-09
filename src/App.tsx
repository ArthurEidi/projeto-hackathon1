import { useEffect, useState } from "react";
import { listAulas, loadLesson } from "./engine/content";
import { LessonPlayer } from "./engine/LessonPlayer";
import { Home } from "./Home";

// Rotas por hash: "#/" trilha, "#/aula/<pilar>/<setor>/<unidade>/<aula>" aula.
const readRoute = () => {
  const m = location.hash.match(/^#\/aula\/(.+)$/);
  return m ? { aula: decodeURIComponent(m[1]) } : { aula: null };
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
        <LessonPlayer key={route.aula} lesson={loaded.lesson} aulaKey={route.aula} onExit={() => go("#/")} />
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

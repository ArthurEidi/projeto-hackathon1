import { useState } from "react";
import { BoasVindas, jaViuBoasVindas, SaudacaoPaco } from "./characters/BoasVindas";
import { listAulas, taxonomy } from "./engine/content";
import { MATERIA_COM_CONTEUDO, MATERIAS, spriteMateria } from "./engine/materias";
import { getProgress } from "./engine/progress";
import { IconCheck, IconLock, IconUnidade } from "./ui/Icons";
import { TactileButton } from "./ui/Tactile";

/** Trilha: Pilar > Setor > Unidade > Aula. */
export function Home({ onOpen }: { onOpen: (key: string) => void }) {
  const [materiaId, setMateriaId] = useState(MATERIA_COM_CONTEUDO);
  const [pilarId, setPilarId] = useState("geometria");
  const progress = getProgress();
  const aulas = listAulas();
  const pilar = taxonomy.pilares.find((p) => p.id === pilarId)!;
  const [boasVindas, setBoasVindas] = useState(() => !jaViuBoasVindas());

  return (
    <main className="home">
      <h1 className="home__title">Trilha</h1>
      {boasVindas ? (
        <BoasVindas onFechar={() => setBoasVindas(false)} />
      ) : (
        <SaudacaoPaco temProgresso={Object.keys(progress).length > 0} />
      )}
      <nav className="materias" aria-label="Matérias">
        {MATERIAS.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`materia${m.id === materiaId ? " materia--current" : ""}`}
            aria-pressed={m.id === materiaId}
            onClick={() => setMateriaId(m.id)}
          >
            <img src={spriteMateria(m.id)} alt={m.titulo} draggable={false} />
          </button>
        ))}
      </nav>

      {materiaId !== MATERIA_COM_CONTEUDO ? (
        <div className="empty">
          {MATERIAS.find((m) => m.id === materiaId)!.titulo} está em produção. Por enquanto, a trilha completa é de
          Matemática.
        </div>
      ) : (
        <>
          <nav className="pillars" aria-label="Pilares">
            {taxonomy.pilares.map((p) => (
              <TactileButton
                key={p.id}
                variant="secondary"
                className={p.id === pilarId ? "btn--current" : ""}
                aria-current={p.id === pilarId}
                onClick={() => setPilarId(p.id)}
              >
                {p.titulo}
              </TactileButton>
            ))}
          </nav>

          {pilar.setores.length === 0 && <div className="empty">Nenhuma unidade publicada neste pilar ainda.</div>}

          {pilar.setores.map((s) => (
            <section key={s.id} className="sector">
              <h2 className="sector__title">{s.titulo}</h2>
              {s.unidades.map((u) => (
                <div key={u.id} className="unit">
                  <div className="unit__head">
                    <div className="unit__badge">
                      <IconUnidade icone={u.icone} color="#FFFFFF" size={26} />
                    </div>
                    <div>
                      <p className="unit__title">{u.titulo}</p>
                      <p className="unit__sub">{u.aulas.length === 1 ? "1 aula" : `${u.aulas.length} aulas`}</p>
                    </div>
                  </div>
                  <div className="path">
                    {u.aulas.map((a, i) => {
                      const key = `${pilar.id}/${s.id}/${u.id}/${a.id}`;
                      const entry = aulas.find((x) => x.key === key)!;
                      const prevKey = i > 0 ? `${pilar.id}/${s.id}/${u.id}/${u.aulas[i - 1].id}` : null;
                      const done = Boolean(progress[key]);
                      const unlocked = entry.arquivo !== null && (prevKey === null || Boolean(progress[prevKey]));
                      return (
                        <div key={a.id} className="node">
                          <TactileButton
                            variant={unlocked ? "primary" : "secondary"}
                            className={`node__btn${done ? " btn--done" : ""}`}
                            disabled={!unlocked}
                            aria-label={`Aula ${a.numero}: ${a.titulo}`}
                            onClick={() => onOpen(key)}
                          >
                            {done ? <IconCheck color="#FFFFFF" /> : unlocked ? <IconUnidade icone={u.icone} color="#FFFFFF" /> : <IconLock />}
                          </TactileButton>
                          <div className="node__text">
                            <span className="node__label">
                              Aula {String(a.numero).padStart(2, "0")}
                              {a.arquivo === null ? " · em produção" : ""}
                            </span>
                            <span className="node__title">{a.titulo}</span>
                            <span className="node__sub">{a.subtitulo}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </section>
          ))}
        </>
      )}
    </main>
  );
}

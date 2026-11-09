import { useState } from "react";
import { BoasVindas, jaViuBoasVindas, SaudacaoPaco } from "./characters/BoasVindas";
import { listAulas, taxonomy } from "./engine/content";
import { MATERIA_COM_CONTEUDO, MATERIAS, spriteMateria } from "./engine/materias";
import { getProgress } from "./engine/progress";
import { IconCheck, IconLock, IconSeta, IconUnidade } from "./ui/Icons";
import { TactileButton } from "./ui/Tactile";

const contar = (n: number, um: string, varios: string) => `${n} ${n === 1 ? um : varios}`;

// Setores e unidades começam contraídos; o que o aluno abre fica lembrado entre visitas.
const KEY_ABERTOS = "mat:trilha-aberta:v1";

function lerAbertos(): Set<string> {
  try {
    const raw = localStorage.getItem(KEY_ABERTOS);
    const lista: unknown = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(lista) ? lista.filter((x): x is string => typeof x === "string") : []);
  } catch {
    return new Set();
  }
}

function useAbertos(): [Set<string>, (key: string) => void] {
  const [abertos, setAbertos] = useState(lerAbertos);
  const alternar = (key: string) =>
    setAbertos((atual) => {
      const novo = new Set(atual);
      if (!novo.delete(key)) novo.add(key);
      try {
        localStorage.setItem(KEY_ABERTOS, JSON.stringify([...novo]));
      } catch {
        /* sem armazenamento: o estado vale só para esta visita */
      }
      return novo;
    });
  return [abertos, alternar];
}

/** Trilha: Pilar > Setor > Unidade > Aula. Setores e unidades em acordeão. */
export function Home({ onOpen }: { onOpen: (key: string) => void }) {
  const [materiaId, setMateriaId] = useState(MATERIA_COM_CONTEUDO);
  const [pilarId, setPilarId] = useState("geometria");
  const progress = getProgress();
  const aulas = listAulas();
  const pilar = taxonomy.pilares.find((p) => p.id === pilarId)!;
  const [boasVindas, setBoasVindas] = useState(() => !jaViuBoasVindas());
  const [abertos, alternar] = useAbertos();

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

          {pilar.setores.map((s) => {
            const sKey = `s:${pilar.id}/${s.id}`;
            const sAberto = abertos.has(sKey);
            const publicadas = s.unidades.filter((u) => u.aulas.some((a) => a.arquivo)).length;
            return (
              <section key={s.id} className="sector">
                <button
                  type="button"
                  className="sector__head"
                  aria-expanded={sAberto}
                  aria-controls={`painel-${sKey}`}
                  onClick={() => alternar(sKey)}
                >
                  <span className="sector__text">
                    <span className="sector__title">{s.titulo}</span>
                    <span className="sector__sub">
                      {contar(s.unidades.length, "unidade", "unidades")}
                      {publicadas > 0 ? ` · ${contar(publicadas, "disponível", "disponíveis")}` : ""}
                    </span>
                  </span>
                  <IconSeta aberta={sAberto} />
                </button>
                {sAberto && (
                  <div id={`painel-${sKey}`} className="sector__body">
                    {s.unidades.map((u) => {
                      const uKey = `u:${pilar.id}/${s.id}/${u.id}`;
                      const uAberta = abertos.has(uKey);
                      const prontas = u.aulas.filter((a) => a.arquivo).length;
                      return (
                        <div key={u.id} className={`unit${uAberta ? " unit--aberta" : ""}`}>
                          <button
                            type="button"
                            className="unit__head"
                            aria-expanded={uAberta}
                            aria-controls={`painel-${uKey}`}
                            onClick={() => alternar(uKey)}
                          >
                            <span className={`unit__badge${prontas === 0 ? " unit__badge--off" : ""}`}>
                              <IconUnidade icone={u.icone} color="#FFFFFF" size={24} />
                            </span>
                            <span className="unit__text">
                              <span className="unit__title">{u.titulo}</span>
                              <span className="unit__sub">
                                {contar(u.aulas.length, "aula", "aulas")}
                                {prontas === 0 ? " · em produção" : ""}
                              </span>
                            </span>
                            <IconSeta aberta={uAberta} />
                          </button>
                          {uAberta && (
                            <div id={`painel-${uKey}`} className="path">
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
                                      {done ? (
                                        <IconCheck color="#FFFFFF" />
                                      ) : unlocked ? (
                                        <IconUnidade icone={u.icone} color="#FFFFFF" />
                                      ) : (
                                        <IconLock />
                                      )}
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
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </>
      )}
    </main>
  );
}

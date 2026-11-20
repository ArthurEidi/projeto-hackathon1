import { useEffect, useRef, useState } from "react";
import { BoasVindas, jaViuBoasVindas, SaudacaoPaco } from "./characters/BoasVindas";
import { armazenamento, lerChave, lerJson, type Leitor } from "./engine/armazenamento";
import { listAulas, taxonomy, type AulaEntry } from "./engine/content";
import { MATERIA_COM_CONTEUDO, MATERIAS, spriteMateria } from "./engine/materias";
import { getProgress, type Progress } from "./engine/progress";
import { IconCheck, IconLock, IconSeta, IconUnidade } from "./ui/Icons";
import { palette } from "./ui/palette";
import { TactileButton } from "./ui/Tactile";

const contar = (n: number, um: string, varios: string) => `${n} ${n === 1 ? um : varios}`;

// Na primeira visita, o setor e a unidade da primeira aula publicada do pilar ativo abrem para expor a Aula 01;
// depois, o que o aluno abre e o último pilar escolhido ficam lembrados entre visitas (ver engine/armazenamento:
// sem localStorage, valem só para esta visita). Dados gravados inválidos ou obsoletos contam como ausentes.
const KEY_ABERTOS = "mat:trilha-aberta:v1";
const KEY_PILAR = "mat:pilar-ativo:v1";

/** Para onde vai o foco ao montar a trilha: `undefined` não mexe; `null` vai ao título; uma chave, ao botão da aula. */
export type FocoTrilha = string | null | undefined;

/** Chaves de acordeão ("s:pilar/setor" e "u:pilar/setor/unidade") que expõem a primeira aula publicada do pilar. */
export function chavesPrimeiraAula(pilarId: string | undefined = taxonomy.pilares[0]?.id): string[] {
  const pilar = taxonomy.pilares.find((p) => p.id === pilarId) ?? taxonomy.pilares[0];
  if (!pilar) return [];
  for (const s of pilar.setores)
    for (const u of s.unidades)
      if (u.aulas.some((a) => a.arquivo)) return [`s:${pilar.id}/${s.id}`, `u:${pilar.id}/${s.id}/${u.id}`];
  const setor = pilar.setores[0];
  if (!setor) return [];
  const chaves = [`s:${pilar.id}/${setor.id}`];
  if (setor.unidades[0]) chaves.push(`u:${pilar.id}/${setor.id}/${setor.unidades[0].id}`);
  return chaves;
}

/** Todas as chaves de acordeão que existem na taxonomia atual. */
function chavesDaTaxonomia(): Set<string> {
  const chaves = new Set<string>();
  for (const p of taxonomy.pilares)
    for (const s of p.setores) {
      chaves.add(`s:${p.id}/${s.id}`);
      for (const u of s.unidades) chaves.add(`u:${p.id}/${s.id}/${u.id}`);
    }
  return chaves;
}

/** Pilar salvo, se ainda existir; senão, o primeiro. `storage` omitido usa o armazenamento do app. */
export function lerPilarInicial(storage?: Leitor | null): string {
  const padrao = taxonomy.pilares[0]?.id ?? "aritmetica";
  const salvo = lerChave(KEY_PILAR, storage);
  return salvo && taxonomy.pilares.some((p) => p.id === salvo) ? salvo : padrao;
}

/**
 * Acordeões abertos. `[]` gravado é escolha do aluno (fechou tudo) e é respeitado. Chaves de setores ou
 * unidades que saíram da taxonomia são descartadas; se nada válido sobrar, ou se o dado for nulo,
 * malformado ou não for uma lista, abre o caminho da primeira aula publicada do pilar ativo.
 */
export function lerAbertos(storage?: Leitor | null, pilarId: string = lerPilarInicial(storage)): Set<string> {
  const valor = lerJson(lerChave(KEY_ABERTOS, storage));
  if (Array.isArray(valor)) {
    if (valor.length === 0) return new Set();
    const existentes = chavesDaTaxonomia();
    const validas = valor.filter((x): x is string => typeof x === "string" && existentes.has(x));
    if (validas.length > 0) return new Set(validas);
  }
  return new Set(chavesPrimeiraAula(pilarId));
}

/** Há conclusão gravada em alguma aula ainda publicada? (Conclusões de aulas removidas não contam.) */
export function temProgressoPublicado(progress: Progress, aulas: AulaEntry[] = listAulas()): boolean {
  return aulas.some((a) => a.arquivo !== null && Object.hasOwn(progress, a.key));
}

function usePilar(): [string, (id: string) => void] {
  const [pilarId, setPilarId] = useState(() => lerPilarInicial());
  const escolher = (id: string) => {
    setPilarId(id);
    armazenamento.gravar(KEY_PILAR, id);
  };
  return [pilarId, escolher];
}

function useAbertos(pilarInicial: string): [Set<string>, (key: string) => void] {
  const [abertos, setAbertos] = useState(() => lerAbertos(undefined, pilarInicial));
  // A gravação fica fora do updater do React, que precisa ser puro.
  const alternar = (key: string) => {
    const novo = new Set(abertos);
    if (!novo.delete(key)) novo.add(key);
    setAbertos(novo);
    armazenamento.gravar(KEY_ABERTOS, JSON.stringify([...novo]));
  };
  return [abertos, alternar];
}

/**
 * Traz o elemento inteiro (com o contorno de foco) para a área visível da faixa que o contém. O navegador não
 * rola uma matéria parcialmente visível ao receber foco por Tab, e o nome dela ficava cortado na borda.
 */
export function mostrarInteiro(el: Pick<HTMLElement, "scrollIntoView">) {
  el.scrollIntoView({ inline: "nearest", block: "nearest" });
}

// Rolagem da trilha no momento em que o aluno abriu uma aula, para restaurá-la quando ele voltar.
let rolagemAoAbrir = 0;

/** Trilha: Pilar > Setor > Unidade > Aula. Setores e unidades em acordeão. */
export function Home({ onOpen, foco }: { onOpen: (key: string) => void; foco?: FocoTrilha }) {
  const [materiaId, setMateriaId] = useState(MATERIA_COM_CONTEUDO);
  const [pilarId, setPilarId] = usePilar();
  const progress = getProgress();
  const aulas = listAulas();
  const pilar = taxonomy.pilares.find((p) => p.id === pilarId)!;
  const [boasVindas, setBoasVindas] = useState(() => !jaViuBoasVindas());
  const [abertos, alternar] = useAbertos(pilarId);
  const mainRef = useRef<HTMLElement>(null);
  const tituloRef = useRef<HTMLHeadingElement>(null);

  // Volta de uma aula: restaura a rolagem e devolve o foco ao botão da aula (ou ao título, se ele não existir
  // mais ou se a aula não veio da trilha). Roda só na montagem: a trilha remonta a cada volta.
  useEffect(() => {
    if (foco === undefined) return;
    const main = mainRef.current;
    const alvo = foco === null ? null : main?.querySelector<HTMLButtonElement>(`[data-aula="${CSS.escape(foco)}"]`);
    if (alvo && !alvo.disabled) {
      if (main) main.scrollTop = rolagemAoAbrir;
      alvo.focus({ preventScroll: true });
      alvo.scrollIntoView({ block: "nearest" });
    } else {
      tituloRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const algumSetorAberto = pilar.setores.some((s) => abertos.has(`s:${pilar.id}/${s.id}`));

  return (
    <main className="home" ref={mainRef}>
      <h1 ref={tituloRef} tabIndex={-1} className="home__title">
        Trilha
      </h1>
      {boasVindas ? (
        <BoasVindas onFechar={() => setBoasVindas(false)} />
      ) : (
        <SaudacaoPaco temProgresso={temProgressoPublicado(progress, aulas)} />
      )}
      <nav className="materias" aria-label="Matérias">
        {MATERIAS.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`materia${m.id === materiaId ? " materia--current" : ""}`}
            aria-pressed={m.id === materiaId}
            onClick={() => setMateriaId(m.id)}
            onFocus={(e) => mostrarInteiro(e.currentTarget)}
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
          {pilar.setores.length > 0 && !algumSetorAberto && (
            <p className="trilha-dica">Toque num setor para ver as unidades e as aulas.</p>
          )}

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
                                      aria-label={`Aula ${a.numero}: ${a.titulo}${done ? " (concluída)" : ""}`}
                                      data-aula={key}
                                      onClick={() => {
                                        rolagemAoAbrir = mainRef.current?.scrollTop ?? 0;
                                        onOpen(key);
                                      }}
                                    >
                                      {done ? (
                                        <IconCheck color={palette.ink} />
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

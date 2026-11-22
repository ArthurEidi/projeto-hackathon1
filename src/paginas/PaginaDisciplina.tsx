// Página de Física ou de Química: apresentação da área (no padrão de cabeçalho de seção da landing, com a
// ilustração da disciplina) e as aulas publicadas, agrupadas por setor, com o estado real de cada uma.
import { useEffect, useRef } from "react";
import { listAulas, taxonomy } from "../engine/content";
import { materiaPorId, type MateriaId } from "../engine/materias";
import { getProgress } from "../engine/progress";
import { BarraTopo } from "./BarraTopo";
import { IlustracaoMateria } from "./IconesMaterias";

const DESCRICAO: Partial<Record<MateriaId, { chamada: string; texto: string }>> = {
  fisica: {
    chamada: "O movimento faz sentido quando você o vê acontecer.",
    texto: "Cada aula de Física é uma simulação com o modelo declarado: você muda as variáveis, observa o movimento e liga o que vê às equações.",
  },
  quimica: {
    chamada: "Um olhar para o que não dá para ver a olho nu.",
    texto: "Em Química, as soluções aparecem como volumes, cores e partículas proporcionais à concentração, sempre ao lado da conta.",
  },
};

export function PaginaDisciplina({ id, onOpen, foco }: { id: Exclude<MateriaId, "matematica">; onOpen: (key: string) => void; foco?: string | null }) {
  const m = materiaPorId(id)!;
  const disc = taxonomy.disciplinas.find((d) => d.id === id);
  const aulas = listAulas();
  const progresso = getProgress();
  const titulo = useRef<HTMLHeadingElement>(null);
  const main = useRef<HTMLElement>(null);

  useEffect(() => {
    if (foco === undefined) return;
    const alvo = foco === null ? null : main.current?.querySelector<HTMLButtonElement>(`[data-aula="${CSS.escape(foco)}"]`);
    if (alvo) alvo.focus();
    else titulo.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const publicadas = aulas.filter((a) => a.materia === id && a.arquivo !== null);
  const feitas = publicadas.filter((a) => progresso[a.key]).length;
  const d = DESCRICAO[id]!;

  return (
    <div className="pagina" data-area={id}>
      <BarraTopo atual={id} />
      <main className="pagina__conteudo" ref={main}>
        <section className={`area-hero area-hero--${id}`}>
          <div className="area-hero__texto">
            <p className="eyebrow">
              {m.titulo.toUpperCase()} · {publicadas.length} {publicadas.length === 1 ? "AULA PUBLICADA" : "AULAS PUBLICADAS"}
            </p>
            <h1 ref={titulo} tabIndex={-1} className="area-hero__titulo">
              {d.chamada}
            </h1>
            <p className="area-hero__sub">{d.texto}</p>
            <p className="area-hero__progresso">{feitas > 0 ? `${feitas} ${feitas === 1 ? "aula concluída" : "aulas concluídas"} neste navegador` : "Nenhuma aula concluída ainda"}</p>
          </div>
          <IlustracaoMateria id={id} className="area-hero__arte" />
        </section>

        {(disc?.setores ?? []).map((s) => (
          <section key={s.id} className="secao secao--compacta" aria-labelledby={`setor-${s.id}`}>
            <p className="eyebrow">SETOR</p>
            <h2 id={`setor-${s.id}`} className="secao__titulo secao__titulo--menor">
              {s.titulo}
            </h2>
            <div className="lista-aulas">
              {s.unidades.flatMap((u) =>
                u.aulas.map((a) => {
                  const key = `${id}/${s.id}/${u.id}/${a.id}`;
                  const feita = Boolean(progresso[key]);
                  return (
                    <button
                      key={key}
                      type="button"
                      className={`cartao-aula${feita ? " cartao-aula--feita" : ""}`}
                      data-aula={key}
                      disabled={a.arquivo === null}
                      onClick={() => onOpen(key)}
                      aria-label={`${u.titulo}, aula ${a.numero}: ${a.titulo}${feita ? " (concluída)" : ""}`}
                    >
                      <span className="cartao-aula__numero" aria-hidden="true">
                        {String(a.numero).padStart(2, "0")}
                      </span>
                      <span className="cartao-aula__texto">
                        <span className="cartao-aula__rotulo">{u.titulo}</span>
                        <span className="cartao-aula__titulo">{a.titulo}</span>
                        <span className="cartao-aula__sub">{a.subtitulo}</span>
                      </span>
                      <span className="cartao-aula__estado">{feita ? "Concluída ✓" : "Começar →"}</span>
                    </button>
                  );
                }),
              )}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

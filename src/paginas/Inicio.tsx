// Página inicial do app. Mesma personalidade da landing page (hero com marca-texto amarelo, faixa das
// disciplinas, cards pastel com ilustração, lista numerada, nota de destaque), mas com o objetivo do app:
// começar ou continuar a estudar. Nada é inventado: contagens e progresso vêm da taxonomia e do
// armazenamento local.
import { useEffect, useRef } from "react";
import { gruposDaTaxonomia, listAulas, proximaAula, type AulaEntry } from "../engine/content";
import { MATERIAS, type MateriaId } from "../engine/materias";
import { getProgress } from "../engine/progress";
import { hashDaAula, hashDaMateria } from "../engine/rota";
import { BarraTopo } from "./BarraTopo";
import { DemoTrajetoria } from "./DemoTrajetoria";
import { IconeMateria, IlustracaoMateria, IlustracaoVolei } from "./IconesMaterias";

/** Aula da questão visual em destaque (ENEM 2022, saque de vôlei). */
export const AULA_QUESTAO_VISUAL = "algebra/funcoes/saque-de-volei-enem-2022/aula-01";

const contar = (n: number, um: string, varios: string) => `${n} ${n === 1 ? um : varios}`;

/** Aula sugerida para continuar: a seguinte à conclusão mais recente. */
export function sugestaoParaContinuar(aulas: AulaEntry[], progresso: ReturnType<typeof getProgress>): AulaEntry | null {
  const feitas = aulas
    .filter((a) => a.arquivo !== null && progresso[a.key])
    .sort((a, b) => progresso[b.key].completedAt.localeCompare(progresso[a.key].completedAt));
  if (feitas.length === 0) return null;
  return proximaAula(feitas[0].key) ?? null;
}

/** Setores de cada área, na ordem da trilha (os "tópicos" do card, tirados da taxonomia). */
function setoresDa(id: MateriaId): string[] {
  return gruposDaTaxonomia()
    .filter((g) => g.materia === id)
    .flatMap((g) => g.pilar.setores.filter((s) => s.unidades.some((u) => u.aulas.some((a) => a.arquivo))).map((s) => s.titulo));
}

export function Inicio({ onOpen }: { onOpen: (key: string) => void }) {
  const aulas = listAulas();
  const progresso = getProgress();
  const titulo = useRef<HTMLHeadingElement>(null);
  const continuar = sugestaoParaContinuar(aulas, progresso);
  const recentes = aulas
    .filter((a) => a.arquivo !== null && progresso[a.key])
    .sort((a, b) => progresso[b.key].completedAt.localeCompare(progresso[a.key].completedAt))
    .slice(0, 3);
  const totalFeitas = aulas.filter((a) => a.arquivo !== null && progresso[a.key]).length;
  const questao = aulas.find((a) => a.key === AULA_QUESTAO_VISUAL && a.arquivo !== null);

  useEffect(() => {
    document.title = "Projeto Hack Brasil · Aprendizagem visual";
  }, []);

  return (
    <div className="pagina">
      <BarraTopo />
      <main className="pagina__conteudo">
        <section className="hero" aria-labelledby="hero-titulo">
          <div className="hero__texto">
            <p className="eyebrow eyebrow--ponto">
              <span aria-hidden="true" /> Matemática · Física · Química
            </p>
            <h1 id="hero-titulo" ref={titulo} tabIndex={-1} className="home__title">
              Entenda o que antes parecia <span className="marca-texto">impossível.</span>
            </h1>
            <p className="hero__sub">
              Mude um valor, veja o gráfico responder e só depois chegue à fórmula. Aulas e simulações de Matemática, Física e
              Química, passo a passo.
            </p>
            <div className="hero__acoes">
              <a className="btn" href={continuar ? hashDaAula(continuar.key) : hashDaMateria("matematica")}>
                {continuar ? "Continuar de onde parei" : "Começar a explorar"}
              </a>
              {questao && (
                <a className="btn btn--secondary" href={hashDaAula(questao.key)}>
                  Resolver uma questão do ENEM
                </a>
              )}
            </div>
            <p className="hero__nota">
              <span aria-hidden="true">✦</span> Sem cadastro: seu progresso fica salvo neste navegador.
            </p>
          </div>
          <DemoTrajetoria />
        </section>

        <div className="faixa" aria-hidden="true">
          <span className="faixa__rotulo">TRÊS ÁREAS, UM JEITO DE APRENDER</span>
          {MATERIAS.map((m) => (
            <span key={m.id}>
              <i className="ponto-area" style={{ background: m.pastel, borderColor: m.cor }} />
              {m.titulo}
            </span>
          ))}
          <span className="faixa__nota manuscrito">Curiosidade é o ponto de partida.</span>
        </div>

        <section className="secao" aria-labelledby="areas-titulo">
          <div className="secao__cabeca">
            <div>
              <p className="eyebrow">ESCOLHA POR ONDE COMEÇAR</p>
              <h2 id="areas-titulo" className="secao__titulo">
                Três áreas. <em>Um mesmo jeito de ver.</em>
              </h2>
            </div>
            <p className="secao__apoio">Cada aula parte de uma figura que você manipula, explica o porquê e termina com um desafio.</p>
          </div>
          <div className="areas">
            {MATERIAS.map((m) => {
              const daArea = aulas.filter((a) => a.materia === m.id && a.arquivo !== null);
              const feitas = daArea.filter((a) => progresso[a.key]).length;
              const setores = setoresDa(m.id);
              return (
                <a key={m.id} href={hashDaMateria(m.id)} className={`area-card area-card--${m.id}`}>
                  <span className="tag">{contar(daArea.length, "aula interativa", "aulas interativas")}</span>
                  <IlustracaoMateria id={m.id} className="area-card__arte" />
                  <span className="area-card__titulo">{m.titulo}</span>
                  <span className="area-card__resumo">{m.resumo}</span>
                  <span className="area-card__topicos">{setores.slice(0, 4).join(" · ")}</span>
                  <span className="area-card__rodape">
                    <span>{feitas > 0 ? `${contar(feitas, "aula concluída", "aulas concluídas")}` : "Nenhuma aula concluída ainda"}</span>
                    <span className="area-card__acao">
                      Abrir <span aria-hidden="true">→</span>
                    </span>
                  </span>
                </a>
              );
            })}
          </div>
        </section>

        {(continuar || recentes.length > 0) && (
          <section className="secao" aria-labelledby="continuar-titulo">
            <div className="secao__cabeca">
              <div>
                <p className="eyebrow">SEU PROGRESSO NESTE NAVEGADOR</p>
                <h2 id="continuar-titulo" className="secao__titulo">
                  Continuar aprendendo
                </h2>
              </div>
              <p className="secao__apoio">{contar(totalFeitas, "aula concluída até agora", "aulas concluídas até agora")}.</p>
            </div>
            <ol className="jornada">
              {continuar && <ItemJornada aula={continuar} rotulo="Próxima sugerida" onOpen={onOpen} />}
              {recentes.map((a) => (
                <ItemJornada key={a.key} aula={a} rotulo="Concluída" concluida onOpen={onOpen} />
              ))}
            </ol>
          </section>
        )}

        {questao && (
          <section className="secao" aria-labelledby="questao-titulo">
            <div className="nota-destaque">
              <div className="nota-destaque__arte" aria-hidden="true">
                <IlustracaoVolei />
              </div>
              <div className="nota-destaque__texto">
                <p className="eyebrow">QUESTÃO VISUAL · ENEM 2022 · QUESTÃO 150</p>
                <h2 id="questao-titulo" className="secao__titulo secao__titulo--menor">
                  Em quais ginásios o saque bate no teto?
                </h2>
                <p>
                  Leia o enunciado oficial, arraste a bola pela parábola até o ponto mais alto, compare com cada teto e só então
                  responda. Cada passo explica uma parte da conta.
                </p>
                <a className="btn" href={hashDaAula(questao.key)}>
                  Abrir a questão
                </a>
              </div>
              <span className="tag nota-destaque__tag">6 passos · resposta comentada</span>
            </div>
          </section>
        )}

        <footer className="rodape">
          <span>Projeto Hack Brasil · Aprendizagem visual · 2026</span>
          <span>Questões de vestibular com fonte oficial indicada em cada uma.</span>
        </footer>
      </main>
    </div>
  );
}

function ItemJornada({ aula, rotulo, concluida = false, onOpen }: { aula: AulaEntry; rotulo: string; concluida?: boolean; onOpen: (key: string) => void }) {
  const m = MATERIAS.find((x) => x.id === aula.materia)!;
  return (
    <li className={`jornada__item jornada__item--${m.id}${concluida ? " jornada__item--feita" : ""}`}>
      <span className="jornada__marca" aria-hidden="true">
        {concluida ? "✓" : <IconeMateria id={m.id} size={18} />}
      </span>
      <button type="button" className="jornada__botao" onClick={() => onOpen(aula.key)} data-aula={aula.key}>
        <span className="jornada__rotulo">
          {rotulo} · {m.titulo}
        </span>
        <span className="jornada__titulo">{aula.titulo}</span>
        <span className="jornada__sub">
          {aula.unidadeTitulo} · {aula.subtitulo}
        </span>
      </button>
    </li>
  );
}

/** Cartão de aula usado nas páginas de área. */
export function CartaoAula({
  aula,
  rotulo,
  concluida = false,
  onOpen,
}: {
  aula: AulaEntry;
  rotulo: string;
  concluida?: boolean;
  onOpen: (key: string) => void;
}) {
  return (
    <button type="button" className={`cartao-aula${concluida ? " cartao-aula--feita" : ""}`} onClick={() => onOpen(aula.key)} data-aula={aula.key}>
      <span className="cartao-aula__texto">
        <span className="cartao-aula__rotulo">{rotulo}</span>
        <span className="cartao-aula__titulo">{aula.titulo}</span>
        <span className="cartao-aula__sub">{aula.subtitulo}</span>
      </span>
    </button>
  );
}

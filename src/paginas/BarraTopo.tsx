// Barra superior das páginas de navegação, no padrão do cabeçalho da landing page: marca do favicon,
// nome com sobretítulo em versalete, links simples e as disciplinas marcadas pelo ponto da cor delas
// (como a faixa "Um novo olhar para as exatas" da landing). As aulas têm cabeçalho próprio.
import { MATERIAS, type MateriaId } from "../engine/materias";
import { hashDaMateria } from "../engine/rota";
import { MarcaProduto } from "./IconesMaterias";

export function BarraTopo({ atual }: { atual?: MateriaId }) {
  return (
    <header className="topo">
      <div className="topo__conteudo">
        <a className="topo__marca" href="#/" aria-label="Projeto Hack Brasil: página inicial">
          <MarcaProduto size={36} />
          <span className="topo__nome">
            Projeto Hack Brasil
            <small>APRENDIZAGEM VISUAL · 2026</small>
          </span>
        </a>
        <nav className="topo__nav" aria-label="Áreas">
          {MATERIAS.map((m) => (
            <a
              key={m.id}
              href={hashDaMateria(m.id)}
              className={`topo__link${m.id === atual ? " topo__link--atual" : ""}`}
              aria-current={m.id === atual ? "page" : undefined}
            >
              <i className="ponto-area" style={{ background: m.pastel, borderColor: m.cor }} aria-hidden="true" />
              {m.titulo}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

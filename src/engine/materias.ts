/**
 * As três áreas do app. Cores tiradas da landing page do projeto (global.css e ilustrações):
 * `pastel` é o tom da disciplina, `tinta` o fundo do card, `cor` o traço forte da ilustração (também
 * usado em texto: passa 4,5:1 sobre o creme). A cor só identifica; o resto da interface é igual.
 */
export type MateriaId = "matematica" | "fisica" | "quimica";

export interface Materia {
  id: MateriaId;
  titulo: string;
  /** Frase curta da página inicial. */
  resumo: string;
  /** Traço forte da ilustração e texto de destaque da área. */
  cor: string;
  /** Fundo do card da área. */
  tinta: string;
  /** Pastel da disciplina (pontos, selos). */
  pastel: string;
}

export const MATERIAS: Materia[] = [
  {
    id: "matematica",
    titulo: "Matemática",
    resumo: "Do símbolo ao significado: funções, geometria e probabilidade em gráficos e figuras que você manipula.",
    cor: "#446FA2",
    tinta: "#EAF2FA",
    pastel: "#92BDE8",
  },
  {
    id: "fisica",
    titulo: "Física",
    resumo: "O movimento faz sentido quando você acompanha a trajetória e muda o que a transforma.",
    cor: "#795B9E",
    tinta: "#F0EBF7",
    pastel: "#C6B3E6",
  },
  {
    id: "quimica",
    titulo: "Química",
    resumo: "Partículas, volumes e cores proporcionais para enxergar o que acontece numa solução.",
    cor: "#4F8164",
    tinta: "#EAF3EC",
    pastel: "#A8D5BA",
  },
];

export const materiaPorId = (id: string): Materia | undefined => MATERIAS.find((m) => m.id === id);

/** Matemática abre a trilha completa; é a área padrão quando nada foi escolhido. */
export const MATERIA_COM_CONTEUDO: MateriaId = "matematica";

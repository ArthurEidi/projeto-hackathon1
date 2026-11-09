// Falas fixas do treino pós-aula. Ficam fora do JSON porque valem para qualquer aula;
// o teste confere que seguem as mesmas regras de texto do conteúdo.
import type { Fala } from "../characters/Conversa";

/** Etapas do treino, nesta ordem. Cada uma é oferecida com um convite ao fim da anterior. */
export type Etapa = "basico" | "desafio" | "vestibular";
export const ETAPAS: Etapa[] = ["basico", "desafio", "vestibular"];

/** Convite gentil logo depois da comemoração do fim de aula (Paco casual). */
export const CONVITE: Fala[] = [
  {
    quem: "paco",
    humor: "happy",
    texto: "Que tal um treino rápido para fixar o que você viu? São 7 perguntas, sem pressa.",
  },
];

/** Convite para a etapa seguinte, mostrado no resultado da etapa anterior. */
export const CONVITE_PROXIMA: Record<Exclude<Etapa, "basico">, string> = {
  desafio: "Se quiser ir um pouco além, preparei mais 5 perguntas. São mais puxadas, e você vai no seu ritmo.",
  vestibular: "Quer ver como isso aparece em vestibular? Separei 4 questões que já caíram em provas.",
};

export const BOTAO_PROXIMA: Record<Exclude<Etapa, "basico">, string> = {
  desafio: "Quero ir além",
  vestibular: "Praticar com questões de vestibular",
};

/** Fala padrão do Paco (de jaleco) em cada pergunta; a questão pode trocar pela sua própria `fala`. */
export const FALA_PERGUNTA: Record<Etapa, string[]> = {
  basico: [
    "Primeiro, umas perguntas tranquilas para aquecer.",
    "Próxima pergunta, no mesmo ritmo.",
    "Leia com calma e escolha uma opção.",
    "Última das tranquilas.",
    "Agora três um pouco mais puxadas. Nada que você não tenha visto na aula.",
    "Se ajudar, faça a conta no papel.",
    "Última pergunta do treino.",
  ],
  desafio: [
    "Estas pedem um passo a mais. Leia com calma.",
    "Desenhar o triângulo no papel ajuda bastante.",
    "Nem sempre a resposta é um número inteiro.",
    "Lembre qual é o maior lado do triângulo.",
    "Última. Calcule uma geratriz de cada vez.",
  ],
  vestibular: [
    "Agora são questões que já caíram em vestibulares. Você já tem tudo o que precisa.",
    "Leia o enunciado inteiro antes de escolher.",
    "Separe os dados e desenhe o triângulo.",
    "Última. Esta pede um pouco mais de conta.",
  ],
};

export const CONTADOR: Record<Etapa, string> = {
  basico: "Pergunta",
  desafio: "Desafio",
  vestibular: "Vestibular",
};

export const SUBTITULO_RESULTADO: Record<Etapa, [string, string]> = {
  basico: ["acerto no treino", "acertos no treino"],
  desafio: ["acerto nas mais puxadas", "acertos nas mais puxadas"],
  vestibular: ["acerto nas questões de vestibular", "acertos nas questões de vestibular"],
};

/** Fechamento conforme o número de acertos. A Tati só aparece quando o aluno acerta tudo. */
export function falasResultado(etapa: Etapa, acertos: number, total: number): Fala[] {
  const bom = acertos >= Math.ceil(total * 0.6);
  const textos: Record<Etapa, { tudo: [string, string]; bom: string; aprendendo: string }> = {
    basico: {
      tudo: ["Acertou tudo. Você pegou mesmo o jeito desta aula.", "Tá bom, agora até eu fiquei convencida."],
      bom: "Mandou bem, quase tudo certo. O que escapou hoje fica mais fácil na próxima.",
      aprendendo: "Treinar é isso: errar aqui para acertar depois. Se quiser, reveja a aula com calma.",
    },
    desafio: {
      tudo: ["Todas certas, mesmo as mais puxadas. Isso é domínio de verdade.", "Essas eu ia errar, confesso."],
      bom: "Bom resultado nas mais puxadas. Elas pedem atenção mesmo.",
      aprendendo: "Essas eram mais difíceis mesmo. Errar aqui também é aprender.",
    },
    vestibular: {
      tudo: ["Nenhum erro em questões de vestibular. Dá para ficar orgulhoso.", "Questão de prova e tudo certo? Respeito."],
      bom: "Você já resolve questão de vestibular com o que aprendeu hoje.",
      aprendendo: "Vestibular pergunta com outras palavras, e isso pega mesmo. Com treino, fica natural.",
    },
  };
  const t = textos[etapa];
  if (acertos === total) {
    return [
      { quem: "paco", humor: "happy", texto: t.tudo[0] },
      { quem: "tati", humor: "happy", texto: t.tudo[1] },
    ];
  }
  if (bom) return [{ quem: "paco", humor: "happy", texto: t.bom }];
  return [{ quem: "paco", humor: "encouraging", texto: t.aprendendo }];
}

export const todasAsFalasDoTreino = (): string[] => [
  ...CONVITE.map((f) => f.texto),
  ...Object.values(CONVITE_PROXIMA),
  ...Object.values(FALA_PERGUNTA).flat(),
  // 0, 4 e 5 acertos em 5 cobrem as três faixas: aprendendo, bom e tudo certo.
  ...ETAPAS.flatMap((e) => [0, 4, 5].flatMap((n) => falasResultado(e, n, 5).map((f) => f.texto))),
];

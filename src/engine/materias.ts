/** Matérias do Ensino Médio mostradas no topo da trilha. Sprites em public/materias/<id>.webp
 *  (gerados por sprites/recortar_materias.py). Só Matemática tem conteúdo por enquanto:
 *  os pilares de content/taxonomy.json pertencem a ela. */
export interface Materia {
  id: string;
  titulo: string;
}

export const MATERIAS: Materia[] = [
  { id: "matematica", titulo: "Matemática" },
  { id: "portugues", titulo: "Português" },
  { id: "literatura", titulo: "Literatura" },
  { id: "historia", titulo: "História" },
  { id: "geografia", titulo: "Geografia" },
  { id: "filosofia", titulo: "Filosofia" },
  { id: "sociologia", titulo: "Sociologia" },
  { id: "biologia", titulo: "Biologia" },
  { id: "fisica", titulo: "Física" },
  { id: "quimica", titulo: "Química" },
  { id: "artes", titulo: "Artes" },
  { id: "educacao-fisica", titulo: "Educação Física" },
];

export const MATERIA_COM_CONTEUDO = "matematica";

export const spriteMateria = (id: string) => `${import.meta.env.BASE_URL}materias/${id}.webp`;

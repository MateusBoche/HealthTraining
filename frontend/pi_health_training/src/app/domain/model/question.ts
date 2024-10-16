export interface Question {
  question: string,
  answer: boolean,
  category: string,
  id: number,
  phase: number // Adicione este campo para suportar a fase
  link: string,
}

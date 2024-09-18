export interface Question {
  question: string;
  answer: boolean;
  category: string;
  id: string;
  phase: number; // Adicione este campo para suportar a fase
}

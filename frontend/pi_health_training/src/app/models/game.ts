export interface Game {
    id?: string;
    status: string;
    nivel_atual: number;
    usuario_id?: string;
    numero_acertos: number;
    numero_erros: number;
    data_de_criacao: string;
}
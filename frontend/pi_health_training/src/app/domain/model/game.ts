export interface Game {
    id?: string;
    status: string;
    nivelAtual: number;
    usuarioID?: string;
    numeroAcertos: number;
    numeroErros: number;
    dataDeCriacao: string;
}
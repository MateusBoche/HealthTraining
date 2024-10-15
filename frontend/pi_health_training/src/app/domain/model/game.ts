export interface Game {
    id?: number,
    status: string,
    nivelAtual: number,
    usuarioID: number,
    numeroAcertos: number,
    numeroErros: number,
    dataDeCriacao: string,
}
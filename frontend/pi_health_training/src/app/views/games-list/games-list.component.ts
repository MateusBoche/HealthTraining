import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { RouterModule } from '@angular/router';  // Importar RouterModule

@Component({
  selector: 'app-games-list',
  standalone: true,
  imports: [CommonModule, RouterModule],  // Adicionar RouterModule aqui
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

  jogos!: Game[];
  usuario!: User;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  async ngOnInit() {
    await this.buscar_dados_usuario();
    this.carregar_jogos();
  }

  async carregar_jogos() {
    this.http.get<Game[]>(`http://localhost:3000/game?usuario_id=${this.usuario.id}`).subscribe({
      next: value => {
        this.jogos = value;
      },
      error: error => {
        this.toastr.error('Erro ao carregar os jogos');
      }
    });
  }

  async buscar_dados_usuario() {
    const email = localStorage.getItem('email');
    const senha = localStorage.getItem('senha');

    const resposta = await firstValueFrom(this.http.get<User[]>(`http://localhost:3000/user?email=${email}&senha=${senha}`))
    this.usuario = resposta[0];
  }
  async atualizarJogos() {
    await this.buscar_dados_usuario();  // Recarregar dados do usuário
    this.carregar_jogos();  // Recarregar a lista de jogos
  }

  deleteGame(gameId: string | undefined): void {
    if (!gameId) return; // Verifica se gameId é undefined e retorna para evitar erros
  
    // Filtra a lista de jogos para remover o jogo com o ID fornecido
    this.jogos = this.jogos.filter(game => game.id !== gameId);
  }
  
}
  


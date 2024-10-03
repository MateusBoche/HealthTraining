import { Component, OnInit } from '@angular/core';
import { Game } from '../../../domain/model/game';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../domain/model/user';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { Router, RouterModule } from '@angular/router';


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

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  async ngOnInit() {
    await this.buscarDadosUsuario();
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

  async buscarDadosUsuario() {
    const email = localStorage.getItem('email');
    const senha = localStorage.getItem('senha');

    const resposta = await firstValueFrom(this.http.get<User[]>(`http://localhost:3000/user?email=${email}&senha=${senha}`))
    this.usuario = resposta[0];
  }
  async atualizarJogos() {
    await this.buscarDadosUsuario();  // Recarregar dados do usuário
    this.carregar_jogos();  // Recarregar a lista de jogos
  }

  deleteGame(gameId: string | undefined): void {
    if (!gameId) return; // Verifica se gameId é undefined e retorna para evitar erros
  
    // Filtra a lista de jogos para remover o jogo com o ID fornecido
    this.jogos = this.jogos.filter(game => game.id !== gameId);
  }
  
}
  


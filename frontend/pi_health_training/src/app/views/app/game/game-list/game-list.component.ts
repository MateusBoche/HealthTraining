import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {firstValueFrom} from 'rxjs';
import {CommonModule} from '@angular/common';  
import {Router, RouterModule} from '@angular/router';
import {User} from "../../../../domain/model/user.model";
import {Game} from "../../../../domain/model/game";
import { GameListService } from '../../../../services/game/game-list.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css',
  providers: [DatePipe]
})
export class GameListComponent implements OnInit {

  jogos: Game[] = [];
  usuario!: User;

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router, private gameListService: GameListService) {
  }

  async ngOnInit() {
    await this.buscarDadosUsuario();
    console.log(1)
    this.carregarJogos();
  }

  async carregarJogos() {
    if (!this.usuario || !this.usuario.id) return;

    try {
      this.jogos = await this.gameListService.getGamesByUserId(this.usuario.id);

      this.jogos.sort((a, b) => {
        const dateA = new Date(a.dataDeCriacao).getTime();
        const dateB = new Date(b.dataDeCriacao).getTime();
        return dateB - dateA; // Para ordem decrescente
      });

      
      console.log(2);
    } catch (error) {
      this.toastr.error('Erro ao carregar os jogos');
    }
  }

  async buscarDadosUsuario() {
    const email = localStorage.getItem('email');
    const senha = localStorage.getItem('password');
  
    console.log('Email:', email);
    console.log('Senha:', senha);
  
    if (!email || !senha) {
      this.toastr.error('Email ou senha não encontrados. Por favor, faça login novamente.');
      return;
    }
  
    try {
      const resposta = await this.gameListService.getUserByEmailAndPassword(email, senha);
      console.log('Resposta do backend:', resposta);
  
      // Verifique se a resposta é um objeto em vez de um array
      if (resposta) {
        this.usuario = resposta;
        console.log('Usuário carregado:', this.usuario);
      } else {
        this.toastr.error('Usuário não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      this.toastr.error('Erro ao carregar os dados do usuário');
    }
  }
  
  

  async atualizarJogos() {
    await this.buscarDadosUsuario();  
    this.carregarJogos();  
  }

  deleteGame(gameId: number | undefined): void {
    if (!gameId) return;
  
    // Chamar o serviço para excluir o jogo no backend
    this.gameListService.deleteGame(gameId).subscribe({
      next: () => {
        // Remover o jogo da lista local após a exclusão bem-sucedida no backend
        this.jogos = this.jogos.filter(game => game.id !== gameId);
        this.toastr.success('Jogo excluído com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao excluir o jogo:', err);
        this.toastr.error('Erro ao excluir o jogo.');
      }
    });
  }
  

}

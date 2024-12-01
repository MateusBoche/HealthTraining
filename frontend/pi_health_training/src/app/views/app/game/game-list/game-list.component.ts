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
    if (!this.usuario || !this.usuario.email) {
      console.warn("Usuário não encontrado ou ID inválido:", this.usuario);
      return;
    }
  
    try {
      // Chama o serviço para obter os jogos do usuário
      this.jogos = await this.gameListService.getGamesByUserEmail(this.usuario.email);
  
      // Ordena os jogos por data de criação em ordem decrescente
      this.jogos.sort((a, b) => {
        const dateA = new Date(a.dataDeCriacao).getTime();
        const dateB = new Date(b.dataDeCriacao).getTime();
        return dateB - dateA;
      });
  
      console.log("Jogos carregados:", this.jogos);
    } catch (error) {
      console.error("Erro ao carregar os jogos:", error);
      this.toastr.error('Erro ao carregar os jogos.');
    }
  }
  
  

  async buscarDadosUsuario() {
    try {
      // Obtendo o usuário autenticado diretamente
      const resposta = this.gameListService.getUserFromAuthentication();
      console.log("Usuário autenticado:", resposta);
  
      if (resposta) {
        this.usuario = resposta; // Atribui o usuário retornado
        console.log("Usuário carregado:", this.usuario);
  
        if (!this.usuario.email) {
          console.error("ID do usuário está ausente.");
          this.toastr.error("Não foi possível encontrar o ID do usuário.");
        }
      } else {
        this.toastr.error('Usuário não encontrado.');
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      this.toastr.error('Erro ao carregar os dados do usuário.');
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

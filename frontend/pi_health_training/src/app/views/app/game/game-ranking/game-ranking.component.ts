import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {firstValueFrom} from 'rxjs';
import {CommonModule} from '@angular/common';  
import {Router, RouterModule} from '@angular/router';
import {User} from "../../../../domain/model/user.model";
import {Game} from "../../../../domain/model/game";
import { GameRankingService } from '../../../../services/game/game-ranking.service';
import { GameList } from '../../../../domain/dto/gamelist';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../../../../services/security/authentication.service';


@Component({
  selector: 'app-game-ranking',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './game-ranking.component.html',
  styleUrl: './game-ranking.component.css',
  providers: [DatePipe]
})
export class GameRankingComponent implements OnInit {

  jogos: GameList [] = [];
  usuario!: User;

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router, private gameRankingService: GameRankingService, private authenticationService: AuthenticationService) {
  }

  async ngOnInit() {
    await this.buscarDadosUsuario();
    console.log(1)
    this.carregarJogos();
  }

  async carregarJogos() {

    try {
      this.jogos = await this.gameRankingService.getGamesRanking();
      console.log(2);
    } catch (error) {
      this.toastr.error('Erro ao carregar os jogos');
    }
  }

  async buscarDadosUsuario() {
    try {
      // Obtendo o usuário autenticado diretamente
      const resposta = this.gameRankingService.getUserFromAuthentication();
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



}

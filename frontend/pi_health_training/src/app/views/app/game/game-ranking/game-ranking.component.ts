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

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router, private gameRankingService: GameRankingService) {
  }

  async ngOnInit() {
    await this.buscarDadosUsuario();
    console.log(1)
    this.carregarJogos();
  }

  async carregarJogos() {
    if (!this.usuario || !this.usuario.id) return;

    try {
      this.jogos = await this.gameRankingService.getGamesRanking();
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
      const resposta = await this.gameRankingService.getUserByEmailAndPassword(email, senha);
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



}

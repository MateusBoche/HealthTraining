import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {firstValueFrom} from 'rxjs';
import {CommonModule} from '@angular/common';  
import {Router, RouterModule} from '@angular/router';
import {User} from "../../../../domain/model/user.model";
import {Game} from "../../../../domain/model/game";
import { GameListService } from '../../../../services/game/game-list.service';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css'
})
export class GameListComponent implements OnInit {

  jogos!: Game[];
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
      this.jogos = await this.gameListService.getGamesByUserId(Number(this.usuario.id));
      console.log(2);
    } catch (error) {
      this.toastr.error('Erro ao carregar os jogos');
    }
  }

  async buscarDadosUsuario() {
    const email = localStorage.getItem('email');
    const senha = localStorage.getItem('senha');

    try {
      const resposta = await this.gameListService.getUserByEmailAndPassword(email, senha);
      this.usuario = resposta[0];
    } catch (error) {
      this.toastr.error('Erro ao carregar os dados do usuário');
    }
  }

  async atualizarJogos() {
    await this.buscarDadosUsuario();  
    this.carregarJogos();  
  }

  deleteGame(gameId: number | undefined): void {
    if (!gameId) return; 

    
    this.jogos = this.jogos.filter(game => game.id !== gameId);
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from "../../../../domain/model/user.model";
import { Game } from '../../../../domain/model/game';
import { AuthenticationService } from "../../../../services/security/authentication.service";
import { PrepareToStartService } from '../../../../services/game/prepare-to-start.service';

@Component({
  selector: 'app-prepare-to-start',
  standalone: true,
  imports: [],
  templateUrl: './prepare-to-start.component.html',
  styleUrls: ['./prepare-to-start.component.css'] // Corrigido para plural
})
export class PrepareToStartComponent implements OnInit {

  jogo!: Game;
  usuario!: User;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private prepareToStartService: PrepareToStartService
  ) {}

  ngOnInit(): void {
    this.buscarDadosUsuario();
  }

  async startGame() {
    if (!this.usuario) {
      this.toastr.error('Nenhum usuário encontrado para iniciar o jogo.');
      return;
    }

    if (!this.usuario || this.usuario.id === undefined) {
      throw new Error('Usuário ou ID do usuário não encontrado');
  }

    this.jogo = {
      status: "Pendente",
      nivelAtual: 1,
      numeroAcertos: 0,
      usuarioID: this.usuario.id || 0,
      numeroErros: 0,
      pontuacao: 0,
      dataDeCriacao: new Date().toISOString().replace('T', ' ').replace('Z', '').split('.')[0]
    };

    try {
      const novoJogo = await this.prepareToStartService.startNewGame(this.jogo);
      console.log('Novo jogo:', novoJogo);
      this.jogo = { ...this.jogo, ...novoJogo }; 
      this.toastr.success('Jogo iniciado com sucesso');
      this.router.navigate(["game", "game", this.jogo.id]);
    } catch (error) {
      this.toastr.error('Erro ao iniciar o jogo');
      console.error('Erro ao iniciar o jogo:', error);
    }
  }

  async buscarDadosUsuario() {
    try {
      const user = this.authenticationService.getAuthenticatedUser();

      if (!user) {
        this.toastr.error('Usuário não autenticado.');
        console.error('Usuário não autenticado.');
        return;
      }

      this.usuario = user;
      console.log(`Usuário autenticado: ${this.usuario.fullName || 'Nome não disponível'}`);
    } catch (error) {
      this.toastr.error('Erro ao buscar os dados do usuário');
      console.error('Erro ao buscar os dados do usuário:', error);
    }
  }
}

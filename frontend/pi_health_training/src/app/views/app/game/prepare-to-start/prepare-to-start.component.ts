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

    this.jogo = {
      usuarioID: Number(this.usuario.id),
      status: "Pendente",
      nivelAtual: 1,
      numeroAcertos: 0,
      numeroErros: 0,
      pontuacao: 0,
      dataDeCriacao: new Date().toISOString().replace('T', ' ').replace('Z', '').split('.')[0]
    };

    try {
      const novoJogo = await this.prepareToStartService.startNewGame(this.jogo);
      console.log(novoJogo);
      this.jogo = { ...this.jogo, ...novoJogo }; 
      this.toastr.success('Jogo iniciado com sucesso');
      this.router.navigate(["game", "game", this.jogo.id]);
    } catch (error) {
      this.toastr.error('Erro ao iniciar o jogo');
      console.error(error);
    }
  }

  async buscarDadosUsuario() {
    const email = this.authenticationService.getOnlineUserEmail();
    const senha = this.authenticationService.getOnlineUserPassword();

    console.log(`Buscando usuário com email: ${email}`);

    try {
      const users = await this.prepareToStartService.getUserByEmailAndPassword(email, senha);

      if (users.length === 0) {
        this.toastr.error('Usuário não encontrado.');
        return;
      }

      // Filtra o usuário com base no email (ou outras informações se necessário)
      const foundUser = users.find(user => user.email === email);

      if (!foundUser) {
        this.toastr.error('Usuário não encontrado com as credenciais fornecidas.');
        return;
      }

      this.usuario = foundUser; // Agora podemos garantir que o usuário foi encontrado

      console.log(`Usuário logado: ${this.usuario?.fullName || 'Nome não disponível'}`);

    } catch (error) {
      this.toastr.error('Erro ao buscar os dados do usuário');
      console.error('Erro ao buscar os dados do usuário:', error);
    }
  }
}

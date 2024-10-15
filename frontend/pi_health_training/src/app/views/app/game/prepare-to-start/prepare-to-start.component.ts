import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Router, RouterModule} from '@angular/router';
import {User} from "../../../../domain/model/user.model";
import {Game} from '../../../../domain/model/game';
import {AuthenticationService} from "../../../../services/security/authentication.service";
import { PrepareToStartService } from '../../../../services/game/prepare-to-start.service';

@Component({
  selector: 'app-prepare-to-start',
  standalone: true,
  imports: [],
  templateUrl: './prepare-to-start.component.html',
  styleUrl: './prepare-to-start.component.css'
})
export class PrepareToStartComponent implements OnInit {

  jogo!: Game;
  usuario!: User;

  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private prepareToStartService: PrepareToStartService,) {
  }

  ngOnInit(): void {
    this.buscarDadosUsuario();
  }


  async startGame() {
    console.log(this.usuario);
  
    this.jogo = {
      usuarioID: Number(this.usuario.id),
      status: "Pendente",
      nivelAtual: 1,
      numeroAcertos: 0,
      numeroErros: 0,
      dataDeCriacao: new Date().toISOString().replace('T', ' ').replace('Z', '').split('.')[0]
    };
  
    try {
      const novoJogo = await this.prepareToStartService.startNewGame(this.jogo); 
      this.jogo = { ...this.jogo, ...novoJogo }; 
      this.toastr.success('Jogo iniciado com sucesso');
      console.log(this.jogo);
      this.router.navigate(["game", "game", this.jogo.id]);
    } catch (error) {
      this.toastr.error('Erro ao iniciar o jogo');
    }
  }

  async buscarDadosUsuario() {
    const email = this.authenticationService.getOnlineUserEmail();
    const senha = this.authenticationService.getOnlineUserPassword();

    console.log(`${email} - ${senha}`);

    try {
      const users = await this.prepareToStartService.getUserByEmailAndPassword(email, senha);
      this.usuario = users[0];
      console.log(this.usuario);
    } catch (error) {
      this.toastr.error('Erro ao buscar os dados do usuário');
    }
  }
}
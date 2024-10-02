import { Component, OnInit } from '@angular/core';
import { Game } from '../../domain/model/game';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../domain/model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  jogo!: Game;
  usuario!: User;

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.buscar_dados_usuario();
  }

  startGame() {
    console.log(this.usuario);

    this.jogo = {
      usuarioID: this.usuario.id,
      status: "Pendente",
      nivelAtual: 1,
      numeroAcertos: 0,
      numeroErros: 0,
      dataDeCriacao: new Date().toISOString().replace('T', ' ').replace('Z', '').split('.')[0]
    }

    this.http.post<Game>('http://localhost:3000/game/', this.jogo).subscribe({
      next: value => {
        this.jogo = value;
        this.toastr.success('Jogo iniciado com sucesso');
        console.log(this.jogo)

        let route = '/game/game/' + this.jogo.id;
        console.log('1:' + route);

        this.router.navigate([route]);
        console.log('2');
        // this.router.navigate(["game", "game", this.jogo.id]);
      },
      error: error => {
        this.toastr.error('Erro ao iniciar o jogo');
      }
    });
  }

  async buscar_dados_usuario() {
    const email = localStorage.getItem('email');
    const senha = localStorage.getItem('senha');

    console.log(`${email} - ${senha}`);

    return this.http.get<User[]>(`http://localhost:3000/user?email=${email}&senha=${senha}`).subscribe({
      next: value => {
        this.usuario = value[0];
        console.log(this.usuario);

      },
      error: error => {

      }
    });
  }
}
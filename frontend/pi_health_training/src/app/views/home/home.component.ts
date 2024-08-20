import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user';
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
      usuario_id: this.usuario.id,
      status: "Pendente",
      nivel_atual: 1,
      numero_acertos: 0,
      numero_erros: 0,
      data_de_criacao: new Date().toISOString().replace('T', ' ').replace('Z', '').split('.')[0]
    }

    this.http.post<Game>('http://localhost:3000/game', this.jogo).subscribe({
      next: value => {
        this.jogo = value;
        this.toastr.success('Jogo iniciado com sucesso');

        this.router.navigate([`/jogo/${this.jogo.id}`]);
      },
      error: error => {
        this.toastr.error('Erro ao iniciar o jogo');
      }
    });
  }

  async buscar_dados_usuario() {
    const email = localStorage.getItem('email');
    const senha = localStorage.getItem('senha');

    return this.http.get<User[]>(`http://localhost:3000/user?email=${email}&senha=${senha}`).subscribe({
      next: value => {
        this.usuario = value[0];

      },
      error: error => {

      }
    });
  }
}
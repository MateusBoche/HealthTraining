import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationService } from "./services/security/authentication.service";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'lds-frontend-2';
  logado: boolean = this.authenticationService.isAuthenticated(); // Adicionei a propriedade logado

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.logado = this.authenticationService.isAuthenticated(); // Verifica se o usuário está autenticado
  }

  sair() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
    this.logado = false; // Atualiza o status de logado após sair
  }

  alternarMenu() {
    // Lógica para alternar o menu, se necessário
  }
}

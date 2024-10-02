import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  menu = false;

  logado: any = true;

  title = 'pi_health_training';

  ngOnInit() {
    this.esta_logado();
  }

  async esta_logado() {
    const email = localStorage.getItem('email');
    const senha = localStorage.getItem('senha');

    if (!email || !senha) {
      this.logado = false;
    }    
    
    return this.http.get<Object[]>(`http://localhost:3000/user?email=${email}&senha=${senha}`).subscribe({
      next: value => {
        const usuario = value[0];
        if (!usuario) {
          this.logado = false;
        } else {
          this.logado = true;
        }
      },
      error: error => {
        this.logado = false;
      }
    });
  }

  async sair() {
    localStorage.removeItem('email');
    localStorage.removeItem('senha');
    this.logado = false;

    await this.router.navigate(['/account/sign-in']);
  }

  alternarMenu() {
    this.menu = !this.menu;
  }

}

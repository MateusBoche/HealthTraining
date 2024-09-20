import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {

  email = new FormControl(null)
  senha = new FormControl(null)

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.esta_logado();
  }


  async esta_logado() {

    const email = localStorage.getItem('email');
    const senha = localStorage.getItem('senha');
    
    return this.http.get<Object[]>(`http://localhost:3000/user?email=${email}&senha=${senha}`).subscribe({
      next: async value => {
        const usuario = value[0];
        if (usuario) {
          await new Promise(resolve => setTimeout(resolve, 200));
          this.router.navigate(['/'])
        }
      },
      error: error => {
        
      }
    });
  }

  async entrar() {
    const email = this.email.value
    const senha = this.senha.value

    if (!email || !senha)
      return this.toastr.error("Preecha os campos de email e senha!")

    const retorno = await firstValueFrom(this.http.get<Object[]>(`http://localhost:3000/user?email=${email}&senha=${senha}`))
    const usuario = retorno[0]
    
    if (!usuario)
      return this.toastr.error("Email ou senha incorretos!")
    else {
      localStorage.setItem("email", email)
      localStorage.setItem("senha", senha)
      this.toastr.success(`Logado com sucesso como ${email} ${senha}`)
      return window.location.reload()
    }
  }

}

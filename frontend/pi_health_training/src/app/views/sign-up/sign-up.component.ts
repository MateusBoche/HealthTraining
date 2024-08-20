import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  constructor(private http: HttpClient, private toastr: ToastrService, private router : Router) { }

  nome_completo = new FormControl(null)
  email = new FormControl(null)
  senha = new FormControl(null)
  confirmacao_da_senha = new FormControl(null)

  cadastrar() {
    const nome_completo = this.nome_completo.value
    const email = this.email.value
    const senha = this.senha.value
    const confirmacao_da_senha = this.confirmacao_da_senha.value

    const usuario = {
      nome_completo,
      email,
      senha
    }

    if (!nome_completo || !email || !senha || !confirmacao_da_senha){
      return this.toastr.error("Preencha todos os campos antes de continuar!")
    }

    if (confirmacao_da_senha != senha){
      return this.toastr.error("As senhas não se coincidem!")
    }

    try {
      return this.http.post("http://localhost:3000/user", usuario).subscribe({
        next: value => {
          this.toastr.success("Cadastro feito com sucesso!")
          this.router.navigate(['/entrar'])
        },
        error: error => {
          this.toastr.error("Houve um erro ao inserir o usuário no sistema!")
        }
      })
      
    } catch (error) {
      return this.toastr.error("Houve um erro ao fazer o cadastro!")
    }
  }
}

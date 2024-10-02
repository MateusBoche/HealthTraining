import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.css'
})
export class PasswordRecoveryComponent {

  codigo_de_recuperacao_certo: any;

  email = new FormControl(null)
  codigo_de_recuperacao = new FormControl(null)
  senha = new FormControl(null)
  confirmacao_da_senha = new FormControl(null)

  constructor(private toastr: ToastrService, private http: HttpClient, private router: Router) { }


  async receberEmail() {
    if (!this.email.value) {
      this.toastr.error("Preencha o campo de email!");
      return;
    }
    
    const usuario = await firstValueFrom(this.http.get<User[]>(`http://localhost:3000/user?email=${this.email.value}`));

    if (usuario.length == 0) {
      this.toastr.error("Usuário não encontrado!");
      return;
    }

    this.codigo_de_recuperacao_certo = Math.floor(Math.random() * 1000000);
    alert(`O código de recuperação é: ${this.codigo_de_recuperacao_certo}`);
  }

  async recuperarSenha() {
    if (!this.email.value) {
      this.toastr.error("Preencha o campo de email!");
      return;
    }

    if (!this.codigo_de_recuperacao.value) {
      this.toastr.error("Preencha o campo de código de recuperação!");
      return;
    }

    if (!this.senha.value) {
      this.toastr.error("Preencha o campo de senha!");
      return;
    }

    if (!this.confirmacao_da_senha.value) {
      this.toastr.error("Preencha o campo de confirmação de senha!");
      return;
    }

    if (this.codigo_de_recuperacao.value != this.codigo_de_recuperacao_certo) {
      this.toastr.error("Código de recuperação incorreto!");
      return;
    }

    if (this.senha.value != this.confirmacao_da_senha.value) {
      this.toastr.error("As senhas não coincidem!");
      return;
    }

    const resposta = await firstValueFrom(this.http.get<User[]>(`http://localhost:3000/user?email=${this.email.value}`));
    const usuario = resposta[0];

    if (!usuario) {
      this.toastr.error("Usuário não encontrado!");
      return;
    }

    usuario.senha = this.senha.value;
    
    this.http.put(`http://localhost:3000/user/${usuario.id}`, usuario)
    .subscribe(
      {
        next: value => {
          this.toastr.success("Senha recuperada com sucesso!");
          this.router.navigate(['/entrar']);
        },
        error: error => {
          this.toastr.error("Erro ao recuperar a senha!");
        }
      }
    );
  }

}

interface User {
  id: number;
  nome_completo: string;
  email: string;
  senha: string;
}
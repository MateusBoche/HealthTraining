import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { User } from '../../domain/model/user.model';

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent {

  codigoDeRecuperacaoCerto: number | null = null;

  email = new FormControl('');
  codigoDeRecuperacao = new FormControl('');
  senha = new FormControl('');
  confirmacaoDaSenha = new FormControl('');

  constructor(private toastr: ToastrService, private http: HttpClient, private router: Router) {}

  async gerarCodigo() {
    if (!this.email.value) {
      this.toastr.error("Preencha o campo de email!");
      return;
    }
  
    try {
      const usuario = await firstValueFrom(this.http.get<User>(`http://localhost:8081/api/user/email/${this.email.value}`));
  
      if (!usuario) {
        this.toastr.error("Usuário não encontrado!");
        return;
      }
  
      // Gerar o código de recuperação de 6 dígitos
      this.codigoDeRecuperacaoCerto = Math.floor(100000 + Math.random() * 900000);
  
      // Exibir o código em um pop-up (alerta ou Toast)
      alert(`O código de recuperação é: ${this.codigoDeRecuperacaoCerto}`);
      this.toastr.success("Código gerado com sucesso! Verifique seu código.");
    } catch (error) {
      this.toastr.error("Erro ao buscar o usuário! Verifique seu email.");
      console.error("Erro ao buscar o usuário:", error);
    }
  }
  

  async recuperarSenha() {
    if (!this.email.value) {
      this.toastr.error("Preencha o campo de email!");
      return;
    }
  
    if (!this.codigoDeRecuperacao.value) {
      this.toastr.error("Preencha o campo de código de recuperação!");
      return;
    }
  
    if (!this.senha.value || !this.confirmacaoDaSenha.value) {
      this.toastr.error("Preencha os campos de senha!");
      return;
    }
  
    if (Number(this.codigoDeRecuperacao.value) !== this.codigoDeRecuperacaoCerto) {
      this.toastr.error("Código de recuperação incorreto!");
      return;
    }
  
    if (this.senha.value !== this.confirmacaoDaSenha.value) {
      this.toastr.error("As senhas não coincidem!");
      return;
    }
  
    try {
      const usuario = await firstValueFrom(this.http.get<User>(`http://localhost:8081/api/user/email/${this.email.value}`));
  
      if (!usuario) {
        this.toastr.error("Usuário não encontrado!");
        return;
      }
  
      // Cria o payload para a recuperação da senha
      const payload = {
        id: usuario.id,  // ID do usuário
        newPassword: this.senha.value
      };
  
      // Chama o endpoint de recuperação de senha
      await firstValueFrom(this.http.put(`http://localhost:8081/api/user/recovery-password`, payload));
      this.toastr.success("Senha recuperada com sucesso!");
      this.router.navigate(['/entrar']);
    } catch (error) {
      this.toastr.error("Erro ao recuperar a senha!");
      console.error("Erro ao recuperar a senha:", error);
    }
  }
}
import {Component, OnInit} from '@angular/core';

import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';
import {UserCredential} from '../../../domain/dto/user-credential.dto';
import {AuthenticationService} from '../../../services/security/authentication.service';
import {UserReadService} from '../../../services/user/user-read.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {

  email = new FormControl(null);
  password = new FormControl(null);

  isLoginIncorrect: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    ) {
  }

  ngOnInit(): void {
    this.isLoginIncorrect = false;
    this.loginIfCredentialsIsValid();
  }

  loginIfCredentialsIsValid() {
    console.log(`checking if loginIfCredentialsIsValid`)
    if (this.authenticationService.isAuthenticated()) {
      console.log(`loginIfCredentialsIsValid ok`)
      this.router.navigate(['']);
      return;
    }
    console.log(`loginIfCredentialsIsValid - error`);
  }

  login() {
    let credentials: UserCredential = {
      email: this.email.value!,
      password: this.password.value!,
    };

    console.log(credentials);
    this.authenticationService.authenticate(credentials)
      .subscribe({
        next: (value) => {
          console.log(value);

          if (!value) {
            this.isLoginIncorrect = true;
            console.log('!value');
            return;
          }

          console.log('deu boa, tentando add to local storage');
          this.isLoginIncorrect = true;
          this.authenticationService.addDataToLocalStorage(credentials.email, credentials.password);
          console.log(' local storage ok');
          this.toastr.success('Logado');
          
          this.router.navigate(['']).then(() => {
            setTimeout(() => {
              window.location.reload(); // Atualiza a página após redirecionar
            }, 2000); // Aguarda 2 segundos
          });
          
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Email ou senha invalido');
        },
      });
  }

  validateFields() {
    return this.email.valid && this.password.valid;
  }


}

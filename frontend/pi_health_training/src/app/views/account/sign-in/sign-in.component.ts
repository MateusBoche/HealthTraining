import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { __values } from 'tslib';
import { Token } from '@angular/compiler';
import e from 'express';
import { AuthenticatedUser } from '../../../domain/dto/authenticated-user.dto';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { UserCredential } from '../../../domain/dto/user-credential.dto';

@Component({
  selector: 'lds-sign-in',
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
isFormValid(): unknown {
throw new Error('Method not implemented.');
}

  // email = new FormControl(null, Validators.email);
  email = new FormControl(null);
  password = new FormControl(null, [
    Validators.minLength(1), Validators.maxLength(10)
  ]);

  isLoginIncorrect = false;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private toastrService: ToastrService,) {
  }

  ngOnInit(): void {
    this.loginIfCredentialsIsValid();
  }

  loginIfCredentialsIsValid() {
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  // async login() {
  //   // let emailField = this.email.value;
  //   // let passwordField = this.password.value;
  //   let credential: UserCredential = {
  //     email: this.email.value!,
  //     password: this.password.value!
  //   };

  //   // console.log(`email: ${credential.email}`);
  //   // console.log(`senha: ${credential.password}`);
  //   // console.log(credential);

  //   // this.authenticationService
  //   // .authenticate(credential)
  //   // .subscribe(
  //   //   {
  //   //     next: (value) => {
  //   //       console.log(value);
  //   //
  //   //       if(!value) {
  //   //         return;
  //   //       }
  //   //
  //   //       this.authenticationService
  //   //       .addCredentialsToLocalStorage(credential.email);
  //   //
  //   //       this.router.navigate(['/']);
  //   //     },
  //   //     error: (err) => {
  //   //       console.error(err);
  //   //     }
  //   //   }
  //   // );
  //   try {
  //     await this.authenticationService.authenticate(credential);
  //     this.authenticationService
  //       .addCredentialsToLocalStorage(credential.email);

  //     await this.router.navigate(['/']);
  //   } catch (e: any) {
  //     console.error(`erro: ${e}`);
  //     this.toastrService.error(e.message);
  //     this.password.setValue(null);
  //   }
  // }

  async login() {
    let credential: UserCredential = {
      email: this.email.value!,
      password: this.password.value!
    };

    try {
      (await (this.authenticationService.authenticate(credential))).subscribe({
        next: (value: any) => {
          console.log('sucesso!')
          console.log(value);

          const token = value.token;
          console.log('-----------------');
          console.log(token);

          const payload = token.split('.')[1];
          console.log('---------- payload -----------');

          const decodedPayload = atob(payload);
          const decodedData = JSON.parse(decodedPayload);

          console.log('--------DecodedData---------');
          console.log(decodedData);

          const email = decodedData.sub;
          const fullName = decodedData.fullName;
          const role = decodedData.role;

          console.log('---Conteudo---');
          console.log(email);
          console.log(fullName);
          console.log(role);

          let user: AuthenticatedUser = {
            role: role,
            email: email,
            fullname: fullName,
            token: token
          }

          console.log('----AuthenticatedUser-----');
          console.log(user);

          this.authenticationService.addCredentialsToLocalStorage(user);
          this.router.navigate(['']);
        },
        error: (err) => {
          console.error('erro!')
          console.error(err)
        }
      });

    } catch (e: any) {
      console.error(`erro: ${e}`);
      this.toastrService.error(e.message);
      this.password.setValue(null);
    }
  }

  isFormInvalid() {

    let isValid = this.email.valid && this.password.valid;

    // if(isValid) return false;
    // if(!isValid) return true;

    return isValid ? false : true;
  }

}

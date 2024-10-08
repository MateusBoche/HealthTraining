import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatInputModule } from '@angular/material/input';
import { User } from '../../../domain/model/user.model';
import { UserCreateService } from '../../../services/user/user-create.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatError,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {

  form: FormGroup;

  fullNameMinChar: number = 2;
  fullNameMaxChar: number = 10;
  passwordMinChar: number = 2;
  passwordMaxChar: number = 10;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userCreateService: UserCreateService) {

    this.initializeForm();
  }

  ngOnInit(): void {

  }

  initializeForm() {
    this.form = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(this.fullNameMinChar), Validators.maxLength(this.fullNameMaxChar)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.passwordMinChar), Validators.maxLength(this.passwordMaxChar)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(this.passwordMinChar), Validators.maxLength(this.passwordMaxChar)]],
    });
  }

  createAccount() {
    let user: User = {
      fullName: this.form.controls['fullName'].value,
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
    };

    this.userCreateService.create(user)
      .subscribe({
        next: value => {
          console.log(value);
          this.router.navigate(['account/sign-in']);
        },
        error: err => {
          console.error(err);
        }
      });
  }

  arePasswordsValid() {
    return this.form.controls['password'].value === this.form.controls['confirmPassword'].value;
  }

  validateFields() {
    if (!this.form.controls['password'].valid
      || !this.form.controls['confirmPassword'].valid) {
      return false;
    }

    if (!this.arePasswordsValid()) {
      return false;
    }

    return this.form.controls['fullName'].valid
      && this.form.controls['email'].valid;
  }


}

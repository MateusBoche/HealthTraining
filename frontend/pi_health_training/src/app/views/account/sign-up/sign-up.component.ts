import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../../domain/model/user.model';
import { UserCreateService } from '../../../services/user/user-create.service';
import { Router } from '@angular/router';
import { UserRole } from '../../../domain/model/user-role.model';

@Component({
  selector: 'lds-sign-up',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {

  form: FormGroup;

  fullNameMinLength: number = 2;
  fullNameMaxLength: number = 10;
  passwordMinLength: number = 2;
  passwordMaxLength: number = 10;



  constructor(private formBuilder: FormBuilder, private createUserService: UserCreateService, private router: Router){
    
    this.initializeForm();
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');

  }


  initializeForm(){
    this.form = this.formBuilder.group({
      fullName: ['', [
        Validators.required,
        Validators.minLength(this.fullNameMinLength),
        Validators.maxLength(this.fullNameMaxLength)
      ]], 
      email: ['',[
        Validators.required,
        Validators.email
      ]
        
      ],
      password: ['',[
        Validators.required,
        Validators.minLength(this.passwordMinLength),
        Validators.maxLength(this.passwordMaxLength)
      ]],
      repeatPassword: ['', [
        Validators.required,
        Validators.minLength(this.passwordMinLength),
        Validators.maxLength(this.passwordMaxLength)
      ]],
    });

  }


  // fullName = new FormControl(null, [
  //   Validators.minLength(3),
  //   Validators.maxLength(10),
  // ]);
  // email = new FormControl(null, Validators.email);
  // password = new FormControl(null, [
  //   Validators.minLength(3),
  //   Validators.maxLength(10),
  // ]);
  // repeatPassword = new FormControl(null);

  isFormInvalid(){
    // let isValid = this.fullName.valid 
    // && this.email.valid 
    // && this.password.valid 
    // && this.repeatPassword.valid


    // if(this.password.value !== this.repeatPassword.value){
    //   return true;
    // } 

    let isValid = this.form.controls['fullName'].valid 
    && this.form.controls['email'].valid 
    && this.form.controls['password'].valid 
    && this.form.controls['repeatPassword'].valid


    if(this.form.controls['password'] != null &&
      this.form.controls['repeatPassword'] != null &&
      this.form.controls['password'].value !== this.form.controls['repeatPassword'].value){
      return true;
    } 

    return isValid ? false : true;

  }

  createAccount(){
    console.log('criando conta....')
    let user: User = {
      fullName: this.form.controls['fullName'].value,
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
      role: UserRole.USER,
    };
    this.createUserService.create(user)
      .subscribe({
        next: value => {
          console.log(value);
          this.router.navigate(['account/sign-in'])
        }, 
        error: err => {
          console.error('Erro inesperado')
        }
      });
  }

  arePasswordsValid(){
    return this.form.controls['password'].value == this.form.controls['repeatPassword'].value
  }
}

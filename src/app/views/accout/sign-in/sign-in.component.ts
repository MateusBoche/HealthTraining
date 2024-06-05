import { Component } from '@angular/core';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { UserCredential } from '../../../domain/dto/user-credential';



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
export class SignInComponent {

  //email = new FormControl(null, Validators.email);
  email = new FormControl(null);
  password = new FormControl(null, [Validators.minLength(1), Validators.maxLength(10)]);

  isLoginIncorrect = false;

  constructor(private router: Router) {


  }







  login(){

    
   // let emailField = this.email.value; 
    //let passwordField = this.password.value; 
    let credential: UserCredential = {
      email: this.email.value!,
      password: this.password.value!
    };


    //console.log("email digitado: " + credential.email)
    //console.log("senha digitado: " + credential.password)
    console.log(credential)

    this.router.navigate(["/"])
    
  }

  isFormInvalid(){
    let isValid = this.email.valid && this.password.valid
    return isValid ? false : true;
  }


  

}

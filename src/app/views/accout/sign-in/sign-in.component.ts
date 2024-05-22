import { Component } from '@angular/core';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";



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

  email = new FormControl(null);
  password = new FormControl(null);

  isLoginIncorrect = false;

  login(){
    let emailField = this.email.value; 
    let passwordField = this.password.value; 

    console.log("email digitado: " + emailField)
    console.log("senha digitado: " + passwordField)
    
  }


  

}

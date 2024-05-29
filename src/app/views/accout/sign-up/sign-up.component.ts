import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'lds-sign-up',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  fullName = new FormControl(null, [Validators.minLength(3), Validators.maxLength(10)]);
  email = new FormControl(null, Validators.email);
  password = new FormControl(null, [Validators.minLength(3), Validators.maxLength(10)]);
  repeatPassword = new FormControl(null,[Validators.minLength(3), Validators.maxLength(10)]);

  isFormInvalid(){
    let isValid = this.fullName.valid && this.email.valid && this.password.valid && this.repeatPassword.valid;

    if(this.password.value !== this.repeatPassword.value){
      return true;
    }
    return isValid ? false: true;
  }
  crateAccount(){
    console.log("Criando conta...")
  }

}

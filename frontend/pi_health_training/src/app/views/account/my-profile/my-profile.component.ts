import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router, RouterModule } from '@angular/router'
import { Toast, ToastrService } from 'ngx-toastr';

import { log } from 'console';
import { User } from '../../../domain/model/user.model';
import { MatError } from '@angular/material/input';
import { AuthenticationService } from '../../../services/security/authentication.service';

@Component({
  selector: 'lds-my-profile',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatError,

  ],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit{

  dataForm: FormGroup;

  email: String = '';
  user : User


  constructor(private router: Router, private formBuilder: FormBuilder, private toastr: ToastrService, private authenticationService: AuthenticationService){

    this.initializeForm();

  }


  ngOnInit(): void {
    let user = this.authenticationService.getUserFromAuthentication();
    console.log('--- My profile --- dados do cache');
    console.log(user);

    let email = user.email;
    if(email == null){
      this.authenticationService.logout();
      this.router.navigate(['account/sign-in']);
      return;
    }
      
      this.setFormData(user);
    
  }

  initializeForm(){
    this.dataForm = this.formBuilder.group({
      fullName: ['', [Validators.required]]
    })
  }

  setFormData(user: User){
    this.user = user;
    this.dataForm.controls['fullName'].setValue(this.user.fullName);
    this.email = this.user.email;
  }
  updateMyInformation(){
    
  }

}


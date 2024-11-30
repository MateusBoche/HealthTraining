import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from 'express';
import { Toast, ToastrService } from 'ngx-toastr';

import { log } from 'console';
import { AuthenticationService } from '../../../services/security/authentication.service';

@Component({
  selector: 'lds-my-profile',
  standalone: true,
  imports: [],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit{


  constructor(private router: Router, private formBuilder: FormBuilder, private toastr: ToastrService, private authenticationService: AuthenticationService){

    this.initializeForm();

  }


  ngOnInit(): void {
    let authenticatedUser = this.authenticationService.getAuthenticatedUser();
    console.log('--- My profile --- dados do cache');
    console.log(authenticatedUser);
  }

  initializeForm(){}

}


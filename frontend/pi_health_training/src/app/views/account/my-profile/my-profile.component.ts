import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserReadService } from '../../../services/user/user-read.service';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { UserUpdateService } from '../../../services/user/user-update.service';
import { User } from '../../../domain/model/user.model';
import { MatError } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-profile',
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
export class MyProfileComponent implements OnInit {

  dataForm: FormGroup;
  passwordForm: FormGroup;

  fullNameMinChar: number = 2;
  fullNameMaxChar: number = 10;
  passwordMinChar: number = 2;
  passwordMaxChar: number = 10;

  email: string = '';
  currentUser: User;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private userReadService: UserReadService,
    private userUpdateService: UserUpdateService) {

    this.initializeForm();
  }

  ngOnInit(): void {
    let email = this.authenticationService.getOnlineUserEmail();
    if (email == null) {
      this.authenticationService.logout();
      this.router.navigate(['account/sign-in']);
    }
    this.retrieveLoggedUser(email!);
  }

  initializeForm() {
    this.dataForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(this.fullNameMinChar), Validators.maxLength(this.fullNameMaxChar)]],
    });

    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(this.passwordMinChar), Validators.maxLength(this.passwordMaxChar)]],
      newPassword: ['', [Validators.required, Validators.minLength(this.passwordMinChar), Validators.maxLength(this.passwordMaxChar)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(this.passwordMinChar), Validators.maxLength(this.passwordMaxChar)]],
    });
  }

  async retrieveLoggedUser(email: string) {
    let user = await this.userReadService.findByEmail(email);
    this.currentUser = user[0];
    this.dataForm.controls['fullName'].setValue(this.currentUser.fullName);
    this.email = this.currentUser.email;
  }

  async updateMyInformation() {
    try {
      await this.userUpdateService
        .update(this.currentUser.id!,
          this.dataForm.controls['fullName'].value!);
      this.toastr.success('Dados atualizados com sucesso!');
    } catch (error: any) {
      console.error(error);
      this.toastr.error(error.message);
    }
  }

  async updatePassword() {
    try {
      await this.userUpdateService
        .updatePassword(this.currentUser.id!,
          this.passwordForm.controls['oldPassword'].value!,
          this.passwordForm.controls['newPassword'].value!);
      this.passwordForm.reset();
      this.toastr.success('Senha alterada com sucesso!');
    } catch (error: any) {
      console.error(error.message);
      this.toastr.error(error.message);
    }
  }

  validateMyInformation() {
    return true;
  }

  validateNewPassword() {
    if (!this.passwordForm.controls['oldPassword'].valid
      || !this.passwordForm.controls['newPassword'].valid
      || !this.passwordForm.controls['confirmNewPassword'].valid) {
      return false;
    }

    return this.arePasswordsValid();
  }

  arePasswordsValid() {
    return this.passwordForm.controls['newPassword'].value === this.passwordForm.controls['confirmNewPassword'].value;
  }


}

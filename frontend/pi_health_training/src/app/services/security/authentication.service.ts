import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserCredential} from '../../domain/dto/user-credential.dto';
import {firstValueFrom, Observable} from 'rxjs';
import {User} from '../../domain/model/user.model';
import {ToastrService} from "ngx-toastr";
import { environment } from '../../../environments/environments';
import { AuthenticatedUser, UserRole } from '../../domain/dto/authenticated-user.dto';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
    private toastr: ToastrService,
  ) {
  }

  async authenticate(credentials: UserCredential) {
    console.log(`trying to authenticate...`);
    console.log(credentials);

  
    
  //   let apiResponse = await firstValueFrom(this.http.get<UserCredential[]>(`${environment.api_endpoint}/user?email=${credentials.email}&password=${credentials.password}`));
  //   console.log(apiResponse);
  //   if (apiResponse == null || apiResponse.length != 1) {
  //     throw new Error('dados invalidos');
  //   }
  //   return true;

  const headers = new HttpHeaders({
    'Conent-Type':'application/json',
  });

  const body = {
    email: credentials.email,
    password: credentials.password,
  };

  return this.http.post<any>(`${environment.authentication_api_endpoint}/authenticate`, body, {headers})
}

  logout() {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    let token = localStorage.getItem('token');

    if (token != null) {
      return true;
    }
    return false;
  }

  addCredentialsToLocalStorage(authenticatedUser: AuthenticatedUser) {
    localStorage.setItem('email', authenticatedUser.email);
    localStorage.setItem('fullName', authenticatedUser.fullname);
    localStorage.setItem('role', authenticatedUser.role);
    localStorage.setItem('token', authenticatedUser.token);
  }

  getAuthenticatedUser(): AuthenticatedUser{
    let email = localStorage.getItem('email');
    let fullName = localStorage.getItem('fullName');
    let token = localStorage.getItem('token');
    let role = localStorage.getItem('role');

    if(email == null
      || fullName == null
      || token == null
      || role == null){
        throw new Error('dados no cache estao invalidados');
      }

      let user: AuthenticatedUser = {
        email: email,
        fullname: fullName,
        token: token,
        role: role as UserRole,
      };
      return user;
  }
}





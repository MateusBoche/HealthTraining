import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {firstValueFrom, Observable} from 'rxjs';
import { UserCredential } from '../../domain/dto/user-credential.dto';
import { environment } from '../../../environments/environments';
import { AuthenticatedUser } from '../../domain/dto/authenticated-user.dto';
import { UserRole } from '../../domain/model/user-role.model';
import { User } from '../../domain/model/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  // async authenticate(credential: UserCredential) {
  //   console.log('trying to authenticate...');
  //   console.log(credential);


  //   let apiResponse = await firstValueFrom(this.http.get<UserCredential[]>(`${environment.api_endpoint}/user?email=${credential.email}&password=${credential.password}`));
  //   console.log(apiResponse);
  //   if (apiResponse == null || apiResponse.length != 1) {
  //     throw new Error('dados invalidos');
  //   }
  //   return true;
  // }

  authenticate(credential: UserCredential): Observable<any> {
    console.log('trying to authenticate...');
    console.log(credential);

    const headers = new HttpHeaders({
      'Conent-Type':'application/json',
    });

    const body = {
      email: credential.email,
      password: credential.password,
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
    localStorage.setItem('id', authenticatedUser.id?.toString() || '');
    localStorage.setItem('email', authenticatedUser.email);
    localStorage.setItem('fullName', authenticatedUser.fullName);
    localStorage.setItem('role', authenticatedUser.role);
    localStorage.setItem('token', authenticatedUser.token);
  }

  getAuthenticatedUser(): AuthenticatedUser {
    const id = localStorage.getItem('id');
    const email = localStorage.getItem('email');
    const fullName = localStorage.getItem('fullName');
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
  
    if (!id || !email || !fullName || !token || !role) {
      throw new Error('Dados no cache estão inválidos.');
    }
  
    // Certifique-se de converter o ID para número
    return {
      id: Number(id), // Conversão para número
      email: email,
      fullName: fullName,
      token: token,
      role: role as UserRole,
    };
  }
  
  
  getUserFromAuthentication(): User{
    let authenticatedUser = this.getAuthenticatedUser();

    let user: User= {
      id: authenticatedUser.id,
      email: authenticatedUser.email,
      fullName: authenticatedUser.fullName,
      password: '',
      role: authenticatedUser.role,
    }
    return user;
  }

}

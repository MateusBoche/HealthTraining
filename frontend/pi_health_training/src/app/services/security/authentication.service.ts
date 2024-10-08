import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserCredential} from '../../domain/dto/user-credential.dto';
import {Observable} from 'rxjs';
import {User} from '../../domain/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  authenticate(credentials: UserCredential): Observable<User[]> {
    console.log(`trying to authenticate...`);
    console.log(credentials);
    return this.http.get<User[]>(`http://localhost:3000/user?email=${credentials.email}&senha=${credentials.password}`);
  }

  addDataToLocalStorage(email: string, password: string) {
    // localStorage.setItem('token', authToken);
    localStorage.setItem('token', new Date().toLocaleTimeString());
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
  }

  logout() {
    console.log('limpei');
    localStorage.clear();
  }

  isAuthenticated() {
    let token = localStorage.getItem('token');
    if (token != null) {
      console.log(`token found -> ${token}`)
      // return !this.jwtService.isTokenExpired(token)
      return true;
    }
    return false;
  }

  getOnlineUserEmail() {
    let email = localStorage.getItem('email');
    return email;
  }

  getOnlineUserPassword() {
    let password = localStorage.getItem('password');
    return password;
  }

}

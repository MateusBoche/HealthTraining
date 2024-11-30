import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserCredential} from '../../domain/dto/user-credential.dto';
import {firstValueFrom, Observable} from 'rxjs';
import {User} from '../../domain/model/user.model';
import {ToastrService} from "ngx-toastr";
import { environment } from '../../../environments/environments';


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

  
    
    let apiResponse = await firstValueFrom(this.http.get<UserCredential[]>(`${environment.api_endpoint}/user?email=${credentials.email}&password=${credentials.password}`));
    console.log(apiResponse);
    if (apiResponse == null || apiResponse.length != 1) {
      throw new Error('dados invalidos');
    }
    return true;
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

  addCredentialsToLocalStorage(email: string) {
    localStorage.setItem('email', email);
    localStorage.setItem('token', new Date().toLocaleTimeString());
  }


}

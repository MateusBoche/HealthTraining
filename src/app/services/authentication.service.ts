import { Injectable } from '@angular/core';
import { UserCredential } from '../domain/dto/user-credential';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {}
  
  authenticate(credential: UserCredential): Observable<any>{
    console.log(`trying to authenticate...`);
    console.log(credential);

    return this.http.get('http://localhost:300/user/1');

  }

  logout(){


  }
}

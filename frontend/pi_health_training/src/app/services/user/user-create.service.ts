import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../domain/model/user.model';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserCreateService {

  constructor(private http: HttpClient) { }

  create(user: User) {
    console.log(user);
    return this.http.post(`${environment.api_endpoint}/user`, user);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../domain/model/user.model';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserReadService {

  constructor(private http: HttpClient) { }

  findById(id: string): Promise<User> {
    return firstValueFrom(this.http.get<User>(`http://localhost:3000/user/${id}`));
  }

  findByEmail(email: string): Promise<User[]> {
    return firstValueFrom(this.http.get<User[]>(`http://localhost:3000/user?email=${email}`));
  }

  findAll(): Promise<User[]> {
    return firstValueFrom(this.http.get<User[]>(`http://localhost:3000/user`));
  }
}

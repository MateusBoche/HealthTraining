import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Game } from '../../domain/model/game';
import { User } from '../../domain/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class GameListService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  
  getGamesByUserId(userId: string): Promise<Game[]> {
    return firstValueFrom(this.http.get<Game[]>(`${this.apiUrl}/game?usuario_id=${userId}`));
  }

  
  getUserByEmailAndPassword(email: string | null, senha: string | null): Promise<User[]> {
    return firstValueFrom(this.http.get<User[]>(`${this.apiUrl}/user?email=${email}&senha=${senha}`));
  }
}

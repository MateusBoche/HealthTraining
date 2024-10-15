import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Game } from '../../domain/model/game';
import { User } from '../../domain/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class GameListService {
  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  
  getGamesByUserId(userId: number): Promise<Game[]> {
    return firstValueFrom(this.http.get<Game[]>(`${this.apiUrl}/game?usuarioID=${userId}`));
  }

  
  getUserByEmailAndPassword(email: string | null, senha: string | null): Promise<User[]> {
    const encodedEmail = encodeURIComponent(email || '');
    const encodedSenha = encodeURIComponent(senha || '');
    return firstValueFrom(this.http.get<User[]>(`${this.apiUrl}/user?email=${encodedEmail}&senha=${encodedSenha}`));
  }
  
}

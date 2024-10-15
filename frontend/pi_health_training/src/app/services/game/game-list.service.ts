import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Game } from '../../domain/model/game';
import { User } from '../../domain/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class GameListService {
  private apiUrl = 'http://localhost:8081/api/game';

  constructor(private http: HttpClient) {}

  
  getGamesByUserId(userId: number): Promise<Game[]> {
    //return firstValueFrom(this.http.get<Game[]>(`${this.apiUrl}/listar-jogos/${userId}`));
    return firstValueFrom(this.http.get<Game[]>(`http://localhost:8081/api/game/listar-jogos/${userId}`));
  }

  
  getUserByEmailAndPassword(email: string | null, senha: string | null): Promise<User[]> {
    const encodedEmail = encodeURIComponent(email || '');
    const encodedSenha = encodeURIComponent(senha || '');
    return firstValueFrom(this.http.get<User[]>(`http://localhost:8081/api/user/${email}`));
    
  }
  
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Game } from '../../domain/model/game';
import { User } from '../../domain/model/user.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class GameListService {
  private apiUrl = 'http://localhost:8081/api/game';

  constructor(private http: HttpClient) {}

  
  getGamesByUserId(userID: number): Promise<Game[]> {
    //return firstValueFrom(this.http.get<Game[]>(`${this.apiUrl}/listar-jogos/${userId}`));
    return firstValueFrom(this.http.get<Game[]>(`http://localhost:8081/api/game/listar-jogos/${userID}`));
  }

  
  async getUserByEmailAndPassword(email: string, senha: string): Promise<User> {
    const encodedEmail = encodeURIComponent(email);
    const encodedSenha = encodeURIComponent(senha);
    return firstValueFrom(
      this.http.get<User>(`http://localhost:8081/api/user/${encodedEmail}/${encodedSenha}`)
    );
  }

  deleteGame(gameId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${gameId}`);
  }
  
  
  
}

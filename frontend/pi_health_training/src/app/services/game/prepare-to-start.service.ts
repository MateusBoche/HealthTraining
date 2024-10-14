import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { User } from '../../domain/model/user.model';
import { Game } from '../../domain/model/game';

@Injectable({
  providedIn: 'root',
})
export class PrepareToStartService {
  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}


  getUserByEmailAndPassword(email: string | null, senha: string | null): Promise<User[]> {
    return firstValueFrom(this.http.get<User[]>(`${this.apiUrl}/user?email=${email}&senha=${senha}`));
  }


  startNewGame(game: Game): Promise<Game> {
    return firstValueFrom(this.http.post<Game>(`${this.apiUrl}/game`, game));
  }
}

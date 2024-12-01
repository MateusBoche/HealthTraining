import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { User } from '../../domain/model/user.model';
import { Game } from '../../domain/model/game';

@Injectable({
  providedIn: 'root',
})
export class PrepareToStartService {
  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}


  startNewGame(game: Game): Promise<Game> {
    return firstValueFrom(this.http.post<Game>(`${this.apiUrl}/game`, game));
  }
}

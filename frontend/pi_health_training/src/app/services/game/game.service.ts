import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../../domain/model/game';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  findById(id: string): Promise<Game> {
    return firstValueFrom(this.http.get<Game>(`${this.apiUrl}/game/${id}`));
  }

  findAllQuestions(): Promise<{
    question: string,
    answer: boolean,
    category: string,
    id: string,
    phase: number
  }[]> {
    return firstValueFrom(this.http.get<{
      question: string,
      answer: boolean,
      category: string,
      id: string,
      phase: number
    }[]>(`${this.apiUrl}/questions`));
  }

  saveGameState(id: string, gameState: any): Promise<any> {
    return firstValueFrom(this.http.put(`${this.apiUrl}/game/${id}`, gameState));
  }
}

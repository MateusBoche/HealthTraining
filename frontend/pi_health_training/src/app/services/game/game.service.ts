import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../../domain/model/game';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  findById(id: number): Promise<Game> {
    return firstValueFrom(this.http.get<Game>(`${this.apiUrl}/game/${id}`));
  }

  findAllQuestions(): Promise<{
    question: string,
    answer: boolean,
    category: string,
    id: number,
    phase: number
  }[]> {
    return firstValueFrom(this.http.get<{
      question: string,
      answer: boolean,
      category: string,
      id: number,
      phase: number
    }[]>(`${this.apiUrl}/questions`));
  }

  saveGameState(id: number, gameState: any): Promise<any> {
    return firstValueFrom(this.http.put(`${this.apiUrl}/game/${id}`, gameState));
  }
}

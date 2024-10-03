import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../../domain/model/game';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameCreateService {

  constructor(private http: HttpClient) { }

  async create(game: Game){
    return firstValueFrom(this.http.post('http://localhost:3000/game/game', game));
  }
}

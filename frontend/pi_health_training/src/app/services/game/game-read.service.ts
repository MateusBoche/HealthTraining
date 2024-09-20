import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../../domain/model/game';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameReadService {

  constructor(private http: HttpClient) { }
  
  findById(id:string): Promise<Game>{
    return firstValueFrom(this.http.get<Game>(`http://localhost:3000/game/${id}`));

  
  }

  findAll(): Promise<Game[]> {
    return firstValueFrom(this.http.get<Game[]>('http://localhost:3000/game'))
  }

}

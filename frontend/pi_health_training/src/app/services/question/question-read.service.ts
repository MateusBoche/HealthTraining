import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../../domain/model/question';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionReadService {

  constructor(private http: HttpClient) { }

  findByCategory(category: string): Promise<Question>{
    return firstValueFrom(this.http.get<Question>(`http://localhost:3000/question/${category}`));

  }

  findAll(): Promise<Question[]>{
    return firstValueFrom(this.http.get<Question>('http://localhost:3000/question'));
  }
}

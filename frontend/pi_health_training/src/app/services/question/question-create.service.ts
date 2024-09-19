import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../../domain/model/question';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionCreateService {

  constructor(private http: HttpClient) { }

  async create(question: Question){
    return firstValueFrom(this.http.post('http://localhost:3000/question', question))
  }
}

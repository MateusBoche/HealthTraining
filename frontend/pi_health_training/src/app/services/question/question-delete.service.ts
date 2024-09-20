import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../../domain/model/game';
import { questions } from '../../views/support/support.component';
import { Question } from '../../domain/model/question';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionDeleteService {

  constructor(private http: HttpClient) { }
  
  async update(question: Question){
    console.log('atualizando a pergunta');
    console.log(question)
    return await firstValueFrom(this.http.post(`http://localhost:3000/question/${question.id}`, question))
  }
}

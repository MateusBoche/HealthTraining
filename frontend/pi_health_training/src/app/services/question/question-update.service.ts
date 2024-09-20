import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../../domain/model/question';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionUpdateService {

  constructor(private http: HttpClient) { }

  async update(question: Question){
    console.log("Atualizando a pergunta...");
    console.log(question);
    return await firstValueFrom(this.http.put(`http://localhost:3000/question/${question.id}`,question))
  }
}
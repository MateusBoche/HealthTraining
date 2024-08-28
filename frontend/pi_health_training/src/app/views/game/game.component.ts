import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  jogo!: Game;
  board: { question: string }[] = [];
  currentPosition: number = 0;
  diceValue: number | null = null;
  markerPosition = 'translate(0px, 0px)';
  diceRotation = 0;
  colors: string[] = [];
  currentQuestion: { question: string, answer: boolean, category: string } | null = null;
  isQuestionAnswered: boolean = false;
  questions: { question: string, answer: boolean, category: string }[] = []; 
  rolling: boolean = false; 
  canRoll: boolean = true; 
  score: number = 0;
  numberOfCorrectAnswers: number = 0;
  numberOfErrors: number = 0;

  trapCells: { index: number, penalty: number }[] = [
    { index: 5, penalty: 2 },
    { index: 14, penalty: 3 },
  ];

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.carregar_jogo();
    this.initializeBoard();
    this.generateRandomColors();
  }

  carregar_jogo() {
    const id = this.router.url.split('/')[2];

    this.http.get<Game>(`http://localhost:3000/game/${id}`).subscribe({
      next: value => {
        this.jogo = value;
        if (!this.jogo) {
          this.toastr.error('Dados do jogo não encontrados');
        }
      },
      error: error => {
        this.toastr.error('Erro ao carregar o jogo');
      }
    });

    this.http.get<{ question: string, answer: boolean, category: string }[]>('http://localhost:3000/questions').subscribe({
      next: questions => {
        this.questions = questions;
      },
      error: error => {
        this.toastr.error('Erro ao carregar as perguntas');
      }
    });
  }

  initializeBoard() {
    const totalCells = 30;
    this.board = Array.from({ length: totalCells }, (_, i) => {
      const rowIndex = Math.floor(i / 5);
      const isEvenRow = rowIndex % 2 === 1;
      const adjustedIndex = isEvenRow 
          ? (rowIndex + 1) * 5 - (i % 5) - 1
          : i;

      return {
        question: `Pergunta ${adjustedIndex + 1}`
      };
    });
  }

  rollDice() {
    if (!this.canRoll) return;

    if (this.jogo.nivel_atual === 3 && this.currentPosition >= this.board.length - 1) {
        this.toastr.info('Jogo encerrado. Obrigado por jogar!');
        return;
    }

    this.canRoll = false;
    this.rolling = true;

    this.diceValue = Math.floor(Math.random() * 6) + 1;

    const intervalId = setInterval(() => {
        this.diceValue = Math.floor(Math.random() * 6) + 1;
    }, 1000);

    setTimeout(() => {
        clearInterval(intervalId);
        this.diceValue = Math.floor(Math.random() * 6) + 1;

        setTimeout(() => {
            this.rolling = false;

            this.currentQuestion = this.getRandomQuestion();
            this.isQuestionAnswered = false;
        }, 1500);
    }, 1500);
  }

  movePlayer(roll: number) {
    const totalCells = this.board.length;
    let newPosition = this.currentPosition + roll;

    if (newPosition >= totalCells) {
      // Caso ultrapasse, reinicia a contagem para a próxima fase
      if (this.jogo.nivel_atual === 1) {
          this.toastr.success('Parabéns, a Fase 1 foi concluída!');
          this.jogo.nivel_atual = 2;
          this.resetForNextPhase();
          newPosition = newPosition - totalCells; // Ajusta a posição para a nova fase
      } else if (this.jogo.nivel_atual === 2) {
          this.toastr.success('Parabéns, a Fase 2 foi concluída!');
          this.jogo.nivel_atual = 3;
          this.resetForNextPhase();
          newPosition = newPosition - totalCells; // Ajusta a posição para a nova fase
      } else if (this.jogo.nivel_atual === 3) {
          this.toastr.success('Parabéns, o jogo foi concluído!');
          this.canRoll = false; // Impede de rodar o dado novamente
          return;
      }
  }

  // Atualiza a posição do jogador
  this.animateMarker(this.currentPosition, newPosition);
  this.currentPosition = newPosition;
}

resetForNextPhase() {
  this.currentPosition = 0; // Volta ao início da nova fase
  this.initializeBoard(); // Reinicializa o tabuleiro para a nova fase
  this.canRoll = true; // Permite rolar o dado na nova fase
}

  animateMarker(start: number, end: number) {
    const interval = setInterval(() => {
      if (start === end) {
        clearInterval(interval);
        return;
      }

      const currentRow = Math.floor(start / 5);
      const newRow = Math.floor((start + 1) / 5);

      if (currentRow !== newRow) {
        start++;
        this.currentPosition = start;
        const newPosition = this.getPosition(start);
        this.markerPosition = `translate(${newPosition.x}px, ${newPosition.y}px)`;
      } else {
        start++;
        this.currentPosition = start;
        const newPosition = this.getPosition(start);
        this.markerPosition = `translate(${newPosition.x}px, ${newPosition.y}px)`;
      }

      setTimeout(() => {
        this.currentPosition = start;
        const newPosition = this.getPosition(start);
        this.markerPosition = `translate(${newPosition.x}px, ${newPosition.y}px)`;
      }, 100);
    }, 300);
  }

  getPosition(index: number) {
    const row = Math.floor(index / 5);
    const isEvenRow = row % 2 === 0;
    const col = isEvenRow ? index % 5 : 4 - (index % 5);
    return {
      x: col * 160 + 15,
      y: row * 160 + 15
    };
  }

  getItemStyle(i: number): string {
    return this.colors[i];
  }

  generateRandomColors() {
    this.colors = this.board.map(() => this.getRandomColor());
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getRandomQuestion(): { question: string, answer: boolean, category: string } {
    if (this.questions.length === 0) {
      return { question: 'Pergunta não disponível', answer: false, category: 'Categoria não disponível' };
    }
    return this.questions[Math.floor(Math.random() * this.questions.length)];
  }

  answerQuestion(answer: boolean) {
    if (this.currentQuestion) {
      if (this.currentQuestion.answer === answer) {
        this.toastr.success('Resposta correta!');
        this.score += 10;
        this.numberOfCorrectAnswers++;
        this.movePlayer(this.diceValue!);
      } else {
        this.toastr.error('Resposta incorreta. Tente novamente!');
        this.score -= 5;
        this.numberOfErrors++;
      }
      this.isQuestionAnswered = true;
      this.currentQuestion = null;

      this.canRoll = true;
    }
  }
}

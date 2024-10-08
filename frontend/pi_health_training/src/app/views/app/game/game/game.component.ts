import {Component} from '@angular/core';
import {Game} from "../../../../domain/model/game";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  jogo!: Game;
  board: { question: string }[] = [];
  currentPosition: number = 0;
  diceValue: number | null = null;
  markerPosition = 'translate(0px, 0px)';
  diceRotation = 0;
  colors: string[] = [];
  currentQuestion: { question: string, answer: boolean, category: string } | null = null;
  isQuestionAnswered: boolean = false;
  questions: { question: string, answer: boolean, category: string, id: string, phase: number }[] = [];
  rolling: boolean = false;
  canRoll: boolean = true;
  score: number = 0;
  numberOfCorrectAnswers: number = 0;
  numberOfErrors: number = 0;

  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let gameId = this.route.snapshot.paramMap.get('id');
    console.log(gameId);
    this.carregar_jogo(gameId!);
    // this.initializeBoard();
    // this.generateRandomColors();
    // this.loadGame();
  }

  carregar_jogo(id: String) {
    // const id = this.router.url.split('/')[2];

    this.http.get<Game>(`http://localhost:3000/game/${id}`).subscribe({
      next: value => {
        this.jogo = value;
        if (!this.jogo) {
          this.toastr.error('Dados do jogo não encontrados');
          console.log('1')
          return;
        }
        const dataCriacaoUtc = new Date(this.jogo.dataDeCriacao);
        console.log('2')

        // Verifica se a data é válida
        if (isNaN(dataCriacaoUtc.getTime())) {
          this.toastr.error('Data inválida no jogo');
          console.log('3')
        } else {
          dataCriacaoUtc.setHours(dataCriacaoUtc.getHours() - 3);

          const day = String(dataCriacaoUtc.getDate()).padStart(2, '0');
          const month = String(dataCriacaoUtc.getMonth() + 1).padStart(2, '0');
          const year = dataCriacaoUtc.getFullYear();
          const hours = String(dataCriacaoUtc.getHours()).padStart(2, '0');
          const minutes = String(dataCriacaoUtc.getMinutes()).padStart(2, '0');
          const seconds = String(dataCriacaoUtc.getSeconds()).padStart(2, '0');

          this.jogo.dataDeCriacao = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
          console.log('4')
        }
        this.initializeBoard();
        this.generateRandomColors();
        this.loadGame();
      },
      error: error => {
        console.log('5')
        this.toastr.error('Erro ao carregar o jogo');
      }
    });

    this.http.get<{
      question: string,
      answer: boolean,
      category: string,
      id: string,
      phase: number
    }[]>('http://localhost:3000/questions').subscribe({
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
    this.board = Array.from({length: totalCells}, (_, i) => {
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

    if (this.jogo.nivelAtual === 3 && this.currentPosition >= this.board.length - 1) {
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
      if (this.jogo.nivelAtual === 1) {
        this.toastr.success('Parabéns, a Fase 1 foi concluída!');
        this.jogo.nivelAtual = 2;
        this.resetForNextPhase(); // Reinicia a fase sem animação adicional
      } else if (this.jogo.nivelAtual === 2) {
        this.toastr.success('Parabéns, a Fase 2 foi concluída!');
        this.jogo.nivelAtual = 3;
        this.resetForNextPhase();
      } else if (this.jogo.nivelAtual === 3) {
        this.toastr.success('Parabéns, o jogo foi concluído!');
        this.canRoll = false;
        return;
      }
    } else {
      this.animateMarker(this.currentPosition, newPosition);
      this.currentPosition = newPosition;
    }
  }

  resetForNextPhase() {
    this.currentPosition = 0; // Define a posição do personagem para a casa inicial
    const newPosition = this.getPosition(0);
    this.markerPosition = `translate(${newPosition.x}px, ${newPosition.y}px)`; // Atualiza a posição do marcador
    this.initializeBoard();
    this.canRoll = true;
  }

  animateMarker(start: number, end: number) {
    if (start === end) {
      return; // Garante que não haverá loop se já estiver na posição final
    }

    const interval = setInterval(() => {
      if (start === end) {
        clearInterval(interval);
        return;
      }

      start++;
      this.currentPosition = start;
      const newPosition = this.getPosition(start);
      this.markerPosition = `translate(${newPosition.x}px, ${newPosition.y}px)`;

      if (start === end) {
        clearInterval(interval);
      }
    }, 300); // Ajuste o tempo do intervalo conforme necessário
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
    const filteredQuestions = this.questions.filter(q => q.phase === this.jogo.nivelAtual);
    if (filteredQuestions.length === 0) {
      return {question: 'Pergunta não disponível', answer: false, category: 'Categoria não disponível'};
    }
    return filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
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

      this.saveGameState();  // Salvar o estado do jogo após responder a uma pergunta
    }
  }


  saveGameState() {
    if (!this.jogo) return;
    this.http.put(`http://localhost:3000/game/${this.jogo.id}`, {
      nivelAtual: this.jogo.nivelAtual,
      numeroAcertos: this.numberOfCorrectAnswers,
      numeroErros: this.numberOfErrors,
      dataDeCriacao: this.jogo.dataDeCriacao,
      status: this.jogo.status
    }).subscribe({
      next: () => {
        this.toastr.success('Estado do jogo salvo com sucesso');
      },
      error: () => {
        this.toastr.error('Erro ao salvar o estado do jogo');
      }
    });
  }


  loadGame() {
    const savedState = localStorage.getItem(`gameState_${this.jogo.id}`);
    if (savedState) {
      const gameState = JSON.parse(savedState);

      this.currentPosition = gameState.currentPosition;
      this.score = gameState.score;
      this.numberOfCorrectAnswers = gameState.numberOfCorrectAnswers;
      this.numberOfErrors = gameState.numberOfErrors;
      this.diceValue = gameState.diceValue;
      this.currentQuestion = gameState.currentQuestion;
      this.isQuestionAnswered = gameState.isQuestionAnswered;
      this.jogo.nivelAtual = gameState.nivelAtual;

      const newPosition = this.getPosition(this.currentPosition);
      this.markerPosition = `translate(${newPosition.x}px, ${newPosition.y}px)`;
      this.canRoll = true;
    }
  }
}

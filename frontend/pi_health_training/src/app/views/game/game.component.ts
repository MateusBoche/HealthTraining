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
  dicePosition = 'translate(0px, 0px)';
  colors!: string[];

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
        // Opcional: você pode definir um valor padrão para garantir que o `jogo` não seja `undefined`
        if (!this.jogo) {
          this.toastr.error('Dados do jogo não encontrados');
        }
      },
      error: error => {
        this.toastr.error('Erro ao carregar o jogo');
      }
    });
  }

  initializeBoard() {
    const totalCells = 20;
    this.board = Array.from({ length: totalCells }, (_, i) => {
      // Determine se a linha é par ou ímpar
      const rowIndex = Math.floor(i / 5);
      const isEvenRow = rowIndex % 2 === 1;

      // Ajuste o índice para uma ordem crescente ou decrescente
      const adjustedIndex = isEvenRow 
          ? (rowIndex + 1) * 5 - (i % 5) - 1
          : i;

      return {
        question: `Pergunta ${adjustedIndex + 1}`
      };
    });
  }

  rollDice() {
    this.diceValue = Math.floor(Math.random() * 6) + 1;
    this.movePlayer(this.diceValue);
  }

  movePlayer(roll: number) {
    const newPosition = Math.min(this.currentPosition + roll, this.board.length - 1);
    this.currentPosition = newPosition;
    this.animateDice(newPosition);
  }

  animateDice(newPosition: number) {
    const position = this.getPosition(newPosition);
    this.dicePosition = `translate(${position.x}px, ${position.y}px)`;
  }

  getPosition(index: number) {
    const row = Math.floor(index / 5);
    const col = index % 5;
    return {
      x: col * 160,
      y: row * 160
    };
  }

  getItemClass(index: number): string {
    const rowIndex = Math.floor(index / 5) + 1;
    return rowIndex % 2 === 0 ? 'even-row' : 'odd-row';
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

  getItemStyle(i: number) {
    return this.colors[i];
  }
}

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
  }

  initializeBoard() {
    const totalCells = 20;
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
    // Defina o valor do dado e atualize a animação
    this.diceValue = Math.floor(Math.random() * 6) + 1;
    this.animateDice();

    // Esperar a animação do dado e então mover o jogador
    setTimeout(() => {
      if (this.diceValue !== null) {
        this.movePlayer(this.diceValue);
      }
    }, 1000); // Esperar o tempo da animação
  }

  animateDice() {
    const diceElement = document.querySelector('.dice') as HTMLElement;
    if (diceElement) {
      this.diceRotation += 360; // Incrementa a rotação a cada clique
      diceElement.style.transform = `rotate(${this.diceRotation}deg)`;
    }
  }

  movePlayer(roll: number) {
    // Calcular a nova posição do jogador
    const newPosition = Math.min(this.currentPosition + roll, this.board.length - 1);
    this.currentPosition = newPosition;
    
    // Atualizar a posição do marcador
    const position = this.getPosition(this.currentPosition);
    this.markerPosition = `translate(${position.x}px, ${position.y}px)`;
  }

  getPosition(index: number) {
    const row = Math.floor(index / 5);
    const col = index % 5;
    return {
      x: col * 160 + 15, // Ajustar para centralizar o marcador
      y: row * 160 + 15  // Ajustar para centralizar o marcador
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
}

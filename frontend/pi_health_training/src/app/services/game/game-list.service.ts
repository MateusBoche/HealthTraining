import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { Game } from '../../domain/model/game';
import { User } from '../../domain/model/user.model';
import { AuthenticationService } from '../security/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class GameListService {
  private apiUrl = 'http://localhost:8081/api/game';

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  getGamesByUserEmail(email: String): Promise<Game[]> {
    const token = localStorage.getItem('token');
    console.log
    if (!token) {
      throw new Error('Token não encontrado. Usuário não autenticado.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return firstValueFrom(
      this.http.get<Game[]>(`${this.apiUrl}/listar-jogos/${email}`, { headers })
    ).catch(error => {
      console.error('Erro ao buscar jogos:', error);
      throw error;
    });
  }

  getUserFromAuthentication(): User {
    let authenticatedUser = this.authenticationService.getAuthenticatedUser();

    let user: User = {
      email: authenticatedUser.email,
      fullName: authenticatedUser.fullName,
      password: '',
      role: authenticatedUser.role,
    };
    return user;
  }

  deleteGame(gameId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${gameId}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Game } from '../../domain/model/game';
import { User } from '../../domain/model/user.model';
import { GameList } from '../../domain/dto/gamelist';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../security/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class GameRankingService {
  private apiUrl = 'http://localhost:8081/api/game';

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

  
  //getGamesByUserId(userId: number): Promise<Game[]> {
    //return firstValueFrom(this.http.get<Game[]>(`${this.apiUrl}/listar-jogos/${userId}`));
    //return firstValueFrom(this.http.get<Game[]>(`http://localhost:8081/api/game/listar-melhores`));
  //}

  getGamesRanking(): Promise<GameList[]> {
    //return firstValueFrom(this.http.get<Game[]>(`${this.apiUrl}/listar-jogos/${userId}`));
    return firstValueFrom(this.http.get<GameList[]>(`http://localhost:8081/api/game/listar-melhores`));
  }

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


  
  
  
}

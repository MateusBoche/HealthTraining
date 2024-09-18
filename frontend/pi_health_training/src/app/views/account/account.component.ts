import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../../domain/model/user';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  constructor(private http: HttpClient) { }
  
  usuario!: User;

  ngOnInit() {
    this.buscar_dados();
  }

  async buscar_dados() {
    const email = localStorage.getItem('email');
    const senha = localStorage.getItem('senha');

    return this.http.get<User[]>(`http://localhost:3000/user?email=${email}&senha=${senha}`).subscribe({
      next: value => {
        this.usuario = value[0];

      },
      error: error => {

      }
    });
  }

}

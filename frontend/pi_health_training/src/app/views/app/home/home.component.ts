import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../services/security/authentication.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authenticationService.isAuthenticated(); 
    console.log('home');
  }


}

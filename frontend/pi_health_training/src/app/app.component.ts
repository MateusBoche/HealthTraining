import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AuthenticationService} from "./services/security/authentication.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lds-frontend-2';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
  }

  sair() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  alternarMenu() {
  }

}

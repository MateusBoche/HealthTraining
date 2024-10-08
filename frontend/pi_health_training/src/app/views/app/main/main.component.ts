import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';

import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule, Routes} from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import * as fontawesome from '@fortawesome/free-solid-svg-icons';
import {AuthenticationService} from '../../../services/security/authentication.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatExpansionModule,
    MatTooltipModule,
    FontAwesomeModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  faCoffee = fontawesome.faHeartBroken;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    console.log('main');
    // this.router.navigate(['game/prepare-to-start']);
  }

  public logout() {
    this.router.navigate(['account/sign-in']);
    this.authenticationService.logout();
  }
}

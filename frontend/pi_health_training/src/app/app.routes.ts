import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { PasswordRecoveryComponent } from './views/password-recovery/password-recovery.component';
import { AboutUsComponent } from './views/about-us/about-us.component';
import { SupportComponent } from './views/support/support.component';
import { GamesListComponent } from './views/games-list/games-list.component';
import { AccountComponent } from './views/account/account.component';
import { TermsComponent } from './views/terms/terms.component';
import { GameComponent } from './views/game/game.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'entrar', component: SignInComponent },
    { path: 'cadastrar', component: SignUpComponent },
    { path: 'alterar-senha', component: PasswordRecoveryComponent },
    { path: 'sobre', component: AboutUsComponent },
    { path: 'suporte', component: SupportComponent },
    { path: 'jogos', component: GamesListComponent },
    { path: 'meu-perfil', component: AccountComponent },
    { path: 'termos-de-uso', component: TermsComponent },
    { path: 'jogo/:id', component: GameComponent },
    { path: '**', redirectTo: '' }
];

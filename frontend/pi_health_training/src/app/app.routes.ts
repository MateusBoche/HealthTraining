import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { SignInComponent } from './views/account/sign-in/sign-in.component';
import { SignUpComponent } from './views/account/sign-up/sign-up.component';
import { PasswordRecoveryComponent } from './views/password-recovery/password-recovery.component';
import { AboutUsComponent } from './views/about-us/about-us.component';
import { SupportComponent } from './views/support/support.component';
import { GamesListComponent } from './views/app/games-list/games-list.component';
import { AccountComponent } from './views/account/my-profile/account.component';
import { TermsComponent } from './views/terms/terms.component';
import { GameComponent } from './views/app/game/game.component';
import { authenticationGuard } from './services/security/guard/authentication.guard';
import { HelpComponent } from './views/help/help.component';


export const routes: Routes = [
    {
        path: 'account/sign-in',
        component: SignInComponent,
    },
    {
        path: 'account/sign-up',
        component: SignUpComponent,
    },
    {
        path: 'help',
        component: HelpComponent,
        
    },
    {
        path: 'about-us',
        component: AboutUsComponent,

    },

    {
        path: 'support',
        component: SupportComponent,
    },
    {
        path: 'terms-of-use',
        component: TermsComponent,
    },
    {
        path: 'change-password',
        component: PasswordRecoveryComponent,

    },
    {
        path: '',
        component: HomeComponent,
        canActivate: [authenticationGuard],
        children: [
            {
                path: '',
                component: HomeComponent,
               },
            {
                path: 'game',
                children:[
                    {
                        path: 'game/:id',
                        component: GameComponent,
                    },
                    {
                        path: 'game/game-list',
                        component: GamesListComponent,
    
                    },
                    {
                        path: 'game/my-account',
                        component: AccountComponent,
                    },

                ],
            }
        ],
    },
    { path: '**', redirectTo: '' },
  





];

//antiga rota
/**    { path: '', component: HomeComponent },
    { path: 'entrar', component: SignInComponent },
    { path: 'cadastrar', component: SignUpComponent },
    { path: 'alterar-senha', component: PasswordRecoveryComponent },
    { path: 'sobre', component: AboutUsComponent },
    { path: 'suporte', component: SupportComponent },
    { path: 'jogos', component: GamesListComponent },
    { path: 'meu-perfil', component: AccountComponent },
    { path: 'termos-de-uso', component: TermsComponent },
    { path: 'jogo/:id', component: GameComponent },
    { path: '**', redirect */

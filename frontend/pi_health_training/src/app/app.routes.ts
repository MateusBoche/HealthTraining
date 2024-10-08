import {Routes} from '@angular/router';
import {NotFoundComponent} from './views/not-found/not-found.component';
import {SignInComponent} from './views/account/sign-in/sign-in.component';
import {SignUpComponent} from './views/account/sign-up/sign-up.component';
import {HomeComponent} from './views/app/home/home.component';
import {MainComponent} from './views/app/main/main.component';
import {ProductCreateComponent} from './views/app/product/product-create/product-create.component';
import {ProductListComponent} from './views/app/product/product-list/product-list.component';
import {ProductDetailComponent} from './views/app/product/product-detail/product-detail.component';
import {ProductEditComponent} from './views/app/product/product-edit/product-edit.component';
import {MyProfileComponent} from './views/account/my-profile/my-profile.component';
import {HelpComponent} from './views/app/help/help.component';
import {authenticationGuard} from './services/security/guard/authentication.guard';
import {AboutUsComponent} from "./views/about-us/about-us.component";
import {SupportComponent} from "./views/support/support.component";
import {TermsComponent} from "./views/terms/terms.component";
import {PasswordRecoveryComponent} from "./views/password-recovery/password-recovery.component";
import {PrepareToStartComponent} from "./views/app/game/prepare-to-start/prepare-to-start.component";
import {GameListComponent} from "./views/app/game/game-list/game-list.component";
import {GameComponent} from "./views/app/game/game/game.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'account/sign-in',
    component: SignInComponent,
  },
  {
    path: 'account/sign-up',
    component: SignUpComponent
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
    component: MainComponent,
    canActivate: [authenticationGuard],
    children: [
      {
        path: 'account/my-profile',
        component: MyProfileComponent
      },
      {
        path: 'game',
        children: [
          {
            path: 'prepare-to-start',
            component: PrepareToStartComponent
          },
          {
            path: 'game/:id',
            component: GameComponent,
          },
          {
            path: 'game/list',
            component: GameListComponent
          },
        ]
      },
      {
        path: '**',
        component: NotFoundComponent
      },
    ]
  },
];

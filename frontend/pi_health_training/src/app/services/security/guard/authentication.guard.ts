import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authenticationService = inject(AuthenticationService);

  // const isAuthenticated = false;
  const isAuthenticated = authenticationService.isAuthenticated();

  console.log(router.url);

  if (isAuthenticated) {
    return true;
  }

  if (router.url === 'account/sign-up') {
    router.navigate(['account/sign-up']);
    return false;
  }

  router.navigate(['account/sign-in']);
  return false;
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authenticatorGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const isAuthenticated = true;
  
  if(isAuthenticated){
    return true;
  }

  if(router.url === "accout/sign-up"){
    router.navigate(["accout/sign-in"])
    return false;

  }
  router.navigate(["accout/sign-in"])



  return false;
};

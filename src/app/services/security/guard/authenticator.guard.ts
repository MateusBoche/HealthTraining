import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authenticatorGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const isAuthenticated = true;
  
  if(isAuthenticated){
    return true;
  }

  if(router.url === "account/sign-up"){
    router.navigate(["account/sign-in"])
    return false;

  }
  router.navigate(["account/sign-in"]);



  return false;
};

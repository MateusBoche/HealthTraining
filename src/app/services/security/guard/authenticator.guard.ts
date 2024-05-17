import { CanActivateFn } from '@angular/router';

export const authenticatorGuard: CanActivateFn = (route, state) => {
  return true;
};

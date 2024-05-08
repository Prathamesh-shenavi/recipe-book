import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (sessionStorage.getItem('username')) {
    return true;
  } else {
    window.location.href = '/login';
    return false;
  }
};

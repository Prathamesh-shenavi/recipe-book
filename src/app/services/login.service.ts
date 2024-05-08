import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private route: Router) {}
  login(username:string, password:string) {
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('password', password);
  }
  logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    this.route.navigate(['/']);
  }
}

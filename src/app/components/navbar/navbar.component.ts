import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { MenuDrawerComponent } from '../menu-drawer/menu-drawer.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule,MenuDrawerComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  shouldShowUnderline(url: string): boolean {
    return this.router.url === url;
  }
  constructor(private loginService: LoginService, public router: Router) {}
  onLogout() {
    const choice = confirm('Do you really want to log out?');
    if (choice) {
      this.loginService.logout();
      this.router.navigate(['/']);
    }
  }
  onShowMenu() {
    console.log("Menu clicked!");
    
  }
}

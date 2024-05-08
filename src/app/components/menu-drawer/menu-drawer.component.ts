import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-menu-drawer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-drawer.component.html',
  styleUrl: './menu-drawer.component.css',
})
export class MenuDrawerComponent {
  isOpen: boolean = false;
  constructor(private router: Router, private loginService: LoginService) {
      this.isOpen= false;
  }
  shouldShowUnderline(url: string): boolean {
    return this.router.url === url;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('#menuToggle') && !target.closest('#menuDrawer')) {
      this.closeMenu();
    }
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  closeMenu() {
    this.isOpen = false;
  }
  onLogout() {
    const choice = confirm('Do you really want to log out?');
    if (choice) {
      this.loginService.logout();
      this.router.navigate(['/']);
    }
  }
}

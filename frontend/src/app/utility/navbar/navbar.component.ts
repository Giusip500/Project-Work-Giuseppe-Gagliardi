import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ButtonModule, TranslateModule],
  template: `
    <nav class="navbar">
      <div class="logo">
        <img src="assets/logo.png" alt="Logo" class="logo" />
      </div>
      <div class="user-info" (mouseenter)="showDropdown = true" (mouseleave)="showDropdown = false">
        <button pButton class="profile-btn">
          <span>{{ username }}</span>
          <img [src]="avatarUrl" alt="Avatar" class="avatar" />
        </button>
        <div class="dropdown-menu" *ngIf="showDropdown">
          <a (click)="goToProfile()">{{ 'NAV.MY_PROFILE' | translate }}</a>
          <hr width="100px">
          <a (click)="goToReservations()">{{ 'NAV.MY_RESERVATIONS' | translate }}</a>
          <hr width="100px">
          <a (click)="goToCustomMenus()">{{ 'NAV.MY_CUSTOM_MENUS' | translate }}</a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      background-color: rgb(85, 60, 20);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .logo {
      width: 75px;
      height: 75px;
      border-radius: 50%;
      object-fit: cover;
    }

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
    }

    .profile-btn {
      background-color: rgb(85, 60, 20) !important;
      color: rgb(225, 225, 225) !important;
      border: none !important;
    }

    .user-info {
      position: relative;
    }

    .dropdown-menu {
      display: flex;
      flex-direction: column;
      position: absolute;
      min-width: 175px;
      top: 60px;
      right: 0;
      background-color: white;
      border: 0.5px solid gray;
      border-radius: 10px;
      box-shadow: 0 10px 10px rgba(0,0,0,0.1);
      z-index: 1;
    }

    .dropdown-menu a {
      padding: 10px 10px;
      cursor: pointer;
      text-align: center;
      color: rgb(20, 15, 15);
    }
  `]
})
export class NavbarComponent implements OnInit{
  username: string = '';
  avatarUrl: string = '';
  showDropdown: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || 'Guest';
    this.avatarUrl = localStorage.getItem('avatar') || 'assets/avatar.png';
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }

  goToReservations() {
    this.router.navigate(['reservations']);
  }

  goToCustomMenus() {
    this.router.navigate(['custom-menus']);
  }
}

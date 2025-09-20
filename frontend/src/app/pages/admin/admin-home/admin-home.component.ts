import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, CardModule, CommonModule],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit{
  username: string = '';
  avatarUrl: string = '';
  showDropdown: boolean = false;
  
  sections = [
    { title: 'Rooms Booked', image: 'assets/home-page/rooms.jpg', route: '/rooms-booked' },
    { title: 'Custom Menus', image: 'assets/home-page/restaurant.jpg', route: '/admin-custom-menus' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || 'Guest';
    this.avatarUrl = localStorage.getItem('avatar') || 'assets/avatar.png';
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }
  
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}

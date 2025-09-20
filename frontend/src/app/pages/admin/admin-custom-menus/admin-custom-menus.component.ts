import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-admin-custom-menus',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    TableModule,
    MessageModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './admin-custom-menus.component.html',
  styleUrl: './admin-custom-menus.component.css'
})
export class AdminCustomMenusComponent {
  username: string = '';
  avatarUrl: string = '';
  showDropdown: boolean = false;
  // Custom Menus
  customMenus: any[] = [];
  filterDate: Date | null = null;
  filterType: string = '';

  mealTypes = [
    { label: 'All', value: '' },
    { label: 'Lunch', value: 'Lunch' },
    { label: 'Dinner', value: 'Dinner' }
  ];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || 'Guest';
    this.avatarUrl = localStorage.getItem('avatar') || 'assets/avatar.png';
    this.loadMenus();
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }

  loadMenus() {
    let url = 'http://localhost:8080/api/custom-menu/admin';
    const params: string[] = [];

    if (this.filterDate) {
      const localDate = new Date(this.filterDate.getTime() - this.filterDate.getTimezoneOffset() * 60000);
      const formattedDate = localDate.toISOString().split('T')[0];
      params.push(`date=${formattedDate}`);
    }
    if (this.filterType) {
      params.push(`type=${this.filterType}`);
    }
    if (params.length > 0) {
      url += '?' + params.join('&');
    }

    this.http.get<any[]>(url).subscribe(data => {
      this.customMenus = data;
    });
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MapSectionComponent } from '../../../utility/map-section/map-section.component';
import { LanguageSwitcherComponent } from '../../../utility/language-switcher/language-switcher.component';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from '../../../utility/navbar/navbar.component';
import { FooterComponent } from '../../../utility/footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    CommonModule,
    MapSectionComponent,
    LanguageSwitcherComponent,
    TranslateModule,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  username: string = '';
  avatarUrl: string = '';
  showDropdown: boolean = false;
  rooms: any[] = [];

  sections = [
    {
      titleKey: 'HOME.ROOMS',
      image: 'assets/home-page/rooms.jpg',
      route: '/rooms',
    },
    {
      titleKey: 'HOME.RESTAURANT',
      image: 'assets/home-page/restaurant.jpg',
      route: '/restaurant',
    },
    {
      titleKey: 'HOME.MEETING',
      image: 'assets/home-page/meeting.jpg',
      route: '/meeting',
    },
  ];

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}

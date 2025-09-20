import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from '../../../utility/navbar/navbar.component';
import { FooterComponent } from '../../../utility/footer/footer.component';

@Component({
  selector: 'app-rooms',
  imports: [CommonModule, RouterModule, CardModule, FormsModule, InputTextModule, ButtonModule, TranslateModule, NavbarComponent, FooterComponent],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {
  // navbar informations
  username: string = '';
  avatarUrl: string = '';
  showDropdown: boolean = false;

  showServices = false;

  roomCategories = [
  { titleKey: 'ROOMS.SINGLE', image: 'assets/rooms-page/single.jpg', route: '/rooms/single-room' },
  { titleKey: 'ROOMS.DOUBLE', image: 'assets/rooms-page/double.jpg', route: '/rooms/double-room' },
  { titleKey: 'ROOMS.TRIPLE', image: 'assets/rooms-page/triple.jpg', route: '/rooms/triple-room' },
  { titleKey: 'ROOMS.FAMILY', image: 'assets/rooms-page/family.jpg', route: '/rooms/family-room' },
  { titleKey: 'ROOMS.SUITE', image: 'assets/rooms-page/suite.jpg', route: '/rooms/suite' },
  { titleKey: 'ROOMS.PET', image: 'assets/rooms-page/pet.jpg', route: '/rooms/pet-friendly-room' }
];
  constructor(private router: Router) {}

  openRoom(route: string) {
    this.router.navigate([route]);
  }
}

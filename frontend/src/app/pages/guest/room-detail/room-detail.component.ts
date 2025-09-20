import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { BookingService } from '../../../services/booking.service';
import { BookingRequest } from '../../../models/booking-request';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavbarComponent } from '../../../utility/navbar/navbar.component';
import { FooterComponent } from '../../../utility/footer/footer.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-room-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePickerModule, ButtonModule, TranslateModule, NavbarComponent, FooterComponent],
  providers: [BookingService],
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.css'
})
export class RoomDetailComponent implements OnInit{
  // room properties
  room!: string;
  roomType!: string;
  roomImage!: string;
  roomRawName: string = '';
  description!: string;
  amenities!: string[];
  showAmenities: boolean = false;
  price!: number; 

  // informations for booking
  today: Date = new Date();
  checkInDate: Date | null = null;
  checkOutDate: Date | null = null;
  minCheckOutDate: Date = this.today;
  isAvailable: boolean | null = null;
  bookingResult: string | null = null;
  totalPrice: number | null = null;

  // informnations about every room
  slugToRoomTitle: { [key: string]: string } = {
    'single-room': 'Single Room',
    'double-room': 'Double Room',
    'triple-room': 'Triple Room',
    'family-room': 'Family Room',
    'suite': 'Suite',
    'pet-friendly-room': 'Pet Friendly Room'
  };

  constructor(private route: ActivatedRoute, private bookingService: BookingService, private router: Router, private translate: TranslateService) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('roomType') || '';
    const roomKey = this.slugToRoomTitle[slug];
    this.roomRawName = roomKey;
    const roomId = this.mapRoomToTranslationKey(roomKey);

    if (roomId) {
      this.translate.get(`ROOM_DETAIL.ROOMS.${roomId}`).subscribe((room) => {
        this.roomType = room.TITLE;
        this.description = room.DESCRIPTION;
        this.amenities = room.AMENITIES;
      });
      
      this.roomImage = `assets/rooms-detail-page/${slug}.jpg`;
      this.price = this.getPriceByRoom(roomId);
    }
  }

  checkAvailabilityAndReserve() {
    if (!this.checkInDate || !this.checkOutDate) return;

    const request: BookingRequest = {
      roomType: this.roomRawName,
      checkInDate: this.formatDate(this.checkInDate),
      checkOutDate: this.formatDate(this.checkOutDate),
      totalPrice: this.totalPrice ?? 0,
      status: 'PENDING',
      userId: Number(localStorage.getItem('id') ?? 0)
    };

    const currentLang = this.translate.currentLang || 'en';

    this.bookingService.checkAvailability(request.roomType, request.checkInDate, request.checkOutDate).subscribe({
      next: (available) => {
        this.isAvailable = available;
        if (available) {
          this.bookingService.createBooking(request, currentLang).subscribe({
            next: () => this.bookingResult = this.translate.instant('ROOM_DETAIL.ROOM_BOOKED'),
            error: () => this.bookingResult = this.translate.instant('ROOM_DETAIL.ERROR_WHILE_BOOKING')
          });
        } else {
          this.bookingResult = this.translate.instant('ROOM_DETAIL.NO_ROOM_AVAILABLE');
        }
      },
      error: () => {
        this.bookingResult = this.translate.instant('ROOM_DETAIL.ERROR_DURING_AVAILABILITY_CHECK');
      }
    });
  }

  confirmBooking() {
    Swal.fire({
      title: this.translate.instant('ROOM_DETAIL.CONFIRM_BOOKING_TITLE'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3095d6',
      confirmButtonText: this.translate.instant('ROOM_DETAIL.CONFIRM_BOOKING'),
      cancelButtonText: this.translate.instant('ROOM_DETAIL.CANCEL')
    }).then((result) => {
      if (result.isConfirmed) {
        this.checkAvailabilityAndReserve();
      }
    });
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  public calculateTotalPrice(): void {
    if (this.checkInDate) {
      this.minCheckOutDate = new Date(this.checkInDate);
      this.minCheckOutDate.setDate(this.minCheckOutDate.getDate() + 1);
    } else {
      this.minCheckOutDate = this.today;
    }

    if (this.checkInDate && this.checkOutDate) {
      const checkIn = new Date(this.checkInDate);
      checkIn.setHours(0, 0, 0, 0);
      const checkOut = new Date(this.checkOutDate);
      checkOut.setHours(0, 0, 0, 0);

      const millisecondsPerDay = 1000 * 60 * 60 * 24;
      const diffInMs = checkOut.getTime() - checkIn.getTime();
      const numberOfNights = Math.floor(diffInMs / millisecondsPerDay);
      this.totalPrice = numberOfNights > 0 ? numberOfNights * this.price : null;
    } else {
      this.totalPrice = null;
    }
  }

  mapRoomToTranslationKey(roomTitle: string): string {
    switch (roomTitle) {
      case 'Single Room': return 'SINGLE';
      case 'Double Room': return 'DOUBLE';
      case 'Triple Room': return 'TRIPLE';
      case 'Family Room': return 'FAMILY';
      case 'Suite': return 'SUITE';
      case 'Pet Friendly Room': return 'PET';
      default: return '';
    }
  }

  getPriceByRoom(roomId: string): number {
    const prices: { [key: string]: number } = {
      SINGLE: 25,
      DOUBLE: 50,
      TRIPLE: 75,
      FAMILY: 100,
      SUITE: 200,
      PET: 100
    };
    return prices[roomId] || 0;
  }
}

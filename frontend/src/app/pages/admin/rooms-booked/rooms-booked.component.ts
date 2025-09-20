import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { BookingService } from '../../../services/booking.service';
import { BookingResponse } from '../../../models/booking-response';

@Component({
  selector: 'app-rooms-booked',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, CardModule, CommonModule],
  templateUrl: './rooms-booked.component.html',
  styleUrl: './rooms-booked.component.css'
})
export class RoomsBookedComponent {
  username: string = '';
  avatarUrl: string = '';
  showDropdown: boolean = false;

  pendingBookings: BookingResponse[] = [];
  confirmedBookings: BookingResponse[] = [];
  rejectedBookings: BookingResponse[] = [];

  constructor(private router: Router, private bookingService: BookingService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || 'Guest';
    this.avatarUrl = localStorage.getItem('avatar') || 'assets/avatar.png';

    this.loadPendingBookings();
    this.loadConfirmedBookings();
    this.loadRejectedBookings();
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }

  loadPendingBookings() {
    this.bookingService.getPendingBookings().subscribe({
      next: (bookings) => {this.pendingBookings = bookings
        console.log(bookings)
      },
      error: (err) => console.error(err),
    });
  }

  loadConfirmedBookings() {
    this.bookingService.getConfirmedBookings().subscribe({
      next: (bookings) => (this.confirmedBookings = bookings),
      error: (err) => console.error(err),
    });
  }

  loadRejectedBookings() {
    this.bookingService.getRejectedBookings().subscribe({
      next: (bookings) => (this.rejectedBookings = bookings),
      error: (err) => console.error(err),
    });
  }

  updateStatus(bookingId: number, newStatus: string) {
    this.bookingService.updateBookingStatus(bookingId, newStatus).subscribe({
      next: () => {
        this.loadPendingBookings();
        this.loadConfirmedBookings();
        this.loadRejectedBookings();
      },
      error: (error) => console.error(error),
    });
  }
}

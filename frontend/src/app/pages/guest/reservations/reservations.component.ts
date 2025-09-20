import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TranslateModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent implements OnInit {
  reservations: any[] = [];

  constructor(private bookingService: BookingService, private http: HttpClient, private translate: TranslateService) {}

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('id') || '0');
    this.bookingService.getBookingByUser(userId).subscribe({
      next: data => this.reservations = data,
      error: error => {
        console.error('Error loading reservations:', error);
        alert('Error loading reservations');
      }
    });
  }

  getTranslatedStatus(status: string): string {
    const currentLang = this.translate.currentLang || 'en';

    const statusMap: { [key: string]: { [lang: string]: string } } = {
      PENDING: {
        en: 'Pending',
        it: 'In attesa'
      },
      CONFIRMED: {
        en: 'Confirmed',
        it: 'Confermata'
      },
      REJECTED: {
        en: 'Rejected',
        it: 'Rifiutata'
      }
    };

    return statusMap[status]?.[currentLang] || status;
  }

  deleteBooking(id: number) {
    const currentLang = this.translate.currentLang || 'en';
    
    this.bookingService.deleteBooking(id, currentLang).subscribe({
      next: () => {
        this.reservations = this.reservations.filter(r => r.id !== id);
      },
      error: (error) => {
        alert('Error while deleting reservation.');
      }
    });
  }

  confirmDelete(id: number) {
    Swal.fire({
      title: this.translate.instant('RESERVATIONS.CONFIRM_DELETE.TITLE'),
      text: this.translate.instant('RESERVATIONS.CONFIRM_DELETE.TEXT'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3095d6',
      confirmButtonText: this.translate.instant('RESERVATIONS.CONFIRM_DELETE.CONFIRM_BUTTON_TEXT'),
      cancelButtonText: this.translate.instant('RESERVATIONS.CONFIRM_DELETE.CONFIRM_BUTTON_CANCEL')
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteBooking(id);
        Swal.fire(this.translate.instant('RESERVATIONS.CONFIRM_DELETE.RESULT_TITLE'), this.translate.instant('PROFILE.CONFIRM_DELETE.RESULT_HTML'), 'success');
      }
    });
  }
}

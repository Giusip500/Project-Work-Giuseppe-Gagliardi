import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingRequest } from '../models/booking-request';
import { Observable } from 'rxjs';
import { BookingResponse } from '../models/booking-response';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private apiUrl = 'http://localhost:8080/api/bookings'; 

  constructor(private http: HttpClient) {}

  createBooking(request: BookingRequest, lang: string = 'en'): Observable<any> {
    const params = new HttpParams().set('lang', lang);
    return this.http.post(`${this.apiUrl}`, request, { params });
  }

  getBookingByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  getPendingBookings(): Observable<BookingResponse[]> {
    return this.http.get<BookingResponse[]>(`${this.apiUrl}/pendingAll`);
  }

  getConfirmedBookings(): Observable<BookingResponse[]> {
    return this.http.get<BookingResponse[]>(`${this.apiUrl}/confirmedAll`);
  }

  getRejectedBookings(): Observable<BookingResponse[]> {
    return this.http.get<BookingResponse[]>(`${this.apiUrl}/rejectedAll`);
  }

  checkAvailability(roomType: string, checkIn: string, checkOut: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/availability`,{ params: { roomType, checkIn, checkOut } });
  }

  updateBookingStatus(bookingId: number, newStatus: string, lang: string = 'en'): Observable<any> {
    const params = new HttpParams().set('lang', lang);
    return this.http.put(`${this.apiUrl}/${bookingId}/status`, { status: newStatus }, { params });
  }

  deleteBooking(id: number, lang: string = 'en'): Observable<any> {
    const params = new HttpParams().set('lang', lang);
    return this.http.delete(`${this.apiUrl}/${id}`, { params });
  }
}

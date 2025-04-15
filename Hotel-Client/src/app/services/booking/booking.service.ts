import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingDetails } from '../../models/BookingDetails';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:8080/api/bookings';  // Adjust based on backend

  constructor(private http: HttpClient) {}

  // ✅ Create Booking
  createBooking(booking: BookingDetails): Observable<BookingDetails> {
    return this.http.post<BookingDetails>(this.apiUrl, booking);
  }

  updateBookingStatus(id: number, status: string): Observable<any> {
    const requestBody = { status }; // Wrap status in an object
    return this.http.put(`${this.apiUrl}/${id}/status`, requestBody, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // ✅ Get Booking by ID
  getBookingById(bookingId: number): Observable<BookingDetails> {
    return this.http.get<BookingDetails>(`${this.apiUrl}/${bookingId}`)
      .pipe(catchError(this.handleError));
  }

  // ✅ Get Bookings by User ID
  getBookingsByUser(userId: number): Observable<BookingDetails[]> {
    return this.http.get<BookingDetails[]>(`${this.apiUrl}/user/${userId}`)
      .pipe(catchError(this.handleError));
  }

  // ✅ Get Bookings by Hotel ID
  getBookingsByHotel(hotelId: number): Observable<BookingDetails[]> {
    return this.http.get<BookingDetails[]>(`${this.apiUrl}/hotel/${hotelId}`)
      .pipe(catchError(this.handleError));
  }

  // ✅ Delete Booking
  deleteBooking(bookingId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${bookingId}`)
      .pipe(catchError(this.handleError));
  }

  // ✅ Handle Errors
  private handleError(error: HttpErrorResponse) {
    console.error('BookingService Error:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GuestInfo } from '../../models/GuestInfo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private apiUrl = 'http://localhost:8080/api/guests'; // Change if using a different port

  constructor(private http: HttpClient) {}

  // Add a new guest
  addGuest(guest: GuestInfo): Observable<GuestInfo> {
    return this.http.post<GuestInfo>(this.apiUrl, guest);
  }

  saveMultipleGuests(guests: GuestInfo[]): Observable<GuestInfo[]> {
    return this.http.post<GuestInfo[]>(`${this.apiUrl}/saveAll`, guests);
  }
  // Get all guests
  getAllGuests(): Observable<GuestInfo[]> {
    return this.http.get<GuestInfo[]>(this.apiUrl);
  }

  // Get guest by ID
  getGuestById(id: number): Observable<GuestInfo> {
    return this.http.get<GuestInfo>(`${this.apiUrl}/${id}`);
  }

  // Get guests by customer ID
  getGuestsByCustomerId(customerId: number): Observable<GuestInfo[]> {
    return this.http.get<GuestInfo[]>(`${this.apiUrl}/customer/${customerId}`);
  }

  // Delete a guest by ID
  deleteGuest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../../models/Rooms';
import { BookingDetails } from '../../models/BookingDetails';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private baseUrl = 'http://localhost:8080/api/rooms';

  constructor(private http: HttpClient) {}

  addRoom(roomData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addRooms`, roomData, { responseType: 'text' });
  }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}`);
  }

  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.baseUrl}/${id}`);
  }

  deleteRoom(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  updateRoom(id: number, roomData: any): Observable<Room> {
    return this.http.put<Room>(`${this.baseUrl}/${id}`, roomData);
  }

  getRoomStatus(hotelId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/roomStatus/${hotelId}`);
  }

  getRoomsByHotelId(hotelId: number): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}/hotel/${hotelId}`);
  }

   bookRoom(booking: BookingDetails[]): Observable<any> {
      return this.http.post(`${this.baseUrl}/create`, booking);
    }
  
    getBookingsByUser(userId: number): Observable<BookingDetails[]> {
      return this.http.get<BookingDetails[]>(`${this.baseUrl}/user/${userId}`);
    }
  
    cancelBooking(bookingId: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/cancel/${bookingId}`);
    }

 
  
}

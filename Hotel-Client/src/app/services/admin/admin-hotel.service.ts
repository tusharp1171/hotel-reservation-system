import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotel } from '../../models/Hotel';
import { Observable } from 'rxjs';
import { BookingDetails } from '../../models/BookingDetails';

@Injectable({
  providedIn: 'root'
})
export class AdminHotelService {

  API="http://localhost:8080/api/hotels";

  
  constructor(private http:HttpClient) { }

  addhotel(hotel:Hotel){
    return this.http.post<Hotel>(this.API,hotel);
  }

  getHotelsByUserId(userId: number): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.API}/user/${userId}`);
  }

  deleteHotel(hotelId: number): Observable<string> {
    return this.http.delete(`${this.API}/${hotelId}`, { responseType: 'text' });
  }

  getAllHotels():Observable<Hotel[]>{
    return this.http.get<Hotel[]>(`${this.API}`)
  }


  searchHotels(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/search?keyword=${keyword}`);
  }
 
}

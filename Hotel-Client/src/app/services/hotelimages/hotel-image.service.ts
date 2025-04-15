import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { HotelImage } from '../../models/HotelImage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelImageService {
  private baseUrl = 'http://localhost:8080/api/hotel-images';

  constructor(private http: HttpClient) {}
  
  

  uploadImage(file: File, hotelId: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.http.post(`${this.baseUrl}/upload/${hotelId}`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  getImagesByHotelId(hotelId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/hotel/${hotelId}`);
  }

  deleteImage(imageId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${imageId}`);
  }
}
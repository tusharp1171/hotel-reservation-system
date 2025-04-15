import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomImage } from '../../models/RoomImage';

@Injectable({
  providedIn: 'root'
})
export class RoomImageService {

  private baseUrl = 'http://localhost:8080/api/room-images';

  constructor(private http: HttpClient) {}

  uploadRoomImage(file: File, hotelId: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('hotelId', hotelId.toString());
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  getImagesByHotelId(hotelId: number): Observable<RoomImage[]> {
    return this.http.get<RoomImage[]>(`${this.baseUrl}/hotel/${hotelId}`);
  }

  deleteImage(imageId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${imageId}`);
  }
}

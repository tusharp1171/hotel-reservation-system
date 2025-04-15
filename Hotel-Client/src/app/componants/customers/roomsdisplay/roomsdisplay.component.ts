import { Component } from '@angular/core';
import { Hotel } from '../../../models/Hotel';
import { AdminHotelService } from '../../../services/admin/admin-hotel.service';
import { TokenService } from '../../../services/token.service';
import { RoomService } from '../../../services/user/room.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
  selector: 'app-roomsdisplay',
  imports: [CommonModule ,
     MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatChipsModule,
        MatCheckboxModule,
        MatChipsModule,
        MatIconModule
  ],
  templateUrl: './roomsdisplay.component.html',
  styleUrl: './roomsdisplay.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class RoomsdisplayComponent {
  hotels: Hotel[] = [];
  userId: number | null = null;
  selectedHotelId: number | null = null;
  roomStatus: Record<number, any> = {};
  selectedCategoryMap: Record<number, string | null> = {};
  errorMessage: string = '';

  constructor(
    private hotelService: AdminHotelService,
    private tokenService: TokenService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.tokenService.getUserId().then(id => {
      if (id) {
        this.userId = id;
        this.fetchHotels();
      } else {
        this.errorMessage = 'User ID not found.';
      }
    });
  }

  fetchHotels(): void {
    if (!this.userId) {
      this.errorMessage = 'User ID is required to fetch hotels.';
      return;
    }

    this.hotelService.getHotelsByUserId(this.userId).subscribe({
      next: data => {
        this.hotels = data.length > 0 ? data : [];
        this.errorMessage = this.hotels.length === 0 ? 'No hotels found for this user.' : '';
      },
      error: () => {
        this.errorMessage = 'Error fetching hotels.';
      }
    });
  }

  fetchRoomStatus(hotelId: number): void {
    this.selectedHotelId = hotelId;
    this.roomService.getRoomStatus(hotelId).subscribe({
      next: data => {
        this.roomStatus[hotelId] = data || {};
        this.selectedCategoryMap[hotelId] = null;
      },
      error: err => {
        this.roomStatus[hotelId] = {};
        this.errorMessage = err.error?.message || 'Failed to fetch room status.';
      }
    });
  }

  toggleRoomType(hotelId: number, roomType: string): void {
    this.selectedCategoryMap[hotelId] = this.selectedCategoryMap[hotelId] === roomType ? null : roomType;
  }

  getTotalRooms(hotelId: number, roomType: string): number {
    return this.roomStatus?.[hotelId]?.[roomType] ? Object.values(this.roomStatus[hotelId][roomType]).flat().length : 0;
  }

  getRoomTypes(hotelId: number): string[] {
    return this.roomStatus?.[hotelId] ? Object.keys(this.roomStatus[hotelId]) : [];
  }

  getStatuses(hotelId: number, roomType: string): string[] {
    return this.roomStatus?.[hotelId]?.[roomType] ? Object.keys(this.roomStatus[hotelId][roomType]) : [];
  }

  getStatusColor(roomType: string): string {
    const colors: Record<string, string> = {
      SUITE: '#8e44ad',
      DELUXE: '#3498db',
      STANDARD: '#e67e22',
      PRESIDENTIAL: '#27ae60'
    };
    return colors[roomType] || '#bdc3c7';
  }
}

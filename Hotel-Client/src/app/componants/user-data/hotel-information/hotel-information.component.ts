import { Component, OnInit } from '@angular/core';
import { AdminHotelService } from '../../../services/admin/admin-hotel.service';
import { Hotel } from '../../../models/Hotel';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { TokenService } from '../../../services/token.service';
import { RouterLink } from '@angular/router';


import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RoomService } from '../../../services/user/room.service';


@Component({
  selector: 'app-hotel-information',
  imports: [CommonModule,MatChipsModule,RouterLink, MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatBadgeModule,
    MatDividerModule,
    MatTooltipModule],
  templateUrl: './hotel-information.component.html',
  styleUrl: './hotel-information.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class HotelInformationComponent implements OnInit{
  hotels: Hotel[] = [];
  userId: number | null = null;
  selectedHotelId: number | null = null;
  errorMessage: string = '';

  constructor(
    private hotelService: AdminHotelService,
    private tokenService: TokenService,
    private roomService:RoomService
  ) {}

  ngOnInit(): void {
    this.tokenService.getUserId().then((id) => {
      if (id !== null) {
        this.userId = id;
        this.fetchHotels();
      } else {
        this.errorMessage = 'User ID not found.';
      }
    });
  }

  
  getRoomStatusClass(status: string): string {
    switch (status.toUpperCase()) {
      case 'AVAILABLE':
        return 'available';
      case 'BOOKED':
        return 'booked';
      case 'UNDER_MAINTENANCE':
        return 'under-maintenance';
      default:
        return '';
    }
  }
  
  
  fetchHotels(): void {
    if (!this.userId) {
      this.errorMessage = 'User ID is required to fetch hotels.';
      return;
    }

    this.hotelService.getHotelsByUserId(this.userId).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.hotels = data;
          this.errorMessage = ''; // Clear error message
        } else {
          this.hotels = [];
          this.errorMessage = 'No hotels found for this user.';
        }
      },
      error: (err) => {
        this.hotels = [];
        this.errorMessage = err.status === 404 
          ? 'No hotels found for this user.' 
          : 'An error occurred while fetching hotels.';
      }
    });
  }

  deleteHotel(hotelId: number): void {
    if (confirm('Are you sure you want to delete this hotel?')) {
      this.hotelService.deleteHotel(hotelId).subscribe({
        next: () => {
          this.hotels = this.hotels.filter((hotel) => hotel.id !== hotelId);
        },
        error: () => {
          this.errorMessage = 'Failed to delete hotel!';
        }
      });
    }
  }

  deleteRoom(roomId: number) {
    console.log(roomId);
    
    if (confirm('Are you sure you want to delete this room?')) {
        this.roomService.deleteRoom(roomId).subscribe(
            (response) => {
                alert('Room deleted successfully!');
                this.fetchHotels(); // Refresh the hotel list after deletion
            },
            (error) => {
                console.error('Error deleting room:', error);
                alert('Failed to delete room.');
            }
        );
    }
}

  toggleRoomDetails(hotelId: number): void {
    this.selectedHotelId = this.selectedHotelId === hotelId ? null : hotelId;
  }
}
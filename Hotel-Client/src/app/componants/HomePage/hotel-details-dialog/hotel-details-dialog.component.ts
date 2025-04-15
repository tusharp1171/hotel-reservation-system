import { Component, Inject, OnInit } from '@angular/core';
import { Room, RoomType } from '../../../models/Rooms';
import { RoomService } from '../../../services/user/room.service';
import { Hotel } from '../../../models/Hotel';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomTypeDialogComponent } from '../room-type-dialog/room-type-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { HotelBookDialogComponent } from '../hotel-book-dialog/hotel-book-dialog.component';
import { AuthService } from '../../../services/auth.service';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-hotel-details-dialog',
  imports: [MatDialogModule,CommonModule,
   
    MatCardModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './hotel-details-dialog.component.html',
  styleUrl: './hotel-details-dialog.component.css'
})
export class HotelDetailsDialogComponent implements OnInit {
  hotel: any;
  roomTypes: string[] = [];
  selectedRoomType: string = '';
  filteredImages: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialog: MatDialog,private authService:AuthService, private router: Router ) {}

  ngOnInit(): void {
    this.hotel = this.data.hotel;


  
    console.log('Hotel Data:', this.hotel);
    // console.log('Rooms:', this.hotel.rooms);
  
    if (!this.hotel.rooms || this.hotel.rooms.length === 0) {
      // console.warn('No rooms found in this hotel.');
      return;
    }
  
    this.roomTypes = [...new Set(this.hotel.rooms.map((room: any) => {
      // console.log('Room Data:', room); // Ensure `roomImages` is present
      return room.type ? String(room.type) : 'Unknown';
    }))] as string[];
  
    // console.log('Extracted Room Types:', this.roomTypes);
  
    if (this.roomTypes.length > 0) {
      this.selectedRoomType = this.roomTypes[0];
      this.filterImagesByRoomType(this.selectedRoomType);
    }
  }
  bookNow(hotel: Hotel) {

    console.log(this.authService.isLoggedIn());
    
    if (!this.authService.isLoggedIn()) {
      // Redirect to login if the user is not authenticated
      this.router.navigate(['/login']);
    } else {
      // Open booking dialog if the user is authenticated
      this.dialog.open(HotelBookDialogComponent, {
        width: '500px',
        data: { hotel }
      });
    }
  }
  
  openRoomTypeDialog(): void {
    if (!this.hotel || !this.hotel.roomImages) {
      console.error('No room images found');
      return;
    }

    this.dialog.open(RoomTypeDialogComponent, {
      width: '600px',
      data: {
        roomTypes: this.roomTypes,
        roomImages: this.hotel.roomImages
      }
    });
  }

  filterImagesByRoomType(roomType: string): void {
    this.selectedRoomType = roomType;

    this.filteredImages = this.hotel.roomImages
      ? this.hotel.roomImages
          .filter((image: any) => image.roomType === roomType)
          .map((image: any) => ({
            ...image,
            imageUrl: `http://localhost:8080/api/room-images/view/${image.filePath.split('\\').pop()}`
          }))
      : [];
  }
}
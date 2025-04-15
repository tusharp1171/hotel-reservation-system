import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Hotel } from '../../../models/Hotel';
import { AdminHotelService } from '../../../services/admin/admin-hotel.service';
import { HotelImageService } from '../../../services/hotelimages/hotel-image.service';
import { HotelImage } from '../../../models/HotelImage';
import { HotelBookDialogComponent } from '../hotel-book-dialog/hotel-book-dialog.component';
import { HotelDetailsDialogComponent } from '../hotel-details-dialog/hotel-details-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-hotels',
  imports: [CommonModule,MatCardModule,MatButtonModule,MatDialogModule,MatIconModule],
  templateUrl: './display-hotels.component.html',
  styleUrl: './display-hotels.component.css'
})
export class DisplayHotelsComponent {
  hotels: Hotel[] = [];

  constructor(
    private hotelService: AdminHotelService,
    private hotelImagesService: HotelImageService,
    private dialog: MatDialog,
    private authService: AuthService,  // Inject AuthService
    private router: Router // To redirect 
  ) {}

  ngOnInit(): void {
    this.getAllHotels();
    // console.log(this.hotels);
    
  }
  

  getAllHotels() {
    this.hotelService.getAllHotels().subscribe(
      (hotels: Hotel[]) => {
        this.hotels = hotels.map(hotel => {
          // Extract the first STANDARD room price
          const standardRoom = hotel.rooms?.find(room => room.type === 'STANDARD');
          hotel.standardRoomPrice = standardRoom ? standardRoom.price : null;
  
          // Fetch images for the hotel
          this.hotelImagesService.getImagesByHotelId(hotel.id!).subscribe(
            (images: HotelImage[]) => {
              hotel.hotelImages = images.map((image: HotelImage) => ({
                ...image,
                imageUrl: `http://localhost:8080/api/hotel-images/view/${image.filePath.split('\\').pop()}`
              }));
            },
            (error) => console.error(`Error fetching images for hotel ${hotel.id}:`, error)
          );
  
          return hotel;
        });
      },
      (error) => console.error('Error fetching hotels:', error)
    );
  }
  
  bookNow(hotel: Hotel) {

    // console.log(this.authService.isLoggedIn());
    
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

  viewDetails(hotel: Hotel) {
    this.dialog.open(HotelDetailsDialogComponent, {
      width: '500px',
      data: { hotel },
    });
  }

}

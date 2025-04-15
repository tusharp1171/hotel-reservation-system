import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../models/Hotel';
import { AdminAddHotelComponent } from '../admin-data/admin-add-hotel/admin-add-hotel.component';
import { HotelImageService } from '../../services/hotelimages/hotel-image.service';
import { AdminHotelService } from '../../services/admin/admin-hotel.service';
import { HotelImage } from '../../models/HotelImage';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HotelDetailsDialogComponent } from '../HomePage/hotel-details-dialog/hotel-details-dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HotelBookDialogComponent } from '../HomePage/hotel-book-dialog/hotel-book-dialog.component';
import { RouterOutlet } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  hotels: any[] = [];
  filteredHotels: any[] = [];
  searchKeyword: string = '';
  isSidebarOpen = false;

  constructor(private tokenService: TokenService, private hotelService: AdminHotelService) {}

  ngOnInit(): void {
    this.getHotels('');
  }

  getHotels(keyword: string): void {
    this.hotelService.searchHotels(keyword).subscribe(
      (data) => {
        this.hotels = data;
        this.filteredHotels = data; // Initialize filtered hotels
      },
      (error) => {
        console.error('Error fetching hotels', error);
      }
    );
  }

  onSearchChange(): void {
    if (this.searchKeyword.trim() === '') {
      this.filteredHotels = [];
      return;
    }
    this.filteredHotels = this.hotels.filter(hotel =>
      hotel.name.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
      hotel.location.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  }

  selectHotel(hotel: any): void {
    this.searchKeyword = hotel.name;
    this.filteredHotels = []; // Hide suggestions after selecting
    alert(`Selected Hotel: ${hotel.name}\nLocation: ${hotel.location}\nRating: ${hotel.rating}`);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    if (window.innerWidth < 768) {
      this.isSidebarOpen = false;
    }
  }

  logout() {
    this.tokenService.logout();
  }
}
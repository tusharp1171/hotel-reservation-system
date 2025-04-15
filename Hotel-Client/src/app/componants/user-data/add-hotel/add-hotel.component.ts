import { Component, OnInit } from '@angular/core';
import { AdminHotelService } from '../../../services/admin/admin-hotel.service';
import { Hotel } from '../../../models/Hotel';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../../services/token.service';
import { User } from '../../../models/User';

@Component({
  selector: 'app-add-hotel',
  imports: [FormsModule],
  templateUrl: './add-hotel.component.html',
  styleUrl: './add-hotel.component.css'
})
export class AddHotelComponent implements OnInit{
  hotel: Hotel = new Hotel(); 
  userId: number | null = null; // Store user ID

  constructor(
    private hotelService: AdminHotelService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.tokenService.getUserId().then((id) => {
      if (id !== null) {
        this.userId = id;
        console.log('User ID Retrieved:', this.userId);
      } else {
        console.error('User ID could not be retrieved.');
      }
    });
  }

  addHotel(): void {
    if (!this.userId) {
      console.error('User ID is null. Cannot add hotel.');
      return;
    }

    // Ensure hotel.user is properly initialized
    this.hotel.user = new User(this.userId);

    this.hotelService.addhotel(this.hotel).subscribe(
      (res: any) => {
        // console.log('Hotel added successfully:', res);
        this.hotel = new Hotel(); // Reset form after success
      },
      (error) => {
        console.error('Error adding hotel:', error);
      }
    );
  }
}
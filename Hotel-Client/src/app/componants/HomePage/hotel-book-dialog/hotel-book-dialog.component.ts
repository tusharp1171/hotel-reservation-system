import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Room } from '../../../models/Rooms';
import { RoomService } from '../../../services/user/room.service';
import { Hotel } from '../../../models/Hotel';
import { BookingDetails } from '../../../models/BookingDetails';
import { TokenService } from '../../../services/token.service';
import { GuestInfo } from '../../../models/GuestInfo';
import { GuestService } from '../../../services/geast/guest.service';
import { User } from '../../../models/User';
import { BookingService } from '../../../services/booking/booking.service';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';

@Component({
  selector: 'app-hotel-book-dialog',
  imports: [MatDialogModule,CommonModule,FormsModule],
  templateUrl: './hotel-book-dialog.component.html',
  styleUrl: './hotel-book-dialog.component.css'
})
export class HotelBookDialogComponent {
  rooms: Room[] = [];
  roomNumbers: string[] = [];
  roomTypes: string[] = [];
  bedTypes: string[] = [];
  selectedRoomType: string = '';
  selectedBedType: string = '';
  selectedRoomNumbers: string[] = [];
  selectedRooms: Room[] = [];
  selectedRoomQuantity: number = 1;
  user: User | null = null;
  status:string="PENDING"

  checkIn: string = '';
  checkOut: string = '';
  bookingDate: string = new Date().toISOString().split('T')[0];

  proofTypes = ['Passport', 'Aadhar', 'Driver License'];
  guests: GuestInfo[] = [];

  constructor(
    private dialog: MatDialog,
    private tokenService: TokenService,
    private bookingService: BookingService,
    private roomService: RoomService,
    private guestService:GuestService,
    private dialogRef: MatDialogRef<HotelBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { hotel: Hotel }
  ) {}
  

  ngOnInit(): void {
    this.getAvailableRooms();
    this.retrieveUser();
  }

  retrieveUser() {
    this.tokenService.getUserId().then((id) => {
      if (id) {
        this.user = new User(id);
        this.addGuest(); // Initialize first guest with user details
      }
    }).catch(error => console.error('Error retrieving user ID:', error));
  }

  getAvailableRooms() {
    if (!this.data.hotel.id) return;
    this.roomService.getRoomsByHotelId(this.data.hotel.id).subscribe(
      (rooms) => {
        this.rooms = rooms.filter(room => room.status === 'AVAILABLE');
        this.extractUniqueRoomTypes();
      },
      (error) => console.error('Error fetching rooms:', error)
    );
  }

  extractUniqueRoomTypes() {
    this.roomTypes = [...new Set(this.rooms.map(room => room.type))];
  }

  onRoomTypeChange() {
    this.bedTypes = [...new Set(
      this.rooms.filter(room => room.type === this.selectedRoomType).map(room => room.bedType)
    )];
    this.resetSelections();
  }

  onBedTypeChange() {
    this.roomNumbers = this.rooms
      .filter(room => room.type === this.selectedRoomType && room.bedType === this.selectedBedType)
      .map(room => room.roomNumber);
    this.selectedRoomNumbers = [];
    this.selectedRooms = [];
  }

  addGuest() {
    if (!this.user) return;
    this.guests.push({
      user: this.user,
      fullName: '',
      dob: '',
      gender: '',
      idProofType: '',
      idProofNumber: '',
      contactNumber: '',
      email: '',
      address: '',
      nationality: ''
    });
  }

  removeGuest(index: number) {
    if (this.guests.length > 1) {
      this.guests.splice(index, 1);
    }
  }

  toggleRoomSelection(roomNumber: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedRoomNumbers.push(roomNumber);
    } else {
      this.selectedRoomNumbers = this.selectedRoomNumbers.filter(num => num !== roomNumber);
    }
    this.selectedRooms = this.rooms.filter(room => this.selectedRoomNumbers.includes(room.roomNumber));
  }

  getTotalPrice(): number {
    if (!this.checkIn || !this.checkOut) {
      return 0;
    }
  
    const checkInDate = new Date(this.checkIn);
    const checkOutDate = new Date(this.checkOut);
  
    if (checkOutDate <= checkInDate) {
      alert('Check-out date must be after check-in date.');
      return 0;
    }
  
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    const numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
    return this.selectedRooms.reduce((acc, room) => acc + (room.price * numberOfDays), 0) || 0;
  }
  

  bookRoom() {
    if (!this.user || this.selectedRooms.length === 0 || this.isGuestInfoInvalid()) {
      alert('Please fill in all required details before booking.');
      return;
    }
  
    const bookingDetails: BookingDetails = {
      user: this.user,
      hotel: this.data.hotel,
      rooms: this.selectedRooms,
      status: 'PENDING',
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      bookingDate: this.bookingDate,
      totalPrice: this.getTotalPrice(),
      guests: []
    };


    console.log(bookingDetails);
    
  
    // ✅ Step 1: Create Booking
    this.bookingService.createBooking(bookingDetails).subscribe(
      (savedBooking) => {
        this.saveGuestsAndProceedToPayment(savedBooking);
      },
      (error) => {
        console.error('Error creating booking:', error);
        alert('Error creating booking. Please try again.');
      }
    );
  }
  
  private saveGuestsAndProceedToPayment(savedBooking: any) {
    const guestsWithBooking = this.guests.map(guest => ({ ...guest, booking: savedBooking }));
  
    // ✅ Step 2: Save Guests
    this.guestService.saveMultipleGuests(guestsWithBooking).subscribe(
      () => {
        alert('Booking saved. Proceed to payment.');
        this.openPaymentDialog(savedBooking);
      },
      (error) => {
        console.error('Error saving guests:', error);
        alert('Error saving guest details. Please try again.');
      }
    );
  }
  
  private openPaymentDialog(savedBooking: any) {
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: '400px',
      data: { booking: savedBooking }
    });
  
    // ✅ Step 3: Handle Payment Confirmation
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateBookingStatus(savedBooking.id, "CONFIRMED"); // Update booking status


      } else {
        alert("Payment Failed!");
      }
    });
  }
  
  private updateBookingStatus(bookingId: number, status: string) {
    this.bookingService.updateBookingStatus(bookingId, status).subscribe(
      () => {
        alert("Booking Confirmed!");
      },
      (error) => {
        console.error('Error updating booking status:', error);
        alert('Error updating booking status. Please try again.');
      }
    );
  }

  
  
  

  closeDialog() {
    this.dialogRef.close();
  }

  isGuestInfoInvalid(): boolean {
    return this.guests.some(g => !g.fullName || !g.dob || !g.idProofType || !g.idProofNumber);
  }

  resetSelections() {
    this.selectedBedType = '';
    this.selectedRoomNumbers = [];
    this.selectedRooms = [];
  }

  get isBookingDisabled(): boolean {
    return this.selectedRooms.length === 0 || this.isGuestInfoInvalid();
  }
}

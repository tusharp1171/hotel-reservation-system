import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RoomService } from '../../../services/user/room.service';
import { CommonModule } from '@angular/common';
import { Amenities, BedType, Room, RoomStatus, RoomType } from '../../../models/Rooms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-room',
  imports: [ReactiveFormsModule,CommonModule,
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
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class RoomComponent implements OnInit {
  roomForm: FormGroup;
  rooms: Room[] = [];
  successMessage = '';
  errorMessage = '';
  selectedRoomId: number | null = null;
  hotelId: number = 0;

  amenitiesList = Object.values(Amenities);
  roomTypes = Object.values(RoomType);
  bedTypes = Object.values(BedType);
  roomStatuses = Object.values(RoomStatus);
  basePrice = 100;

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private route: ActivatedRoute
  ) {
    this.roomForm = this.fb.group({
      type: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(50)]],
      bedType: ['', Validators.required],
      totalRooms: ['', [Validators.required, Validators.min(1)]],
    
      hotelId: ['', Validators.required],
      amenities: [[]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.hotelId = Number(params.get('hotelId'));
      this.roomForm.patchValue({ hotelId: this.hotelId });
    });
    this.loadRooms();
  }

  loadRooms(): void {
    this.roomService.getRooms().subscribe(
      data => this.rooms = data,
      error => console.error('Error fetching rooms:', error)
    );
  }

  toggleAmenity(amenity: string, isChecked: boolean): void {
    let amenities: string[] = this.roomForm.get('amenities')?.value || [];
    amenities = isChecked ? [...amenities, amenity] : amenities.filter(item => item !== amenity);
    this.roomForm.patchValue({ amenities });
  }

  submitRoom(): void {
    const roomData = { ...this.roomForm.value, hotel: { id: this.hotelId } };
    if (this.selectedRoomId) {
      this.roomService.updateRoom(this.selectedRoomId, roomData).subscribe(
        () => {
          this.successMessage = 'Room updated successfully!';
          this.resetForm();
          this.loadRooms();
        },
        () => this.errorMessage = 'Error updating room. Please try again.'
      );
    } else {
      this.roomService.addRoom(roomData).subscribe(
        () => {
          this.successMessage = 'Room added successfully!';
          this.resetForm();
          this.loadRooms();
        },
        () => this.errorMessage = 'Error adding room. Please try again.'
      );
    }
  }

  editRoom(room: Room): void {
    this.selectedRoomId = room.id!;
    this.roomForm.patchValue({
      type: room.type,
      price: room.price,
      bedType: room.bedType,
    
      status: room.status,
      hotelId: room.hotel.id,
      amenities: room.amenities
    });
  }

  deleteRoom(id: number): void {
    if (confirm('Are you sure you want to delete this room?')) {
      this.roomService.deleteRoom(id).subscribe(
        () => this.rooms = this.rooms.filter(room => room.id !== id),
        error => console.error('Error deleting room:', error)
      );
    }
  }

  resetForm(): void {
    this.roomForm.reset();
    this.selectedRoomId = null;
    this.roomForm.patchValue({ hotelId: this.hotelId, amenities: [] });
  }

  updatePrice(event: any): void {
    const selectedBedType = event.value;
    const priceMap: { [key in BedType]?: number } = {
      KING: this.basePrice + 50,
      QUEEN: this.basePrice + 30,
      SINGLE: this.basePrice - 20
    };
    // this.roomForm.controls['price'].setValue(priceMap[selectedBedType] || this.basePrice);
  }
}

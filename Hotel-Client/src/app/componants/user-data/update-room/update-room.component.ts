import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../../../services/user/room.service';
import { Amenities, BedType, Room, RoomStatus, RoomType } from '../../../models/Rooms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-room',
  imports: [
    ReactiveFormsModule,
    CommonModule,
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
  templateUrl: './update-room.component.html',
  styleUrl: './update-room.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class UpdateRoomComponent {
  roomForm: FormGroup;
  roomId!: number;
  successMessage = '';
  errorMessage = '';

  // Use Enums
  roomTypes = Object.values(RoomType);
  bedTypes = Object.values(BedType);
  roomStatuses = Object.values(RoomStatus);
  amenitiesList = Object.values(Amenities);

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private roomService: RoomService
  ) {
    this.roomForm = this.fb.group({
      type: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(50)]],
      bedType: ['', Validators.required],
      status: ['', Validators.required],
      amenities: [[]]
    });
  }

  ngOnInit(): void {
    this.roomId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.roomId) {
      this.loadRoomDetails();
    }
  }

  loadRoomDetails(): void {
    this.roomService.getRoomById(this.roomId).subscribe(
      (room: Room) => {
        this.roomForm.patchValue({
          type: room.type,
          price: room.price,
          bedType: room.bedType,
       
          status: room.status,
          amenities: room.amenities
        });
      },
      () => {
        this.errorMessage = 'Error loading room details';
      }
    );
  }

  toggleAmenity(amenity: string, isChecked: boolean): void {
    let amenities: string[] = this.roomForm.get('amenities')?.value || [];
    amenities = isChecked ? [...amenities, amenity] : amenities.filter(item => item !== amenity);
    this.roomForm.patchValue({ amenities });
  }

  updateRoom(): void {
    if (this.roomForm.valid) {
      this.roomService.updateRoom(this.roomId, this.roomForm.value).subscribe(
        () => {
          this.successMessage = 'Room updated successfully!';
        },
        () => {
          this.errorMessage = 'Error updating room. Please try again.';
        }
      );
    }
  }
}
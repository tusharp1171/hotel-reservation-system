import { Component, OnInit } from '@angular/core';
import { HotelImage } from '../../../models/HotelImage';
import { HotelImageService } from '../../../services/hotelimages/hotel-image.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RoomImageService } from '../../../services/hotelimages/room-image.service';

@Component({
  selector: 'app-addimages',
  imports: [MatButtonModule,CommonModule,
      MatIconModule,
      MatCardModule,
      MatSnackBarModule],
  templateUrl: './addimages.component.html',
  styleUrl: './addimages.component.css'
})
export class AddimagesComponent implements OnInit  { hotelId: number = 0;
  selectedHotelFile: File | null = null;
  selectedRoomFile: File | null = null;
  
  hotelImages: { id: number; imageUrl: string }[] = [];
  roomImages: { id: number; imageUrl: string }[] = [];
  
  showUploadSection: boolean = false;

  constructor(
    private hotelImageService: HotelImageService,
    private roomImageService: RoomImageService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.hotelId = +id;
        this.fetchHotelImages();
        this.fetchRoomImages();
      }
    });
  }

  toggleUploadSection() {
    this.showUploadSection = !this.showUploadSection;
  }

  onHotelFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedHotelFile = event.target.files[0];
    }
  }

  onRoomFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedRoomFile = event.target.files[0];
    }
  }

  uploadHotelImage() {
    if (this.selectedHotelFile && this.hotelId) {
      this.hotelImageService.uploadImage(this.selectedHotelFile, this.hotelId).subscribe(
        () => {
          this.snackBar.open('Hotel image uploaded successfully', 'Close', { duration: 3000 });
          this.fetchHotelImages();
          this.selectedHotelFile = null;
        },
        () => {
          this.snackBar.open('Failed to upload hotel image', 'Close', { duration: 3000 });
        }
      );
    } else {
      this.snackBar.open('Please select a file to upload', 'Close', { duration: 3000 });
    }
  }

  uploadRoomImage() {
    if (this.selectedRoomFile && this.hotelId) {
      this.roomImageService.uploadRoomImage(this.selectedRoomFile, this.hotelId).subscribe(
        () => {
          this.snackBar.open('Room image uploaded successfully', 'Close', { duration: 3000 });
          this.fetchRoomImages();
          this.selectedRoomFile = null;
        },
        () => {
          this.snackBar.open('Failed to upload room image', 'Close', { duration: 3000 });
        }
      );
    } else {
      this.snackBar.open('Please select a file to upload', 'Close', { duration: 3000 });
    }
  }

  fetchHotelImages() {
    this.hotelImageService.getImagesByHotelId(this.hotelId).subscribe(
      (data: HotelImage[]) => {
        this.hotelImages = data.map((image: HotelImage) => ({
          id: image.id,
          imageUrl: `http://localhost:8080/api/hotel-images/view/${image.filePath.split('\\').pop()}`
        }));
      },
      () => {
        this.snackBar.open('Failed to load hotel images', 'Close', { duration: 3000 });
      }
    );
  }
  
  fetchRoomImages() {
    this.roomImageService.getImagesByHotelId(this.hotelId).subscribe(
      (data) => {
        this.roomImages = data.map((image) => ({
          id: image.id,
          imageUrl: `http://localhost:8080/api/room-images/view/${image.filePath.split('\\').pop()}`
        }));
      },
      () => {
        this.snackBar.open('Failed to load room images', 'Close', { duration: 3000 });
      }
    );
  }

  deleteHotelImage(imageId: number) {
    this.hotelImageService.deleteImage(imageId).subscribe(
      () => {
        this.snackBar.open('Hotel image deleted successfully', 'Close', { duration: 3000 });
        this.hotelImages = this.hotelImages.filter((image) => image.id !== imageId);
      },
      () => {
        this.snackBar.open('Failed to delete hotel image', 'Close', { duration: 3000 });
      }
    );
  }

  deleteRoomImage(imageId: number) {
    this.roomImageService.deleteImage(imageId).subscribe(
      () => {
        this.snackBar.open('Room image deleted successfully', 'Close', { duration: 3000 });
        this.roomImages = this.roomImages.filter((image) => image.id !== imageId);
      },
      () => {
        this.snackBar.open('Failed to delete room image', 'Close', { duration: 3000 });
      }
    );
  }
}
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ImagePreviewDialogComponent } from '../image-preview-dialog/image-preview-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-room-type-dialog',
  imports: [MatDialogModule,CommonModule, MatButtonToggleModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,MatIconModule],
  templateUrl: './room-type-dialog.component.html',
  styleUrl: './room-type-dialog.component.css'
})
export class RoomTypeDialogComponent {
  roomTypes: string[] = [];
  selectedRoomType: string = '';
  filteredImages: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<RoomTypeDialogComponent>,
    private dialog: MatDialog,  // Inject MatDialog
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.roomTypes = this.data.roomTypes || [];
    
    if (this.roomTypes.length > 0) {
      this.selectedRoomType = this.roomTypes[0];
      this.filterImagesByRoomType(this.selectedRoomType);
    }
  }

  filterImagesByRoomType(type: string): void {
    this.selectedRoomType = type;
    this.filteredImages = this.data.roomImages
      .filter((image: any) => image.roomType === type)
      .map((image: any) => ({
        ...image,
        imageUrl: `http://localhost:8080/api/room-images/view/${image.fileName}`
      }));
  }

  openImagePreview(imageUrl: string): void {
    this.dialog.open(ImagePreviewDialogComponent, {
      data: { imageUrl },
      panelClass: 'full-screen-dialog'
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BookingService } from '../../../services/booking/booking.service';
import { BookingDetails } from '../../../models/BookingDetails';

@Component({
  selector: 'app-payment-dialog',
  imports: [  CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,  // ✅ Required for mat-form-field
    MatInputModule,      // ✅ Required for matInput
    MatButtonModule
  ],
  templateUrl: './payment-dialog.component.html',
  styleUrl: './payment-dialog.component.css'
})
export class PaymentDialogComponent {
  paymentMethod: string = 'creditCard';
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  upiId: string = '';
  paypalEmail: string = '';

  constructor(private dialogRef: MatDialogRef<PaymentDialogComponent>) {}

  processPayment() {
    alert('Payment Successful! Booking Confirmed.');
    this.dialogRef.close(true); // Close and send success response
  }

  closeDialog() {
    this.dialogRef.close(false); // Close without success
  }
}
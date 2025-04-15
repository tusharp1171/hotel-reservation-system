import { User } from "./User";

export interface GuestInfo {
  user:User;         // Changed from customerId to userId to match backend
  fullName: string;        // Guest's full name
  dob: string;             // Date of birth
  gender: string;          // Gender (Male, Female, Other)
  idProofType: string;     // ID proof type (Passport, Driver's License, etc.)
  idProofNumber: string;   // ID proof number
  contactNumber: string;   // Contact number
  email?: string;          // Email (optional)
  address?: string;        // Address (optional)
  nationality: string;     // Nationality
}

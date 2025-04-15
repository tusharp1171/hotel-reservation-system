import { GuestInfo } from "./GuestInfo";
import { Hotel } from "./Hotel";
import { Room } from "./Rooms";
import { User } from "./User";

  export interface BookingDetails {
    id?:number,
    user: User;
    rooms: Room[];
    hotel: Hotel;
    guests: GuestInfo[];  // Changed 'guest' to 'guests' for clarity
    checkIn: string; // Add this if missing
    checkOut: string; // Add this if missing
    status:string;
    bookingDate: string;
    totalPrice: number;
  }


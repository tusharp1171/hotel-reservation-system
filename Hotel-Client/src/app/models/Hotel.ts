import { HotelImage } from "./HotelImage";
import { RoomImage } from "./RoomImage";
import { Room } from "./Rooms";
import { User } from "./User";

export class Hotel {
  id?: number; // Optional for new hotels
  name: string;
  location: string;
  rating: number;
  description: string;
  contact: string;
  email: string;
  user?: User; // Optional reference to User model
  rooms?: Room[]; // List of rooms (optional)
  hotelImages?: HotelImage[]; // List of hotel images (optional)
  roomImages?:RoomImage[];
  standardRoomPrice?: number | null; 

  constructor(
    name: string = '',
    location: string = '',
    email: string = '',
    description: string = '',
    contact: string = '',
    rating: number = 0,
    user?: User, // Accepts an optional User object
    rooms: Room[] = [],
    hotelImages: HotelImage[] = [],
    roomImages:RoomImage[]=[],
    
  ) {
    this.name = name;
    this.description = description;
    this.contact = contact;
    this.email = email;
    this.location = location;
    this.rating = rating;
    this.user = user; // Now accepts a User object instead of just an ID
    this.rooms = rooms;
    this.hotelImages = hotelImages;
    this.roomImages=roomImages;
  }
}

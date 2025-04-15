    export interface Room {
        id: number; // Optional for new rooms
        type: RoomType;
        price: number;
        bedType: BedType;
        status: RoomStatus;
        roomNumber:string
        amenities: Amenities[];
        hotel: Hotel; // Hotel details included
    }
    
    // Room Types
    export enum RoomType {
        STANDARD = 'STANDARD',
        DELUXE = 'DELUXE',
        SUITE = 'SUITE',
        PRESIDENTIAL = 'PRESIDENTIAL'
    }
    
    // Bed Types
    export enum BedType {
        SINGLE = 'SINGLE',
        DOUBLE = 'DOUBLE',
        QUEEN = 'QUEEN',
        KING = 'KING',
        TWIN = 'TWIN',
        TRIPLE = 'TRIPLE',
        FAMILY = 'FAMILY'
    }
    
    // Room Status
    export enum RoomStatus {
        AVAILABLE = 'AVAILABLE',
        BOOKED = 'BOOKED',
        UNDER_MAINTENANCE = 'UNDER_MAINTENANCE'
    }
    
    // Amenities (You can add more)
    export enum Amenities {
        WIFI = 'WIFI',
        TV = 'TV',
        MINI_FRIDGE = 'MINI_FRIDGE',
        AIR_CONDITIONING = 'AIR_CONDITIONING',
        JACUZZI = 'JACUZZI',
        BALCONY = 'BALCONY',
        MINI_BAR = 'MINI_BAR',
        PRIVATE_POOL = 'PRIVATE_POOL',
        PERSONAL_BUTLER = 'PERSONAL_BUTLER'
    }
    
    // Hotel Model with More Details
    export interface Hotel {
        id: number;
        name: string;
        location: string;
        rating: number;
    }
    
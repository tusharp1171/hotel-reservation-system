export interface RoomImage {
    id: number;
    hotelId: number;
    filePath: string;
    imageUrl?: string; // This can be constructed dynamically in the frontend
  }
package com.hotel.dtos;

import java.util.Set;

import com.hotel.enums.Amenities;
import com.hotel.enums.BedType;
import com.hotel.enums.RoomType;

import lombok.Data;

@Data
public class RoomRequest {
    private Long hotelId;
    private RoomType type;
    private double price;
    private BedType bedType;
    private Set<Amenities> amenities;
    private int totalRooms;
}

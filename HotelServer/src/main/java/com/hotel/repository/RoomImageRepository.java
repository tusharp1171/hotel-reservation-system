package com.hotel.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotel.entity.RoomImage;

@Repository
public interface RoomImageRepository extends JpaRepository<RoomImage, Long> {
//    List<RoomImage> findByRoomId(Long roomId);
    List<RoomImage> findByRoomType(String roomType);
    List<RoomImage> findByHotelId(Long hotelId);
}

package com.hotel.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hotel.entity.Room;
import com.hotel.enums.RoomStatus;
import com.hotel.enums.RoomType;

import jakarta.transaction.Transactional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
	
	 List<Room> findByHotelId(Long hotelId);
	 
//	List<Room> findByStatus(RoomStatus status);
//	
//	 @Query("SELECT COALESCE(SUM(r.availableRooms), 0) FROM Room r WHERE r.type = :type AND r.status = :status")
//	    Integer countAvailableRoomsByTypeAndStatus(RoomType type, RoomStatus status);
//
//	 @Query("SELECT r.type, r.status, SUM(r.availableRooms) FROM Room r GROUP BY r.type, r.status")
//	    List<Object[]> countRoomsByTypeAndStatus();
//	    
////	    @Query("SELECT r.type, r.status, COUNT(r) FROM Room r WHERE r.hotel.id = :hotelId GROUP BY r.type, r.status")
////	    List<Object[]> getRoomSummaryByHotel(Long hotelId);
//	    
//	    
//	    
//	    Optional<Room> findByHotelIdAndType(Long hotelId, RoomType type);
//
//	    @Transactional
//	    @Modifying
//	    @Query("UPDATE Room r SET r.availableRooms = r.availableRooms - :count WHERE r.hotel.id = :hotelId AND r.type = :type AND r.availableRooms >= :count")
//	    int bookRooms(Long hotelId, RoomType type, int count);
//
//	    @Transactional
//	    @Modifying
//	    @Query("UPDATE Room r SET r.availableRooms = r.availableRooms - :count, r.status = 'UNDER_MAINTENANCE' WHERE r.hotel.id = :hotelId AND r.type = :type AND r.availableRooms >= :count")
//	    int markRoomsUnderMaintenance(Long hotelId, RoomType type, int count);
//	    
//	    @Query("SELECT r.type, r.status, COUNT(r) FROM Room r WHERE r.hotel.id = :hotelId GROUP BY r.type, r.status")
//	    List<Object[]> getRoomSummaryByHotel(Long hotelId);
	}

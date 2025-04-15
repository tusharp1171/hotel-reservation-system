package com.hotel.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.hotel.entity.Hotel;
import com.hotel.entity.Room;
import com.hotel.enums.RoomStatus;
import com.hotel.enums.RoomType;
import com.hotel.exceptions.ResourceNotFoundException;
import com.hotel.repository.HotelRepository;
import com.hotel.repository.RoomRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomService {
	@Autowired
	private RoomRepository roomRepository;

	// Add a New Room
	public Room addRoom(Room room) {
		return roomRepository.save(room);
	}

	public List<Room> getRoomsByHotelId(Long hotelId) {
		List<Room> rooms = roomRepository.findByHotelId(hotelId);
		if (rooms.isEmpty()) {
			throw new ResourceNotFoundException("No rooms found for hotel with ID: " + hotelId);
		}
		return rooms;
	}

	// Get All Rooms
	public List<Room> getAllRooms() {
		return roomRepository.findAll();
	}

	// Get Room By ID
	public Room getRoomById(Long id) {
		return roomRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Room not found with ID: " + id));
	}

	// Update Room Details
	public Room updateRoom(Long id, Room updatedRoom) {
		Room room = roomRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Room not found with ID: " + id));

		room.setType(updatedRoom.getType());
		room.setPrice(updatedRoom.getPrice());
		room.setBedType(updatedRoom.getBedType());
//		room.setTotalRooms(updatedRoom.getTotalRooms());
//		room.setAvailableRooms(updatedRoom.getAvailableRooms());
		room.setStatus(updatedRoom.getStatus());
		room.setAmenities(updatedRoom.getAmenities());

		return roomRepository.save(room);
	}

	// Delete a Room
	public void deleteRoom(Long id) {
		Room room = roomRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Room not found with ID: " + id));
		roomRepository.delete(room);
	}

	// Get Available Rooms

//	public Map<String, Map<String, Integer>> getRoomSummary(Long hotelId) {
//        List<Object[]> results = roomRepository.getRoomSummaryByHotel(hotelId);
//        Map<String, Map<String, Integer>> summary = new HashMap<>();
//
//        for (Object[] row : results) {
//            String type = ((RoomType) row[0]).name();
//            String status = ((RoomStatus) row[1]).name();
//            int count = ((Number) row[2]).intValue();
//
//            summary.putIfAbsent(type, new HashMap<>());
//            summary.get(type).put(status, count);
//        }
//        return summary;
//    }

}
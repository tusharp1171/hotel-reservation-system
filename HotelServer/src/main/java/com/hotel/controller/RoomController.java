package com.hotel.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotel.dtos.RoomRequest;
import com.hotel.entity.Hotel;
import com.hotel.entity.Room;
import com.hotel.enums.RoomStatus;
import com.hotel.repository.HotelRepository;
import com.hotel.repository.RoomRepository;
import com.hotel.service.RoomService;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

	@Autowired
	private RoomService roomService;

	@Autowired
	private RoomRepository roomRepository;

	@Autowired
	private HotelRepository hotelRepository;

	@PostMapping("/addRooms")
	public ResponseEntity<String> addRooms(@RequestBody RoomRequest roomRequest) {
		Optional<Hotel> hotelOpt = hotelRepository.findById(roomRequest.getHotelId());
		if (!hotelOpt.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hotel not found");
		}
		Hotel hotel = hotelOpt.get();

		List<Room> rooms = new ArrayList<>();
		for (int i = 1; i <= roomRequest.getTotalRooms(); i++) {
			Room room = new Room();
			room.setRoomNumber(roomRequest.getType().toString() + "-" + i); // DELUXE-1, DELUXE-2
			room.setType(roomRequest.getType());
			room.setPrice(roomRequest.getPrice());
			room.setBedType(roomRequest.getBedType());
			room.setStatus(RoomStatus.AVAILABLE);
			room.setAmenities(roomRequest.getAmenities());
			room.setHotel(hotel);
			rooms.add(room);
		}

		roomRepository.saveAll(rooms);
		return ResponseEntity.ok(roomRequest.getTotalRooms() + " rooms added successfully!");
	}

	@GetMapping("/roomStatus/{hotelId}")
	public ResponseEntity<Map<String, Map<String, List<String>>>> getRoomStatus(@PathVariable Long hotelId) {
		List<Room> rooms = roomRepository.findByHotelId(hotelId);

		Map<String, Map<String, List<String>>> roomStatusMap = new HashMap<>();

		for (Room room : rooms) {
			String type = room.getType().toString();
			String status = room.getStatus().toString();
			String roomNumber = room.getRoomNumber(); // Assuming room has a field 'roomNumber'

			roomStatusMap.putIfAbsent(type, new HashMap<>());
			roomStatusMap.get(type).putIfAbsent(status, new ArrayList<>());
			roomStatusMap.get(type).get(status).add(roomNumber);
		}

		return ResponseEntity.ok(roomStatusMap);
	}

	// 1. Add a Room
//    @PostMapping
//    public ResponseEntity<Room> addRoom(@RequestBody Room room) {
//        return ResponseEntity.ok(roomService.addRoom(room));
//    }
//    
//    @GetMapping("/status-summary/{hotelId}")
//    public Map<String, Map<String, Integer>> getRoomSummary(@PathVariable Long hotelId) {
//        return roomService.getRoomSummary(hotelId);
//    }

	// 2. Get All Rooms
	@GetMapping
	public ResponseEntity<List<Room>> getAllRooms() {
		return ResponseEntity.ok(roomService.getAllRooms());
	}

	// 3. Get Room By ID
	@GetMapping("/{id}")
	public ResponseEntity<Room> getRoomById(@PathVariable Long id) {
		return ResponseEntity.ok(roomService.getRoomById(id));
	}

	// 4. Update a Room
	@PutMapping("/{id}")
	public ResponseEntity<Room> updateRoom(@PathVariable Long id, @RequestBody Room room) {
		return ResponseEntity.ok(roomService.updateRoom(id, room));
	}

	@GetMapping("/hotel/{hotelId}")
	public ResponseEntity<List<Room>> getRoomsByHotelId(@PathVariable Long hotelId) {
		List<Room> rooms = roomService.getRoomsByHotelId(hotelId);
		return ResponseEntity.ok(rooms);
	}

	// 5. Delete a Room
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteRoom(@PathVariable Long id) {
		roomService.deleteRoom(id);
		return ResponseEntity.ok("Room deleted successfully");
	}
	// 6. Get Available Rooms

}
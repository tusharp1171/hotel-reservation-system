package com.hotel.controller;

import com.hotel.entity.Hotel;
import com.hotel.repository.HotelImageRepository;
import com.hotel.service.HotelService;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotels")
public class HotelController {

	@Autowired
	private HotelService hotelService;

	@GetMapping("/user/{userId}")
	public ResponseEntity<List<Hotel>> getHotelsByUserId(@PathVariable Long userId) {
		List<Hotel> hotels = hotelService.getHotelsByUserId(userId);
		if (hotels.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(hotels);
		}
		return ResponseEntity.ok(hotels);
	}

	@GetMapping("/search")
	public List<Hotel> searchHotels(@RequestParam String keyword) {
		return hotelService.searchHotels(keyword);
	}

	// Get all hotels
	@GetMapping
	public ResponseEntity<List<Hotel>> getAllHotels() {
		return ResponseEntity.ok(hotelService.getAllHotels());
	}

	// Get hotel by ID
	@GetMapping("/{id}")
	public ResponseEntity<Hotel> getHotelById(@PathVariable Long id) {
		return ResponseEntity.ok(hotelService.getHotelById(id));
	}

	// Create a new hotel
	@PostMapping
	public ResponseEntity<Hotel> createHotel(@RequestBody Hotel hotel) {
		return ResponseEntity.ok(hotelService.saveHotel(hotel));
	}

	// Delete a hotel
	@Transactional
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteHotel(@PathVariable Long id) {
//		hotelImageRepository.deleteByHotelId(id);
		hotelService.deleteHotel(id);

		return ResponseEntity.ok("Hotel deleted successfully!");
	}
}
package com.hotel.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.hotel.dtos.BookingStatusRequest;
import com.hotel.entity.Booking;
import com.hotel.service.BookingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

	@Autowired
	private BookingService bookingService;

	@GetMapping
	public ResponseEntity<List<Booking>> getAllBookings() {
		return ResponseEntity.ok(bookingService.getAllBookings());
	}

	@PutMapping("/{id}/status")
	public ResponseEntity<Map<String, String>> updateBookingStatus(@PathVariable Long id, @RequestBody BookingStatusRequest request) {
	    Map<String, String> response = new HashMap<>();
	    try {
	        Booking updatedBooking = bookingService.updateBookingStatus(id, request.getStatus());
	        response.put("message", "Booking status updated successfully.");
	        return ResponseEntity.ok(response);
	    } catch (RuntimeException e) {
	        response.put("error", e.getMessage());
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	    }
	}


	@GetMapping("/{id}")
	public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
		return ResponseEntity.ok(bookingService.getBookingById(id));
	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<List<Booking>> getBookingsByUserId(@PathVariable Long userId) {
		return ResponseEntity.ok(bookingService.getBookingsByUserId(userId));
	}

	@GetMapping("/hotel/{hotelId}")
	public ResponseEntity<List<Booking>> getBookingsByHotelId(@PathVariable Long hotelId) {
		return ResponseEntity.ok(bookingService.getBookingsByHotelId(hotelId));
	}

	@PostMapping
	public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
		return ResponseEntity.ok(bookingService.createBooking(booking));
	}

	@PutMapping("/{id}")
	public ResponseEntity<Booking> updateBooking(@PathVariable Long id, @RequestBody Booking bookingDetails) {
		return ResponseEntity.ok(bookingService.updateBooking(id, bookingDetails));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteBooking(@PathVariable Long id) {
		return bookingService.deleteBooking(id);
	}
}
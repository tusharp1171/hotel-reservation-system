package com.hotel.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hotel.entity.Booking;
import com.hotel.entity.Guest;
import com.hotel.exceptions.ResourceNotFoundException;
import com.hotel.repository.BookingRepository;
import com.hotel.repository.GuestRepository;

import jakarta.transaction.Transactional;

@Service
public class BookingService {

	@Autowired
    private BookingRepository bookingRepository;
	@Autowired
	private GuestRepository guestRepository;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    
    public Booking updateBookingStatus(Long id, String status) {
        Optional<Booking> bookingOptional = bookingRepository.findById(id);
        if (bookingOptional.isPresent()) {
            Booking booking = bookingOptional.get();
            booking.setStatus(status);
            return bookingRepository.save(booking);
        } else {
            throw new RuntimeException("Booking not found with ID: " + id);
        }
    }


    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
    }

    public List<Booking> getBookingsByUserId(Long userId) {
        List<Booking> bookings = bookingRepository.findByUserId(userId);
        if (bookings.isEmpty()) {
            throw new ResourceNotFoundException("No bookings found for user with ID: " + userId);
        }
        return bookings;
    }

    public List<Booking> getBookingsByHotelId(Long hotelId) {
        List<Booking> bookings = bookingRepository.findByHotelId(hotelId);
        if (bookings.isEmpty()) {
            throw new ResourceNotFoundException("No bookings found for hotel with ID: " + hotelId);
        }
        return bookings;
    }

    @Transactional
    public Booking createBooking(Booking booking) {
        // ✅ Step 1: Save the booking first
        Booking savedBooking = bookingRepository.save(booking);

        // ✅ Step 2: Assign booking_id to all guests before saving them
        for (Guest guest : booking.getGuests()) {
            guest.setBooking(savedBooking); // Associate guest with the saved booking
            guestRepository.save(guest); // Save guest with the correct booking_id
        }

        return savedBooking;
    }


    public Booking updateBooking(Long id, Booking bookingDetails) {
        Booking booking = getBookingById(id);
        booking.setCheckIn(bookingDetails.getCheckIn());
        booking.setCheckOut(bookingDetails.getCheckOut());
        booking.setBookingDate(bookingDetails.getBookingDate());
        booking.setStatus(bookingDetails.getStatus());
        booking.setTotalPrice(bookingDetails.getTotalPrice());
        return bookingRepository.save(booking);
    }

    public ResponseEntity<?> deleteBooking(Long id) {
        Booking booking = getBookingById(id);
        bookingRepository.delete(booking);
        return ResponseEntity.ok().body("Booking deleted successfully.");
    }
}
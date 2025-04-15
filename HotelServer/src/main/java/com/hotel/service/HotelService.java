package com.hotel.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotel.entity.Hotel;
import com.hotel.exceptions.ResourceNotFoundException;
import com.hotel.repository.HotelImageRepository;
import com.hotel.repository.HotelRepository;

@Service
public class HotelService {
	@Autowired
	private HotelRepository hotelRepository;

	public List<Hotel> getAllHotels() {
		return hotelRepository.findAll();
	}

	public List<Hotel> searchHotels(String keyword) {
		return hotelRepository.searchHotels(keyword);
	}

	public Hotel getHotelById(Long id) {
		return hotelRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Hotel not found with id: " + id));
	}

	public Hotel saveHotel(Hotel hotel) {
		return hotelRepository.save(hotel);
	}

	public void deleteHotel(Long id) {
		if (!hotelRepository.existsById(id))
			throw new ResourceNotFoundException("Hotel not found with id: " + id);
		hotelRepository.deleteById(id);

	}

	public List<Hotel> getHotelsByUserId(Long userId) {
		List<Hotel> hotels = hotelRepository.findByUserId(userId);
		if (hotels.isEmpty()) {
			throw new ResourceNotFoundException("No hotels found for user ID: " + userId);
		}
		return hotels;
	}
}

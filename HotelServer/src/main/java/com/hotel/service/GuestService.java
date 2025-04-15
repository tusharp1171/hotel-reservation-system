package com.hotel.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotel.entity.Guest;
import com.hotel.repository.GuestRepository;

@Service
public class GuestService {

    @Autowired
    private GuestRepository guestRepository;

    public Guest saveGuest(Guest guest) {
        return guestRepository.save(guest);
    }

    public List<Guest> getAllGuests() {
        return guestRepository.findAll();
    }
    public List<Guest> saveAllGuests(List<Guest> guests) {
        return guestRepository.saveAll(guests);
    }

    public Optional<Guest> getGuestById(Long id) {
        return guestRepository.findById(id);
    }

    public List<Guest> getGuestsByCustomerId(Long customerId) {
        return guestRepository.findByUserId(customerId);
    }

    public void deleteGuest(Long id) {
        guestRepository.deleteById(id);
    }
}
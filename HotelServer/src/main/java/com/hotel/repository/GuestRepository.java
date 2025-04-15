package com.hotel.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotel.entity.Guest;

@Repository
public interface GuestRepository extends JpaRepository<Guest, Long> {
	List<Guest> findByUserId(Long userId); 
}
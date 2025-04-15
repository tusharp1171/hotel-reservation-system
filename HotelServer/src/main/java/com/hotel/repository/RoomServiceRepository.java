package com.hotel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotel.entity.RoomService;

@Repository
public interface RoomServiceRepository extends JpaRepository<RoomService, Long> {}
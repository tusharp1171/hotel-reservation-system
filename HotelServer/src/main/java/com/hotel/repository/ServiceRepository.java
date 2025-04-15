package com.hotel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotel.entity.Service;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {}
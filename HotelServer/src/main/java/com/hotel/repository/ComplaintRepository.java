package com.hotel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotel.entity.Complaint;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {}
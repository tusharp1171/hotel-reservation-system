package com.hotel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotel.entity.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {}
package com.hotel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotel.entity.Discount;

@Repository
public interface DiscountRepository extends JpaRepository<Discount, Long> {}

package com.hotel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotel.entity.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {}
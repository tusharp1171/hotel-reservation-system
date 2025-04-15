package com.hotel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotel.entity.Report;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {}
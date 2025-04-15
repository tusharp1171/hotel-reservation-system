package com.hotel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotel.entity.Feedback;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {}

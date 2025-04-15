package com.hotel.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class RoomImage {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String fileName;
	private String filePath;
	private String fileType;

	private String roomType; // Stores "Single", "Double", "Suite"
	
	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "hotel_id")
	private Hotel hotel;


	// Constructors, Getters, Setters
}

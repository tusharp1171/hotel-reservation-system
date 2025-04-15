package com.hotel.entity;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.hotel.enums.Amenities;
import com.hotel.enums.BedType;
import com.hotel.enums.RoomStatus;
import com.hotel.enums.RoomType;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Room {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String roomNumber; // Unique number for each room

	@Enumerated(EnumType.STRING)
	private RoomType type;

	private double price;

	@Enumerated(EnumType.STRING)
	private BedType bedType;

	@Enumerated(EnumType.STRING)
	private RoomStatus status; // AVAILABLE, BOOKED, UNDER_MAINTENANCE

	@ElementCollection(fetch = FetchType.EAGER, targetClass = Amenities.class)
	@Enumerated(EnumType.STRING)
	@CollectionTable(name = "room_amenities", joinColumns = @JoinColumn(name = "room_id"))
	@Column(name = "amenity")
	private Set<Amenities> amenities;

	@ManyToOne
	@JoinColumn(name = "hotel_id")
	@JsonBackReference
	private Hotel hotel;
}

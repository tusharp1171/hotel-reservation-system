package com.hotel.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.hotel.entity.RoomImage;
import com.hotel.service.RoomImageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/room-images")
@RequiredArgsConstructor
public class RoomImageController {

	@Autowired
	private RoomImageService roomImageService;
	private final String uploadDir = "C:/Users/shreya/Desktop/hotelimages/";

	@GetMapping("/view/{filename}")
	public ResponseEntity<Resource> getImage(@PathVariable String filename) throws IOException {
		Path imagePath = Paths.get(uploadDir).resolve(filename).normalize(); // Normalize to prevent invalid paths
		if (!Files.exists(imagePath)) {
			return ResponseEntity.notFound().build();
		}

		Resource resource = new UrlResource(imagePath.toUri());
		return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG) // Adjust MIME type dynamically if needed
				.body(resource);
	}

	@GetMapping
	public ResponseEntity<List<RoomImage>> getAllRoomImages() {
		return ResponseEntity.ok(roomImageService.getAllRoomImages());
	}

	@GetMapping("/{id}")
	public ResponseEntity<RoomImage> getRoomImageById(@PathVariable Long id) {
		Optional<RoomImage> roomImage = roomImageService.getRoomImageById(id);
		return roomImage.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@GetMapping("/hotel/{hotelId}")
	public ResponseEntity<List<RoomImage>> getImagesByHotelId(@PathVariable Long hotelId) {
		return ResponseEntity.ok(roomImageService.getRoomImagesByHotelId(hotelId));
	}

	@PostMapping("/upload")
	public ResponseEntity<?> uploadRoomImage(@RequestParam("file") MultipartFile file,
			@RequestParam("hotelId") Long hotelId) {
		try {
			RoomImage savedImage = roomImageService.saveRoomImage(file, hotelId);
			return ResponseEntity.ok(savedImage);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "File upload failed"));
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteRoomImage(@PathVariable Long id) {
		roomImageService.deleteRoomImage(id);
		return ResponseEntity.noContent().build();
	}
}
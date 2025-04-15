package com.hotel.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.hotel.entity.HotelImage;
import com.hotel.service.HotelImageService;

@RestController
@RequestMapping("/api/hotel-images")
public class HotelImageController {

    @Autowired
    private HotelImageService hotelImageService;
    
    private final String uploadDir = "C:/Users/shreya/Desktop/hotelimages/";

    // This endpoint is no longer needed if using static-locations in properties
    @GetMapping("/view/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) throws IOException {
        Path imagePath = Paths.get(uploadDir).resolve(filename).normalize(); // Normalize to prevent invalid paths
        if (!Files.exists(imagePath)) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = new UrlResource(imagePath.toUri());
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG) // Adjust MIME type dynamically if needed
                .body(resource);
    }


    @GetMapping("/hotel/{hotelId}")
    public List<HotelImage> getImagesByHotelId(@PathVariable Long hotelId) {
        return hotelImageService.getImagesByHotelId(hotelId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HotelImage> getHotelImageById(@PathVariable Long id) {
        Optional<HotelImage> image = hotelImageService.getHotelImageById(id);
        return image.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/upload/{hotelId}")
    public ResponseEntity<HotelImage> uploadImage(
        @RequestParam("file") MultipartFile file,
        @PathVariable Long hotelId) {
        
        try {
            HotelImage savedImage = hotelImageService.saveHotelImage(file, hotelId);
            return ResponseEntity.ok(savedImage);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long id) {
        hotelImageService.deleteHotelImage(id);
        return ResponseEntity.ok().build();
    }
}
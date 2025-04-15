package com.hotel.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path; // ✅ Correct Import
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hotel.entity.Hotel;
import com.hotel.entity.RoomImage;
import com.hotel.repository.HotelRepository;
import com.hotel.repository.RoomImageRepository;

@Service
public class RoomImageService {

	@Autowired
    private  RoomImageRepository roomImageRepository;
	@Autowired
    private HotelRepository hotelRepository;

    @Value("${upload.directory}") // Define in application.properties
    private String uploadDir;

    public List<RoomImage> getAllRoomImages() {
        return roomImageRepository.findAll();
    }

    public Optional<RoomImage> getRoomImageById(Long id) {
        return roomImageRepository.findById(id);
    }

    public List<RoomImage> getRoomImagesByHotelId(Long hotelId) {
        return roomImageRepository.findByHotelId(hotelId);
    }

    public RoomImage saveRoomImage(MultipartFile file, Long hotelId) throws IOException {
        Optional<Hotel> hotelOpt = hotelRepository.findById(hotelId);
        if (hotelOpt.isEmpty()) {
            throw new IllegalArgumentException("Hotel not found");
        }
        
        Hotel hotel = hotelOpt.get();
        String uniqueId = UUID.randomUUID().toString().substring(0, 8);
        String fileExtension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
        String fileName = "HOTEL-" + uniqueId + fileExtension;
        Path filePath = Paths.get(uploadDir, fileName);

        Files.createDirectories(filePath.getParent());
        Files.write(filePath, file.getBytes());

        RoomImage roomImage = new RoomImage();
        roomImage.setFileName(fileName);
        roomImage.setFilePath(filePath.toString());
        roomImage.setFileType(file.getContentType());
        roomImage.setHotel(hotel);

        return roomImageRepository.save(roomImage);
    }

    public void deleteRoomImage(Long id) {
        roomImageRepository.deleteById(id);
    }
}
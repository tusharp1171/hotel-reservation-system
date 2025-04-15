package com.hotel.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import com.hotel.entity.Hotel;
import com.hotel.entity.HotelImage;
import com.hotel.repository.HotelImageRepository;
import com.hotel.repository.HotelRepository;

@Service
public class HotelImageService {
	 @Autowired
	    private HotelImageRepository hotelImageRepository;
	    @Autowired 
	    private HotelRepository hotelRepository;
	    @Autowired
	    private FileStorageService fileStorageService;

	    public List<HotelImage> getImagesByHotelId(Long hotelId) {
	        return hotelImageRepository.findByHotelId(hotelId);
	    }

	    public Optional<HotelImage> getHotelImageById(Long id) {
	        return hotelImageRepository.findById(id);
	    }

	    public HotelImage saveHotelImage(MultipartFile file, Long hotelId) throws IOException {
	        Hotel hotel = hotelRepository.findById(hotelId)
	                .orElseThrow(() -> new RuntimeException("Hotel not found with ID: " + hotelId));

	        if (file.isEmpty()) {
	            throw new RuntimeException("Uploaded file is empty");
	        }

	        String formattedHotelName = hotel.getName().replaceAll("\\s+", "_").toUpperCase();
	        String uniqueId = UUID.randomUUID().toString().substring(0, 8);
	        String fileExtension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
	        String fileName = formattedHotelName + "-" + uniqueId + fileExtension;

	        String filePath = fileStorageService.storeFile(file, fileName);

	        HotelImage hotelImage = new HotelImage();
	        hotelImage.setFileName(fileName);
	        hotelImage.setFilePath(filePath);
	        hotelImage.setFileType(file.getContentType());
	        hotelImage.setHotel(hotel);

	        return hotelImageRepository.save(hotelImage);
	    }
	    
	    public void deleteHotelImage(Long id) {
	        hotelImageRepository.deleteById(id);
	    }
	}
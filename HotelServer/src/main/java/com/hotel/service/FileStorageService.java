package com.hotel.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
@Service
public class FileStorageService {

    @Value("${upload.directory}") // Define this in application.properties
    private String uploadDir;

    public String storeFile(MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);

        Files.createDirectories(filePath.getParent());
        Files.write(filePath, file.getBytes());

        return filePath.toString(); // Return file path to save in DB
    }
    
    public String storeFile(MultipartFile file, String fileName) throws IOException {
        Path filePath = Paths.get(uploadDir, fileName);

        // Ensure directory exists
        Files.createDirectories(filePath.getParent());

        // Save file
        Files.write(filePath, file.getBytes());

        return filePath.toString(); // Return saved file path
    }
}
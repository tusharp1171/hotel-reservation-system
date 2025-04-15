package com.hotel.enums;

public enum RoomType {
    STANDARD(80.0),
    DELUXE(150.0),
    SUITE(250.0),
    FAMILY(200.0),
    PRESIDENTIAL(500.0);

    private final double price;

    RoomType(double price) {
        this.price = price;
    }

    public double getPrice() {
        return price;
    }
}
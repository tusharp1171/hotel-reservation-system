package com.hotel.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotel.entity.Payment;
import com.hotel.exceptions.ResourceNotFoundException;
import com.hotel.repository.PaymentRepository;

@Service
public class PaymentService {
    @Autowired private PaymentRepository paymentRepository;
    public List<Payment> getAllPayments() { return paymentRepository.findAll(); }
    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Payment not found with id: " + id));
    }
    public Payment savePayment(Payment payment) { return paymentRepository.save(payment); }
    public void deletePayment(Long id) {
        if (!paymentRepository.existsById(id)) throw new ResourceNotFoundException("Payment not found with id: " + id);
        paymentRepository.deleteById(id);
    }
}
package com.gaonsathi.backend.service;

import com.gaonsathi.backend.model.Booking;
import com.gaonsathi.backend.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository repo;

    public BookingService(BookingRepository repo) {
        this.repo = repo;
    }

    public Booking createBooking(Booking booking) {
        if (booking.getStatus() == null || booking.getStatus().isBlank()) {
            booking.setStatus("PENDING");
        }

        return repo.save(booking);
    }

    public List<Booking> getAllBookings() {
        return repo.findAll();
    }

    public Booking getBookingById(Long id) {
        return repo.findById(id).orElseThrow();
    }

    public Booking updateBookingStatus(Long id, String status) {
        Booking booking = repo.findById(id).orElseThrow();
        booking.setStatus(status);
        return repo.save(booking);
    }

    public void deleteBooking(Long id) {
        repo.deleteById(id);
    }
}

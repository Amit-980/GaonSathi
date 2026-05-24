package com.gaonsathi.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/")
    public String home() {
        return "Backend is working 🚀";
    }
    // New endpoint added to test the backend
    @GetMapping("/hello")
    public String hello() {
        return "Hello Amit 👋";
    }
}
